
export const kpiCards = [
  { id: 1, label: 'Tổng nhân sự', value: '1,250', icon: 'groups', iconClass: 'kpi-icon--blue', badge: '+12%', badgeIcon: 'trending_up', badgeClass: 'kpi-badge--up', footerType: 'sparkline', sparkline: [30, 45, 35, 50, 40, 60, 55], meta: 'So với tháng trước', route: '/admin/hr/quan-ly-nhan-su' },
  { id: 2, label: 'Chi phí lương', value: '4.8B', icon: 'payments', iconClass: 'kpi-icon--amber', badge: '+5.2%', badgeIcon: 'trending_up', badgeClass: 'kpi-badge--up', footerType: 'progress', progress: 75, progressClass: 'kpi-progress-fill--amber', meta: '75% ngân sách năm', route: '#' },
  { id: 3, label: 'Tỉ lệ nghỉ việc', value: '1.2%', icon: 'person_remove', iconClass: 'kpi-icon--rose', badge: '-0.5%', badgeIcon: 'trending_down', badgeClass: 'kpi-badge--up', footerType: 'sparkline', sparkline: [20, 15, 25, 10, 18, 12, 8], sparklineDanger: true, meta: 'Mục tiêu: < 2%', route: '#' },
  { id: 4, label: 'Tuyển dụng mới', value: '45', icon: 'person_add', iconClass: 'kpi-icon--green', badge: 'On Track', badgeIcon: 'check_circle', badgeClass: 'kpi-badge--up', footerType: 'progress', progress: 85, meta: '85% KPI tháng', route: '/admin/hr/tuyen-dung' }
];

export const barChartData = [
  { label: 'Tháng 8', current: 1100, target: 1050 },
  { label: 'Tháng 9', current: 1150, target: 1100 },
  { label: 'Tháng 10', current: 1180, target: 1150 },
  { label: 'Tháng 11', current: 1220, target: 1180 },
  { label: 'Tháng 12', current: 1240, target: 1220 },
  { label: 'Tháng 1', current: 1250, target: 1250, active: true }
];

export const barChartYLabels = ['1,500', '1,250', '1,000', '750', '500', '250', '0'];

export const donutData = [
  { label: 'IT & Engineering', pct: 45, color: '#3B82F6' },
  { label: 'Sales & Marketing', pct: 25, color: '#F59E0B' },
  { label: 'Operations', pct: 20, color: '#10B981' },
  { label: 'Others', pct: 10, color: '#6B7280' }
];

export const donutTotal = 1250;

export const pendingApprovals = [
  { id: 1, title: 'Đơn nghỉ phép: Nguyễn Văn An', meta: 'Nghỉ phép năm • 3 ngày • Khẩn cấp', icon: 'event_busy', iconClass: 'kpi-icon--blue', urgent: true, actions: ['Từ chối', 'Phê duyệt'] },
  { id: 2, title: 'Đề xuất tăng ca: Trần Thị Thu', meta: 'Dự án ERP • 4 giờ • Cần xử lý', icon: 'schedule', iconClass: 'kpi-icon--amber', urgent: false, actions: ['Từ chối', 'Phê duyệt'] },
  { id: 3, title: 'Yêu cầu tuyển dụng: Phòng IT', meta: 'Backend Dev • 2 vị trí', icon: 'person_add', iconClass: 'kpi-icon--green', urgent: false, actions: ['Từ chối', 'Phê duyệt'] }
];

export const urgentCount = 5;

export const timelineEvents = [
  { id: 1, time: '09:00 AM', title: 'Họp giao ban quý I', place: 'Phòng họp Lotus', placeIcon: 'meeting_room', active: true },
  { id: 2, time: '02:30 PM', title: 'Phỏng vấn Senior Dev', place: 'Phòng 402', placeIcon: 'video_chat', active: false },
  { id: 3, time: '04:00 PM', title: 'Ký duyệt bảng lương T1', place: 'Văn phòng CEO', placeIcon: 'edit_document', active: false }
];

export const reminderText = 'Cần kiểm tra lại báo cáo tài chính dự án ERP trước khi họp với đối tác vào sáng mai.';
