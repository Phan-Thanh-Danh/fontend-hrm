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
        <button class="flex items-center gap-2.5 px-4 md:px-5 py-2.5 bg-white border border-slate-200 rounded-2xl text-[13px] font-[800] text-[#1d3d70] hover:bg-slate-50 transition-all shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] font-inherit">
          <span class="material-symbols-rounded text-[18px] text-slate-500" style="font-variation-settings: 'FILL' 1;">calendar_today</span>
          30 ngày qua
        </button>
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
          <div class="bar-chart-cols">
            <div class="bar-col" v-for="(col, i) in dynamicBarChart" :key="i">
              <div class="bar-col-inner">
                <div class="bar-target" :style="`height:${col.targetH}%`"></div>
                <div class="bar-current" :class="col.active ? 'bar-current--active' : ''" :style="`height:${col.currentH}%`">
                  <div class="bar-tooltip px-3 py-1.5 bg-slate-800 text-white rounded-md text-[11px] z-50 whitespace-nowrap whitespace-pre flex flex-col items-center shadow-lg pointer-events-none transition-opacity duration-200" style="top: -42px;">
                    <span class="font-bold text-blue-300">Hiện tại: {{ col.current }}</span>
                    <span class="font-bold text-orange-300">Mục tiêu: {{ col.target }}</span>
                  </div>
                </div>
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
            {{ urgentCount < 10 ? '0' + urgentCount : urgentCount }} khẩn cấp
          </span>
        </div>

        <div class="approval-list">
          <div
            v-for="item in pendingApprovals"
            :key="item.id"
            class="approval-item"
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
              >{{ action }}</button>
            </div>
          </div>
        </div>

        <button class="list-card-footer">
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
  </div>
</template>

<script setup>
import { computed } from 'vue';
import {
  kpiCards,
  barChartData,
  barChartYLabels,
  donutData,
  donutTotal,
  pendingApprovals,
  urgentCount,
  timelineEvents,
  reminderText,
} from '@/data/sampleData_GiamDoc.js';

// Tính toán conic-gradient động cho Donut Chart
const donutStyle = computed(() => {
  let gradientStr = [];
  let currentPct = 0;
  donutData.forEach(item => {
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
  const maxLabel = parseFloat(barChartYLabels[0].replace(/,/g, ''));
  const minLabel = parseFloat(barChartYLabels[barChartYLabels.length - 1].replace(/,/g, ''));
  const range = maxLabel - minLabel;

  return barChartData.map(col => {
    // Trực tiếp dùng dữ liệu dạng raw integer mới từ sampleData_GiamDoc
    const valCurrentNum = col.current || 0;
    const targetNum = col.target || 0;

    let currentH = range > 0 ? ((valCurrentNum - minLabel) / range) * 100 : (valCurrentNum > 100 ? 100 : valCurrentNum);
    let targetH = range > 0 ? ((targetNum - minLabel) / range) * 100 : (targetNum > 100 ? 100 : targetNum);

    // Kẹp trong khoảng 0 - 100% để giao diện không bể khi vượt chuẩn
    return {
      ...col,
      currentH: Math.max(0, Math.min(currentH, 100)),
      targetH: Math.max(0, Math.min(targetH, 100))
    };
  });
});
</script>

<style scoped>
/* ════════════════════════════════════════════════
   Layout inherits CSS vars from Layout_GiamDoc
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

.bar-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 100%;
  justify-content: flex-end;
}

.bar-col-inner {
  width: 100%;
  height: calc(100% - 24px);
  display: flex;
  align-items: flex-end;
  position: relative;
}

.bar-target {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--border, #E5E7EB);
  border-radius: 6px 6px 0 0;
  transition: background 0.3s;
}

.bar-current {
  position: absolute;
  bottom: 0;
  left: 4px;
  right: 4px;
  background: var(--brand, #3B82F6);
  border-radius: 5px 5px 0 0;
  opacity: 0.5;
  cursor: pointer;
  transition: opacity 0.2s;
}

.bar-current--active {
  opacity: 1;
  box-shadow: 0 -4px 12px rgba(59,130,246,0.35);
}

.bar-current:hover { opacity: 0.85; }

.bar-tooltip {
  position: absolute;
  top: -28px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--text-title, #111827);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  padding: 3px 7px;
  border-radius: 5px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s;
}

.bar-current:hover .bar-tooltip { opacity: 1; }

.bar-label {
  position: absolute;
  bottom: 0;
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
</style>