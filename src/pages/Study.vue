<template>
  <div class="study-container">
    <transition name="fade-title">
      <h1 v-if="show" class="title">Active Studies</h1>
    </transition>

    <transition name="fade-content">
      <div v-if="show" class="study-grid">
        <div
          v-for="study in studies"
          :key="study.id"
          class="study-card"
        >
          <h2 class="study-name">{{ study.name }}</h2>
          <p class="capacity">
            인원: <span class="highlight">{{ study.currentMembers }}/{{ study.totalMembers }}</span>
          </p>
          <p class="application-criteria">
            신청 조건: {{ study.applicationCriteria }}
          </p>
          <p class="greeting">
            스터디 소개: "{{ study.greeting }}"
          </p>
          <p class="mentor">
            스터디장: <span class="highlight">{{ study.mentor }}</span>
          </p>
          <p class="contact">
            가입 방법: <span class="contact">{{ study.contact }}</span>
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "StudySection",
  setup() {
    const show = ref(false);
    const studies = ref([]);

    const fetchStudies = async () => {
      try {
        const response = await fetch("/study.json");
        const data = await response.json();
        studies.value = data.studies;
      } catch (error) {
        console.error("Error fetching studies:", error);
      }
    };

    onMounted(async () => {
      show.value = true;
      await fetchStudies();
    });

    return {
      show,
      studies
    };
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=Noto+Sans+KR:wght@400;700&display=swap');

.study-container {
  margin-top: 80px; /* 네비게이션 바 높이에 맞춰 상단 여백 추가 */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  font-family: 'Poppins', 'Noto Sans KR', sans-serif;
  color: white;
  background-color: #121212;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 30px;
}

.study-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 1200px;
}

.study-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;
}

.study-card:hover {
  transform: translateY(-5px);
}

.study-name {
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.capacity,
.application-criteria,
.greeting,
.contact,
.mentor {
  font-size: 1.1rem;
  margin: 8px 0;
}

.highlight {
  color: #ffd700;
  font-weight: 700;
}

/* Transitions */
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
