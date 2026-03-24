import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateRandomDate = (start, end) => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
};

const lastNames = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Vũ", "Võ", "Đặng", "Bùi", "Đỗ", "Hồ", "Ngô", "Dương", "Lý", "Đoàn"];
const middleNamesM = ["Văn", "Minh", "Hữu", "Đức", "Hải", "Thanh", "Công", "Quang", "Đình", "Tuấn"];
const middleNamesF = ["Thị", "Ngọc", "Thu", "Thanh", "Mai", "Hồng", "Kim", "Lan"];
const firstNamesM = ["Anh", "Tuấn", "Dũng", "Đạt", "Hiếu", "Khoa", "Phát", "Khang", "Hùng", "Bình", "Cường", "Hoàng", "Long", "Nam", "Phong", "Sơn", "Thắng", "Thành", "Trung"];
const firstNamesF = ["Ngân", "Linh", "Thảo", "Trang", "Hà", "Hương", "Trâm", "Nhung", "Oanh", "Phương", "Quyên", "Tâm", "Thủy", "Tiên", "Uyên", "Vân", "Yến"];

const removeVietnameseTones = (str) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  return str.toLowerCase();
};

const generateEmail = (fullName) => {
  const parts = fullName.split(' ');
  const first = parts[parts.length - 1];
  const last = parts[0];
  const email = `${removeVietnameseTones(first)}.${removeVietnameseTones(last)}@aethrm.com`;
  return email;
};

// Fixed initial 3 from the system
const employees = [
  {
    employeeId: 1, employeeCode: "NV00001", fullName: "Phan Thành Danh", dateOfBirth: "1985-10-22", gender: "NAM",
    companyEmail: "danh.phan@aethrm.com", password: "123456", phoneNumber: "0901234567", status: "ĐANG_LÀM_VIỆC",
    hireDate: "2023-01-01", baseLeaveDays: 14,
    department: { departmentId: 1, departmentCode: "BOD", departmentName: "Ban Giám Đốc" },
    position: { positionId: 1, positionName: "Giám đốc Điều hành (CEO)" }, role: "ADMIN"
  },
  {
    employeeId: 2, employeeCode: "NV00002", fullName: "Mai Tấn Lộc", dateOfBirth: "1992-05-15", gender: "NAM",
    companyEmail: "loc.mai@aethrm.com", password: "123456", phoneNumber: "0987654321", status: "ĐANG_LÀM_VIỆC",
    hireDate: "2023-02-15", baseLeaveDays: 12,
    department: { departmentId: 2, departmentCode: "IT", departmentName: "Phòng Công Nghệ Thông Tin" },
    position: { positionId: 2, positionName: "Trưởng phòng IT" }, role: "MANAGER"
  },
  {
    employeeId: 3, employeeCode: "NV00003", fullName: "Bùi Ngọc Bảo Ngân", dateOfBirth: "1998-11-08", gender: "NỮ",
    companyEmail: "ngan.bui@aethrm.com", password: "123456", phoneNumber: "0933333333", status: "ĐANG_LÀM_VIỆC",
    hireDate: "2023-06-10", baseLeaveDays: 12,
    department: { departmentId: 2, departmentCode: "IT", departmentName: "Phòng Công Nghệ Thông Tin" },
    position: { positionId: 3, positionName: "Nhân viên IT" }, role: "EMPLOYEE"
  }
];

let nextId = 4;
const generateEmployeeDetails = (role, deptObj, posName) => {
  const isMale = Math.random() > 0.45;
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const midName = isMale ? middleNamesM[Math.floor(Math.random() * middleNamesM.length)] : middleNamesF[Math.floor(Math.random() * middleNamesF.length)];
  const firstName = isMale ? firstNamesM[Math.floor(Math.random() * firstNamesM.length)] : firstNamesF[Math.floor(Math.random() * firstNamesF.length)];
  
  const fullName = `${lastName} ${midName} ${firstName}`;
  let baseEmail = generateEmail(fullName);
  // deduplicate email
  let counter = 1;
  let email = baseEmail;
  while(employees.find(e => e.companyEmail === email)) {
      email = baseEmail.replace('@', `${counter}@`);
      counter++;
  }

  const phone = "09" + Math.floor(10000000 + Math.random() * 90000000).toString();
  
  const randStatus = Math.random();
  let status = "ĐANG_LÀM_VIỆC";
  if (randStatus > 0.85) {
      if (randStatus > 0.95) status = "ĐÃ_NGHỈ_VIỆC";
      else if (randStatus > 0.90) status = "THỬ_VIỆC";
      else status = "NGHỈ_THAI_SẢN";
  }

  const hireDate = generateRandomDate(new Date('2023-01-01'), new Date('2026-03-24'));
  const dob = generateRandomDate(new Date('1980-01-01'), new Date('2002-12-31'));
  
  const emp = {
      employeeId: nextId,
      employeeCode: `NV${nextId.toString().padStart(5, '0')}`,
      fullName,
      dateOfBirth: dob,
      gender: isMale ? "NAM" : "NỮ",
      companyEmail: email,
      password: "123456",
      phoneNumber: phone,
      status: status,
      hireDate: hireDate,
      baseLeaveDays: 12,
      department: deptObj,
      position: { positionId: role === 'MANAGER' ? nextId + 100 : nextId + 200, positionName: posName },
      role
  };
  employees.push(emp);
  nextId++;
};

// Create 1 more Admin (Giám đốc)
generateEmployeeDetails("ADMIN", { departmentId: 1, departmentName: "Ban Giám Đốc" }, "Phó Giám đốc");

const departments = [
  { id: 3, name: "Phòng Hành Chính Nhân Sự", mCount: 1, eCount: 7, mTitle: "Trưởng phòng HCNS", eTitle: "Chuyên viên HCNS" },
  { id: 4, name: "Phòng Kinh Doanh", mCount: 1, eCount: 16, mTitle: "Trưởng phòng Sales", eTitle: "Chuyên viên Sales" },
  { id: 5, name: "Phòng Kế Toán", mCount: 1, eCount: 5, mTitle: "Kế toán trưởng", eTitle: "Chuyên viên Kế toán" },
  { id: 6, name: "Phòng Marketing", mCount: 1, eCount: 8, mTitle: "Trưởng phòng Marketing", eTitle: "Chuyên viên Marketing" }
];

// Add 8 more IT employees
for(let i=0; i<8; i++) {
  generateEmployeeDetails("EMPLOYEE", { departmentId: 2, departmentCode: "IT", departmentName: "Phòng Công Nghệ Thông Tin" }, "Nhân viên IT");
}

departments.forEach(dept => {
  const deptObj = { departmentId: dept.id, departmentName: dept.name };
  for(let i=0; i<dept.mCount; i++) generateEmployeeDetails("MANAGER", deptObj, dept.mTitle);
  for(let i=0; i<dept.eCount; i++) generateEmployeeDetails("EMPLOYEE", deptObj, dept.eTitle);
});

// Update ID 4 and 5 that the user already had manually added in prompt
const emp4 = employees.find(e => e.employeeId === 4);
if (emp4) {
    emp4.fullName = "Lê Minh Tuấn";
    emp4.companyEmail = "tuan.le@aethrm.com";
    emp4.gender = "NAM";
}
const emp5 = employees.find(e => e.employeeId === 5);
if (emp5) {
    emp5.fullName = "Nguyễn Thị Lan";
    emp5.companyEmail = "lan.nguyen@aethrm.com";
    emp5.gender = "NỮ";
}

fs.writeFileSync(path.join(__dirname, 'employees.json'), JSON.stringify(employees, null, 2));
console.log(`Generated ${employees.length} employees successfully.`);
