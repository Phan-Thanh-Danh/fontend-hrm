<template>
  <div class="space-y-6 pb-8">
    <!-- Header Area -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent text-left px-1">
      <div class="bg-transparent text-left">
        <h1 class="text-xl font-bold text-[var(--sys-text-primary)] mb-0.5 tracking-tight uppercase">Quyết toán Tiền lương Phòng ban</h1>
        <p class="text-[13px] text-[var(--sys-text-secondary)] font-medium flex items-center gap-3">
          Thống kê chi phí nhân sự và quỹ lương tháng của đơn vị IT.
          <span class="px-2 py-0.5 bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] rounded-md border border-[var(--sys-brand-border)] text-[10px] font-bold uppercase tracking-widest shadow-sm">CONFIDENTIAL VIEW</span>
        </p>
      </div>
      <div class="flex items-center gap-3">
        <Dropdown v-model="selectedPeriod" :options="periodOptions" class="min-w-[170px] h-11 shadow-sm" />
        <button
          @click="exportPDF"
          class="h-11 px-5 bg-[var(--sys-brand-solid)] text-white rounded-md text-[11px] font-bold uppercase tracking-wide hover:brightness-95 transition-all flex items-center gap-2 shadow-sm"
        >
          <span class="material-symbols-rounded text-[18px]">download</span>
          Tải PDF
        </button>
      </div>
    </div>

    <!-- Summary Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div v-for="stat in quickStats" :key="stat.label"
        class="bg-[var(--sys-bg-surface)] p-6 rounded-lg border border-[var(--sys-border-subtle)] shadow-sm flex items-center justify-between group hover:border-[var(--sys-brand-solid)] transition-all hover:shadow-lg">
        <div>
          <p class="text-[11px] font-bold text-[var(--sys-text-secondary)] uppercase tracking-widest mb-1 opacity-60">{{ stat.label }}</p>
          <h3 :class="['text-2xl font-bold leading-none tracking-tight', stat.textClass]">{{ stat.value }}</h3>
        </div>
        <div :class="['w-12 h-12 rounded-md flex items-center justify-center border shadow-sm group-hover:scale-105 transition-transform duration-300', stat.bgClass, stat.colorClass, stat.borderClass]">
          <span class="material-symbols-rounded text-2xl font-bold">{{ stat.icon }}</span>
        </div>
      </div>
    </div>

    <!-- Payroll Table -->
    <div class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden">
      <div class="px-5 py-3.5 border-b border-[var(--sys-border-subtle)] flex justify-between items-center bg-[var(--sys-bg-page)]/30">
        <h3 class="text-[11px] font-bold text-[var(--sys-text-primary)] uppercase tracking-widest m-0 flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-md bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] border border-[var(--sys-brand-border)] flex items-center justify-center shrink-0">
            <span class="material-symbols-rounded text-[20px] font-bold">assignment_turned_in</span>
          </div>
          BẢNG KÊ CHI TIẾT THU NHẬP — KỲ {{ selectedPeriod }}
        </h3>
        <span class="text-[11px] font-bold text-[var(--sys-text-secondary)] opacity-60">{{ payrollList.length }} nhân sự</span>
      </div>
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-left border-collapse min-w-[1000px]">
          <thead class="bg-[var(--sys-bg-page)]/40">
            <tr>
              <th class="px-6 py-4 text-[11px] font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-widest">STT</th>
              <th class="px-6 py-4 text-[11px] font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-widest">Nhân sự thực hiện</th>
              <th class="px-6 py-4 text-[11px] font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-widest">Lương cơ bản</th>
              <th class="px-6 py-4 text-[11px] font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-widest">Phụ cấp & Thưởng</th>
              <th class="px-6 py-4 text-[11px] font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-widest">Các khoản trừ</th>
              <th class="px-6 py-4 text-[11px] font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-widest text-right">Tổng thực lĩnh</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--sys-border-subtle)]">
            <tr v-for="(staff, idx) in payrollList" :key="staff.name" class="hover:bg-[var(--sys-bg-hover)] transition-all duration-200 group">
              <td class="px-6 py-4 text-[13px] font-bold text-[var(--sys-text-secondary)] opacity-60">{{ idx + 1 }}</td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-md bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] flex items-center justify-center font-bold text-xs text-[var(--sys-brand-solid)] shadow-sm group-hover:bg-[var(--sys-brand-solid)] group-hover:text-white transition-all">
                    {{ staff.name.charAt(0) }}
                  </div>
                  <div class="flex flex-col">
                    <h4 class="text-[13px] font-bold text-[var(--sys-text-primary)] m-0 uppercase tracking-tight group-hover:text-[var(--sys-brand-solid)] transition-colors">{{ staff.name }}</h4>
                    <p class="text-[11px] font-bold text-[var(--sys-text-secondary)] m-0 uppercase tracking-widest opacity-60 leading-none">{{ staff.position }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-[13px] font-bold text-[var(--sys-text-primary)] opacity-80">{{ staff.base }} đ</td>
              <td class="px-6 py-4 text-[13px] font-bold text-[var(--sys-success-text)]">+ {{ staff.bonus }} đ</td>
              <td class="px-6 py-4 text-[13px] font-bold text-[var(--sys-danger-text)]">- {{ staff.deduct }} đ</td>
              <td class="px-6 py-4 text-right">
                <span class="text-[14px] font-bold text-[var(--sys-brand-solid)] tracking-tight">{{ staff.total }} đ</span>
              </td>
            </tr>
          </tbody>
          <tfoot class="bg-[var(--sys-bg-page)]/60 border-t-2 border-[var(--sys-border-subtle)]">
            <tr>
              <td colspan="2" class="px-6 py-4 text-[12px] font-bold text-[var(--sys-text-primary)] uppercase tracking-widest">TỔNG CỘNG</td>
              <td class="px-6 py-4 text-[13px] font-bold text-[var(--sys-text-primary)]">{{ totalBase }} đ</td>
              <td class="px-6 py-4 text-[13px] font-bold text-[var(--sys-success-text)]">+ {{ totalBonus }} đ</td>
              <td class="px-6 py-4 text-[13px] font-bold text-[var(--sys-danger-text)]">- {{ totalDeduct }} đ</td>
              <td class="px-6 py-4 text-right text-[15px] font-bold text-[var(--sys-brand-solid)]">{{ totalNet }} đ</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import Dropdown from '@/components/Dropdown.vue'
import { salariesAPI, employeesAPI, positionsAPI, departmentsAPI } from '@/data/mockDB.js'

const selectedPeriod = ref('03/2026')
const DEPT_ID = 2

const periodOptions = [
  { label: 'Tháng 03/2026', value: '03/2026' },
  { label: 'Tháng 02/2026', value: '02/2026' },
  { label: 'Tháng 01/2026', value: '01/2026' },
  { label: 'Tháng 12/2025', value: '12/2025' },
  { label: 'Tháng 11/2025', value: '11/2025' },
]

const payrollList = ref([])
const quickStats = ref([])
const totalBase = ref('0')
const totalBonus = ref('0')
const totalDeduct = ref('0')
const totalNet = ref('0')

const fmt = (num) => new Intl.NumberFormat('vi-VN').format(Math.round(num))

const loadData = () => {
  const allEmps = employeesAPI.getAll().filter(e => e.department_id === DEPT_ID && e.status !== 'ĐÃ_NGHỈ_VIỆC')
  const allSals = salariesAPI.getAll()
  const allPositions = positionsAPI.getAll()

  let sumBase = 0, sumBonus = 0, sumDeduct = 0

  payrollList.value = allEmps.map(emp => {
    const sal = allSals.find(s => s.employee_id === emp.employee_id)
    const pos = allPositions.find(p => p.position_id === emp.position_id)
    const base = sal?.basic_salary || (15 + (emp.employee_id % 10)) * 1_000_000
    const bonus = sal?.allowance || 1_500_000
    const deduct = sal?.tax || Math.round(base * 0.105)
    const total = base + bonus - deduct

    sumBase += base
    sumBonus += bonus
    sumDeduct += deduct

    return {
      id: emp.employee_id,
      name: emp.full_name,
      position: pos?.position_name?.toUpperCase() || 'CHUYÊN VIÊN IT',
      base: fmt(base),
      bonus: fmt(bonus),
      deduct: fmt(deduct),
      total: fmt(total),
      baseRaw: base,
      bonusRaw: bonus,
      deductRaw: deduct,
      totalRaw: total,
    }
  })

  totalBase.value = fmt(sumBase)
  totalBonus.value = fmt(sumBonus)
  totalDeduct.value = fmt(sumDeduct)
  totalNet.value = fmt(sumBase + sumBonus - sumDeduct)

  const netTotal = sumBase + sumBonus - sumDeduct
  quickStats.value = [
    { label: 'QUỸ LƯƠNG TỔNG', value: fmt(netTotal) + ' đ', icon: 'account_balance_wallet', bgClass: 'bg-[var(--sys-brand-soft)]', colorClass: 'text-[var(--sys-brand-solid)]', borderClass: 'border-[var(--sys-brand-border)]', textClass: 'text-[var(--sys-text-primary)]' },
    { label: 'THƯỞNG & PHỤ CẤP', value: fmt(sumBonus) + ' đ', icon: 'stars', bgClass: 'bg-[var(--sys-success-soft)]', colorClass: 'text-[var(--sys-success-text)]', borderClass: 'border-[var(--sys-success-border)]', textClass: 'text-[var(--sys-success-text)]' },
    { label: 'TỔNG KHẤU TRỪ', value: '- ' + fmt(sumDeduct) + ' đ', icon: 'money_off', bgClass: 'bg-[var(--sys-danger-soft)]', colorClass: 'text-[var(--sys-danger-text)]', borderClass: 'border-[var(--sys-danger-border)]', textClass: 'text-[var(--sys-danger-text)]' },
  ]
}

onMounted(loadData)
watch(selectedPeriod, loadData)

// ─── PDF Export ─────────────────────────────────────────────────────────────
const exportPDF = () => {
  const dept = departmentsAPI.getById(DEPT_ID)
  const deptName = dept?.department_name || 'Phòng Công Nghệ Thông Tin'
  const periodLabel = periodOptions.find(p => p.value === selectedPeriod.value)?.label || selectedPeriod.value
  const printDate = new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })

  const rows = payrollList.value.map((s, i) => `
    <tr>
      <td style="text-align:center">${i + 1}</td>
      <td>
        <div style="font-weight:700;font-size:13px">${s.name}</div>
        <div style="font-size:10px;color:#64748b;margin-top:2px">${s.position}</div>
      </td>
      <td style="text-align:right">${s.base} đ</td>
      <td style="text-align:right;color:#16a34a">+ ${s.bonus} đ</td>
      <td style="text-align:right;color:#dc2626">- ${s.deduct} đ</td>
      <td style="text-align:right;font-weight:700;color:#1d4ed8">${s.total} đ</td>
    </tr>
  `).join('')

  const html = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <title>Bảng Lương ${periodLabel} — ${deptName}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', Arial, sans-serif; font-size: 12px; color: #1e293b; background: #fff; padding: 32px 40px; }

    /* ── HEADER ── */
    .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 28px; padding-bottom: 20px; border-bottom: 2px solid #1d4ed8; }
    .company-block {}
    .company-name { font-size: 18px; font-weight: 800; color: #1d4ed8; letter-spacing: -0.3px; }
    .company-sub { font-size: 10px; color: #64748b; margin-top: 3px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.08em; }

    .doc-block { text-align: right; }
    .doc-title { font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; }
    .doc-period { font-size: 22px; font-weight: 900; color: #1e293b; margin-top: 4px; }
    .doc-date   { font-size: 10px; color: #94a3b8; margin-top: 3px; }

    /* ── TITLE BAR ── */
    .title-bar { background: #1d4ed8; color: #fff; padding: 14px 20px; border-radius: 8px; margin-bottom: 20px; }
    .title-bar h1 { font-size: 16px; font-weight: 800; letter-spacing: 0.03em; }
    .title-bar p  { font-size: 11px; margin-top: 4px; opacity: 0.8; }

    /* ── SUMMARY CARDS ── */
    .summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 24px; }
    .card { border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 18px; background: #f8fafc; }
    .card-label { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #64748b; margin-bottom: 5px; }
    .card-value { font-size: 17px; font-weight: 800; color: #1e293b; }
    .card.blue  .card-value { color: #1d4ed8; }
    .card.green .card-value { color: #16a34a; }
    .card.red   .card-value { color: #dc2626; }

    /* ── TABLE ── */
    table { width: 100%; border-collapse: collapse; font-size: 12px; }
    thead tr { background: #1d4ed8; color: #fff; }
    thead th { padding: 10px 14px; text-align: left; font-weight: 700; font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; white-space: nowrap; }
    thead th:last-child { text-align: right; }
    tbody tr { border-bottom: 1px solid #f1f5f9; }
    tbody tr:nth-child(even) { background: #f8fafc; }
    tbody tr:hover { background: #eff6ff; }
    tbody td { padding: 11px 14px; vertical-align: middle; }
    tfoot tr { background: #1e293b; color: #fff; }
    tfoot td { padding: 12px 14px; font-weight: 700; font-size: 13px; }
    tfoot td:last-child { text-align: right; color: #93c5fd; }

    /* ── SIGNATURES ── */
    .signatures { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 40px; padding-top: 20px; border-top: 1px dashed #cbd5e1; }
    .sig-block { text-align: center; }
    .sig-title  { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; }
    .sig-note   { font-size: 9px; color: #94a3b8; margin-top: 3px; }
    .sig-line   { height: 60px; border-bottom: 1px solid #cbd5e1; margin-top: 12px; }
    .sig-name   { font-size: 11px; font-weight: 700; margin-top: 6px; color: #1e293b; }

    /* ── FOOTER ── */
    .footer { margin-top: 28px; text-align: center; font-size: 9px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 14px; }
    .confidential { display: inline-block; background: #fee2e2; color: #dc2626; font-size: 9px; font-weight: 700; padding: 2px 8px; border-radius: 4px; border: 1px solid #fca5a5; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px; }

    @media print {
      body { padding: 16px 20px; }
      .title-bar { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      thead tr { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      tfoot tr { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>

  <!-- HEADER -->
  <div class="header">
    <div class="company-block">
      <div class="company-name">AET HRM SYSTEM</div>
      <div class="company-sub">Hệ thống quản lý nhân sự doanh nghiệp</div>
      <div class="company-sub" style="margin-top:6px">Phòng ban: <strong>${deptName}</strong></div>
    </div>
    <div class="doc-block">
      <div class="doc-title">Bảng lương kỳ</div>
      <div class="doc-period">${periodLabel}</div>
      <div class="doc-date">Ngày xuất: ${printDate}</div>
    </div>
  </div>

  <!-- TITLE BAR -->
  <div class="title-bar">
    <h1>BẢNG THANH TOÁN TIỀN LƯƠNG THÁNG</h1>
    <p>${deptName} &nbsp;·&nbsp; ${periodLabel} &nbsp;·&nbsp; Tổng: ${payrollList.value.length} nhân sự</p>
  </div>

  <!-- SUMMARY CARDS -->
  <div class="summary">
    <div class="card blue">
      <div class="card-label">Tổng quỹ lương thực lĩnh</div>
      <div class="card-value">${totalNet.value} đ</div>
    </div>
    <div class="card green">
      <div class="card-label">Tổng thưởng & phụ cấp</div>
      <div class="card-value">${totalBonus.value} đ</div>
    </div>
    <div class="card red">
      <div class="card-label">Tổng các khoản khấu trừ</div>
      <div class="card-value">- ${totalDeduct.value} đ</div>
    </div>
  </div>

  <!-- DATA TABLE -->
  <table>
    <thead>
      <tr>
        <th style="width:40px">STT</th>
        <th>Họ và tên / Chức vụ</th>
        <th style="text-align:right">Lương cơ bản</th>
        <th style="text-align:right">Phụ cấp & thưởng</th>
        <th style="text-align:right">Khấu trừ</th>
        <th style="text-align:right">Thực lĩnh</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
    <tfoot>
      <tr>
        <td colspan="2">TỔNG CỘNG (${payrollList.value.length} nhân sự)</td>
        <td style="text-align:right">${totalBase.value} đ</td>
        <td style="text-align:right;color:#86efac">+ ${totalBonus.value} đ</td>
        <td style="text-align:right;color:#fca5a5">- ${totalDeduct.value} đ</td>
        <td style="text-align:right">${totalNet.value} đ</td>
      </tr>
    </tfoot>
  </table>

  <!-- SIGNATURES -->
  <div class="signatures">
    <div class="sig-block">
      <div class="sig-title">Người lập bảng</div>
      <div class="sig-note">(Ký, ghi rõ họ tên)</div>
      <div class="sig-line"></div>
      <div class="sig-name">&nbsp;</div>
    </div>
    <div class="sig-block">
      <div class="sig-title">Trưởng phòng xác nhận</div>
      <div class="sig-note">(Ký, ghi rõ họ tên)</div>
      <div class="sig-line"></div>
      <div class="sig-name">Trần Thanh Tâm</div>
    </div>
    <div class="sig-block">
      <div class="sig-title">Giám đốc phê duyệt</div>
      <div class="sig-note">(Ký, đóng dấu)</div>
      <div class="sig-line"></div>
      <div class="sig-name">&nbsp;</div>
    </div>
  </div>

  <!-- FOOTER -->
  <div class="footer">
    <div class="confidential">BÍ MẬT — CHỈ SỬ DỤNG NỘI BỘ</div>
    <div>Tài liệu được tạo tự động bởi AET HRM System &nbsp;·&nbsp; ${printDate} &nbsp;·&nbsp; ${periodLabel}</div>
    <div style="margin-top:3px">Mọi sao chép, phân phối trái phép đều bị nghiêm cấm theo Chính sách bảo mật thông tin nội bộ.</div>
  </div>

  <script>
    window.onload = function() { window.print(); }
  <\/script>
</body>
</html>`

  const win = window.open('', '_blank', 'width=1100,height=800,scrollbars=yes')
  if (win) {
    win.document.write(html)
    win.document.close()
  }
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { height: 5px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: var(--sys-border-subtle); border-radius: 5px; }
* { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
</style>
