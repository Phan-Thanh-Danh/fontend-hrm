import { reactive, computed } from 'vue'

const AVATAR_COLORS = [
  'linear-gradient(135deg,#2563eb,#1d4ed8)',
  'linear-gradient(135deg,#16a34a,#15803d)',
  'linear-gradient(135deg,#dc2626,#b91c1c)',
  'linear-gradient(135deg,#ea580c,#c2410c)',
  'linear-gradient(135deg,#7c3aed,#6d28d9)',
  'linear-gradient(135deg,#0891b2,#0e7490)',
]

const state = reactive({
  tickets: []
})

const API_URL = 'http://localhost:3000/supportRequests'
const EMP_API_URL = 'http://localhost:3000/employees'

export function useSupportStore() {
  const fetchTickets = async () => {
    try {
      const [reqRes, empRes] = await Promise.all([
        fetch(API_URL),
        fetch(EMP_API_URL)
      ])
      const reqs = await reqRes.json()
      const emps = await empRes.json()

      state.tickets = reqs.map(req => {
        const emp = emps.find(e => e.id === req.employeeId)
        return {
          id: req.id.toString(),
          employeeName: emp ? emp.name : 'Unknown',
          department: emp ? emp.position.split(' / ')[0] : 'N/A',
          category: req.type || 'Khác',
          title: req.title,
          priority: req.priority || 'Trung bình',
          status: req.status === 'resolved' ? 'Hoàn thành' : (req.status === 'pending' ? 'Chờ xử lý' : (req.status === 'rejected' ? 'Từ chối' : 'Đang xử lý')),
          date: req.date || new Date().toLocaleDateString('vi-VN'),
          deadline: req.deadline || '',
          asset: req.asset || '',
          description: req.desc || '',
          avatarColor: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
        }
      })
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu hỗ trợ:', error)
    }
  }

  const addTicket = async (ticketData) => {
    try {
      const currentUserId = localStorage.getItem('userId') || 'NV002'
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeId: currentUserId,
          type: ticketData.category,
          title: ticketData.title,
          desc: ticketData.description,
          status: 'pending',
          date: new Date().toLocaleDateString('vi-VN'),
          priority: ticketData.priority || 'Trung bình'
        })
      })
      await fetchTickets()
      const result = await res.json()
      return result.id
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu hỗ trợ:', error)
    }
  }

  const updateStatus = async (ticketId, newStatus, note = '') => {
    try {
      const backendStatus = newStatus === 'Hoàn thành' ? 'resolved' : (newStatus === 'Chờ xử lý' ? 'pending' : (newStatus === 'Từ chối' ? 'rejected' : 'processing'))
      await fetch(`${API_URL}/${ticketId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          status: backendStatus,
          note: note || undefined
        })
      })
      await fetchTickets()
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error)
    }
  }

  const tickets = computed(() => state.tickets)

  return {
    tickets,
    fetchTickets,
    addTicket,
    updateStatus
  }
}
