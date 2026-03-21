
export const adminTimeRangeOptions = [
  { label: '06 tháng gần nhất', value: '6months' },
  { label: '01 năm tài chính', value: '1year' },
  { label: 'Toàn bộ lịch sử', value: 'all' }
];

export const adminStats = [
  { label: 'Tổng nhân viên', value: '1,250', change: '+2.4%', icon: 'groups', color: 'brand' },
  { label: 'Nhân sự mới', value: '45', change: 'Tháng này', icon: 'person_add', color: 'success' },
  { label: 'Nghỉ việc', value: '12', change: '-12%', icon: 'person_remove', color: 'danger' },
  { label: 'Chờ phê duyệt', value: '28', change: 'Khẩn cấp', icon: 'assignment_late', color: 'warning' }
];

export const adminDepartmentData = [
  { name: 'Kỹ thuật Cloud', count: 750, percent: 60, color: 'bg-[var(--sys-brand-solid)]' },
  { name: 'Khối Kinh doanh', count: 562, percent: 45, color: 'bg-[var(--sys-success-solid)]' },
  { name: 'Marketing & PR', count: 312, percent: 25, color: 'bg-[var(--sys-warning-solid)]' },
  { name: 'Quản trị Nhân sự', count: 187, percent: 15, color: 'bg-indigo-600' },
  { name: 'Tài chính - Kế toán', count: 250, percent: 20, color: 'bg-slate-600' }
];

export const adminTaskItems = [
  { name: 'Trần Lan Anh', role: 'UI/UX Lead', action: 'Phỏng vấn cấp Chuyên gia (V2)', time: 'Hôm nay, 14:00', status: 'Sắp diễn ra', statusClass: 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)]', dotClass: 'bg-[var(--sys-warning-solid)]' },
  { name: 'Quang Huy', role: 'DevOps Engineer', action: 'Nghỉ phép năm (03 ngày)', time: '2 giờ trước', status: 'Chờ thẩm định', statusClass: 'bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border-[var(--sys-brand-border)]', dotClass: 'bg-[var(--sys-brand-solid)]' },
  { name: 'Nguyễn Bích Diệp', role: 'CFO', action: 'Phê duyệt Quyết toán Q4', time: 'Mai, 09:00', status: 'Cần xử lý', statusClass: 'bg-blue-50 text-blue-600 border-blue-100', dotClass: 'bg-blue-600' }
];
