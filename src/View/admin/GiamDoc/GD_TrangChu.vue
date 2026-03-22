<template>
  <div class="dashboard">

    <!-- ══════════════════════════════════════════
         PAGE HEADER
    ══════════════════════════════════════════════ -->
    <div class="page-header">
      <div class="page-header-left">
        <h1 class="page-title">Bảng Điều Khiển Chiến Lược</h1>
        <p class="page-subtitle">
          <span class="material-symbols-rounded" style="font-size:15px;vertical-align:-3px;margin-right:4px">wb_sunny</span>
          Chào buổi sáng, Dữ liệu được cập nhật mới nhất. 
        </p>
      </div>
      <div class="page-header-actions">
        <!-- Date filter button using GD_DateFilter component -->
        <GD_DateFilter v-model="selectedDateRange" />
        <button class="btn-export">
          <span class="material-symbols-rounded">download</span>
          Xuất báo cáo
        </button>
      </div>
    </div>

    <!-- ══════════════════════════════════════════
         KPI CARDS
    ══════════════════════════════════════════════ -->
    <div class="kpi-grid">
      <!-- ✅ KPI Cards -->
      <div
        v-for="(card, index) in kpiCards"
        :key="card.id"
        class="kpi-card animate-chart"
        :style="{ animationDelay: (index * 100) + 'ms' }"
        @click="$router.push(card.route)"
      >
        <div class="kpi-card-header">
          <div class="kpi-icon" :class="card.iconClass">
            <span class="material-symbols-rounded">{{ card.icon }}</span>
          </div>
          <span class="kpi-badge" :class="card.badgeClass">
            <span class="material-symbols-rounded" style="font-size:11px">{{ card.badgeIcon }}</span>
            {{ card.badge }}
          </span>
        </div>
        <p class="kpi-label">{{ card.label }}</p>
        <h3 class="kpi-value">{{ card.value }}</h3>
        <div class="kpi-footer">
          <!-- Loại sparkline (bar mini) -->
          <template v-if="card.footerType === 'sparkline'">
            <div class="kpi-sparkline">
              <div
                v-for="(h, i) in card.sparkline"
                :key="i"
                class="bar"
                :class="[
                  card.sparklineDanger ? 'bar--danger' : '',
                  i === card.sparkline.length - 1
                    ? (card.sparklineDanger ? 'bar--active-danger' : 'bar--active')
                    : ''
                ]"
                :style="`height:${h}%`"
              ></div>
            </div>
          </template>
          <!-- Loại progress bar -->
          <template v-else-if="card.footerType === 'progress'">
            <div class="kpi-progress-bar">
              <div
                class="kpi-progress-fill"
                :class="card.progressClass"
                :style="`width:${card.progress}%`"
              ></div>
            </div>
          </template>
          <span class="kpi-meta">{{ card.meta }}</span>
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════════════════
         CHARTS ROW
    ══════════════════════════════════════════════ -->
    <div class="charts-grid">

      <!-- Bar Chart -->
      <div class="chart-card chart-card--wide animate-chart" style="animation-delay: 200ms;">
        <div class="chart-card-header">
          <div>
            <h4 class="chart-title">Xu hướng tăng trưởng nhân sự</h4>
            <p class="chart-subtitle">6 tháng gần nhất</p>
          </div>
          <div class="chart-legend">
            <span class="legend-item">
              <span class="legend-dot legend-dot--brand"></span>Hiện tại
            </span>
            <span class="legend-item">
              <span class="legend-dot legend-dot--amber"></span>Mục tiêu
            </span>
          </div>
        </div>

        <div class="bar-chart">
          <!-- Background Grid Lines -->
          <div class="absolute inset-0 flex flex-col justify-between pb-[28px] pr-[44px] pointer-events-none z-0">
            <div v-for="(lab, i) in barChartYLabels" :key="'grid-'+i" class="w-full border-t border-dashed border-slate-200/80" :class="i === barChartYLabels.length - 1 ? 'border-solid border-slate-300' : ''"></div>
          </div>

          <div class="bar-chart-cols relative z-10">
            <div class="relative flex items-end justify-center h-full w-full group hover:z-[60] z-20 gap-1.5 sm:gap-2.5" v-for="(col, i) in dynamicBarChart" :key="i">
              
              <!-- Phantom Tooltip Top Alignment -->
              <div class="absolute hidden group-hover:flex flex-col items-center z-50 pointer-events-none w-max"
                   :style="`bottom: calc(${Math.max(col.currentH, col.targetH)}% + 5px);`">
                 <div class="bg-slate-800 text-white rounded-md text-[11px] px-3 py-2 shadow-xl whitespace-nowrap flex flex-col items-center gap-0.5 relative">
                   <span class="font-bold text-amber-400">Mục tiêu: {{ col.target }}</span>
                   <span class="font-bold text-blue-300 flex items-center gap-1.5">
                     Hiện tại: {{ col.current }}
                     <span v-if="col.current >= col.target" class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse drop-shadow-[0_0_3px_#4ade80]"></span>
                   </span>
                 </div>
                 <div class="w-2.5 h-2.5 bg-slate-800 rotate-45 -mt-1.5"></div>
              </div>

              <!-- Target Col (Amber) -->
              <div class="w-5 sm:w-8 md:w-10 rounded-t-md transition-all duration-300 group-hover:opacity-90 bg-gradient-to-t from-amber-500 to-amber-300 shadow-sm shadow-amber-500/20 group-hover:-translate-y-1"
                   :style="`height: ${col.targetH}%`">
              </div>

              <!-- Current Col (Blue) -->
              <div class="w-5 sm:w-8 md:w-10 rounded-t-md transition-all duration-300 group-hover:opacity-90 bg-gradient-to-t from-blue-600 to-blue-400 shadow-sm shadow-blue-500/20 relative group-hover:-translate-y-1"
                   :class="col.active ? 'opacity-100' : 'opacity-85'"
                   :style="`height: ${col.currentH}%`">
                   <!-- SPECIAL FEATURE: Vượt mục tiêu hiển thị ngôi sao và hiệu ứng pulse viền sáng cực đẹp đặc quyền của Trang chủ Giám đốc -->
                   <div v-if="col.current >= col.target" class="absolute -top-6 left-1/2 -translate-x-1/2 text-[14px] text-green-500 font-extrabold opacity-0 group-hover:opacity-100 transition-all duration-[400ms] drop-shadow-[0_0_5px_rgba(74,222,128,0.8)] group-hover:-translate-y-1">★</div>
                   <div v-if="col.current >= col.target" class="absolute inset-0 bg-gradient-to-t from-transparent to-white/30 rounded-t-md animate-pulse pointer-events-none"></div>
              </div>

              <span class="bar-label" :class="col.active ? 'bar-label--active' : ''">{{ col.label }}</span>
            </div>
          </div>
          <!-- Y-axis lines -->
          <div class="y-axis-lines">
            <span class="y-label" v-for="(lab, i) in barChartYLabels" :key="i">{{ lab }}</span>
          </div>
        </div>
      </div>

      <!-- Donut Chart -->
      <div class="chart-card chart-card--narrow animate-chart" style="animation-delay: 300ms;">
        <div class="chart-card-header">
          <h4 class="chart-title">Cơ cấu phòng ban</h4>
        </div>

        <div class="donut-wrapper">
          <div class="donut-chart-ring" :style="donutStyle">
            <div class="donut-center">
              <span class="donut-number">{{ donutTotal }}</span>
              <span class="donut-unit">Nhân sự</span>
            </div>
          </div>
        </div>

        <div class="donut-legend">
          <div class="donut-legend-item" v-for="item in donutData" :key="item.label">
            <div class="flex items-center gap-2">
              <span class="donut-dot" :style="`background:${item.color}`"></span>
              <span class="donut-label">{{ item.label }}</span>
            </div>
            <div class="donut-stat">
              <span class="donut-pct">{{ item.pct }}%</span>
              <div class="donut-mini-bar">
                <div :style="`width:${item.pct}%;background:${item.color}`"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════════════════
         BOTTOM ROW
    ══════════════════════════════════════════════ -->
    <div class="bottom-grid">

      <!-- Approval List – dữ liệu từ pendingApprovals -->
      <div class="list-card list-card--wide animate-chart" style="animation-delay: 400ms;">
        <div class="list-card-header">
          <h4 class="chart-title">Yêu cầu chờ phê duyệt</h4>
          <span class="badge-urgent">
            <span class="material-symbols-rounded" style="font-size:12px">warning</span>
            {{ urgentPendingCount < 10 ? '0' + urgentPendingCount : urgentPendingCount }} khẩn cấp
          </span>
        </div>

        <div class="approval-list">
          <div
            v-for="item in pendingApprovals"
            :key="item.id"
            class="approval-item cursor-pointer"
            @click="openDetailModal(item)"
          >
            <div class="approval-icon" :class="item.iconClass">
              <span class="material-symbols-rounded">{{ item.icon }}</span>
            </div>
            <div class="approval-content">
              <h5 class="approval-title">{{ item.title }}</h5>
              <p class="approval-meta" :class="item.urgent ? 'urgent-meta' : ''">{{ item.meta }}</p>
            </div>
            <div class="approval-actions">
              <button
                v-for="(action, ai) in item.actions"
                :key="ai"
                :class="ai === item.actions.length - 1 ? 'btn-approve' : 'btn-reject'"
                @click.stop="ai === item.actions.length - 1 ? openApproveModal(item) : openRejectModal(item)"
              >
                {{ action }}
              </button>
            </div>
          </div>
        </div>

        <button class="list-card-footer" @click="router.push('/giam-doc/thong-bao')">
          <span class="material-symbols-rounded" style="font-size:15px">expand_more</span>
          Xem toàn bộ {{ pendingApprovals.length }} yêu cầu
        </button>
      </div>

      <!-- Events Timeline -->
      <div class="events-card">
        <div class="events-glow"></div>
        <div class="events-header">
          <span class="material-symbols-rounded events-icon">calendar_month</span>
          <h4 class="events-title">Sự kiện quan trọng</h4>
        </div>

        <!-- Timeline events – dữ liệu từ timelineEvents -->
        <div class="timeline">
          <div class="timeline-line"></div>
          <div
            v-for="ev in timelineEvents"
            :key="ev.id"
            class="timeline-item"
            :class="ev.active ? 'timeline-item--active' : ''"
          >
            <div class="timeline-dot" :class="ev.active ? 'timeline-dot--active' : ''"></div>
            <div class="timeline-content">
              <p class="timeline-time" :class="ev.active ? 'active-time' : ''">{{ ev.time }}</p>
              <h5 class="timeline-title">{{ ev.title }}</h5>
              <p class="timeline-place">
                <span class="material-symbols-rounded" style="font-size:13px">{{ ev.placeIcon }}</span>
                {{ ev.place }}
              </p>
            </div>
          </div>
        </div>

        <!-- Reminder -->
        <div class="reminder-card">
          <p class="reminder-label">
            <span class="material-symbols-rounded" style="font-size:14px;font-variation-settings:'FILL' 1">sticky_note_2</span>
            Lời nhắc của bạn
          </p>
          <p class="reminder-text">{{ reminderText }}</p>
          <button class="reminder-edit">
            <span class="material-symbols-rounded" style="font-size:14px">edit</span>
            Chỉnh sửa
          </button>
        </div>
      </div>

    </div>

    <!-- Detail Modal (Yêu cầu) -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div
          v-if="showDetailModal && selectedApproval"
          class="fixed inset-0 z-[10001] flex items-center justify-center p-4"
        >
          <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" @click="closeDetailModal"></div>

          <div class="relative max-w-2xl w-full bg-[var(--sys-bg-surface)] rounded-xl shadow-2xl p-6 overflow-hidden flex flex-col text-left">
            <div class="flex items-center gap-4 mb-6">
              <div
                :class="[
                  'w-14 h-14 rounded-lg flex items-center justify-center shadow-sm border border-[var(--sys-border-subtle)]',
                  selectedApproval.iconClass || ''
                ]"
              >
                <span class="material-symbols-rounded text-2xl font-bold">{{ selectedApproval.icon }}</span>
              </div>

              <div class="flex-1">
                <h3 class="text-lg font-semibold text-[var(--sys-text-primary)] leading-tight mb-0.5">
                  {{ selectedApproval.title }}
                </h3>
                <p class="text-xs font-bold text-[var(--sys-brand-solid)] uppercase tracking-tight opacity-70">
                  {{ selectedApproval.meta }}
                </p>
              </div>

              <button
                @click="closeDetailModal"
                class="w-10 h-10 rounded-full hover:bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] flex items-center justify-center transition-all"
              >
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>

            <div class="grid grid-cols-2 gap-6 mb-6">
              <div class="space-y-1">
                <span class="text-[10px] font-black text-[var(--sys-text-disabled)] uppercase tracking-widest leading-none">Trạng thái</span>
                <p class="text-sm font-bold text-[var(--sys-text-primary)]">
                  {{ selectedApproval.urgent ? 'Khẩn cấp' : 'Bình thường' }}
                </p>
              </div>
              <div class="space-y-1">
                <span class="text-[10px] font-black text-[var(--sys-text-disabled)] uppercase tracking-widest leading-none">Thao tác</span>
                <p class="text-sm font-bold text-[var(--sys-text-primary)]">Phê duyệt hoặc Từ chối</p>
              </div>
            </div>

            <div class="space-y-2 mb-6">
              <span class="text-[10px] font-black text-[var(--sys-text-disabled)] uppercase tracking-widest">Ghi chú</span>
              <div class="bg-[var(--sys-bg-hover)] p-4 rounded-lg border border-[var(--sys-border-subtle)]">
                <p class="text-sm text-[var(--sys-text-secondary)] leading-relaxed font-medium italic">
                  {{ selectedApproval.meta }}
                </p>
              </div>
            </div>

            <div class="flex justify-end gap-3 mt-auto pt-4 border-t border-[var(--sys-border-subtle)]">
              <button class="btn-reject h-10 px-6" @click="openRejectModal(selectedApproval)">
                Từ chối
              </button>
              <button class="btn-approve h-10 px-6" @click="openApproveModal(selectedApproval)">
                Phê duyệt
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Approve Modal -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div
          v-if="showApproveModal && selectedApproval"
          class="fixed inset-0 z-[10001] flex items-center justify-center p-4"
        >
          <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" @click="closeApproveModal"></div>

          <div class="relative max-w-xl w-full bg-[var(--sys-bg-surface)] rounded-xl shadow-2xl p-6 overflow-hidden flex flex-col text-left">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-12 h-12 rounded-lg bg-[var(--sys-brand-soft)] border border-[var(--sys-brand-border)] flex items-center justify-center">
                <span class="material-symbols-outlined text-[26px] font-bold text-[var(--sys-brand-solid)]">task_alt</span>
              </div>
              <div class="flex-1">
                <h3 class="text-sm font-extrabold text-[var(--sys-text-primary)] m-0 uppercase tracking-tight leading-none">
                  Xác nhận phê duyệt
                </h3>
                <p class="text-[10px] text-[var(--sys-text-secondary)] font-bold mt-1 uppercase tracking-widest opacity-70">
                  {{ selectedApproval.title }}
                </p>
              </div>
              <button
                @click="closeApproveModal"
                class="w-8 h-8 flex items-center justify-center rounded hover:bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] transition-all"
              >
                <span class="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div class="bg-[var(--sys-bg-hover)] p-4 rounded-lg border border-[var(--sys-border-subtle)] mb-6">
              <p class="text-sm text-[var(--sys-text-secondary)] leading-relaxed">
                Bạn có chắc chắn muốn <span class="font-extrabold text-[var(--sys-brand-solid)]">phê duyệt</span> yêu cầu này không?
              </p>
            </div>

            <div class="flex justify-end gap-3 mt-auto pt-4 border-t border-[var(--sys-border-subtle)]">
              <button class="btn-reject h-10 px-6" @click="closeApproveModal">Hủy bỏ</button>
              <button class="btn-approve h-10 px-8" @click="confirmApprove">
                Phê duyệt
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Reject Modal -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div
          v-if="showRejectModal && selectedApproval"
          class="fixed inset-0 z-[10001] flex items-center justify-center p-4"
        >
          <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" @click="closeRejectModal"></div>

          <div class="relative max-w-xl w-full bg-[var(--sys-bg-surface)] rounded-xl shadow-2xl p-6 overflow-hidden flex flex-col text-left">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-12 h-12 rounded-lg bg-[var(--sys-danger-soft)] border border-[var(--sys-danger-border)] flex items-center justify-center">
                <span class="material-symbols-outlined text-[26px] font-bold text-[var(--sys-danger-solid)]">rule</span>
              </div>
              <div class="flex-1">
                <h3 class="text-sm font-extrabold text-[var(--sys-text-primary)] m-0 uppercase tracking-tight leading-none">
                  Thẩm định bác bỏ hồ sơ
                </h3>
                <p class="text-[10px] text-[var(--sys-text-secondary)] font-bold mt-1 uppercase tracking-widest opacity-70">
                  {{ selectedApproval.title }}
                </p>
              </div>
              <button
                @click="closeRejectModal"
                class="w-8 h-8 flex items-center justify-center rounded hover:bg-[var(--sys-bg-hover)] text-[var(--sys-text-secondary)] transition-all"
              >
                <span class="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="space-y-1.5">
                <span class="text-[10px] font-black text-[var(--sys-text-disabled)] uppercase tracking-widest leading-none opacity-60">Phân loại</span>
                <p class="text-sm font-bold text-[var(--sys-text-primary)]">{{ selectedApproval.title }}</p>
              </div>
              <div class="space-y-1.5">
                <span class="text-[10px] font-black text-[var(--sys-text-disabled)] uppercase tracking-widest leading-none opacity-60">Mức độ</span>
                <p class="text-sm font-bold text-[var(--sys-text-primary)]">{{ selectedApproval.urgent ? 'Khẩn cấp' : 'Bình thường' }}</p>
              </div>
            </div>

            <div class="space-y-1.5 mb-6">
              <label class="text-[10px] font-black text-[var(--sys-text-primary)] uppercase tracking-widest ml-1 opacity-60">Nội dung phản hồi thẩm định *</label>
              <textarea
                v-model="rejectReason"
                rows="4"
                placeholder="Xác định nguyên nhân bác bỏ hồ sơ chi tiết..."
                class="w-full px-4 py-3 bg-[var(--sys-bg-page)] border border-[var(--sys-border-strong)] rounded text-[13px] font-bold text-[var(--sys-text-primary)] outline-none transition-all resize-none shadow-inner placeholder:font-normal placeholder:italic placeholder:opacity-40"
              ></textarea>
              <p class="text-[9px] font-bold text-[var(--sys-danger-text)] uppercase tracking-widest opacity-60 italic">
                * Thông tin này sẽ được gửi trực tiếp đến hộp thư của nhân sự.
              </p>
            </div>

            <div class="flex justify-end gap-3 mt-auto pt-4 border-t border-[var(--sys-border-subtle)]">
              <button class="btn-reject h-10 px-6" @click="closeRejectModal">Hủy bỏ</button>
              <button class="btn-approve h-10 px-8" @click="confirmReject">
                XÁC NHẬN BÁC BỎ
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import GD_DateFilter from '@/components/GD_DateFilter.vue';
import { employeesAPI, departmentsAPI, requestsAPI } from '@/data/mockDB.js';
import {
  timelineEvents,
  reminderText,
} from '@/data/sampleData_GiamDoc.js';
import { useConfirm } from '@/composables/useConfirm';

const { showAlert } = useConfirm();
const router = useRouter();

const selectedDateRange = ref('30_days');

const approvals = ref([]);
const kpiCards = ref([]);
const barChartData = ref([]);
const barChartYLabels = ref(['300,000', '250,000', '200,000', '150,000', '100,000', '50,000', '0']);
const donutData = ref([]);
const donutTotal = ref(0);

const fetchData = () => {
  try {
    const allEmps = employeesAPI.getAll();
    const allDepts = departmentsAPI.getAll();
    const allReqs = requestsAPI.getAll();

    const activeEmps = allEmps.filter(e => e.status !== 'ĐÃ_NGHỈ_VIỆC');
    
    // 1. KPI Cards
    const totalHeadcount = activeEmps.length;
    const pendingReqs = allReqs.filter(r => r.status === 'CHỜ_DUYỆT').length;
    
    kpiCards.value = [
      {
        id: 1, label: 'Tổng số nhân sự', value: totalHeadcount,
        icon: 'groups', iconClass: 'kpi-icon--blue',
        badge: '+12% so với tháng trước', badgeIcon: 'trending_up', badgeClass: 'kpi-badge--success',
        route: '/giam-doc/nhan-su', footerType: 'sparkline',
        sparkline: [30, 45, 60, 50, 75, 40, 85, 100], sparklineDanger: false, meta: 'Dữ liệu tăng đều'
      },
      {
        id: 2, label: 'Quỹ lương tháng này', value: '2.5 Tỷ',
        icon: 'payments', iconClass: 'kpi-icon--green',
        badge: '-1.5% so với Dữ Toán', badgeIcon: 'trending_down', badgeClass: 'kpi-badge--danger',
        route: '/giam-doc/luong', footerType: 'progress',
        progress: 75, progressClass: 'kpi-progress-fill--green', meta: 'Ngân sách thực chi'
      },
      {
        id: 3, label: 'Hồ sơ cần duyệt', value: pendingReqs,
        icon: 'task', iconClass: 'kpi-icon--amber',
        badge: 'Ưu tiên xử lý', badgeIcon: 'priority_high', badgeClass: 'kpi-badge--warning',
        route: '/giam-doc/phe-duyet', footerType: 'none', meta: `${pendingReqs} yêu cầu mới`
      },
      {
        id: 4, label: 'Tỉ lệ nghỉ việc / tháng', value: '2.1%',
        icon: 'person_remove', iconClass: 'kpi-icon--purple',
        badge: 'Bình thường', badgeIcon: 'done_all', badgeClass: 'kpi-badge--success',
        route: '/giam-doc/nhan-su', footerType: 'sparkline',
        sparkline: [15, 20, 25, 10, 5, 20, 30, 15], sparklineDanger: true, meta: 'Thấp hơn trung bình'
      }
    ];

    // 2. Donut Data
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#14b8a6'];
    donutTotal.value = activeEmps.length;
    
    let chartItems = allDepts.map((d, i) => {
        const count = activeEmps.filter(e => e.department_id === d.department_id).length;
        const pct = Math.round((count / (donutTotal.value || 1)) * 100);
        return {
            label: d.department_name,
            pct: pct,
            color: colors[i % colors.length]
        };
    }).filter(d => d.pct > 0).sort((a,b) => b.pct - a.pct);

    donutData.value = chartItems;

    // 3. Bar Chart Mock 
    barChartData.value = [
      { label: 'T1', current: 120000, target: 150000, active: false },
      { label: 'T2', current: 140000, target: 155000, active: false },
      { label: 'T3', current: 135000, target: 160000, active: false },
      { label: 'T4', current: 180000, target: 165000, active: false },
      { label: 'T5', current: 210000, target: 170000, active: false },
      { label: 'T6', current: 240000, target: 200000, active: true },
    ];

    // 4. Pending Approvals
    // WORKFLOW NEW: Chỉ hiển thị những đơn đã qua Trưởng phòng duyệt (CHỜ_GIÁM_ĐỐC_DUYỆT)
    approvals.value = allReqs.filter(r => {
        const isDirectorQueue = r.status === 'CHỜ_GIÁM_ĐỐC_DUYỆT' || (r.status === 'CHỜ_DUYỆT' && r.is_urgent);
        const isVisible = r.visible_to ? r.visible_to.includes('Director') : true;
        return isDirectorQueue && isVisible;
    }).map(r => {
        const emp = allEmps.find(e => e.employee_id === r.requester_id) || {};
        return {
            id: r.request_id,
            isReal: true,
            statusRaw: r.status,
            title: r.title,
            meta: `${emp.full_name || 'Khuyết danh'} • Yêu cầu lúc ${r.request_date ? r.request_date.substring(11,16) : 'N/A'}`,
            icon: r.is_urgent ? 'warning' : 'event_note',
            iconClass: r.is_urgent ? 'kpi-icon--amber' : 'kpi-icon--blue',
            urgent: r.is_urgent,
            actions: ['Từ chối', 'Phê duyệt'],
            status: 'pending',
            rejectReason: ''
        };
    }).slice(0, 5);

  } catch (error) {
    console.error('Lỗi khi tải dữ liệu Giám đốc:', error);
  }
};

onMounted(() => {
  fetchData();
});

const pendingApprovals = computed(() => approvals.value.filter((a) => a.status === 'pending'));

const urgentPendingCount = computed(() => {
  return pendingApprovals.value.filter((a) => a.urgent).length;
});

const selectedApproval = ref(null);
const showDetailModal = ref(false);
const showApproveModal = ref(false);
const showRejectModal = ref(false);
const returnToDetailAfterAction = ref(false);
const rejectReason = ref('');

const openDetailModal = (item) => {
  selectedApproval.value = item;
  returnToDetailAfterAction.value = false;
  showDetailModal.value = true;
  showApproveModal.value = false;
  showRejectModal.value = false;
};

const closeDetailModal = () => {
  showDetailModal.value = false;
  selectedApproval.value = null;
  showApproveModal.value = false;
  showRejectModal.value = false;
};

const openApproveModal = (item) => {
  selectedApproval.value = item;
  returnToDetailAfterAction.value = showDetailModal.value;
  showApproveModal.value = true;
  showDetailModal.value = false;
  showRejectModal.value = false;
};

const closeApproveModal = () => {
  showApproveModal.value = false;
  if (returnToDetailAfterAction.value) showDetailModal.value = true;
};

const openRejectModal = (item) => {
  selectedApproval.value = item;
  returnToDetailAfterAction.value = showDetailModal.value;
  showRejectModal.value = true;
  showDetailModal.value = false;
  showApproveModal.value = false;
  rejectReason.value = '';
};

const closeRejectModal = () => {
  showRejectModal.value = false;
  rejectReason.value = '';
  if (returnToDetailAfterAction.value) showDetailModal.value = true;
};

const confirmApprove = () => {
  if (!selectedApproval.value) return;

  if (selectedApproval.value.isReal) {
    if (selectedApproval.value.status === 'pending' || selectedApproval.value.statusRaw === 'CHỜ_GIÁM_ĐỐC_DUYỆT') {
      requestsAPI.directorApprove(selectedApproval.value.id);
    } else {
      requestsAPI.approve(selectedApproval.value.id);
    }
  }

  selectedApproval.value.status = 'approved';
  selectedApproval.value = null;
  showApproveModal.value = false;
  showRejectModal.value = false;
  showDetailModal.value = false;
  
  if (selectedApproval.value?.isReal) fetchData();
};

const confirmReject = async () => {
  if (!selectedApproval.value) return;
  const reason = rejectReason.value.trim();
  if (!reason) {
    await showAlert('THIẾU DỮ LIỆU', 'Vui lòng nhập lý do từ chối!');
    return;
  }

  if (selectedApproval.value.isReal) {
    requestsAPI.reject(selectedApproval.value.id, reason);
  }

  selectedApproval.value.status = 'rejected';
  selectedApproval.value.rejectReason = reason;

  selectedApproval.value = null;
  showRejectModal.value = false;
  showApproveModal.value = false;
  showDetailModal.value = false;
  rejectReason.value = '';
  
  if (selectedApproval.value?.isReal) fetchData();
};

// Tính toán conic-gradient động cho Donut Chart
const donutStyle = computed(() => {
  let gradientStr = [];
  let currentPct = 0;
  donutData.value.forEach(item => {
    let nextPct = currentPct + item.pct;
    gradientStr.push(`${item.color} ${currentPct}% ${nextPct}%`);
    currentPct = nextPct;
  });
  return {
    background: `conic-gradient(${gradientStr.join(', ')})`
  };
});

// Tính toán Scale động cho Bar Chart từ Data
const dynamicBarChart = computed(() => {
  // Lấy giá trị nhỏ nhất và lớn nhất trực tiếp từ mảng nhãn trục Y
  const yLabels = barChartYLabels.value || [];
  if (yLabels.length === 0) return [];

  const maxLabel = parseFloat(yLabels[0].replace(/,/g, ''));
  const minLabel = parseFloat(yLabels[yLabels.length - 1].replace(/,/g, ''));
  const range = maxLabel - minLabel;

  return barChartData.value.map(col => {
    // Trực tiếp dùng dữ liệu dạng raw integer mới từ sampleData_GiamDoc
    const valCurrentNum = col.current || 0;
    const targetNum = col.target || 0;

    let currentH = range > 0 ? ((valCurrentNum - minLabel) / range) * 100 : (valCurrentNum > 100 ? 100 : valCurrentNum);
    let targetH = range > 0 ? ((targetNum - minLabel) / range) * 100 : (targetNum > 100 ? 100 : targetNum);

    // Kẹp trong khoảng 0 - 100% để giao diện không bể khi vượt chuẩn
    return {
      ...col,
      currentH: Math.max(0, Math.min(currentH, 115)),
      targetH: Math.max(0, Math.min(targetH, 115))
    };
  });
});
</script>

<style scoped>
/* ════════════════════════════════════════════════
   Dark Mode Variables Override
════════════════════════════════════════════════ */
:global(.dark) {
  --bg-card: #121827;           /* Executive Deep Navy Blue (Cùng tone với GD_HoSoCaNhan) */
  --border: rgba(255, 255, 255, 0.05); /* Viền mờ lấp lánh nhẹ (glassmorphism) */
  --text-title: #ffffff;        /* Trắng tuyệt đối cho tiêu đề */
  --text-body: #94a3b8;         /* slate-400 cho nội dung */
  --text-muted: #64748b;        /* slate-500 */
  --bg-hover: rgba(255, 255, 255, 0.03); /* Lót nền hover */
  --shadow-card: 0 10px 40px -10px rgba(0, 0, 0, 0.5); /* Bóng đổ gradient tối sang trọng */
  --shadow-hover: 0 15px 50px -15px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1);

  /* Fix lỗi hiển thị màu "mờ" của các con số / icon trong Dark Mode */
  --brand-light: rgba(59, 130, 246, 0.15);
  --brand: #60a5fa;

  --danger-light: rgba(239, 68, 68, 0.15);
  --danger: #f87171;
  --danger-text: #fca5a5;

  --success-light: rgba(34, 197, 94, 0.15);
  --success: #4ade80;
  --success-text: #86efac;

  --warning-light: rgba(245, 158, 11, 0.15);
  --warning: #fbbf24;
}

/* ════════════════════════════════════════════════
   Layout Styles
════════════════════════════════════════════════ */
.dashboard {
  max-width: 1600px;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* ── Page Header ── */
.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}

.page-title {
  font-size: 22px;
  font-weight: 800;
  color: var(--text-title, #111827);
  letter-spacing: -0.03em;
  margin: 0;
}

.page-subtitle {
  font-size: 13px;
  color: var(--text-muted, #6B7280);
  margin: 4px 0 0;
  display: flex;
  align-items: center;
}

.page-header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.date-filter {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid var(--border, #E5E7EB);
  background: var(--bg-card, #fff);
  font-size: 13px;
  font-weight: 600;
  color: var(--text-body, #374151);
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: border-color 0.15s, box-shadow 0.15s;
}

.date-filter:hover {
  border-color: var(--brand, #3B82F6);
  box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
}

.date-filter .material-symbols-rounded {
  font-size: 16px;
  color: var(--text-muted, #6B7280);
}

.btn-export {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  background: var(--brand, #3B82F6);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(59,130,246,0.35);
  transition: background 0.15s, box-shadow 0.15s, transform 0.1s;
  font-family: inherit;
}

.btn-export:hover {
  background: var(--brand-hover, #2563EB);
  box-shadow: 0 4px 12px rgba(59,130,246,0.45);
  transform: translateY(-1px);
}

.btn-export .material-symbols-rounded { font-size: 17px; }

/* ── KPI Grid ── */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

@media (max-width: 1100px) { .kpi-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px)  { .kpi-grid { grid-template-columns: 1fr; } }

.kpi-card {
  background: var(--bg-card, #fff);
  border: 1px solid var(--border, #E5E7EB);
  border-radius: 16px;
  padding: 20px;
  box-shadow: var(--shadow-card);
  transition: box-shadow 0.2s, transform 0.2s, background-color 0.3s, border-color 0.3s;
  cursor: pointer;
}

.kpi-card:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-2px);
}

.kpi-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 14px;
}

.kpi-icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.kpi-icon .material-symbols-rounded {
  font-size: 20px;
  font-variation-settings: 'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24;
}

.kpi-icon--blue   { background: var(--brand-light, #DBEAFE); }
.kpi-icon--blue .material-symbols-rounded { color: var(--brand, #3B82F6); }

.kpi-icon--rose   { background: var(--danger-light, #FEE2E2); }
.kpi-icon--rose .material-symbols-rounded { color: var(--danger, #EF4444); }

.kpi-icon--green  { background: var(--success-light, #DCFCE7); }
.kpi-icon--green .material-symbols-rounded { color: var(--success, #22C55E); }

.kpi-icon--amber  { background: var(--warning-light, #FEF3C7); }
.kpi-icon--amber .material-symbols-rounded { color: var(--warning, #F59E0B); }

.kpi-badge {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 999px;
}

.kpi-badge--up   { background: var(--success-light, #DCFCE7); color: var(--success-text, #15803D); }
.kpi-badge--down { background: var(--danger-light, #FEE2E2); color: var(--danger-text, #B91C1C); }

.kpi-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--text-muted, #6B7280);
  margin: 0 0 4px;
}

.kpi-value {
  font-size: 30px;
  font-weight: 800;
  color: var(--text-title, #111827);
  letter-spacing: -0.04em;
  margin: 0 0 12px;
  line-height: 1;
}

.kpi-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.kpi-meta {
  font-size: 11px;
  color: var(--text-muted, #6B7280);
  text-align: right;
  white-space: nowrap;
}

/* Sparkline */
.kpi-sparkline {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 28px;
  flex: 1;
}

.kpi-sparkline .bar {
  flex: 1;
  border-radius: 3px 3px 0 0;
  background: var(--border, #E5E7EB);
  transition: background 0.2s;
}

.kpi-sparkline .bar--active    { background: var(--brand, #3B82F6); }
.kpi-sparkline .bar--danger    { background: var(--danger-light, #FEE2E2); }
.kpi-sparkline .bar--active-danger { background: var(--danger, #EF4444); }

/* Progress bar */
.kpi-progress-bar {
  flex: 1;
  height: 6px;
  background: var(--bg-hover, #F1F5F9);
  border-radius: 999px;
  overflow: hidden;
}

.kpi-progress-fill {
  height: 100%;
  border-radius: 999px;
  background: var(--brand, #3B82F6);
  transition: width 0.6s cubic-bezier(0.4,0,0.2,1);
}

.kpi-progress-fill--amber { background: var(--warning, #F59E0B); }

/* ── Charts Grid ── */
.charts-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 16px;
}

@media (max-width: 1100px) { .charts-grid { grid-template-columns: 1fr; } }

.chart-card {
  background: var(--bg-card, #fff);
  border: 1px solid var(--border, #E5E7EB);
  border-radius: 16px;
  padding: 22px;
  box-shadow: var(--shadow-card);
  transition: background-color 0.3s, border-color 0.3s;
}

.chart-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 20px;
}

.chart-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-title, #111827);
  margin: 0;
}

.chart-subtitle {
  font-size: 12px;
  color: var(--text-muted, #6B7280);
  margin: 3px 0 0;
}

.chart-legend {
  display: flex;
  gap: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted, #6B7280);
}

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.legend-dot--brand { background: var(--brand, #3B82F6); }
.legend-dot--amber { background: var(--warning, #F59E0B); }

/* Bar Chart */
.bar-chart {
  position: relative;
  height: 220px;
  display: flex;
}

.bar-chart-cols {
  flex: 1;
  display: flex;
  align-items: flex-end;
  gap: 8px;
  padding-bottom: 28px;
  position: relative;
}



.bar-label {
  position: absolute;
  bottom: -24px;
  font-size: 10px;
  font-weight: 600;
  color: var(--text-muted, #6B7280);
  text-align: center;
  white-space: nowrap;
}

.bar-label--active { color: var(--brand, #3B82F6); font-weight: 700; }

.y-axis-lines {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 0 28px 8px;
  width: 44px;
  flex-shrink: 0;
}

.y-label {
  font-size: 9px;
  color: var(--text-muted, #6B7280);
  text-align: right;
}

/* Donut */
.donut-wrapper {
  display: flex;
  justify-content: center;
  margin: 8px 0 20px;
}

.donut-chart-ring {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-card);
}

.donut-center {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: var(--bg-card, #fff);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 2px 8px rgba(0,0,0,0.06);
  transition: background-color 0.3s;
}

.donut-number {
  font-size: 20px;
  font-weight: 800;
  color: var(--text-title, #111827);
  letter-spacing: -0.04em;
}

.donut-unit {
  font-size: 10px;
  font-weight: 600;
  color: var(--text-muted, #6B7280);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.donut-legend {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 4px;
}

.donut-legend-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.flex { display: flex; }
.items-center { align-items: center; }
.gap-2 { gap: 8px; }

.donut-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.donut-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-body, #374151);
}

.donut-stat {
  display: flex;
  align-items: center;
  gap: 8px;
}

.donut-pct {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-title, #111827);
  min-width: 32px;
  text-align: right;
}

.donut-mini-bar {
  width: 60px;
  height: 5px;
  border-radius: 999px;
  background: var(--border, #E5E7EB);
  overflow: hidden;
}

.donut-mini-bar > div {
  height: 100%;
  border-radius: 999px;
  transition: width 0.6s cubic-bezier(0.4,0,0.2,1);
}

/* ── Bottom Grid ── */
.bottom-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 16px;
}

@media (max-width: 1100px) { .bottom-grid { grid-template-columns: 1fr; } }

.list-card {
  background: var(--bg-card, #fff);
  border: 1px solid var(--border, #E5E7EB);
  border-radius: 16px;
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: background-color 0.3s, border-color 0.3s;
}

.list-card-header {
  padding: 18px 20px 16px;
  border-bottom: 1px solid var(--border-light, #F3F4F6);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.badge-urgent {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: var(--danger-light, #FEE2E2);
  color: var(--danger-text, #B91C1C);
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 999px;
}

.approval-list { flex: 1; }

.approval-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-light, #F3F4F6);
  transition: background-color 0.15s;
}

.approval-item:last-child { border-bottom: none; }

.approval-item:hover { background-color: var(--bg-hover, #F1F5F9); }

.approval-icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.approval-icon .material-symbols-rounded {
  font-size: 20px;
  font-variation-settings: 'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24;
}

.approval-icon--amber { background: var(--warning-light, #FEF3C7); }
.approval-icon--amber .material-symbols-rounded { color: var(--warning, #F59E0B); }

.approval-icon--blue { background: var(--brand-light, #DBEAFE); }
.approval-icon--blue .material-symbols-rounded { color: var(--brand, #3B82F6); }

.approval-icon--red { background: var(--danger-light, #FEE2E2); }
.approval-icon--red .material-symbols-rounded { color: var(--danger, #EF4444); }

.approval-content { flex: 1; }

.approval-title {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--text-title, #111827);
  margin: 0 0 3px;
}

.approval-meta {
  font-size: 12px;
  color: var(--text-muted, #6B7280);
  margin: 0;
}

.urgent-meta { color: var(--danger, #EF4444) !important; font-weight: 600; }

.approval-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.btn-reject {
  padding: 6px 14px;
  border-radius: 7px;
  border: 1px solid var(--border, #E5E7EB);
  background: transparent;
  color: var(--text-body, #374151);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: background-color 0.15s, border-color 0.15s;
}

.btn-reject:hover {
  background: var(--bg-hover, #F1F5F9);
  border-color: var(--text-muted);
}

.btn-approve {
  padding: 6px 14px;
  border-radius: 7px;
  border: none;
  background: var(--brand, #3B82F6);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  box-shadow: 0 1px 4px rgba(59,130,246,0.3);
  transition: background 0.15s, box-shadow 0.15s;
}

.btn-approve:hover {
  background: var(--brand-hover, #2563EB);
  box-shadow: 0 3px 8px rgba(59,130,246,0.4);
}

.btn-schedule {
  background: #1E293B;
  border: 1px solid #334155;
  color: #F1F5F9;
  box-shadow: 0 1px 4px rgba(0,0,0,0.3);
}
.btn-schedule:hover { background: #334155 !important; }

.list-card-footer {
  padding: 14px;
  background: var(--bg-page, #F8FAFC);
  border-top: 1px solid var(--border-light, #F3F4F6);
  border: none;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted, #6B7280);
  cursor: pointer;
  font-family: inherit;
  transition: color 0.15s, background-color 0.15s;
}

.list-card-footer:hover {
  color: var(--text-title, #111827);
  background: var(--bg-hover, #F1F5F9);
}

/* Events Card — always dark themed regardless of light/dark toggle */
.events-card {
  background: #0F172A;
  border: 1px solid #1E3A5F;
  border-radius: 16px;
  padding: 22px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 4px 16px rgba(59,130,246,0.1);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.events-glow {
  position: absolute;
  top: -60px;
  right: -60px;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%);
  pointer-events: none;
}

.events-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}

.events-icon {
  color: var(--warning, #F59E0B);
  font-variation-settings: 'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24;
  font-size: 20px;
}

.events-title {
  font-size: 15px;
  font-weight: 700;
  color: #F1F5F9;
  margin: 0;
}

/* Timeline */
.timeline {
  flex: 1;
  position: relative;
  padding-left: 20px;
}

.timeline-line {
  position: absolute;
  left: 6px;
  top: 6px;
  bottom: 0;
  width: 1px;
  background: linear-gradient(to bottom, rgba(255,255,255,0.15), transparent);
}

.timeline-item {
  position: relative;
  margin-bottom: 20px;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.timeline-item--active { opacity: 1; }

.timeline-dot {
  position: absolute;
  left: -17px;
  top: 4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #334155;
  border: 2px solid #475569;
}

.timeline-dot--active {
  background: var(--warning, #F59E0B);
  border-color: var(--warning, #F59E0B);
  box-shadow: 0 0 10px rgba(245,158,11,0.5);
  width: 10px;
  height: 10px;
  left: -18px;
}

.timeline-time {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.35);
  margin: 0 0 3px;
}

.active-time { color: var(--warning, #F59E0B); }

.timeline-title {
  font-size: 13px;
  font-weight: 600;
  color: #F1F5F9;
  margin: 0 0 3px;
}

.timeline-place {
  font-size: 11px;
  color: rgba(255,255,255,0.4);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 2px;
}

.timeline-place .material-symbols-rounded { color: rgba(255,255,255,0.3); }

/* Reminder */
.reminder-card {
  margin-top: 18px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  padding: 14px 16px;
  backdrop-filter: blur(8px);
}

.reminder-label {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--warning, #F59E0B);
  margin: 0 0 6px;
}

.reminder-label .material-symbols-rounded { color: var(--warning, #F59E0B); }

.reminder-text {
  font-size: 12.5px;
  color: rgba(255,255,255,0.7);
  font-style: italic;
  line-height: 1.55;
  margin: 0 0 10px;
}

.reminder-edit {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: rgba(255,255,255,0.5);
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  padding: 0;
  transition: color 0.15s;
}

.reminder-edit:hover { color: #F59E0B; }

/* Modal fades */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>