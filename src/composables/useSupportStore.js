import { reactive, computed } from 'vue'
import { supportRequestsAPI, employeesAPI, departmentsAPI } from '@/data/mockDB.js'

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
      // API delay simulation
      await new Promise(r => setTimeout(r, 100));

      const reqs = supportRequestsAPI.getAll() || [];
      const employees = employeesAPI.getAll() || [];
      const departments = departmentsAPI.getAll() || [];
      
      state.tickets = reqs.map(req => {
        // Robust lookup handling string vs number and different property names
        const emp = employees.find(e => {
            const sid = String(req.employeeId);
            return String(e.id) === sid || 
                   String(e.employeeId) === sid || 
                   String(e.employee_id) === sid || 
                   (e.employeeCode && String(e.employeeCode).includes(sid));
        });
        
        let dept = null;
        if (emp) {
            const deptId = emp.deptId || emp.departmentId || (emp.department && emp.department.departmentId);
            dept = departments.find(d => 
              String(d.id) === String(deptId) || 
              String(d.departmentId) === String(deptId) || 
              String(d.department_id) === String(deptId)
            );
        }
        
        // Status mapping: backend -> frontend
        let uiStatus = 'Chờ xử lý';
        if (req.status === 'resolved' || req.status === 'Hoàn thành') uiStatus = 'Hoàn thành';
        else if (req.status === 'processing' || req.status === 'Đang xử lý') uiStatus = 'Đang xử lý';
        else if (req.status === 'rejected' || req.status === 'Từ chối') uiStatus = 'Từ chối';
        else if (req.status === 'pending' || req.status === 'Mới') uiStatus = 'Chờ xử lý';

        return {
          id: req.id ? req.id.toString() : Date.now().toString(),
          employeeName: emp ? (emp.fullName || emp.full_name || emp.name) : 'Người dùng hệ thống',
          department: dept ? (dept.departmentName || dept.name || dept.department_name) : 'N/A',
          category: req.type || 'Hỗ trợ IT & Thiết bị',
          title: req.title || 'Không có tiêu đề',
          priority: req.priority || 'Trung bình',
          status: uiStatus,
          date: req.date || new Date().toLocaleDateString('vi-VN'),
          deadline: req.deadline || '',
          asset: req.asset || '',
          description: req.desc || req.description || '',
          avatarColor: AVATAR_COLORS[String(req.id || '').length % AVATAR_COLORS.length],
          note: req.note || ''
        }
      })
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu hỗ trợ:', error)
      state.tickets = [];
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
