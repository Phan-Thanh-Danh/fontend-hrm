
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

export const bangLuongKpiCards = [
  { id: 1, label: 'TỔNG QUỸ LƯƠNG', value: '4.8 Tỷ', icon: 'payments', iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600', badgeTrend: 'up', badgeText: '+5.2%' },
  { id: 2, label: 'LƯƠNG CƠ BẢN', value: '3.2 Tỷ', icon: 'account_balance_wallet', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', badgeTrend: 'up', badgeText: '+2.1%' },
  { id: 3, label: 'THƯỞNG & PHỤ CẤP', value: '1.6 Tỷ', icon: 'money', iconBg: 'bg-amber-50', iconColor: 'text-amber-600', badgeTrend: 'up', badgeText: '+12.5%' },
  { id: 4, label: 'LƯƠNG TRUNG BÌNH', value: '18 Triệu', icon: 'insights', iconBg: 'bg-rose-50', iconColor: 'text-rose-600', badgeTrend: 'down', badgeText: '-1.2%' }
];
export const bangLuongBoPhans = [
  { tenPhong: 'Kỹ thuật', soNhanVien: 120, luongCoBan: '2.1 Tỷ', thuongPhuCap: '0.8 Tỷ', tongChiPhi: '2.9 Tỷ', phanTram: 80 },
  { tenPhong: 'Kinh doanh', soNhanVien: 80, luongCoBan: '1.2 Tỷ', thuongPhuCap: '0.6 Tỷ', tongChiPhi: '1.8 Tỷ', phanTram: 50 },
  { tenPhong: 'Marketing', soNhanVien: 40, luongCoBan: '0.6 Tỷ', thuongPhuCap: '0.2 Tỷ', tongChiPhi: '0.8 Tỷ', phanTram: 30 },
  { tenPhong: 'Vận hành', soNhanVien: 60, luongCoBan: '0.8 Tỷ', thuongPhuCap: '0.1 Tỷ', tongChiPhi: '0.9 Tỷ', phanTram: 20 },
  { tenPhong: 'Nhân sự', soNhanVien: 20, luongCoBan: '0.3 Tỷ', thuongPhuCap: '0.1 Tỷ', tongChiPhi: '0.4 Tỷ', phanTram: 10 }
];
export const bangLuongTongCong = { soNhanVien: 320, luongCoBan: '5.0 Tỷ', thuongPhuCap: '1.8 Tỷ', tongChiPhi: '6.8 Tỷ' };
export const bangLuongLineChart = [
  { month: 'Tháng 5', val: 4.2 },
  { month: 'Tháng 6', val: 4.3 },
  { month: 'Tháng 7', val: 4.1 },
  { month: 'Tháng 8', val: 4.5 },
  { month: 'Tháng 9', val: 4.6 },
  { month: 'Tháng 10', val: 4.8 }
];
export const bangLuongLineChartMax = 6.0;

export const nhanSuKpiCards = [
  { id: 1, label: 'TỔNG NHÂN SỰ', value: '1,250', note: 'So với tháng trước', icon: 'groups', iconBg: 'bg-blue-50', iconColor: 'text-blue-600', badge: '+12%', badgeClass: 'bg-emerald-50 text-emerald-600 border border-emerald-100' },
  { id: 2, label: 'TUYỂN MỚI THÁNG', value: '45', note: 'Mục tiêu: 50', icon: 'person_add', iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600', badge: '90%', badgeClass: 'bg-amber-50 text-amber-600 border border-amber-100' },
  { id: 3, label: 'TỶ LỆ NGHỈ VIỆC', value: '1.2%', note: 'Thấp hơn ngành (2.5%)', icon: 'person_remove', iconBg: 'bg-rose-50', iconColor: 'text-rose-600', badge: '-0.5%', badgeClass: 'bg-emerald-50 text-emerald-600 border border-emerald-100' },
  { id: 4, label: 'ĐÁNH GIÁ TỐT', value: '94%', note: 'Chu kỳ Q1/2024', icon: 'star', iconBg: 'bg-amber-50', iconColor: 'text-amber-600', badge: '+2%', badgeClass: 'bg-blue-50 text-blue-600 border border-blue-100' }
];

export const nhanSuCapBac = [
  { rank: 'Intern', value: 125, pct: 10, colorCls: 'from-blue-600 to-blue-400' },
  { rank: 'Junior', value: 450, pct: 36, colorCls: 'from-indigo-500 to-indigo-400' },
  { rank: 'Senior', value: 380, pct: 30, colorCls: 'from-blue-500 to-blue-400' },
  { rank: 'Manager', value: 220, pct: 18, colorCls: 'from-cyan-500 to-cyan-400' },
  { rank: 'Director', value: 75, pct: 6, colorCls: 'from-slate-400 to-slate-300' }
];
export const nhanSuCapBacMax = 500;

export const bienDongNhanSuChart = [
  { month: 'Th.1', tuyenVao: 80, nghiViec: 30 },
  { month: 'Th.2', tuyenVao: 60, nghiViec: 50 },
  { month: 'Th.3', tuyenVao: 102, nghiViec: 45 },
  { month: 'Th.4', tuyenVao: 70, nghiViec: 60 },
  { month: 'Th.5', tuyenVao: 40, nghiViec: 40 },
  { month: 'Th.6', tuyenVao: 55, nghiViec: 35 }
];
export const bienDongNhanSuChartMax = 120;

export const topPerformers = [
  { id: 1, name: 'Nguyễn Văn An', email: 'an.nguyen@hrm.com', avatar: 'https://i.pravatar.cc/150?u=1', chucVu: 'Senior Developer', hieuSuat: 98, trangThai: 'XUẤT SẮC', trangThaiClass: 'bg-emerald-50 text-emerald-600' },
  { id: 2, name: 'Trần Thị Tâm', email: 'tam.tran@hrm.com', avatar: 'https://i.pravatar.cc/150?u=2', chucVu: 'Marketing Manager', hieuSuat: 95, trangThai: 'XUẤT SẮC', trangThaiClass: 'bg-emerald-50 text-emerald-600' },
  { id: 3, name: 'Lê Hoàng Hải', email: 'hai.le@hrm.com', avatar: 'https://i.pravatar.cc/150?u=3', chucVu: 'Sales Executive', hieuSuat: 92, trangThai: 'ĐẠT', trangThaiClass: 'bg-blue-50 text-blue-600' }
];

export const deptRankings = [
  { name: 'Phòng Kỹ Thuật', score: 94, note: '+2% so với Q4', trend: 'up' },
  { name: 'Phòng Kinh Doanh', score: 88, note: '-1% so với Q4', trend: 'down' },
  { name: 'Phòng Marketing', score: 85, note: 'Giữ nguyên', trend: 'flat' },
  { name: 'Phòng Vận Hành', score: 82, note: '+5% so với Q4', trend: 'up' }
];

export const bienDongKpiCards = [
  { id: 1, label: 'TỶ LỆ NGHỈ VIỆC', value: '1.2', suffix: '%', suffixCls: 'text-2xl', icon: 'heart_broken', iconBg: 'bg-rose-50', iconColor: 'text-rose-500', badge: { icon: 'trending_down', text: '0.4%', cls: 'border-emerald-100 text-emerald-600 bg-emerald-50' }, note: 'Trung bình ngành: 2.5%' },
  { id: 2, label: 'TỔNG NGHỈ VIỆC', value: '15', suffix: 'NS', suffixCls: 'text-lg text-slate-400 font-bold', icon: 'person_remove', iconBg: 'bg-amber-50', iconColor: 'text-amber-500', badge: { icon: 'remove', text: 'Không đổi', cls: 'border-slate-100 text-slate-500 bg-slate-50' }, note: 'Tháng hiện tại' },
  { id: 3, label: 'TỶ LỆ GIỮ CHÂN', value: '96.5', suffix: '%', suffixCls: 'text-2xl', icon: 'handshake', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-500', badge: { icon: 'trending_up', text: '1.2%', cls: 'border-emerald-100 text-emerald-600 bg-emerald-50' }, note: 'Mục tiêu: > 95%' },
  { id: 4, label: 'THỜI GIAN GẮN BÓ', value: '3.2', suffix: 'Năm', suffixCls: 'text-lg text-slate-400 font-bold', icon: 'timelapse', iconBg: 'bg-blue-50', iconColor: 'text-blue-500', badge: { icon: 'trending_up', text: '0.1 Năm', cls: 'border-emerald-100 text-emerald-600 bg-emerald-50' }, note: 'Trung bình mỗi nhân sự' }
];

export const bienDongLineChart = [
  { month: 'Tháng 1', val: 2.1 },
  { month: 'Tháng 2', val: 1.8 },
  { month: 'Tháng 3', val: 2.4 },
  { month: 'Tháng 4', val: 1.5 },
  { month: 'Tháng 5', val: 1.2 }
];
export const bienDongLineChartMax = 4.5;

export const bienDongDonut = [
  { label: 'Dưới 1 năm', pct: 45, color: '#F87171' },
  { label: 'Từ 1 - 3 năm', pct: 35, color: '#FBBF24' },
  { label: 'Trên 3 năm', pct: 20, color: '#34D399' }
];

export const nghiViecBoPhan = [
  { tenPhong: 'Phòng Kỹ thuật', soNhanSu: 150, soNghiViec: 3, tyLe: 2.0, alert: false },
  { tenPhong: 'Phòng Kinh doanh', soNhanSu: 120, soNghiViec: 8, tyLe: 6.7, alert: true },
  { tenPhong: 'Phòng Marketing', soNhanSu: 40, soNghiViec: 1, tyLe: 2.5, alert: false },
  { tenPhong: 'Phòng Nhân sự', soNhanSu: 25, soNghiViec: 0, tyLe: 0.0, alert: false }
];

export const danhSachNghiViec = [
  { id: 1, initials: 'NA', name: 'Nguyễn Văn A', chucVu: 'Nhân viên Kinh doanh', phongBan: 'Phòng Kinh doanh', ngayNghi: '15/05/2024', lyDo: 'Chuyển hướng nghề nghiệp', hinhThuc: 'Tự nguyện', hinhThucCls: 'text-amber-600 bg-amber-50 border-amber-100' },
  { id: 2, initials: 'TB', name: 'Trần Thị B', chucVu: 'Thiết kế Đồ họa', phongBan: 'Phòng Marketing', ngayNghi: '10/05/2024', lyDo: 'Lý do cá nhân', hinhThuc: 'Tự nguyện', hinhThucCls: 'text-amber-600 bg-amber-50 border-amber-100' },
  { id: 3, initials: 'LC', name: 'Lê Văn C', chucVu: 'Lập trình viên', phongBan: 'Phòng Kỹ thuật', ngayNghi: '05/05/2024', lyDo: 'Hết hạn hợp đồng', hinhThuc: 'Bắt buộc', hinhThucCls: 'text-rose-600 bg-rose-50 border-rose-100' }
];

export const chuyenCanCards = [
  { id: 'ty-le', label: 'TỶ LỆ CHUYÊN CẦN', value: '98.5%', icon: 'fact_check', iconBg: 'var(--sys-success-bg)', iconColor: 'var(--sys-success-text)', badgeTrend: 'up', badge: '0.5%', badgeGood: true, progress: 98.5 },
  { id: 'di-muon', label: 'TRUNG BÌNH ĐI MUỘN', value: '12', valueSub: 'Phút', icon: 'schedule', iconBg: 'var(--sys-warning-bg)', iconColor: 'var(--sys-warning-text)', badgeTrend: 'down', badge: '3 phút', badgeGood: true, note: 'Số phút đi muộn trung bình/người/tháng' },
  { id: 'nghi-phep', label: 'TỔNG SỐ NGÀY NGHỈ', value: '45', valueSub: 'Ngày', icon: 'event_busy', iconBg: 'var(--sys-brand-solid-container)', iconColor: 'var(--sys-brand-solid)', badgeTrend: 'up', badge: '10%', badgeGood: false, note: 'Bao gồm nghỉ có phép và không phép' }
];

export const depts = [
  { name: 'Kỹ Thuật', val: 99.2 },
  { name: 'Nhân Sự', val: 98.5 },
  { name: 'Kinh Doanh', val: 95.4 },
  { name: 'Marketing', val: 92.1 }
];

export const topUsers = [
  { name: 'Nguyễn Văn A', dept: 'Phòng Kỹ Thuật', val: '100%', subval: 'KHÔNG ĐI MUỘN', avatar: 'https://i.pravatar.cc/150?u=a' },
  { name: 'Trần Thị B', dept: 'Phòng Nhân Sự', val: '99.8%', subval: '1 PHÚT ĐI MUỘN', avatar: 'https://i.pravatar.cc/150?u=b' },
  { name: 'Lê Văn C', dept: 'Phòng Kinh Doanh', val: '99.5%', subval: '5 PHÚT ĐI MUỘN', avatar: 'https://i.pravatar.cc/150?u=c' }
];

export const badUsers = [
  { name: 'Hoàng Thị D', dept: 'Phòng Marketing', val: '80.5%', subval: '15 LẦN ĐI MUỘN', avatar: 'https://i.pravatar.cc/150?u=d' },
  { name: 'Phạm Văn E', dept: 'Phòng Kinh Doanh', val: '85.2%', subval: '8 LẦN ĐI MUỘN', avatar: 'https://i.pravatar.cc/150?u=e' }
];

export const chuyenCanLineChart = [
  { month: 'Tháng 1', val: 130 },
  { month: 'Tháng 2', val: 110 },
  { month: 'Tháng 3', val: 110 },
  { month: 'Tháng 4', val: 140 },
  { month: 'Tháng 5', val: 30 },
  { month: 'Tháng 6', val: 80 }
];
export const chuyenCanLineChartMax = 150;
