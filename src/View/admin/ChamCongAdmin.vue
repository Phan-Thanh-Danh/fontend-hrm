<template>
  <div class="cham-cong-admin-page p-4 bg-light min-vh-100">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h4 class="fw-bold mb-1">Quản lý Chấm công & Thống kê</h4>
        <p class="text-muted small mb-0">Theo dõi chuyên cần, phê duyệt bảng công và quản lý dữ liệu nhân sự</p>
      </div>
      <div class="d-flex align-items-center gap-3">
        <div class="d-flex align-items-center gap-2 bg-white px-3 py-2 rounded-3 border">
            <span class="text-muted small fw-medium">TRẠNG THÁI THÁNG 10/2023</span>
            <span class="d-flex align-items-center gap-1 text-success fw-bold small">
                <span class="rounded-circle bg-success" style="width: 8px; height: 8px;"></span>
                Đang mở
            </span>
        </div>
        <button class="btn btn-warning text-white fw-bold px-3 py-2 rounded-3 d-flex align-items-center gap-2 shadow-sm" style="background-color: #f59e0b; border: none;">
          <span class="material-symbols-outlined fs-5">lock</span> Khóa bảng công
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="row g-4 mb-4">
      <div class="col-md-4">
        <div class="card border-0 shadow-sm rounded-4 h-100 p-4">
          <div class="d-flex justify-content-between align-items-start mb-3">
              <div>
                  <p class="text-muted small fw-bold text-uppercase mb-2" style="font-size: 0.7rem; letter-spacing: 0.5px;">Tổng giờ OT tháng</p>
                  <h2 class="fw-bold text-dark mb-1">1,240 <small class="fw-normal text-muted fs-6">giờ</small></h2>
                  <p class="text-success small fw-medium mb-0 d-flex align-items-center gap-1">
                      <span class="material-symbols-outlined fs-6">trending_up</span> +12.5% so với tháng trước
                  </p>
              </div>
              <div class="bg-primary bg-opacity-10 text-primary p-2 rounded-3">
                  <span class="material-symbols-outlined fs-4">timer</span>
              </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-0 shadow-sm rounded-4 h-100 p-4">
          <div class="d-flex justify-content-between align-items-start mb-3">
              <div>
                  <p class="text-muted small fw-bold text-uppercase mb-2" style="font-size: 0.7rem; letter-spacing: 0.5px;">Tỷ lệ chuyên cần</p>
                  <h2 class="fw-bold text-dark mb-1">98.5%</h2>
                  <p class="text-success small fw-medium mb-0 d-flex align-items-center gap-1">
                      <span class="material-symbols-outlined fs-6">trending_up</span> +0.2% so với tháng trước
                  </p>
              </div>
              <div class="bg-primary bg-opacity-10 text-primary p-2 rounded-3">
                  <span class="material-symbols-outlined fs-4">verified_user</span>
              </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-0 shadow-sm rounded-4 h-100 p-4">
          <div class="d-flex justify-content-between align-items-start mb-3">
              <div>
                  <p class="text-muted small fw-bold text-uppercase mb-2" style="font-size: 0.7rem; letter-spacing: 0.5px;">Vắng mặt hôm nay</p>
                  <h2 class="fw-bold text-dark mb-1">12 <small class="fw-normal text-muted fs-6">nhân viên</small></h2>
                  <p class="text-danger small fw-medium mb-0 d-flex align-items-center gap-1">
                      <span class="material-symbols-outlined fs-6">trending_down</span> -5% so với trung bình tuần
                  </p>
              </div>
              <div class="bg-danger bg-opacity-10 text-danger p-2 rounded-3">
                  <span class="material-symbols-outlined fs-4">person_off</span>
              </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="row g-4 mb-4">
        <div class="col-xl-7">
            <div class="card border-0 shadow-sm rounded-4 p-4 h-100">
                <h6 class="fw-bold text-dark mb-4">Tổng giờ OT theo Phòng ban (Tháng này)</h6>
                <div class="d-flex align-items-end justify-content-around flex-grow-1 pt-4 px-2" style="height: 200px;">
                    <div class="d-flex flex-column align-items-center gap-3 w-100">
                        <div class="bg-primary bg-opacity-10 rounded-top w-50 position-relative" style="height: 120px;">
                            <div class="bg-primary rounded-top position-absolute bottom-0 w-100" style="height: 60%;"></div>
                        </div>
                        <span class="text-muted small fw-bold">IT</span>
                    </div>
                    <div class="d-flex flex-column align-items-center gap-3 w-100">
                        <div class="bg-primary bg-opacity-10 rounded-top w-50 position-relative" style="height: 120px;">
                            <div class="bg-primary rounded-top position-absolute bottom-0 w-100" style="height: 40%;"></div>
                        </div>
                        <span class="text-muted small fw-bold">HR</span>
                    </div>
                    <div class="d-flex flex-column align-items-center gap-3 w-100">
                        <div class="bg-primary bg-opacity-10 rounded-top w-50 position-relative" style="height: 120px;">
                            <div class="bg-primary rounded-top position-absolute bottom-0 w-100" style="height: 85%;"></div>
                        </div>
                        <span class="text-muted small fw-bold">Sales</span>
                    </div>
                    <div class="d-flex flex-column align-items-center gap-3 w-100">
                        <div class="bg-primary bg-opacity-10 rounded-top w-50 position-relative" style="height: 120px;">
                            <div class="bg-primary rounded-top position-absolute bottom-0 w-100" style="height: 30%;"></div>
                        </div>
                        <span class="text-muted small fw-bold">MKT</span>
                    </div>
                    <div class="d-flex flex-column align-items-center gap-3 w-100">
                        <div class="bg-primary bg-opacity-10 rounded-top w-50 position-relative" style="height: 120px;">
                            <div class="bg-primary rounded-top position-absolute bottom-0 w-100" style="height: 55%;"></div>
                        </div>
                        <span class="text-muted small fw-bold">Ops</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-5">
            <div class="card border-0 shadow-sm rounded-4 p-4 h-100">
                <h6 class="fw-bold text-dark mb-4">Top nhân viên đi muộn nhiều nhất</h6>
                <div class="d-flex flex-column gap-4">
                    <div v-for="user in topLateUsers" :key="user.name" class="d-flex align-items-center gap-3">
                        <span class="text-muted small fw-bold" style="width: 80px;">{{ user.name }}</span>
                        <div class="flex-grow-1 bg-light rounded-pill overflow-hidden" style="height: 24px;">
                            <div class="bg-danger bg-opacity-50 h-100 transition-all rounded-pill" :style="{ width: user.percent + '%' }"></div>
                        </div>
                        <span class="text-danger small fw-bold" style="width: 30px;">{{ user.minutes }}p</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Table -->
    <div class="card border-0 shadow-sm rounded-4 mb-4">
      <div class="card-header bg-white border-bottom p-4 d-flex flex-wrap justify-content-between align-items-center gap-3 rounded-top-4">
        <h6 class="fw-bold mb-0 text-dark">Danh sách Chấm công Theo Ngày</h6>
        <div class="d-flex gap-2">
            <div class="input-group input-group-sm">
                <input type="date" class="form-control border-light-subtle" value="2023-10-05">
            </div>
            <select class="form-select form-select-sm border-light-subtle">
                <option>Tất cả phòng ban</option>
            </select>
            <select class="form-select form-select-sm border-light-subtle">
                <option>Tất cả trạng thái</option>
            </select>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table align-middle text-nowrap mb-0 table-hover">
          <thead class="bg-white">
            <tr>
              <th class="border-bottom py-3 px-4 text-muted fw-bold small text-uppercase" style="font-size: 0.7rem;">Nhân viên</th>
              <th class="border-bottom py-3 text-muted fw-bold small text-uppercase" style="font-size: 0.7rem;">Ca làm</th>
              <th class="border-bottom py-3 text-muted fw-bold small text-uppercase" style="font-size: 0.7rem;">Check-in</th>
              <th class="border-bottom py-3 text-muted fw-bold small text-uppercase" style="font-size: 0.7rem;">Check-out</th>
              <th class="border-bottom py-3 text-muted fw-bold small text-uppercase text-center" style="font-size: 0.7rem;">Đi muộn</th>
              <th class="border-bottom py-3 text-muted fw-bold small text-uppercase text-center" style="font-size: 0.7rem;">Về sớm</th>
              <th class="border-bottom py-3 text-muted fw-bold small text-uppercase text-center" style="font-size: 0.7rem;">Giờ OT</th>
              <th class="border-bottom py-3 text-muted fw-bold small text-uppercase" style="font-size: 0.7rem;">Trạng thái</th>
              <th class="border-bottom py-3 px-4 text-muted fw-bold small text-uppercase text-end" style="font-size: 0.7rem;">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="record in timeRecords" :key="record.id">
              <td class="px-4 py-3 fw-bold text-dark">{{ record.name }}</td>
              <td class="py-3 text-muted font-medium">{{ record.shift }}</td>
              <td class="py-3 text-dark fw-medium">{{ record.checkIn }}</td>
              <td class="py-3 text-dark fw-medium">{{ record.checkOut }}</td>
              <td class="py-3 text-center" :class="record.late > 0 ? 'text-danger fw-bold' : 'text-muted'">{{ record.late > 0 ? record.late + 'p' : '0p' }}</td>
              <td class="py-3 text-center text-muted">{{ record.early > 0 ? record.early + 'p' : '0p' }}</td>
              <td class="py-3 text-center" :class="record.ot > 0 ? 'text-primary fw-bold' : 'text-muted'">{{ record.ot > 0 ? record.ot + 'h' : '0h' }}</td>
              <td>
                <span class="badge border-0 rounded-pill px-3 py-1 fw-bold text-uppercase" :class="record.statusClass" style="font-size: 0.65rem;">{{ record.statusText }}</span>
              </td>
              <td class="px-4 py-3 text-end text-nowrap">
                <button class="btn btn-link text-primary text-decoration-none fw-bold small p-0">Chỉnh sửa</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    

  </div>
</template>

<script setup>
import { ref } from 'vue';

const topLateUsers = ref([
    { name: 'Nguyễn Văn A', minutes: 85, percent: 85 },
    { name: 'Trần Thị B', minutes: 60, percent: 65 },
    { name: 'Lê Văn C', minutes: 45, percent: 45 },
    { name: 'Phạm Đạt', minutes: 30, percent: 25 },
]);

const timeRecords = ref([
    { 
        id: 1, 
        name: 'Nguyễn Văn A', 
        shift: 'Sáng (08:00-17:00)', 
        checkIn: '08:15', 
        checkOut: '17:05', 
        late: 15, 
        early: 0, 
        ot: 0, 
        statusText: 'ĐI MUỘN', 
        statusClass: 'bg-warning bg-opacity-10 text-warning' 
    },
    { 
        id: 2, 
        name: 'Trần Thị B', 
        shift: 'Sáng (08:00-17:00)', 
        checkIn: '07:55', 
        checkOut: '18:30', 
        late: 0, 
        early: 0, 
        ot: 1.5, 
        statusText: 'ĐỦ CÔNG', 
        statusClass: 'bg-success bg-opacity-10 text-success' 
    },
    { 
        id: 3, 
        name: 'Lê Văn C', 
        shift: 'Sáng (08:00-17:00)', 
        checkIn: '--:--', 
        checkOut: '--:--', 
        late: 0, 
        early: 0, 
        ot: 0, 
        statusText: 'VẮNG MẶT', 
        statusClass: 'bg-danger bg-opacity-10 text-danger' 
    }
]);
</script>

<style scoped>
.transition-all {
    transition: all 0.3s ease;
}
</style>
