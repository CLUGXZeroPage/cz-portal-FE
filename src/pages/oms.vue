<template>
  <div class="oms-container">
    <div class="content">
      <transition name="fade-title">
        <h1 v-if="show" class="title">OMS of the Week</h1>
      </transition>

      <transition name="fade-content">
        <p v-if="show" class="oms-title">{{ omsTitle }}</p>
      </transition>

      <transition name="fade-content">
        <p v-if="show" class="description">{{ description }}</p>
      </transition>

      <transition name="fade-content">
        <p v-if="show" class="presenter">발표자: {{ presenter }}</p>
      </transition>
    </div>

    <transition name="fade-content">
      <footer v-if="show" class="footer">
        <router-link to="/omss" class="btn">역대 OMS</router-link>
      </footer>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "Oms",
  setup() {
    const show = ref(false);

    // 새로운 OMS title 추가
    const omsTitle = ref("디버깅에서 인생을 배웠습니다…");
    const description = ref("정답 없는 인생, 그 해답없는 회고");
    const presenter = ref("백범준");

    onMounted(() => {
      show.value = true;
    });

    return { show, omsTitle, description, presenter };
  },
};
</script>

<style scoped>
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

.oms-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  text-align: center;
}

.content {
  max-width: 1400px;
  width: 100%;
  position: relative;
  z-index: 1;
}

.oms-title {
  font-weight: 700;
  color: white;
  padding: 10px 20px;
  background: var(--glass-bg);
  border: var(--border);
  border-radius: 15px;
  display: inline-block;
  letter-spacing: 1px;
  max-width: 90vw; /* 뷰포트 너비 대비 최대 크기 */
  width: fit-content; /* 내용에 맞게 조정 */
  white-space: nowrap;
  font-size: clamp(1.5rem, 4.5vw, 4.5rem);
}

.description {
  font-size: 1.5rem;
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.8);
}

.presenter {
  font-size: 1.2rem;
  margin-top: 5px;
  color: rgba(255, 255, 255, 0.6);
}

.footer {
  position: absolute;
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 40px;
}

.btn {
  width: 150px;
  height: 50px;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease-in-out;
}

.btn:hover {
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.2);
}
</style>
