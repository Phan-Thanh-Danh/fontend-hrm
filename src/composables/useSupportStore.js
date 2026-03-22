import { reactive, computed } from 'vue'
import { requestsAPI, employeesAPI } from '@/data/mockDB.js'

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

export function useSupportStore() {
  const fetchTickets = async () => {
    try {
      const reqs = requestsAPI.getAll()
      
      state.tickets = reqs.map(req => {
        const emp = employeesAPI.getById(req.employee_id)
        return {
          id: req.request_id.toString(),
          employeeName: emp ? emp.full_name : 'Unknown',
          department: emp ? emp.department_name : 'N/A',
          category: req.request_type || 'Khác',
          title: req.title,
          priority: req.priority || 'Trung bình',
          status: req.status === 'ĐÃ_DUYỆT' ? 'Hoàn thành' : (req.status === 'CHỜ_DUYỆT' ? 'Chờ xử lý' : (req.status === 'TỪ_CHỐI' ? 'Từ chối' : 'Đang xử lý')),
          date: req.created_at || new Date().toLocaleDateString('vi-VN'),
          deadline: req.deadline || '',
          asset: req.asset || '',
          description: req.reason || '',
          avatarColor: AVATAR_COLORS[req.request_id % AVATAR_COLORS.length],
        }
      })
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu hỗ trợ:', error)
    }
  }

  const addTicket = async (ticketData) => {
    try {
      const currentUserId = 2 // default mock manager id
      const reqData = {
        employee_id: currentUserId,
        department_id: 1, // Optional
        request_type: ticketData.category,
        title: ticketData.title,
        reason: ticketData.description,
        status: 'CHỜ_DUYỆT',
        created_at: new Date().toLocaleDateString('vi-VN'),
        priority: ticketData.priority || 'Trung bình'
      }
      requestsAPI.add(reqData)
      await fetchTickets()
      return true
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu hỗ trợ:', error)
    }
  }

  const updateStatus = async (ticketId, newStatus, note = '') => {
    try {
      const backendStatus = newStatus === 'Hoàn thành' ? 'ĐÃ_DUYỆT' : (newStatus === 'Chờ xử lý' ? 'CHỜ_DUYỆT' : (newStatus === 'Từ chối' ? 'TỪ_CHỐI' : 'ĐANG_XỬ_LÝ'))
      const req = requestsAPI.getAll().find(r => r.request_id == ticketId)
      if (req) {
        requestsAPI.update(ticketId, { 
          status: backendStatus,
          note: note || undefined
        })
        await fetchTickets()
      }
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
