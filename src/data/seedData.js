// src/data/seedData.js
// Script tạo Seed Data (50+ records) chuẩn SQL Schema (SQL_hackathon v4.sql)

// 1. Dữ liệu phòng ban (departments)
export const departments = [
  { department_id: 1, department_code: 'BOD', department_name: 'Ban Giám Đốc', status: true },
  { department_id: 2, department_code: 'IT', department_name: 'Công nghệ IT', status: true },
  { department_id: 3, department_code: 'MKT', department_name: 'Marketing', status: true },
  { department_id: 4, department_code: 'SALE', department_name: 'Kinh doanh', status: true },
  { department_id: 5, department_code: 'HR', department_name: 'Quản trị Y Tế & Nhân sự', status: true },
  { department_id: 6, department_code: 'CSKH', department_name: 'Chăm sóc khách hàng', status: true },
];

// 2. Dữ liệu chức vụ (positions)
export const positions = [
  { position_id: 1, position_code: 'CEO', position_name: 'Giám đốc' },
  { position_id: 2, position_code: 'MANAGER', position_name: 'Trưởng phòng' },
  { position_id: 3, position_code: 'LEAD', position_name: 'Trưởng nhóm' },
  { position_id: 4, position_code: 'SENIOR', position_name: 'Chuyên viên cao cấp' },
  { position_id: 5, position_code: 'JUNIOR', position_name: 'Chuyên viên' },
  { position_id: 6, position_code: 'INTERN', position_name: 'Thực tập sinh' },
];

// 3. Dữ liệu loại đơn (request_types)
export const requestTypes = [
  { request_type_id: 1, request_type_name: 'Nghỉ phép năm', category: 'NGHỈ_PHÉP' },
  { request_type_id: 6, request_type_name: 'Nghỉ ốm (Đau ốm)', category: 'NGHỈ_PHÉP' },
  { request_type_id: 7, request_type_name: 'Nghỉ thai sản', category: 'NGHỈ_PHÉP' },
  { request_type_id: 8, request_type_name: 'Nghỉ không lương', category: 'NGHỈ_PHÉP' },
  { request_type_id: 9, request_type_name: 'Nghỉ việc riêng (Hiếu, hỉ)', category: 'NGHỈ_PHÉP' },
  { request_type_id: 10, request_type_name: 'Nghỉ bù', category: 'NGHỈ_PHÉP' },
  { request_type_id: 2, request_type_name: 'Tuyển dụng nhân sự mới', category: 'KHÁC' },
  { request_type_id: 3, request_type_name: 'Đề xuất tăng lương', category: 'DIỀU_CHỈNH_CÔNG' },
  { request_type_id: 4, request_type_name: 'Tạm ứng lương', category: 'TẠM_ỨNG_LƯƠNG' },
  { request_type_id: 5, request_type_name: 'Thanh toán công tác phí', category: 'THANH_TOÁN' },
];

// Tạo 50 Employees
const generateEmployees = () => {
  const emps = [];
  const firstNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Phan', 'Vũ', 'Võ', 'Đặng'];
  const middleNames = ['Văn', 'Thị', 'Hữu', 'Đức', 'Minh', 'Ngọc', 'Mai', 'Thanh', 'Gia', 'Hải'];
  const lastNames = ['An', 'Bình', 'Châu', 'Dương', 'Hà', 'Lan', 'Long', 'Phúc', 'Quân', 'Tâm', 'Huy', 'Thảo', 'Trang'];

  // Hardcode 1 số người cụ thể
  emps.push({ employee_id: 1, employee_code: 'EMP001', full_name: 'Trần Lan Anh', department_id: 2, position_id: 3, status: 'ĐANG_LÀM_VIỆC', avatar_url: 'https://i.pravatar.cc/150?u=1' });
  emps.push({ employee_id: 2, employee_code: 'EMP002', full_name: 'Quang Huy', department_id: 2, position_id: 4, status: 'ĐANG_LÀM_VIỆC', avatar_url: 'https://i.pravatar.cc/150?u=2' });
  emps.push({ employee_id: 3, employee_code: 'EMP003', full_name: 'Nguyễn Bích Diệp', department_id: 1, position_id: 1, status: 'ĐANG_LÀM_VIỆC', avatar_url: 'https://i.pravatar.cc/150?u=3' });
  emps.push({ employee_id: 4, employee_code: 'EMP004', full_name: 'Lê Thị Minh Anh', department_id: 3, position_id: 2, status: 'ĐANG_LÀM_VIỆC', avatar_url: 'https://i.pravatar.cc/150?u=4' });

  // Sinh thêm 46 người ngẫu nhiên
  for (let i = 5; i <= 50; i++) {
    const f = firstNames[i % firstNames.length];
    const m = middleNames[i % middleNames.length];
    const l = lastNames[i % lastNames.length];
    emps.push({
      employee_id: i,
      employee_code: `EMP${i.toString().padStart(3, '0')}`,
      full_name: `${f} ${m} ${l}`,
      department_id: (i % 6) + 1,
      position_id: (i % 6) + 1,
      status: i % 10 === 0 ? 'ĐÃ_NGHỈ_VIỆC' : 'ĐANG_LÀM_VIỆC',
      avatar_url: `https://i.pravatar.cc/150?u=${i}`
    });
  }
  return emps;
};

// Tạo 50 Requests (Đơn từ chờ duyệt / đã duyệt)
const generateRequests = () => {
  const reqs = [];
  const reqTitles = [
    'Xin nghỉ phép về quê', 'Tuyển dụng 2 Fresher VueJS', 'Đề nghị cấp laptop mới', 
    'Xin thanh toán tiền taxi công tác', 'Tạm ứng mua thiết bị phòng lab',
    'Chấm điểm hiệu suất cuối tháng', 'Nghỉ ốm 2 ngày', 'Tăng ca dự án HRM'
  ];
  
  // 5 records khẩn cấp như bản thiết kế
  reqs.push({ request_id: 1, requester_id: 4, request_type_id: 1, title: 'Nghỉ phép năm (03 ngày)', request_date: '2023-10-24 08:30:00', is_urgent: true, status: 'CHỜ_DUYỆT' });
  reqs.push({ request_id: 2, requester_id: 2, request_type_id: 2, title: '02 Kỹ sư Hệ thống Cloud', request_date: '2023-10-23 15:20:00', is_urgent: false, status: 'CHỜ_DUYỆT' });
  reqs.push({ request_id: 3, requester_id: 5, request_type_id: 3, title: 'Tăng bậc lương định kỳ', request_date: '2023-10-23 10:15:00', is_urgent: false, status: 'CHỜ_DUYỆT' });
  reqs.push({ request_id: 4, requester_id: 6, request_type_id: 2, title: 'Phê duyệt HĐLĐ thử việc', request_date: '2023-10-23 09:00:00', is_urgent: false, status: 'CHỜ_DUYỆT' });
  reqs.push({ request_id: 5, requester_id: 7, request_type_id: 1, title: 'Nghỉ công tác nước ngoài (05 ngày)', request_date: '2023-10-22 08:00:00', is_urgent: true, status: 'CHỜ_DUYỆT' });

  // 45 records ngẫu nhiên
  for (let i = 6; i <= 50; i++) {
    const isPending = i < 20; // Khoảng 15 cái đầu trong vòng lặp đang Pending
    reqs.push({
      request_id: i,
      requester_id: (i % 40) + 1,
      request_type_id: (i % 5) + 1,
      title: reqTitles[i % reqTitles.length],
      request_date: `2023-10-${String((i % 28) + 1).padStart(2, '0')} 09:00:00`,
      is_urgent: i % 7 === 0,
      status: isPending ? 'CHỜ_DUYỆT' : (i % 3 === 0 ? 'TỪ_CHỐI' : 'ĐÃ_DUYỆT')
    });
  }
  return reqs;
};

// Tạo 50 Attendances (Chấm công)
const generateAttendances = () => {
  const atts = [];
  for (let i = 1; i <= 50; i++) {
    atts.push({
      attendance_id: i,
      employee_id: (i % 40) + 1,
      attendance_date: `2023-10-${String((i % 28) + 1).padStart(2, '0')}`,
      check_in_time: `2023-10-${String((i % 28) + 1).padStart(2, '0')} 08:02:45`,
      check_out_time: `2023-10-${String((i % 28) + 1).padStart(2, '0')} 17:35:10`,
      status: 'ĐÃ_DUYỆT'
    });
  }
  return atts;
}

// Tạo 50 Assets
const generateAssets = () => {
  const assets = [];
  const categories = ['Laptop', 'Màn hình', 'Bàn phím', 'Chuột', 'Máy in', 'Server'];
  const brands = ['Dell', 'HP', 'Apple', 'Logitech', 'Asus', 'Lenovo'];
  for (let i = 1; i <= 50; i++) {
    assets.push({
      asset_id: i,
      asset_code: `AST-${i.toString().padStart(4, '0')}`,
      asset_name: `${categories[i % categories.length]} ${brands[i % brands.length]} Model-${i}`,
      category: categories[i % categories.length],
      status: i % 8 === 0 ? 'HỎNG' : (i % 5 === 0 ? 'TRONG_KHO' : 'ĐANG_SỬ_DỤNG'),
      assigned_to: i % 5 !== 0 ? (i % 40) + 1 : null,
      purchase_date: `2022-0${(i % 9) + 1}-15`,
      value: (i % 10 + 2) * 1000000
    });
  }
  return assets;
};

// Tạo 50 Contracts
const generateContracts = () => {
  const contracts = [];
  const types = ['THỬ_VIỆC', 'CHÍNH_THỨC_1_NĂM', 'CHÍNH_THỨC_3_NĂM', 'VÔ_THỜI_HẠN', 'THỰC_TẬP'];
  for (let i = 1; i <= 50; i++) {
    const type = types[i % types.length];
    contracts.push({
      contract_id: i,
      contract_code: `HDLD-${i.toString().padStart(4, '0')}`,
      employee_id: (i % 40) + 1,
      contract_type: type,
      start_date: `2023-01-${String((i % 28) + 1).padStart(2, '0')}`,
      end_date: type === 'VÔ_THỜI_HẠN' ? null : `2024-01-${String((i % 28) + 1).padStart(2, '0')}`,
      basic_salary: (10 + (i % 20)) * 1000000,
      status: i % 10 === 0 ? 'ĐÃ_CHẤM_DỨT' : 'HIỆU_LỰC'
    });
  }
  return contracts;
};

// Tạo 50 Candidates
const generateCandidates = () => {
  const cands = [];
  for (let i = 1; i <= 50; i++) {
    cands.push({
      candidate_id: i,
      full_name: `Ứng viên số ${i}`,
      email: `candidate${i}@gmail.com`,
      phone: `0901${i.toString().padStart(6, '0')}`,
      applied_position_id: (i % 6) + 1,
      status: i % 5 === 0 ? 'ĐÃ_TUYỂN' : (i % 3 === 0 ? 'LOẠI' : 'HẸN_PHỎNG_VẤN'),
      apply_date: `2023-11-${String((i % 28) + 1).padStart(2, '0')}`,
      cv_url: `https://example.com/cv/candidate${i}.pdf`
    });
  }
  return cands;
};

// Tạo 50 Lương (Salaries)
const generateSalaries = () => {
  const sals = [];
  for(let i = 1; i <= 50; i++) {
    const bs = (10 + (i % 20)) * 1000000;
    const allowance = 1000000;
    const tax = bs * 0.1;
    sals.push({
      salary_id: i,
      employee_id: (i % 40) + 1,
      month: 10,
      year: 2023,
      basic_salary: bs,
      allowance: allowance,
      tax: tax,
      net_salary: bs + allowance - tax,
      status: i % 5 === 0 ? 'ĐANG_XỬ_LÝ' : 'ĐÃ_THANH_TOÁN'
    });
  }
  return sals;
};

export const generateSeedData = () => {
  return {
    departments,
    positions,
    requestTypes,
    employees: generateEmployees(),
    requests: generateRequests(),
    attendances: generateAttendances(),
    assets: generateAssets(),
    contracts: generateContracts(),
    candidates: generateCandidates(),
    salaries: generateSalaries()
  };
};
