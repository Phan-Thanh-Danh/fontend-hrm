import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to read/write JSON
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(__dirname, file), 'utf-8'));
const writeJson = (file, data) => fs.writeFileSync(path.join(__dirname, file), JSON.stringify(data, null, 2));

// Load all data
const employees = readJson('employees.json');
const attendances = readJson('attendances.json');
const leaveRequests = readJson('leaveRequests.json');
const salaryDetails = readJson('salaryDetails.json');
const departments = readJson('departments.json');
const requestTypes = readJson('requestTypes.json');

const report = {
  orphanData: [],
  chronological: [],
  statusLifecycle: [],
  derivedData: []
};

// Map valid IDs
const validEmployeeIds = new Set(employees.map(e => e.employeeId));
const validManagerAdminIds = new Set(employees.filter(e => e.role === 'MANAGER' || e.role === 'ADMIN').map(e => e.employeeId));
const empMap = new Map(employees.map(e => [e.employeeId, e]));

// 1. Relational Integrity & Chronological Logic (Attendances)
attendances.forEach(att => {
  if (!validEmployeeIds.has(att.employeeId)) {
    report.orphanData.push(`Attendance ${att.attendanceId} references missing employeeId ${att.employeeId}`);
    // Fix: assign to a random employee
    att.employeeId = employees[Math.floor(Math.random() * employees.length)].employeeId;
  }
  const emp = empMap.get(att.employeeId);
  if (emp && new Date(att.attendanceDate) < new Date(emp.hireDate)) {
    report.chronological.push(`Attendance ${att.attendanceId} date ${att.attendanceDate} is before hireDate ${emp.hireDate}`);
    // Fix: move attendance date to after hire date
    const hDate = new Date(emp.hireDate);
    hDate.setDate(hDate.getDate() + 10);
    att.attendanceDate = hDate.toISOString().split('T')[0];
  }
});

// 2. Relational Integrity, Chronological & Status (LeaveRequests)
leaveRequests.forEach(req => {
  if (!validEmployeeIds.has(req.requesterId)) {
    report.orphanData.push(`LeaveRequest ${req.requestId} references missing requesterId ${req.requesterId}`);
    req.requesterId = employees[Math.floor(Math.random() * employees.length)].employeeId;
  }
  const emp = empMap.get(req.requesterId);
  
  // Chronological
  if (emp && new Date(req.requestDate) < new Date(emp.hireDate)) {
    report.chronological.push(`LeaveRequest ${req.requestId} requestDate ${req.requestDate} is before hireDate ${emp.hireDate}`);
    const hDate = new Date(emp.hireDate);
    hDate.setDate(hDate.getDate() + 5);
    req.requestDate = hDate.toISOString();
    req.startDate = hDate.toISOString().split('T')[0];
    hDate.setDate(hDate.getDate() + 2);
    req.endDate = hDate.toISOString().split('T')[0];
  }
  
  if (new Date(req.requestDate) > new Date(req.startDate)) {
    report.chronological.push(`LeaveRequest ${req.requestId} requestDate > startDate`);
    req.requestDate = new Date(new Date(req.startDate).getTime() - 86400000).toISOString();
  }

  // Status & Approver
  if (['ĐÃ_DUYỆT', 'TỪ_CHỐI'].includes(req.status)) {
    if (!req.approverId || !validManagerAdminIds.has(req.approverId)) {
      report.statusLifecycle.push(`LeaveRequest ${req.requestId} missing or invalid approverId for status ${req.status}`);
      req.approverId = employees.find(e => e.role === 'MANAGER' || e.role === 'ADMIN').employeeId;
    }
    if (req.status === 'TỪ_CHỐI' && !req.rejectionReason) {
      report.statusLifecycle.push(`LeaveRequest ${req.requestId} missing rejectionReason`);
      req.rejectionReason = "Không phù hợp với lịch dự án hiện tại.";
    }
    if (!req.actionDate || new Date(req.actionDate) < new Date(req.requestDate)) {
      report.chronological.push(`LeaveRequest ${req.requestId} actionDate is missing or before requestDate`);
      req.actionDate = new Date(new Date(req.requestDate).getTime() + 86400000).toISOString();
    }
  }
});

// Calculate accumulated leave days per employee
const usedLeaves = {};
leaveRequests.filter(r => r.status === 'ĐÃ_DUYỆT' && r.requestTypeId === 1).forEach(req => {
  usedLeaves[req.requesterId] = (usedLeaves[req.requesterId] || 0) + (req.days || 1);
});

// 3. Derived Data (Salary mapping and Leave balances)
salaryDetails.forEach(sal => {
  if (!validEmployeeIds.has(sal.employeeId)) {
    report.orphanData.push(`SalaryDetail ${sal.salaryId} references missing employeeId ${sal.employeeId}`);
    sal.employeeId = employees[Math.floor(Math.random() * employees.length)].employeeId;
  }
  const emp = empMap.get(sal.employeeId);
  
  if (emp && new Date(sal.period) < new Date(emp.hireDate.substring(0, 7))) {
    report.chronological.push(`SalaryDetail ${sal.salaryId} period ${sal.period} is before hireDate ${emp.hireDate}`);
    sal.period = emp.hireDate.substring(0, 7);
  }

  // Find matching attendances for this period
  const monthAtts = attendances.filter(a => a.employeeId === sal.employeeId && a.attendanceDate.startsWith(sal.period));
  
  let totalLate = 0;
  let totalOvertime = 0;
  monthAtts.forEach(a => {
      totalLate += (a.lateMinutes || 0);
      totalOvertime += (a.overtimeHours || 0);
  });
  
  let needsFix = false;
  if (totalLate > 0 && sal.deductions === 0) {
      report.derivedData.push(`Salary ${sal.salaryId} missing deduction for ${totalLate} late minutes`);
      sal.deductions = totalLate * 5000;
      needsFix = true;
  }
  if (totalOvertime > 0 && sal.allowances === 0) {
      report.derivedData.push(`Salary ${sal.salaryId} missing allowance for ${totalOvertime} overtime hours`);
      sal.allowances = totalOvertime * 100000;
      needsFix = true;
  }
  if (needsFix) {
      sal.netSalary = sal.baseSalary + sal.allowances - sal.deductions - sal.tax;
  }
});

// Update Employee Leave Balances
let leaveBalanceFixes = 0;
employees.forEach(emp => {
    const used = usedLeaves[emp.employeeId] || 0;
    // Just mock setting it on the employee object if we had a field, but normally it's computed.
    // If the employee has a usedLeaveDays field, we'd sync it.
});

// Write patched files
writeJson('attendances.json', attendances);
writeJson('leaveRequests.json', leaveRequests);
writeJson('salaryDetails.json', salaryDetails);

const formatReport = () => {
    return `### KẾT QUẢ KIỂM TRA & AUTO-PATCH

**1. Dữ liệu mồ côi (Relational Integrity)**
${report.orphanData.length ? report.orphanData.map(x => `- ${x}`).join('\n') : '- Hoàn hảo (0 lỗi)'}

**2. Logic Thời gian (Chronological)**
${report.chronological.length ? report.chronological.map(x => `- ${x}`).join('\n') : '- Hoàn hảo (0 lỗi)'}

**3. Vòng đời Trạng thái (Status Lifecycle)**
${report.statusLifecycle.length ? report.statusLifecycle.map(x => `- ${x}`).join('\n') : '- Hoàn hảo (0 lỗi)'}

**4. Dữ liệu Phái sinh & Tính toán (Derived Data)**
${report.derivedData.length ? report.derivedData.map(x => `- ${x}`).join('\n') : '- Hoàn hảo (0 lỗi)'}

*Tất cả ${report.orphanData.length + report.chronological.length + report.statusLifecycle.length + report.derivedData.length} lỗi trên đã được PATCH (tự động sửa) vào file JSON tương ứng.*
`;
};

fs.writeFileSync(path.join(__dirname, 'audit_report.md'), formatReport());
console.log("Audit complete. Report generated.");
