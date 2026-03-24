import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const employees = JSON.parse(fs.readFileSync(path.join(__dirname, 'employees.json'), 'utf-8'));

const leaveTypes = [
  { id: 1, code: 'AL', name: 'Nghỉ phép năm', requestTypeId: 1 },
  { id: 2, code: 'SL', name: 'Nghỉ ốm', requestTypeId: 2 },
  { id: 3, code: 'ML', name: 'Nghỉ thai sản', requestTypeId: 3 },
  { id: 4, code: 'UL', name: 'Nghỉ không lương', requestTypeId: 4 },
  { id: 5, code: 'PH', name: 'Nghỉ lễ bù', requestTypeId: 1 },
];

const reasons = [
  'Về quê thăm gia đình',
  'Dự đám cưới người thân',
  'Chăm sóc con nhỏ bị ốm',
  'Đi khám sức khỏe định kỳ',
  'Giải quyết công việc cá nhân',
  'Tham gia hội thảo đào tạo ngoài công ty',
  'Đi du lịch theo chế độ phép năm',
  'Nghỉ khi trẻ em nghỉ học (phụ huynh)',
  'Nghỉ ốm theo chỉ định bác sỹ',
  'Chuyển nhà và sắp xếp nơi ở mới',
  'Sửa chữa nhà cửa khẩn cấp',
  'Đưa người thân đi viện khám bệnh',
  'Tham dự lễ tốt nghiệp',
  'Giỗ chạp và ngày lễ gia đình',
  'Nghỉ bù do làm thêm đêm cuối tháng',
];

const rejectionReasons = [
  'Giai đoạn cao điểm, team cần đủ nhân lực để hoàn thành deadline dự án.',
  'Vui lòng sắp xếp lại lịch, hiện tại department đang thiếu người.',
  'Đã có 2 nhân sự khác nghỉ cùng thời điểm, không thể phê duyệt.',
  'Phòng ban đang trong giai đoạn chốt báo cáo quý, lùi sang tháng sau nhé.',
];

const addDays = (dateStr, days) => {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
};

const randomDate = (from, to) => {
  const start = new Date(from).getTime();
  const end = new Date(to).getTime();
  return new Date(start + Math.random() * (end - start)).toISOString().split('T')[0];
};

// Keep the original 4 records
const existingRequests = [
  {
    requestId: 501, requestCode: 'REQ202410-001', requesterId: 5, requesterName: 'Nguyễn Thị Lan',
    requestDate: '2024-10-15', startDate: '2024-10-20', endDate: '2024-10-21',
    days: 2, requestTypeId: 1, reason: 'Về quê dự đám cưới anh trai',
    status: 'ĐÃ_DUYỆT', approverId: 2, actionDate: '2024-10-16T10:00:00Z',
    approver_manager: 'Mai Tấn Lộc', notes: ''
  },
  {
    requestId: 502, requestCode: 'REQ202512-045', requesterId: 4, requesterName: 'Lê Minh Tuấn',
    requestDate: '2025-12-20', startDate: '2025-12-25', endDate: '2025-12-26',
    days: 2, requestTypeId: 1, reason: 'Nghỉ lễ Giáng sinh và du lịch gia đình',
    status: 'ĐÃ_DUYỆT', approverId: 1, actionDate: '2025-12-21T09:15:00Z',
    approver_manager: 'Phan Thành Danh', notes: ''
  },
  {
    requestId: 503, requestCode: 'REQ202603-012', requesterId: 4, requesterName: 'Lê Minh Tuấn',
    requestDate: '2026-03-15', startDate: '2026-03-18', endDate: '2026-03-18',
    days: 1, requestTypeId: 2, reason: 'Khám sức khỏe tổng quát',
    status: 'TỪ_CHỐI', approverId: 1, actionDate: '2026-03-16T08:00:00Z',
    rejectionReason: 'Tuần này team C&B đang chốt lương đợt 1, em lùi lại tuần sau giúp anh.',
    notes: ''
  },
  {
    requestId: 504, requestCode: 'REQ202603-088', requesterId: 5, requesterName: 'Nguyễn Thị Lan',
    requestDate: '2026-03-24', startDate: '2026-03-28', endDate: '2026-03-28',
    days: 1, requestTypeId: 1, reason: 'Xin nghỉ phép cá nhân',
    status: 'CHỜ_DUYỆT', notes: ''
  },
];

const managers = employees.filter(e => e.role === 'MANAGER' || e.role === 'ADMIN');
const regularEmployees = employees.filter(e => e.role === 'EMPLOYEE');

let nextId = 505;
const newRequests = [];

const periods = [
  { from: '2023-03-01', to: '2023-08-31', baseStatus: 'ĐÃ_DUYỆT' },
  { from: '2023-09-01', to: '2024-03-31', baseStatus: 'ĐÃ_DUYỆT' },
  { from: '2024-04-01', to: '2024-10-31', baseStatus: 'ĐÃ_DUYỆT' },
  { from: '2024-11-01', to: '2025-05-31', baseStatus: 'ĐÃ_DUYỆT' },
  { from: '2025-06-01', to: '2025-12-15', baseStatus: 'ĐÃ_DUYỆT' },
  { from: '2025-12-16', to: '2026-02-20', baseStatus: 'ĐÃ_DUYỆT' },
  { from: '2026-02-21', to: '2026-03-10', baseStatus: 'TỪ_CHỐI' },
  { from: '2026-03-11', to: '2026-03-24', baseStatus: 'CHỜ_DUYỆT' },
];

// Generate ~6 per period across different employees
periods.forEach(period => {
  const count = Math.floor(Math.random() * 5) + 4;
  for (let i = 0; i < count; i++) {
    const emp = regularEmployees[Math.floor(Math.random() * regularEmployees.length)];
    const leaveType = leaveTypes[Math.floor(Math.random() * leaveTypes.length)];
    const reqDate = randomDate(period.from, period.to);
    const startDate = addDays(reqDate, Math.floor(Math.random() * 5) + 1);
    const days = Math.floor(Math.random() * 4) + 1;
    const endDate = addDays(startDate, days - 1);
    const reason = reasons[Math.floor(Math.random() * reasons.length)];
    const manager = managers[Math.floor(Math.random() * managers.length)];
    
    let statusRoll = Math.random();
    // When period baseStatus is approved, force 80% approved, 10% rejected, 10% pending
    let status;
    if (period.baseStatus === 'ĐÃ_DUYỆT') {
        status = statusRoll < 0.8 ? 'ĐÃ_DUYỆT' : (statusRoll < 0.9 ? 'TỪ_CHỐI' : 'CHỜ_DUYỆT');
    } else if (period.baseStatus === 'TỪ_CHỐI') {
        status = statusRoll < 0.6 ? 'TỪ_CHỐI' : 'CHỜ_DUYỆT';
    } else {
        status = 'CHỜ_DUYỆT';
    }

    const req = {
      requestId: nextId++,
      requestCode: `REQ${reqDate.replace(/-/g, '').slice(0,6)}-${String(nextId).padStart(3, '0')}`,
      requesterId: emp.employeeId,
      requesterName: emp.fullName,
      requestDate: reqDate,
      startDate,
      endDate,
      days,
      requestTypeId: leaveType.requestTypeId,
      reason,
      status,
      notes: '',
    };

    if (status === 'ĐÃ_DUYỆT') {
      req.approverId = manager.employeeId;
      req.actionDate = new Date(new Date(reqDate).getTime() + 86400000).toISOString();
      req.approver_manager = manager.fullName;
    } else if (status === 'TỪ_CHỐI') {
      req.approverId = manager.employeeId;
      req.actionDate = new Date(new Date(reqDate).getTime() + 86400000).toISOString();
      req.rejectionReason = rejectionReasons[Math.floor(Math.random() * rejectionReasons.length)];
    }

    newRequests.push(req);
  }
});

const allRequests = [...existingRequests, ...newRequests];
fs.writeFileSync(path.join(__dirname, 'leaveRequests.json'), JSON.stringify(allRequests, null, 2));
console.log(`Generated ${allRequests.length} leave requests successfully.`);
