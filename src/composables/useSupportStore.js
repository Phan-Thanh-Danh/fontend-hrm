import { reactive, computed } from 'vue'

const AVATAR_COLORS = [
  'linear-gradient(135deg,#2563eb,#1d4ed8)',
  'linear-gradient(135deg,#16a34a,#15803d)',
  'linear-gradient(135deg,#dc2626,#b91c1c)',
  'linear-gradient(135deg,#ea580c,#c2410c)',
  'linear-gradient(135deg,#7c3aed,#6d28d9)',
  'linear-gradient(135deg,#0891b2,#0e7490)',
]

// Shared state for all tickets
const STORAGE_KEY = 'hrm_support_tickets'

const loadTickets = () => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch (e) {
      console.error('Lỗi đọc dữ liệu hỗ trợ:', e)
    }
  }
  return [
    {
      id: 'TK-00101',
      employeeName: 'Nguyễn Văn An',
      department: 'IT',
      category: 'Hỗ trợ IT & Thiết bị',
      title: 'Máy tính bị hỏng bàn phím',
      priority: 'Cao',
      status: 'Chờ xử lý',
      date: '19/03/2026',
      deadline: '20/03/2026',
      asset: 'PC-NV-042',
      description: 'Bàn phím máy tính của tôi không hoạt động từ sáng nay, không gõ được phím nào, đã thử khởi động lại nhưng không được.',
      avatarColor: AVATAR_COLORS[0],
    },
    {
      id: 'TK-00098',
      employeeName: 'Trần Thị Thu',
      department: 'Kế toán',
      category: 'Phần mềm & Tài khoản',
      title: 'Quên mật khẩu phần mềm kế toán',
      priority: 'Trung bình',
      status: 'Đang xử lý',
      date: '18/03/2026',
      deadline: '',
      asset: 'MISA SME',
      description: 'Tôi bị quên mật khẩu đăng nhập MISA sau kỳ nghỉ lễ. Cần được reset lại để tiếp tục công việc.',
      avatarColor: AVATAR_COLORS[1],
    },
    {
      id: 'TK-00087',
      employeeName: 'Hoàng Thị My',
      department: 'Nhân sự',
      category: 'Nhân sự & Phúc lợi',
      title: 'Hỏi về chính sách thưởng tháng 3',
      priority: 'Thấp',
      status: 'Từ chối',
      date: '16/03/2026',
      deadline: '',
      asset: '',
      description: 'Tôi muốn hỏi về chính sách thưởng hiệu suất quý 1 năm 2026 và cách tính mức thưởng.',
      note: 'Vui lòng liên hệ trực tiếp phòng Nhân sự hoặc xem tài liệu nội quy công ty mục 4.3.',
      avatarColor: AVATAR_COLORS[4],
    }
  ]
}

const state = reactive({
  tickets: loadTickets()
})

const saveTickets = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tickets))
}

export function useSupportStore() {
  const addTicket = (ticketData) => {
    const id = `TK-${Date.now().toString().slice(-5)}`
    const newTicket = {
      id,
      employeeName: 'Lê Quản Trị Staff', // Mocking current user
      department: 'Vận hành',
      avatarColor: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
      status: 'Chờ xử lý',
      date: new Date().toLocaleDateString('vi-VN'),
      ...ticketData
    }
    state.tickets.unshift(newTicket)
    saveTickets()
    return id
  }

  const updateStatus = (ticketId, newStatus, note = '') => {
    const ticket = state.tickets.find(t => t.id === ticketId)
    if (ticket) {
      ticket.status = newStatus
      if (note) ticket.note = note
      saveTickets()
    }
  }

  const tickets = computed(() => state.tickets)

  return {
    tickets,
    addTicket,
    updateStatus
  }
}
