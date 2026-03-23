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
      const [reqRes, empRes, deptRes] = await Promise.all([
        fetch('http://localhost:3000/supportRequests'),
        fetch('http://localhost:3000/employees'),
        fetch('http://localhost:3000/departments')
      ]);

      const reqs = await reqRes.json();
      const employees = await empRes.json();
      const departments = await deptRes.json();
      
      state.tickets = reqs.map(req => {
        const emp = employees.find(e => e.id === req.employeeId);
        const dept = departments.find(d => String(d.id) === String(emp?.deptId));
        
        // Status mapping: backend -> frontend
        let uiStatus = 'Chờ xử lý';
        if (req.status === 'resolved') uiStatus = 'Hoàn thành';
        else if (req.status === 'processing') uiStatus = 'Đang xử lý';
        else if (req.status === 'rejected') uiStatus = 'Từ chối';

        return {
          id: req.id.toString(),
          employeeName: emp ? emp.name : 'Unknown',
          department: dept ? dept.name : 'N/A',
          category: req.type || 'Hành chính & Văn phòng',
          title: req.title,
          priority: req.priority || 'Trung bình',
          status: uiStatus,
          date: req.date || new Date().toLocaleDateString('vi-VN'),
          deadline: req.deadline || '',
          asset: req.asset || '',
          description: req.desc || '',
          avatarColor: AVATAR_COLORS[String(req.id).length % AVATAR_COLORS.length],
        }
      })
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu hỗ trợ:', error)
    }
  }

  const addTicket = async (ticketData) => {
    try {
      const currentUserId = localStorage.getItem('userId') || 'NV002';
      const reqData = {
        employeeId: currentUserId,
        type: ticketData.category,
        title: ticketData.title,
        desc: ticketData.description,
        status: 'pending',
        date: new Date().toLocaleDateString('vi-VN'),
        priority: ticketData.priority || 'Trung bình'
      }
      
      const res = await fetch('http://localhost:3000/supportRequests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqData)
      });

      if (res.ok) {
        await fetchTickets();
        return true;
      }
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu hỗ trợ:', error)
    }
  }

  const updateStatus = async (ticketId, newStatus, note = '') => {
    try {
      // Status mapping: frontend -> backend
      let backendStatus = 'pending';
      if (newStatus === 'Hoàn thành') backendStatus = 'resolved';
      else if (newStatus === 'Đang xử lý') backendStatus = 'processing';
      else if (newStatus === 'Từ chối') backendStatus = 'rejected';

      const res = await fetch(`http://localhost:3000/supportRequests/${ticketId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          status: backendStatus,
          note: note || undefined
        })
      });

      if (res.ok) {
        await fetchTickets();
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
