/**
 * useCurrentUser — Composable trung tâm cung cấp thông tin user đang đăng nhập.
 * Đọc localStorage (được ghi khi Login) và tra cứu bản ghi đầy đủ trong mockEmployees.
 */
import { computed } from 'vue';
import { mockEmployees } from '@/mock-data/index.js';

export function useCurrentUser() {
  // Các key cơ bản được lưu lúc login
  const storedId    = localStorage.getItem('userId');        // employeeId (number dạng string)
  const storedName  = localStorage.getItem('userName');
  const storedEmail = localStorage.getItem('userEmail');
  const storedRole  = localStorage.getItem('userRole');      // 'employee' | 'manager' | 'director' | 'admin'
  const storedDept  = localStorage.getItem('userDeptId');

  // --- Tìm bản ghi đầy đủ trong mock-data ---
  const fullProfile = computed(() => {
    if (!storedId) return null;
    // employeeId trong mock-data là số nguyên
    return mockEmployees.find(e =>
      String(e.employeeId) === String(storedId) ||
      e.companyEmail === storedEmail
    ) || null;
  });

  // --- Các thuộc tính tiện dụng ---
  const employeeId   = computed(() => fullProfile.value?.employeeId ?? Number(storedId) ?? null);
  const employeeCode = computed(() => fullProfile.value?.employeeCode ?? '');
  const fullName     = computed(() => fullProfile.value?.fullName ?? storedName ?? '');
  const email        = computed(() => fullProfile.value?.companyEmail ?? storedEmail ?? '');
  const phone        = computed(() => fullProfile.value?.phoneNumber ?? '');
  const gender       = computed(() => fullProfile.value?.gender ?? '');
  const dateOfBirth  = computed(() => fullProfile.value?.dateOfBirth ?? '');
  const hireDate     = computed(() => fullProfile.value?.hireDate ?? '');
  const status       = computed(() => fullProfile.value?.status ?? 'ĐANG_LÀM_VIỆC');
  const role         = computed(() => storedRole ?? 'employee');
  const deptId       = computed(() => fullProfile.value?.department?.departmentId ?? Number(storedDept) ?? null);
  const deptName     = computed(() => fullProfile.value?.department?.departmentName ?? '');
  const positionName = computed(() => fullProfile.value?.position?.positionName ?? '');
  const baseLeaveDays = computed(() => fullProfile.value?.baseLeaveDays ?? 12);

  const managerId = computed(() => fullProfile.value?.managerId);
  const managerProfile = computed(() => {
    const currentId = String(fullProfile.value?.employeeId);
    // 1. Ưu tiên managerId cụ thể từ profile
    if (managerId.value) {
      const sp = mockEmployees.find(e => String(e.employeeId) === String(managerId.value));
      if (sp) return sp;
    }
    // 2. Dự phòng: Tìm Trưởng phòng (MANAGER) của cùng phòng ban
    const myDeptId = fullProfile.value?.department?.departmentId || fullProfile.value?.departmentId;
    if (myDeptId) {
      const deptManager = mockEmployees.find(e => 
        String(e.role).toUpperCase() === 'MANAGER' && 
        (e.department?.departmentId === myDeptId || e.departmentId === myDeptId) &&
        String(e.employeeId) !== currentId
      );
      if (deptManager) return deptManager;
    }
    // 3. Nếu là Trưởng phòng hoặc không tìm thấy, báo cáo cho Ban Giám đốc (ADMIN)
    return mockEmployees.find(e => 
      String(e.role).toUpperCase() === 'ADMIN' && 
      String(e.employeeId) !== currentId
    );
  });
  const managerName = computed(() => managerProfile.value?.fullName || 'Chưa xác định');
  const managerAvatar = computed(() => {
    const mail = managerProfile.value?.companyEmail;
    return mail ? `https://i.pravatar.cc/150?u=${encodeURIComponent(mail)}` : 'https://i.pravatar.cc/150?u=none';
  });

  // Avatar: dùng pravatar dựa trên email để tự tạo ảnh khác nhau cho từng user
  const avatar = computed(() => {
    const mail = email.value;
    return `https://i.pravatar.cc/150?u=${encodeURIComponent(mail)}`;
  });

  // Ngày gia nhập dạng hiển thị dd/MM/yyyy
  const hireDateFormatted = computed(() => {
    if (!hireDate.value) return '';
    const d = new Date(hireDate.value);
    if (isNaN(d.getTime())) return hireDate.value;
    return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
  });

  // Ngày sinh dạng dd/MM/yyyy
  const dobFormatted = computed(() => {
    if (!dateOfBirth.value) return '';
    const d = new Date(dateOfBirth.value);
    if (isNaN(d.getTime())) return dateOfBirth.value;
    return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
  });

  // Thời gian gắn bó
  const tenure = computed(() => {
    if (!hireDate.value) return '';
    const start = new Date(hireDate.value);
    const now   = new Date();
    const months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    const years  = Math.floor(months / 12);
    const rem    = months % 12;
    if (years === 0) return `${rem} tháng`;
    if (rem === 0)   return `${years} năm`;
    return `${years} năm ${rem} tháng`;
  });

  return {
    fullProfile,
    employeeId,
    employeeCode,
    fullName,
    email,
    phone,
    gender,
    dateOfBirth,
    dobFormatted,
    hireDate,
    hireDateFormatted,
    status,
    role,
    deptId,
    deptName,
    positionName,
    baseLeaveDays,
    avatar,
    tenure,
    managerName,
    managerAvatar,
  };
}
