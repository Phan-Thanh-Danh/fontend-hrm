<template>
  <div class="space-y-6 pb-8">
    <!-- Header Area: SaaS Enterprise Style -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent text-left px-1">
      <div class="bg-transparent text-left">
        <h1 class="text-xl font-bold text-[var(--sys-text-primary)] mb-0.5 tracking-tight uppercase">Quản lý Tài sản Phòng ban</h1>
        <p class="text-[13px] text-[var(--sys-text-secondary)] font-medium flex items-center gap-3">
          Kiểm kê danh mục thiết bị và cơ sở vật chất thuộc quyền quản lý khối IT.
          <span class="px-2 py-0.5 bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] rounded-md border border-[var(--sys-brand-border)] text-[10px] font-bold uppercase tracking-widest shadow-sm">ASSET TRACKING MODE</span>
        </p>
      </div>
    </div>

    <!-- Assets Inventory Grid: Premium Card Style -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div v-for="asset in assets" :key="asset.id" 
        class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden flex flex-col group hover:border-[var(--sys-brand-solid)] transition-all hover:shadow-lg">
        <div class="p-6 flex-grow space-y-5">
          <div class="flex items-center gap-5">
            <div class="w-16 h-16 rounded-md bg-[var(--sys-bg-page)] border border-[var(--sys-border-subtle)] flex items-center justify-center text-[var(--sys-brand-solid)] group-hover:scale-105 transition-transform shadow-inner">
              <span class="material-symbols-rounded text-[36px] font-bold">{{ asset.icon }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <h4 class="text-[14px] font-bold text-[var(--sys-text-primary)] m-0 uppercase tracking-tight group-hover:text-[var(--sys-brand-solid)] transition-colors leading-tight">{{ asset.name }}</h4>
              <p class="text-[11px] font-bold text-[var(--sys-brand-solid)] uppercase tracking-widest opacity-80 leading-none">{{ asset.code }} <span class="mx-1 opacity-30 text-slate-400">|</span> {{ asset.category }}</p>
            </div>
          </div>

          <div class="space-y-3 py-4 border-t border-b border-[var(--sys-border-subtle)] border-dashed border-t-2 border-b-2">
             <div class="flex justify-between items-center text-[12.5px] font-bold text-[var(--sys-text-primary)]">
              <span class="text-[10px] font-bold uppercase tracking-widest text-[var(--sys-text-secondary)] opacity-60">Người chịu trách nhiệm:</span>
              <span class="text-[var(--sys-brand-solid)]">{{ asset.user }}</span>
            </div>
            <div class="flex justify-between items-center text-[12.5px] font-bold text-[var(--sys-text-primary)]">
              <span class="text-[10px] font-bold uppercase tracking-widest text-[var(--sys-text-secondary)] opacity-60">Hiện trạng vận hành:</span>
              <span :class="['px-2.5 py-0.5 rounded-md font-bold text-[10px] uppercase border shadow-sm tracking-widest', asset.status === 'Tốt' ? 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]' : 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)]']">{{ asset.status }}</span>
            </div>
          </div>
        </div>

        <div class="px-5 py-3.5 bg-[var(--sys-bg-page)]/30 border-t border-[var(--sys-border-subtle)] flex justify-between items-center transition-all duration-300">
          <span class="text-[10px] font-bold text-[var(--sys-text-disabled)] uppercase tracking-widest leading-none">Bàn giao: {{ asset.date }}</span>
          <button class="text-[10px] font-bold text-[var(--sys-brand-solid)] uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-opacity">
            LỊCH SỬ BẢO TRÌ
            <span class="material-symbols-rounded text-[16px] font-bold">history_edu</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { assetsAPI, employeesAPI } from '@/data/mockDB.js'

const DEPT_ID = 2
const assets = ref([])

const CATEGORY_ICON_MAP = {
  'Laptop': 'laptop_mac',
  'Màn hình': 'monitor',
  'Bàn phím': 'keyboard',
  'Chuột': 'mouse',
  'Máy in': 'print',
  'Server': 'dns',
}

const STATUS_MAP = {
  'ĐANG_SỬ_DỤNG': 'Tốt',
  'TRONG_KHO': 'Trong kho',
  'HỎNG': 'Cần bảo trì',
}

const loadData = () => {
  const allAssets = assetsAPI.getAll()
  const allEmps = employeesAPI.getAll().filter(e => e.department_id === DEPT_ID)
  const empIds = allEmps.map(e => e.employee_id)

  assets.value = allAssets
    .filter(a => a.assigned_to && empIds.includes(a.assigned_to))
    .slice(0, 9)
    .map(a => {
      const emp = allEmps.find(e => e.employee_id === a.assigned_to)
      const purchaseDate = a.purchase_date ? new Date(a.purchase_date).toLocaleDateString('vi-VN') : 'N/A'
      return {
        id: a.asset_id,
        name: a.asset_name.toUpperCase(),
        code: a.asset_code,
        category: a.category,
        user: emp?.full_name || 'N/A',
        status: STATUS_MAP[a.status] || a.status,
        date: purchaseDate,
        icon: CATEGORY_ICON_MAP[a.category] || 'devices'
      }
    })
}

onMounted(loadData)
</script>

<style scoped>
* { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
</style>
