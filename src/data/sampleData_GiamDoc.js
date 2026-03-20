
export const kpiCards = [
  { id: 1, label: 'Tổng nhân sự', value: '1,250', icon: 'groups', iconClass: 'kpi-icon--blue', badge: '+12%', badgeIcon: 'trending_up', badgeClass: 'kpi-badge--up', footerType: 'sparkline', sparkline: [30, 45, 35, 50, 40, 60, 55], meta: 'So với tháng trước', route: '/giam-doc/nhan-su' },
  { id: 2, label: 'Chi phí lương', value: '4.8B', icon: 'payments', iconClass: 'kpi-icon--amber', badge: '+5.2%', badgeIcon: 'trending_up', badgeClass: 'kpi-badge--up', footerType: 'progress', progress: 75, progressClass: 'kpi-progress-fill--amber', meta: '75% ngân sách năm', route: '/giam-doc/bang-luong' },
  { id: 3, label: 'Tỉ lệ nghỉ việc', value: '1.2%', icon: 'person_remove', iconClass: 'kpi-icon--rose', badge: '-0.5%', badgeIcon: 'trending_down', badgeClass: 'kpi-badge--up', footerType: 'sparkline', sparkline: [20, 15, 25, 10, 18, 12, 8], sparklineDanger: true, meta: 'Mục tiêu: < 2%', route: '/giam-doc/bien-dong' },
  { id: 4, label: 'Chuyên cần', value: '98.5%', icon: 'timelapse', iconClass: 'kpi-icon--green', badge: 'Tốt', badgeIcon: 'check_circle', badgeClass: 'kpi-badge--up', footerType: 'progress', progress: 98, meta: 'Vs trung bình tháng trước', route: '/giam-doc/chuyen-can' }
];

export const barChartData = [
  { label: 'Tháng 8', current: 650, target: 800 },
  { label: 'Tháng 9', current: 780, target: 850 },
  { label: 'Tháng 10', current: 920, target: 950 },
  { label: 'Tháng 11', current: 1080, target: 1100 },
  { label: 'Tháng 12', current: 1150, target: 1200 },
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

// ══════════════════════════════════════════
// Dữ liệu mock cho DBGD_NhanSu.vue
// ══════════════════════════════════════════
export const nhanSuKpiCards = [
  { id: 1, label: 'Tổng nhân sự', value: '1,250', icon: 'groups', iconBg: 'bg-blue-100', iconColor: 'text-blue-600', badgeClass: 'bg-blue-50 text-blue-600', badge: '+12%', note: 'So với tháng trước' },
  { id: 2, label: 'Tỉ lệ nghỉ việc', value: '3.5%', icon: 'person_remove', iconBg: 'bg-red-100', iconColor: 'text-red-600', badgeClass: 'bg-red-50 text-red-600', badge: '+0.5%', note: 'So với tháng trước' },
  { id: 3, label: 'Hiệu suất TB', value: '92%', icon: 'trending_up', iconBg: 'bg-green-100', iconColor: 'text-green-600', badgeClass: 'bg-green-50 text-green-600', badge: '+2%', note: 'Vượt mục tiêu' },
  { id: 4, label: 'Chi phí nhân sự', value: '4.2T', icon: 'payments', iconBg: 'bg-orange-100', iconColor: 'text-orange-600', badgeClass: 'bg-orange-50 text-orange-600', badge: '-1.2%', note: 'Kiểm soát tốt' }
];

export const topPerformers = [
  { id: 1, name: 'Nguyễn Văn A', email: 'nva@hrm.com', avatar: 'https://i.pravatar.cc/150?u=1', chucVu: 'Trưởng phòng IT', hieuSuat: 95, trangThai: 'Xuất sắc', trangThaiClass: 'bg-green-100 text-green-700' },
  { id: 2, name: 'Trần Thị B', email: 'ttb@hrm.com', avatar: 'https://i.pravatar.cc/150?u=2', chucVu: 'Chuyên viên Marketing', hieuSuat: 92, trangThai: 'Tốt', trangThaiClass: 'bg-blue-100 text-blue-700' },
  { id: 3, name: 'Lê Văn C', email: 'lvc@hrm.com', avatar: 'https://i.pravatar.cc/150?u=3', chucVu: 'Nhân viên Sales', hieuSuat: 88, trangThai: 'Đạt', trangThaiClass: 'bg-yellow-100 text-yellow-700' }
];

export const deptRankings = [
  { name: 'Phòng IT', score: 20, note: 'Vượt chỉ tiêu', trend: 'up' },
  { name: 'Phòng Marketing', score: 92, note: 'Đạt chỉ tiêu', trend: 'up' },
  { name: 'Phòng Sales', score: 85, note: 'Cần cải thiện', trend: 'down' }
];

// ══════════════════════════════════════════
// Dữ liệu mock cho DBGD_BangLuong.vue
// ══════════════════════════════════════════
export const bangLuongKpiCards = [
  { id: 1, label: 'Tổng ngân sách', value: '5.2 Tỷ', icon: 'account_balance', iconBg: 'bg-blue-100', iconColor: 'text-blue-600', badgeTrend: 'up', badgeText: '2.5%' },
  { id: 2, label: 'Đã chi', value: '4.8 Tỷ', icon: 'payments', iconBg: 'bg-green-100', iconColor: 'text-green-600', badgeTrend: 'up', badgeText: '1.2%' },
  { id: 3, label: 'Tiết kiệm', value: '400 Tr', icon: 'savings', iconBg: 'bg-yellow-100', iconColor: 'text-yellow-600', badgeTrend: 'down', badgeText: '0.5%' },
  { id: 4, label: 'Thưởng & Phụ cấp', value: '850 Tr', icon: 'card_giftcard', iconBg: 'bg-purple-100', iconColor: 'text-purple-600', badgeTrend: 'up', badgeText: '15%' }
];

export const bangLuongBoPhans = [
  { tenPhong: 'Phòng IT', soNhanVien: 45, luongCoBan: '1.2 Tỷ', thuongPhuCap: '250 Tr', tongChiPhi: '1.45 Tỷ' },
  { tenPhong: 'Phòng Kinh Doanh', soNhanVien: 120, luongCoBan: '2.5 Tỷ', thuongPhuCap: '500 Tr', tongChiPhi: '3.0 Tỷ' },
  { tenPhong: 'Phòng Marketing', soNhanVien: 30, luongCoBan: '800 Tr', thuongPhuCap: '100 Tr', tongChiPhi: '900 Tr' }
];

export const bangLuongTongCong = {
  soNhanVien: 195, luongCoBan: '4.5 Tỷ', thuongPhuCap: '850 Tr', tongChiPhi: '5.35 Tỷ'
};

export const bangLuongLineChart = [
  { month: 'T1', val: 4.2 },
  { month: 'T2', val: 4.5 },
  { month: 'T3', val: 1.1 },
  { month: 'T4', val: 4.8 },
  { month: 'T5', val: 5.0 },
  { month: 'T6', val: 4.7 }
];

export const bangLuongLineChartMax = 6.0;

// ══════════════════════════════════════════
// Dữ liệu mock cho DBGD_ChuyenCan.vue
// ══════════════════════════════════════════
export const chuyenCanCards = [
  { id: 'ty-le', label: 'Tỷ lệ chuyên cần', icon: 'timelapse', iconBg: 'var(--sys-brand-solid-lch-90)', iconColor: 'var(--sys-brand-solid)', value: '98.5%', badgeGood: true, badgeTrend: 'up', badge: '1.2%', progress: 98.5 },
  { id: 'di-tre', label: 'Đi trễ / Về sớm', icon: 'schedule', iconBg: 'var(--sys-warning-light)', iconColor: 'var(--sys-warning)', value: '124', valueSub: 'lần', badgeGood: false, badgeTrend: 'up', badge: '5%', note: 'Vs trung bình tháng trước' },
  { id: 'nghi-phep', label: 'Nghỉ phép', icon: 'event_busy', iconBg: 'var(--sys-danger-light)', iconColor: 'var(--sys-danger)', value: '45', valueSub: 'ngày', badgeGood: true, badgeTrend: 'down', badge: '10%', note: 'Tương đương 1.5 người/ngày' }
];

export const depts = [
  { name: 'Phòng Kỹ thuật', val: 99.2 },
  { name: 'Phòng Kinh doanh', val: 96.5 },
  { name: 'Phòng Marketing', val: 98.1 },
  { name: 'Phòng Hành chính', val: 97.8 }
];

export const topUsers = [
  { name: 'Lê Thị Hoa', dept: 'Phòng Kỹ thuật', avatar: 'https://i.pravatar.cc/150?u=4', val: '100%', subval: 'Chuyên cần' },
  { name: 'Nguyễn Văn Minh', dept: 'Phòng Kinh doanh', avatar: 'https://i.pravatar.cc/150?u=5', val: '100%', subval: 'Chuyên cần' }
];

export const badUsers = [
  { name: 'Phạm Văn Tuấn', dept: 'Phòng Marketing', avatar: 'https://i.pravatar.cc/150?u=6', val: '12', subval: 'Lần đi trễ' },
  { name: 'Đỗ Thị Lan', dept: 'Phòng Hành chính', avatar: 'https://i.pravatar.cc/150?u=7', val: '8', subval: 'Lần đi trễ' }
];

// ══════════════════════════════════════════
// Dữ liệu mock cho DBGD_BienDong.vue
// ══════════════════════════════════════════
export const bienDongKpiCards = [
  {
    id: 1, label: 'Tổng nghỉ việc', value: '45', suffix: 'nhân sự', suffixCls: 'text-lg text-slate-500 font-bold',
    icon: 'group_remove', iconBg: 'bg-red-50', iconColor: 'text-red-500',
    badge: { icon: 'trending_up', text: '+5%', cls: 'bg-red-50 text-red-600 border-red-100' },
    note: 'So với cùng kỳ năm trước'
  },
  {
    id: 2, label: 'Tỷ lệ biến động', value: '3.6', suffix: '%', suffixCls: 'text-lg text-slate-500 font-bold',
    icon: 'show_chart', iconBg: 'bg-orange-50', iconColor: 'text-orange-500',
    badge: { icon: 'warning', text: 'Cao', cls: 'bg-orange-50 text-orange-600 border-orange-100' },
    note: 'Vượt mục tiêu 0.6%'
  },
  {
    id: 3, label: 'Chi phí thay thế', value: '1.2', suffix: 'Tỷ', suffixCls: 'text-lg text-slate-500 font-bold',
    icon: 'currency_exchange', iconBg: 'bg-blue-50', iconColor: 'text-blue-500',
    badge: null,
    note: 'Ước tính phí tuyển dụng & đào tạo'
  },
  {
    id: 4, label: 'Tỷ lệ giữ chân', value: '96.4', suffix: '%', suffixCls: 'text-lg text-slate-500 font-bold',
    icon: 'loyalty', iconBg: 'bg-green-50', iconColor: 'text-green-500',
    badge: { icon: 'task_alt', text: 'Tốt', cls: 'bg-green-50 text-green-600 border-green-100' },
    note: 'Nhân sự thâm niên > 1 năm'
  }
];

export const nghiViecBoPhan = [
  { tenPhong: 'Kinh doanh', soNhanSu: 120, soNghiViec: 12, tyLe: 10, alert: true },
  { tenPhong: 'Công nghệ IT', soNhanSu: 85, soNghiViec: 3, tyLe: 3.5, alert: false },
  { tenPhong: 'Marketing', soNhanSu: 40, soNghiViec: 2, tyLe: 5, alert: false },
  { tenPhong: 'CSKH', soNhanSu: 60, soNghiViec: 8, tyLe: 13.3, alert: true }
];

export const danhSachNghiViec = [
  { id: 1, initials: 'NV', name: 'Nguyễn Văn A', chucVu: 'Chuyên viên Sales', phongBan: 'Kinh doanh', ngayNghi: '15/05/2024', lyDo: 'Chuyển định hướng', hinhThucCls: 'bg-orange-50 text-orange-600 border-orange-100', hinhThuc: 'Tự nguyện' },
  { id: 2, initials: 'TH', name: 'Trần Huyền', chucVu: 'Developer', phongBan: 'Công nghệ IT', ngayNghi: '10/05/2024', lyDo: 'Công ty xa nhà', hinhThucCls: 'bg-blue-50 text-blue-600 border-blue-100', hinhThuc: 'Tự nguyện' },
  { id: 3, initials: 'ML', name: 'Mai Linh', chucVu: 'Nhân viên CSKH', phongBan: 'CSKH', ngayNghi: '05/05/2024', lyDo: 'Không đạt KPI', hinhThucCls: 'bg-red-50 text-red-600 border-red-100', hinhThuc: 'Sa thải' }
];

export const bienDongLineChart = [
  { month: 'Tháng 1', val: 2.5 },
  { month: 'Tháng 2', val: 3.0 },
  { month: 'Tháng 3', val: 2.8 },
  { month: 'Tháng 4', val: 3.5 },
  { month: 'Tháng 5', val: 4.0 },
  { month: 'Tháng 6', val: 3.6 }
];

export const bienDongLineChartMax = 5.0;

export const bienDongDonut = [
  { label: 'Dưới 1 năm', pct: 45, color: '#FB7185' },
  { label: '1 - 3 năm', pct: 35, color: '#FCD34D' },
  { label: 'Trên 3 năm', pct: 20, color: '#34D399' }
];

export const nhanSuCapBac = [
  { level: 'Intern', count: 125, color: 'from-blue-600 to-blue-400', shadow: 'shadow-blue-500/30' },
  { level: 'Junior', count: 100, color: 'from-indigo-500 to-indigo-400', shadow: 'shadow-indigo-500/30' },
  { level: 'Senior', count: 380, color: 'from-blue-500 to-blue-400', shadow: 'shadow-blue-500/30' },
  { level: 'Manager', count: 220, color: 'from-cyan-500 to-cyan-400', shadow: 'shadow-cyan-500/30' },
  { level: 'Director', count: 75, color: 'from-slate-400 to-slate-300', shadow: 'shadow-slate-400/30' }
];

export const bangLuongPhongBanChart = [
  { name: 'Kỹ thuật', percent: 80 },
  { name: 'Kinh doanh', percent: 50 },
  { name: 'Marketing', percent: 30 },
  { name: 'Vận hành', percent: 20 },
  { name: 'Nhân sự', percent: 10 }
];

export const chuyenCanLineChart = [98.5, 98.2, 98.6, 99.0, 98.8, 98.5];

export const bienDongNhanLucData = [
  { month: 'Th.1', tuyenVao: 25, nghiViec: 10 },
  { month: 'Th.2', tuyenVao: 55, nghiViec: 25 },
  { month: 'Th.3', tuyenVao: 150, nghiViec: 45 },
  { month: 'Th.4', tuyenVao: 110, nghiViec: 65 },
  { month: 'Th.5', tuyenVao: 95, nghiViec: 70 },
  { month: 'Th.6', tuyenVao: 115, nghiViec: 55 }
];
