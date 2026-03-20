<template>
  <div class="space-y-4 pb-6">
    <!-- Header Area: Executive Styling -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent text-left px-1">
      <div class="bg-transparent text-left">
        <h1 class="text-xl font-bold text-[var(--sys-text-primary)] mb-0.5 tracking-tight uppercase italic">Quản lý Hợp đồng Phòng ban</h1>
        <p class="text-[13px] text-[var(--sys-text-secondary)] opacity-100 italic flex items-center gap-3">
          Tra cứu thông tin và thời hạn các loại hợp đồng lao động khối IT.
          <span class="px-2 py-0.5 bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] rounded-md border border-[var(--sys-brand-border)] text-[9px] font-black uppercase tracking-widest italic shadow-sm">READ-ONLY ACCESS</span>
        </p>
      </div>
    </div>

    <!-- Contract Table: Compact and Synchronized -->
    <div class="bg-[var(--sys-bg-surface)] rounded-lg border border-[var(--sys-border-subtle)] shadow-sm overflow-hidden">
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-left border-collapse">
          <thead class="bg-[var(--sys-bg-page)]/40">
            <tr>
              <th class="px-6 py-4 text-[12px] font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-[0.12em] italic">Mã Hợp đồng</th>
              <th class="px-6 py-4 text-[12px] font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-[0.12em] italic">Nhân sự thực thi</th>
              <th class="px-6 py-4 text-[12px] font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-[0.12em] italic">Loại văn bản</th>
              <th class="px-6 py-4 text-[12px] font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-[0.12em] italic">Thời gian hiệu lực</th>
              <th class="px-6 py-4 text-[12px] font-bold text-[var(--sys-text-secondary)] border-b border-[var(--sys-border-subtle)] uppercase tracking-[0.12em] italic text-right">Trạng thái pháp lý</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--sys-border-subtle)]">
            <tr v-for="contract in contracts" :key="contract.id" class="hover:bg-[var(--sys-bg-hover)] transition-all duration-200 group">
              <td class="px-6 py-4 text-[13px] font-black text-[var(--sys-text-primary)] italic underline decoration-[var(--sys-brand-soft)] decoration-2 underline-offset-4 tracking-tight">
                {{ contract.code }}
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-md bg-[var(--sys-brand-soft)] text-[var(--sys-brand-solid)] flex items-center justify-center font-black text-[10px] uppercase italic border border-[var(--sys-brand-border)]">
                    {{ contract.name.charAt(0) }}
                  </div>
                  <div class="flex flex-col">
                    <h4 class="text-[13.5px] font-bold text-[var(--sys-text-primary)] m-0 uppercase italic tracking-tight group-hover:text-[var(--sys-brand-solid)] transition-colors">{{ contract.name }}</h4>
                    <p class="text-[10px] font-bold text-[var(--sys-text-secondary)] m-0 uppercase italic tracking-wider opacity-60">{{ contract.position }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-[12.5px] font-bold text-[var(--sys-text-secondary)] uppercase italic tracking-tight">
                {{ contract.type }}
              </td>
              <td class="px-6 py-4 text-[12.5px] font-black text-[var(--sys-text-primary)] italic opacity-80">
                {{ contract.range }}
              </td>
              <td class="px-6 py-4 text-right">
                <span :class="['px-3 py-1 rounded-md font-black text-[10px] uppercase italic border shadow-sm tracking-widest', contract.status === 'Đang hiệu lực' ? 'bg-[var(--sys-success-soft)] text-[var(--sys-success-text)] border-[var(--sys-success-border)]' : 'bg-[var(--sys-warning-soft)] text-[var(--sys-warning-text)] border-[var(--sys-warning-border)]']">
                  {{ contract.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const contracts = ref([
  { id: 1, code: 'HDLD-2023-01', name: 'Nguyễn Văn Anh', position: 'Senior Developer', type: 'HĐ Không xác định thời hạn', range: 'Từ 01/01/2023', status: 'Đang hiệu lực' },
  { id: 2, code: 'HDLD-2024-05', name: 'Lê Diệu Linh', position: 'Frontend Developer', type: 'HĐ 01 Năm', range: '01/01/2024 - 31/12/2024', status: 'Sắp hết hạn' },
  { id: 3, code: 'HDLD-2024-12', name: 'Trần Minh Hải', position: 'UI/UX Designer', type: 'HĐ Thử việc', range: '15/02/2024 - 15/04/2024', status: 'Đang hiệu lực' },
])
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { height: 5px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: var(--sys-border-subtle); border-radius: 5px; }
* { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
</style>
