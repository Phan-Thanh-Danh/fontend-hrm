import { reactive, watch } from 'vue';
import { generateSeedData } from './seedData.js';

// Cấu hình Mock Database
const LOCAL_STORAGE_KEY = 'HRM_MOCK_DB_V2';

// Lấy dữ liệu từ LocalStorage nếu có, nếu không thì tự sinh ra từ seedData.js
const getInitialDB = () => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn("Could not load Mock DB from localStorage", e);
  }
  return generateSeedData();
};

// Global Store lưu trữ nội dung Mock DB, có tính Reactivity
export const mockDB = reactive(getInitialDB());

// Watcher: Mỗi khi bất kỳ dữ liệu nào trong mockDB bị chỉnh sửa (vd Thêm/Xóa/Sửa), đẩy data lưu mảng xuống LocalStorage của Trình Duyệt
watch(mockDB, (newVal) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newVal));
  } catch(e) { /* ignore */ }
}, { deep: true });

// === HELPER FUNCTIONS API (CRUD) ===

export const requestsAPI = {
  getAll() {
    return mockDB.requests;
  },
  add(data) {
    data.request_id = Date.now();
    mockDB.requests.unshift(data);
  },
  update(id, data) {
    const idx = mockDB.requests.findIndex(r => r.request_id == id);
    if (idx !== -1) Object.assign(mockDB.requests[idx], data);
  },
  approve(id) {
    const req = mockDB.requests.find(r => r.request_id == id);
    if (req) {
      req.status = 'ĐÃ_DUYỆT';
      req.completed_date = new Date().toISOString();
    }
  },
  reject(id, reason) {
    const req = mockDB.requests.find(r => r.request_id == id);
    if (req) {
      req.status = 'TỪ_CHỐI';
      req.notes = reason;
      req.completed_date = new Date().toISOString();
    }
  },
  delete(id) {
    const idx = mockDB.requests.findIndex(r => r.request_id == id);
    if (idx !== -1) mockDB.requests.splice(idx, 1);
  }
};

export const employeesAPI = {
  getAll() {
    return mockDB.employees;
  },
  getById(id) {
    return mockDB.employees.find(e => e.employee_id === id);
  },
  add(emp) {
    emp.employee_id = Date.now();
    mockDB.employees.unshift(emp);
  },
  update(id, data) {
    const index = mockDB.employees.findIndex(e => e.employee_id === id);
    if (index !== -1) {
      Object.assign(mockDB.employees[index], data);
    }
  },
  delete(id) {
    const emp = mockDB.employees.find(e => e.employee_id === id);
    if (emp) emp.status = 'ĐÃ_NGHỈ_VIỆC';
  }
};

export const departmentsAPI = {
  getAll() { return mockDB.departments; },
  getById(id) { return mockDB.departments.find(d => d.department_id === id); },
  add(data) {
    data.department_id = Date.now();
    mockDB.departments.unshift(data);
  },
  update(id, data) {
    const idx = mockDB.departments.findIndex(d => d.department_id === id);
    if (idx !== -1) Object.assign(mockDB.departments[idx], data);
  },
  delete(id) {
    const idx = mockDB.departments.findIndex(d => d.department_id === id);
    if (idx !== -1) mockDB.departments[idx].status = false;
  }
};

export const positionsAPI = {
  getAll() { return mockDB.positions; },
  getById(id) { return mockDB.positions.find(p => p.position_id === id); },
  add(data) {
    data.position_id = Date.now();
    mockDB.positions.unshift(data);
  },
  update(id, data) {
    const idx = mockDB.positions.findIndex(p => p.position_id === id);
    if (idx !== -1) Object.assign(mockDB.positions[idx], data);
  },
  delete(id) {
    const idx = mockDB.positions.findIndex(p => p.position_id === id);
    if (idx !== -1) mockDB.positions.splice(idx, 1);
  }
};

export const requestTypesAPI = {
  getAll() {
    return mockDB.requestTypes;
  },
  getById(id) {
    return mockDB.requestTypes.find(r => r.request_type_id === id);
  }
};

export const assetsAPI = {
  getAll() { return mockDB.assets; },
  getById(id) { return mockDB.assets.find(a => a.asset_id === id); },
  add(data) {
    data.asset_id = Date.now();
    mockDB.assets.unshift(data);
  },
  update(id, data) {
    const idx = mockDB.assets.findIndex(a => a.asset_id === id);
    if (idx !== -1) Object.assign(mockDB.assets[idx], data);
  },
  delete(id) {
    const idx = mockDB.assets.findIndex(a => a.asset_id === id);
    if (idx !== -1) mockDB.assets.splice(idx, 1);
  }
};

export const contractsAPI = {
  getAll() { return mockDB.contracts; },
  getById(id) { return mockDB.contracts.find(c => c.contract_id === id); },
  add(data) {
    data.contract_id = Date.now();
    mockDB.contracts.unshift(data);
  },
  update(id, data) {
    const idx = mockDB.contracts.findIndex(c => c.contract_id === id);
    if (idx !== -1) Object.assign(mockDB.contracts[idx], data);
  },
  delete(id) {
    const idx = mockDB.contracts.findIndex(c => c.contract_id === id);
    if (idx !== -1) mockDB.contracts[idx].status = 'ĐÃ_CHẤM_DỨT';
  }
};

export const candidatesAPI = {
  getAll() { return mockDB.candidates; },
  getById(id) { return mockDB.candidates.find(c => c.candidate_id === id); },
  add(data) {
    data.candidate_id = Date.now();
    mockDB.candidates.unshift(data);
  },
  update(id, data) {
    const idx = mockDB.candidates.findIndex(c => c.candidate_id === id);
    if (idx !== -1) Object.assign(mockDB.candidates[idx], data);
  },
  delete(id) {
    const idx = mockDB.candidates.findIndex(c => c.candidate_id === id);
    if (idx !== -1) mockDB.candidates[idx].status = 'LOẠI';
  }
};

export const salariesAPI = {
  getAll() { return mockDB.salaries; },
  getById(id) { return mockDB.salaries.find(s => s.salary_id == id); },
  add(data) {
    data.salary_id = Date.now();
    mockDB.salaries.unshift(data);
  },
  update(id, data) {
    const idx = mockDB.salaries.findIndex(s => s.salary_id == id);
    if (idx !== -1) Object.assign(mockDB.salaries[idx], data);
  },
  delete(id) {
    const idx = mockDB.salaries.findIndex(s => s.salary_id == id);
    if (idx !== -1) mockDB.salaries.splice(idx, 1);
  }
};

