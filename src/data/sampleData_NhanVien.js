
export const employeeActivities = [
  { date: 'Thứ Tư, 25/10/2023', type: 'Check-in (Vào ca)', icon: 'login', color: 'success', time: '08:02:45 AM', status: 'Thành công' },
  { date: 'Thứ Ba, 24/10/2023', type: 'Check-out (Ra về)', icon: 'logout', color: 'brand', time: '17:35:10 PM', status: 'Thành công' },
  { date: 'Thứ Ba, 24/10/2023', type: 'Gửi đơn nghỉ phép', icon: 'event_note', color: 'warning', time: '14:20:05 PM', status: 'Đã duyệt' }
];

export const employeeNotifications = [
  { 
    id: 1, 
    type: 'success', 
    title: 'Đơn nghỉ phép đã duyệt', 
    desc: 'Đơn nghỉ phép ngày 28/10 của bạn đã được quản lý phê duyệt thành công.', 
    time: '10 phút trước',
    icon: 'verified'
  },
  { 
    id: 2, 
    type: 'info', 
    title: 'Đã có phiếu lương', 
    desc: 'Phiếu lương tháng 09/2023 đã sẵn sàng. Bạn có thể xem ngay bây giờ.', 
    time: '2 giờ trước',
    icon: 'payments'
  },
  { 
    id: 3, 
    type: 'warning', 
    title: 'Thông báo Công ty', 
    desc: 'Lịch nghỉ lễ Quốc khánh và các quy định trực Tết Dương lịch...', 
    time: 'Hôm qua',
    icon: 'campaign'
  }
];
