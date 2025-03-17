<template>
  <div class="oms-container">
    <transition name="fade-title">
      <h1 v-if="show" class="title">
        OMS 자료
      </h1>
    </transition>

    <transition name="fade-content">
      <div v-if="show" class="oms-list">
        <div
            v-for="oms in omss"
            :key="oms.id"
            class="oms-item">
          <div class="oms-info">
            <h3 class="oms-title">{{ oms.title }}</h3>
            <p class="oms-subtitle">{{ oms.subtitle }}</p>
          </div>
          <div class="oms-meta">
            <p class="oms-date">{{ oms.date }}</p>
            <p class="oms-presenter">발표자: {{ oms.presenter }}</p>
          </div>
        </div>

        <div
            class="oms-item archive-link"
            @click="goToArchive">
          <div class="oms-info">
            <h3 class="oms-title">작년 OMS 모음</h3>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "OMSS",
  setup() {
    const show = ref(false);
    onMounted(() => {
      show.value = true;
    });
    return {show};
  },
  data() {
    return {
      omss: []
    };
  },
  async created() {
    await this.loadOMSS();
  },
  methods: {
    async loadOMSS() {
      try {
        const response = await fetch('/omss.json'); // JSON 데이터 불러오기
        this.omss = await response.json();
      } catch (error) {
        console.error('Failed to load OMS data:', error);
      }
    },
    goToArchive() {
      window.location.href = "https://portal.zeropage.org/oms";
    }
  }
};
</script>

<style scoped>
.oms-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  color: white;
  text-align: center;
  position: relative;
  padding-bottom: 80px;
}

.title {
  margin-top: 100px;
  margin-bottom: 30px;
}

.oms-list {
  width: 80%;
  height: 60vh;
  overflow-y: auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  box-shadow: 0 8px 32px rgba(255, 255, 255, 0.1);
}

.oms-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.oms-item:hover {
  background: rgba(255, 255, 255, 0.4);
}

.oms-info {
  text-align: left;
}

.oms-title {
  font-size: 1rem;
  font-weight: bold;
}

.oms-subtitle {
  font-size: 0.9rem;
  opacity: 0.8;
}

.oms-meta {
  text-align: right;
}

.oms-date {
  font-size: 0.8rem;
  opacity: 0.7;
}

.oms-presenter {
  font-size: 0.8rem;
  font-weight: bold;
}

.archive-link {
  background: rgba(229, 115, 115, 0.3);
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  color: white;
}

.archive-link:hover {
  background: rgba(229, 115, 115, 0.5);
}

.fade-title-enter-active, .fade-content-enter-active {
  transition: opacity 1s ease, transform 0.8s ease;
}

.fade-title-enter-from, .fade-content-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
</style>
