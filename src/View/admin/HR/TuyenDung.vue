<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-black text-slate-900 tracking-tight">Quản lý Tuyển dụng</h1>
        <p class="text-slate-500 text-sm font-medium italic">Quản lý tin tuyển dụng, theo dõi ứng viên và đánh giá hồ sơ bằng AI.</p>
      </div>
    </div>

    <!-- Main Content Split -->
    <div class="grid grid-cols-1 xl:grid-cols-12 gap-6">
      <!-- Left Column: Filter & Table -->
      <div class="xl:col-span-7 space-y-4">
        <!-- Filters -->
        <div class="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div class="md:col-span-5 relative group">
              <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input 
                type="text" 
                placeholder="Tìm tên, vị trí..." 
                class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold"
              >
            </div>
            <div class="md:col-span-4">
              <Dropdown 
                v-model="filterPosition"
                :options="positionOptions"
                placeholder="Vị trí: Tất cả"
              />
            </div>
            <div class="md:col-span-3">
              <Dropdown 
                v-model="filterAiScore"
                :options="aiScoreOptions"
                placeholder="Điểm AI: > 80"
              />
            </div>
          </div>
        </div>

        <!-- Candidate Table -->
        <div class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden text-sm">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-slate-50/50">
                  <th class="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic">Ứng viên</th>
                  <th class="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic">Vị trí</th>
                  <th class="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic text-center">Điểm AI</th>
                  <th class="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 italic">Ngày nộp</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(candidate, index) in filteredCandidates" :key="candidate.id" 
                    @click="activeCandidateId = candidate.id"
                    class="group transition-all duration-200 cursor-pointer border-b border-slate-50"
                    :class="activeCandidateId === candidate.id ? 'bg-blue-50/50' : 'bg-white hover:bg-slate-50'">
                  <td class="px-6 py-4 relative bg-transparent">
                    <div v-if="activeCandidateId === candidate.id" class="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"></div>
                    <div class="flex items-center gap-3 bg-transparent">
                      <div class="w-10 h-10 rounded-xl bg-transparent border border-slate-200 text-slate-900 font-bold flex items-center justify-center text-xs">
                        {{ candidate.initial }}
                      </div>
                      <div class="bg-transparent">
                        <p class="text-sm font-black text-slate-900 bg-transparent">{{ candidate.name }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-slate-500 font-bold bg-transparent">{{ candidate.position }}</td>
                  <td class="px-6 py-4 text-center bg-transparent">
                    <span class="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm transition-all" :style="getAiScoreStyle(candidate.aiScore)">
                      {{ candidate.aiScore }}/100
                    </span>
                  </td>
                  <td class="px-6 py-4 text-slate-400 font-medium bg-transparent">{{ candidate.date }}</td>
                </tr>
                <tr v-if="filteredCandidates.length === 0">
                  <td colspan="4" class="px-6 py-10 text-center text-slate-400 font-bold italic bg-white">
                    Không có ứng viên nào thuộc danh sách này.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Right Column: CV Preview & AI -->
      <div class="xl:col-span-5 h-full">
        <div class="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm h-full overflow-hidden flex flex-col">
          <!-- CV Preview Header -->
          <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
            <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Xem trước CV: CV_NGUYENVANANH.PDF</span>
            <div class="flex gap-2">
              <button class="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 text-slate-400 hover:bg-slate-100 transition-all">
                <span class="material-symbols-outlined text-[18px]">zoom_in</span>
              </button>
              <button class="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 text-slate-400 hover:bg-slate-100 transition-all">
                <span class="material-symbols-outlined text-[18px]">download</span>
              </button>
            </div>
          </div>
          
          <!-- CV Preview Body -->
          <div class="flex-grow p-6 flex flex-col items-center justify-center bg-blue-50/30">
            <div class="bg-white rounded-3xl p-10 shadow-xl shadow-blue-900/5 w-full max-w-sm h-[300px] flex flex-col gap-4 border border-blue-100/50">
              <div class="w-20 h-20 bg-slate-50 rounded-2xl border border-slate-100"></div>
              <div class="w-1/2 h-4 bg-slate-50 rounded-lg"></div>
              <div class="space-y-2 pt-4">
                <div class="w-full h-3 bg-slate-50 rounded-lg"></div>
                <div class="w-full h-3 bg-slate-50 rounded-lg"></div>
                <div class="w-3/4 h-3 bg-slate-50 rounded-lg"></div>
              </div>
              <div class="space-y-2 mt-auto">
                <div class="w-full h-3 bg-slate-50 rounded-lg"></div>
                <div class="w-full h-3 bg-slate-50 rounded-lg"></div>
              </div>
            </div>
          </div>

          <!-- Dynamic Assessment Panel -->
          <div class="p-8 border-t border-slate-100 bg-white space-y-6">
            <div v-if="needsScheduling(activeCandidate)">
              <h4 class="text-xs font-black text-blue-600 uppercase tracking-[0.2em] flex items-center gap-2 mb-4">
                <span class="material-symbols-outlined text-[20px]">calendar_month</span> Thiết lập lịch phỏng vấn
              </h4>
              <div class="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic">Ngày</label>
                  <input type="date" class="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all">
                </div>
                <div>
                  <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1 italic">Giờ</label>
                  <input type="time" class="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all">
                </div>
              </div>
              <button class="w-full py-4 bg-indigo-600 text-white rounded-2xl text-xs font-black hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all uppercase tracking-[0.2em]">Lưu lịch & Gửi mail</button>
            </div>

            <div v-else>
              <h4 class="text-xs font-black text-indigo-600 uppercase tracking-[0.2em] flex items-center gap-2 mb-4">
                <span class="material-symbols-outlined text-[20px]">rate_review</span> Phỏng vấn xong - Đánh giá
              </h4>
              <div class="mb-4">
                <textarea class="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 transition-all" rows="2" placeholder="Nhập nhận xét chi tiết..."></textarea>
              </div>
              <div class="flex gap-6 mb-6 px-2">
                <label class="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" :name="'result_' + activeCandidate.id" class="w-4 h-4 text-green-600 focus:ring-green-500 border-slate-200">
                  <span class="text-sm font-black text-green-600 uppercase tracking-widest">PASS</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" :name="'result_' + activeCandidate.id" class="w-4 h-4 text-slate-400 focus:ring-slate-500 border-slate-200 border-2">
                  <span class="text-sm font-black text-slate-400 uppercase tracking-widest">FAIL</span>
                </label>
              </div>
              <button class="w-full py-4 bg-slate-900 text-white rounded-2xl text-xs font-black hover:bg-slate-800 shadow-xl shadow-slate-200 transition-all uppercase tracking-[0.2em]">Lưu kết quả thao tác</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom List -->
    <div class="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
      <!-- Tabs -->
      <div class="flex p-1 bg-slate-50 border-b border-slate-100">
        <button class="flex-1 py-3 text-[11px] font-black uppercase tracking-widest text-blue-600 bg-white rounded-2xl shadow-sm transition-all">
          Danh sách Trúng tuyển (12)
        </button>
        <button class="flex-1 py-3 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all">
          Danh sách Từ chối (45)
        </button>
      </div>

      <!-- Horizontal candidate list -->
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div v-for="i in 4" :key="i" class="p-4 rounded-3xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all flex items-center justify-between group">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-green-50 text-green-600 font-black flex items-center justify-center text-xs border border-green-100">
                {{ i === 1 ? 'PT' : (i === 2 ? 'HM' : (i === 3 ? 'VD' : 'KL')) }}
              </div>
              <div>
                <h6 class="text-sm font-black text-slate-900">
                  {{ i === 1 ? 'Phan Thành' : (i === 2 ? 'Hoàng My' : (i === 3 ? 'Vũ Duy' : 'Khánh Linh')) }}
                </h6>
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                  {{ i === 1 ? 'iOS Developer' : (i === 2 ? 'Product Owner' : (i === 3 ? 'Data Scientist' : 'QA Engineer')) }}
                </span>
              </div>
            </div>
            <button class="text-slate-300 group-hover:text-slate-500 transition-colors">
              <span class="material-symbols-outlined">more_vert</span>
            </button>
          </div>
        </div>

        <div class="text-center pt-6 border-t border-slate-50">
          <a href="#" class="text-[11px] font-black text-blue-600 uppercase tracking-widest hover:underline decoration-2 underline-offset-4">Xem toàn bộ 12 ứng viên trúng tuyển</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import Dropdown from '@/components/Dropdown.vue';
import { useConfirm } from '@/composables/useConfirm';

const { showAlert, showConfirm } = useConfirm();
const route = useRoute();
const activeCandidateId = ref(1);
const filterPosition = ref('');
const filterAiScore = ref('');

const positionOptions = [
  { label: 'Vị trí: Tất cả', value: '' },
  { label: 'Senior Frontend', value: 'Senior Frontend' },
  { label: 'UI/UX Designer', value: 'UI/UX Designer' },
  { label: 'Backend Dev', value: 'Backend Dev' }
];

const aiScoreOptions = [
  { label: 'Tất cả điểm', value: '' },
  { label: 'Điểm AI: > 80', value: '80' },
  { label: 'Điểm AI: > 90', value: '90' }
];

const candidates = ref([
  { id: 1, name: 'Nguyễn Văn Anh', position: 'Senior Frontend', aiScore: 95, date: '12/10/2023', status: 'pass', initial: 'NA', interviewDate: '2023-10-15' },
  { id: 2, name: 'Trần Thị Bích', position: 'UI/UX Designer', aiScore: 88, date: '11/10/2023', status: 'pending', initial: 'TB', interviewDate: '2026-12-01' },
  { id: 3, name: 'Lê Văn Chính', position: 'Backend Dev', aiScore: 72, date: '10/10/2023', status: 'fail', initial: 'LC', interviewDate: '2023-10-10' },
  { id: 4, name: 'Phạm Thành Đạt', position: 'Business Analyst', aiScore: 92, date: '09/10/2023', status: 'pass', initial: 'PĐ', interviewDate: '2023-10-11' },
  { id: 5, name: 'Vũ Đức Minh', position: 'DevOps Engineer', aiScore: 68, date: '08/10/2023', status: 'fail', initial: 'VM', interviewDate: null },
  { id: 6, name: 'Hoàng Phương My', position: 'Product Owner', aiScore: 85, date: '05/10/2023', status: 'pass', initial: 'HM', interviewDate: '2023-10-06' }
]);

const activeCandidate = computed(() => {
  return candidates.value.find(c => c.id === activeCandidateId.value) || candidates.value[0];
});

const needsScheduling = (candidate) => {
  if (!candidate || !candidate.interviewDate) return true;
  return new Date(candidate.interviewDate) > new Date(); // If date is in the future
};

const filteredCandidates = computed(() => {
  const currentStatus = route.query.status;
  let list = candidates.value;

  if (currentStatus === 'pass') {
    list = list.filter(c => c.status === 'pass');
  } else if (currentStatus === 'fail') {
    list = list.filter(c => c.status === 'fail');
  }

  if (filterAiScore.value) {
    list = list.filter(c => c.aiScore >= parseInt(filterAiScore.value));
  }

  if (filterPosition.value) {
    list = list.filter(c => c.position === filterPosition.value);
  }

  return list;
});

const getAiScoreStyle = (score) => {
  if (score >= 80) return 'background-color: #dcfce7; color: #16a34a; border-color: #bbf7d0;'; // Xanh lá
  if (score >= 70) return 'background-color: #fef08a; color: #ca8a04; border-color: #fef08a;'; // Vàng
  return 'background-color: #fee2e2; color: #ef4444; border-color: #fecaca;'; // Đỏ
};
</script>

<style scoped>
/* Any specific local styles */
</style>
