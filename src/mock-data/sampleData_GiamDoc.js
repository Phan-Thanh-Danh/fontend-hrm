// Dữ liệu mẫu tĩnh cho màn hình Giám Đốc (Notifications, Timeline, Reminders)

export const importantNotifications = [
    {
      id: "n1",
      level: "canh_bao",
      levelLabel: "CẢNH BÁO",
      levelColor: "text-red-700",
      levelBg: "bg-red-50",
      dotColor: "bg-red-500",
      title: "Cảnh báo quỹ lương vượt giới hạn",
      desc: "Phòng Kinh doanh đã vượt 15% quỹ lương dự kiến tháng này.",
      action: "Xem chi tiết",
      actionRoute: "/giamdoc/bangluong",
      time: "10 phút trước"
    },
    {
      id: "n2",
      level: "thong_tin",
      levelLabel: "THÔNG BÁO",
      levelColor: "text-blue-700",
      levelBg: "bg-blue-50",
      dotColor: "bg-blue-500",
      title: "Hoàn thành đánh giá quý I",
      desc: "Hệ thống đã tự động xuất báo cáo đánh giá KPI toàn công ty.",
      action: "Tải báo cáo",
      actionRoute: "/giamdoc/",
      time: "1 giờ trước"
    },
    {
      id: "n3",
      level: "tich_cuc",
      levelLabel: "TIN TỐT",
      levelColor: "text-green-700",
      levelBg: "bg-green-50",
      dotColor: "bg-green-500",
      title: "Tuyển dụng thành công Giám đốc Marketing",
      desc: "Ứng viên Nguyễn Văn A đã xác nhận offer letter.",
      action: "",
      actionRoute: "",
      time: "2 giờ trước"
    }
  ];
  
  export const timelineEvents = [
    {
      id: 1,
      time: '09:00 Hôm nay',
      title: 'Họp chiến lược nhân sự quý III',
      place: 'Phòng họp Boardroom A',
      placeIcon: 'meeting_room',
      active: true
    },
    {
      id: 2,
      time: '14:30 Chiều nay',
      title: 'Phỏng vấn ứng viên Giám đốc Marketing',
      place: 'Phòng họp 2',
      placeIcon: 'person_search',
      active: false
    },
    {
      id: 3,
      time: '16:00 Ngày mai',
      title: 'Duyệt quỹ thưởng 6 tháng đầu năm',
      place: 'Hệ thống HRM',
      placeIcon: 'payments',
      active: false
    }
  ];
  
  export const reminderText = "Anh nhớ xử lý gấp 5 đơn xin nghỉ thai sản tồn đọng tuần trước để giải phóng quỹ bảo hiểm phúc lợi.";
  
