import employees from './employees.json';
import attendances from './attendances.json';
import leaveRequests from './leaveRequests.json';
import salaryDetails from './salaryDetails.json';
import departments from './departments.json';
import assets from './assets.json';
import contracts from './contracts.json';
import positions from './positions.json';
import requestTypes from './requestTypes.json';
import candidates from './candidates.json';
import applications from './applications.json';
import jobPostings from './jobPostings.json';

export const mockEmployees = employees;
export const mockAttendances = attendances;
export const mockLeaveRequests = leaveRequests;
export const mockSalaryDetails = salaryDetails;
export const mockDepartments = departments;
export const mockAssets = assets;
export const mockContracts = contracts;
export const mockPositions = positions;
export const mockRequestTypes = requestTypes;
export const mockCandidates = candidates;
export const mockApplications = applications;
export const mockJobPostings = jobPostings;
export const mockDB = { requests: leaveRequests, attendances: attendances };

const attachHelpers = (arr, idField) => {
  arr.getById = function(id) { return this.find(item => item[idField] == id || item.id == id); };
  arr.update = function(id, data) { const idx = this.findIndex(item => item[idField] == id || item.id == id); if (idx !== -1) Object.assign(this[idx], data); };
  arr.add = function(data) { this.unshift(data); };
  arr.getAll = function() { return this; };
};

attachHelpers(mockEmployees, 'employeeId');
attachHelpers(mockDepartments, 'departmentId');
attachHelpers(mockSalaryDetails, 'salaryId');
attachHelpers(mockLeaveRequests, 'requestId');
attachHelpers(mockAssets, 'assetId');
attachHelpers(mockContracts, 'contractId');
attachHelpers(mockApplications, 'applicationId');
attachHelpers(mockPositions, 'positionId');
attachHelpers(mockRequestTypes, 'requestTypeId');

mockApplications.approve = function(id) { const idx = this.findIndex(x => x.applicationId == id); if (idx !== -1) this[idx].status = 'CHỜ_TP_DUYỆT'; };
mockApplications.reject = function(id, reason) { const idx = this.findIndex(x => x.applicationId == id); if (idx !== -1) { this[idx].status = 'TỪ_CHỐI'; this[idx].notes = reason; } };
mockApplications.schedule = function(id, date) { const idx = this.findIndex(x => x.applicationId == id); if (idx !== -1) { this[idx].status = 'ĐANG_PHỎNG_VẤN'; this[idx].interviewDate = date; } };
mockApplications.hire = function(id) { const idx = this.findIndex(x => x.applicationId == id); if (idx !== -1) this[idx].status = 'TRÚNG_TUYỂN'; };

mockLeaveRequests.approve = function(id) { const idx = this.findIndex(x => x.requestId == id || x.id == id); if (idx !== -1) this[idx].status = 'ĐÃ_DUYỆT'; };
mockLeaveRequests.reject = function(id, reason) { const idx = this.findIndex(x => x.requestId == id || x.id == id); if (idx !== -1) { this[idx].status = 'TỪ_CHỐI'; this[idx].notes = reason; this[idx].rejectionReason = reason; } };
mockLeaveRequests.delete = function(id) { const idx = this.findIndex(x => x.requestId == id || x.id == id); if (idx !== -1) this.splice(idx, 1); };
mockLeaveRequests.directorApprove = function(id) { const idx = this.findIndex(x => x.requestId == id || x.id == id); if (idx !== -1) this[idx].status = 'ĐÃ_DUYỆT'; };

// Simulated API calls for Frontend usage
export const fetchEmployeesAPI = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(employees);
    }, 500); // 500ms fake delay
  });
};

export const fetchAttendancesAPI = async (employeeId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(employeeId ? attendances.filter(a => a.employeeId === employeeId) : attendances);
    }, 500);
  });
};

export const fetchLeaveRequestsAPI = async (employeeId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(employeeId ? leaveRequests.filter(lr => lr.requesterId === employeeId) : leaveRequests);
    }, 500);
  });
};

export const fetchSalaryDetailsAPI = async (employeeId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(employeeId ? salaryDetails.filter(s => s.employeeId === employeeId) : salaryDetails);
    }, 500);
  });
};
