<template>
  <div class="ranking-container">
    <div class="header">
      <transition name="fade-title">
        <h1 v-if="show" class="title">Current Ranking</h1>
      </transition>
      <transition name="fade-content">
        <h2 v-if="show" class="subtitle">This Week's Top Performers</h2>
      </transition>
    </div>

    <transition name="fade-content">
      <div v-if="show" class="ranking-list">
        <div v-for="(user, index) in users" :key="user.username" class="ranking-item">
          <div class="rank-info">
            <span class="rank">#{{ index + 1 }}</span>
            <!-- 닉네임으로 표시 -->
            <span class="username">{{ user.nickname }}</span>
            <!-- ratingDiff 값 표시 -->
            <span class="score">{{ user.ratingDiff }}</span>
          </div>
          <div class="progress-bar">
            <!-- 숫자형으로 변환 후 최대값과 비교하여 프로그레스바 계산 -->
            <div class="progress-fill" :style="{ width: (Number(user.ratingDiff) / maxRatingDiff * 100) + '%' }"></div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: "CurrentRanking",
  setup() {
    const users = ref([]);
    const maxRatingDiff = ref(0);
    const show = ref(false);

    onMounted(async () => {
      show.value = true;
      try {
        const response = await fetch("https://czportal.site/api/infos/all");
        const data = await response.json();
        if (data.isSuccess && data.result) {
          // ratingDiff는 문자열이므로 숫자로 변환하여 내림차순 정렬
          users.value = data.result.sort(
            (a, b) => Number(b.ratingDiff) - Number(a.ratingDiff)
          );
          // 최대 ratingDiff 값을 추출 (첫번째 요소가 가장 큰 값)
          maxRatingDiff.value = Number(users.value[0].ratingDiff);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    });

    return { show, users, maxRatingDiff };
  },
};
</script>

<style scoped>
.ranking-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  color: white;
  text-align: center;
  position: relative;
  padding-top: 80px;
  padding-bottom: 80px;
  font-family: 'Poppins', sans-serif;
}

.header {
  position: relative;
  width: 100%;
  padding: 20px 0;
  z-index: 10;
}

.title {
  margin-top: 60px;
  letter-spacing: 1px;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.8;
  margin-bottom: 40px;
}

.ranking-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 80%;
  max-height: 60vh;
  overflow-y: auto;
  padding-right: 10px;
  border-top: 2px solid rgba(255, 255, 255, 0.2);
  padding-top: 10px;
  position: relative;
}

/* 스크롤바 스타일 */
.ranking-list::-webkit-scrollbar {
  width: 8px;
}

.ranking-list::-webkit-scrollbar-track {
  background: transparent;
}

.ranking-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

.ranking-list::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

.ranking-item {
  width: 100%;
  background: #252525;
  padding: 16px 24px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: #eee;
  font-weight: 400;
}

.rank-info {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 8px;
  font-size: 1rem;
}

.rank {
  font-weight: 500;
  color: #ffcc00;
}

.username {
  flex: 1;
  text-align: center;
}

.score {
  font-weight: 500;
  color: #66bb6a;
}

.progress-bar {
  width: 100%;
  height: 12px;
  background: #444;
  border-radius: 6px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #ffcc00, #ff8c00);
  border-radius: 6px;
  transition: width 0.5s ease-in-out;
}

.fade-title-enter-active {
  transition: opacity 1s ease, transform 0.8s ease;
}
.fade-title-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-content-enter-active {
  transition: opacity 1s ease 0.5s, transform 0.8s ease 0.5s;
}
.fade-content-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
</style>
