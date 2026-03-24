import { reactive, computed } from 'vue'
<<<<<<< HEAD
import { mockLeaveRequests, mockEmployees } from '@/mock-data/index.js'
=======
import { supportRequestsAPI, employeesAPI, departmentsAPI } from '@/data/mockDB.js'
>>>>>>> e898cb5ebcd1acba19cc92c0fc8285af6ad708c7

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
      // Simulate API delay
      await new Promise(r => setTimeout(r, 200));

      const reqs = supportRequestsAPI.getAll();
      const employees = employeesAPI.getAll();
      const departments = departmentsAPI.getAll();
      
      state.tickets = reqs.map(req => {
        const emp = employees.find(e => {
            // Dữ liệu NV001 dạng chuỗi hoặc dạng số
            return e.id === req.employeeId || e.employee_id === req.employeeId || `NV${String(e.employee_id).padStart(3, '0')}` === req.employeeId;
        });
        
        let dept = null;
        if (emp) {
            dept = departments.find(d => String(d.id) === String(emp.deptId) || String(d.department_id) === String(emp.department_id));
        }
        
        // Status mapping: backend -> frontend
        let uiStatus = 'Chờ xử lý';
        if (req.status === 'resolved') uiStatus = 'Hoàn thành';
        else if (req.status === 'processing') uiStatus = 'Đang xử lý';
        else if (req.status === 'rejected') uiStatus = 'Từ chối';

        return {
          id: req.id.toString(),
          employeeName: emp ? (emp.name || emp.full_name) : 'Unknown',
          department: dept ? (dept.name || dept.department_name) : 'N/A',
          category: req.type || 'Hành chính & Văn phòng',
          title: req.title,
          priority: req.priority || 'Trung bình',
          status: uiStatus,
          date: req.date || new Date().toLocaleDateString('vi-VN'),
          deadline: req.deadline || '',
          asset: req.asset || '',
          description: req.desc || '',
          avatarColor: AVATAR_COLORS[String(req.id).length % AVATAR_COLORS.length],
          note: req.note || ''
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
        priority: ticketData.priority || 'Trung bình',
        deadline: ticketData.deadline,
        asset: ticketData.asset
      };
      
      // Simulate API delay
      await new Promise(r => setTimeout(r, 300));
      
      const newData = supportRequestsAPI.add(reqData);
      await fetchTickets();
      return newData.id;
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

      // Simulate API delay
      await new Promise(r => setTimeout(r, 200));

      supportRequestsAPI.update(ticketId, { 
        status: backendStatus,
        note: note || undefined
      });

      await fetchTickets();
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
