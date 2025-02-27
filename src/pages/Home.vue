<template>
  <div class="home-container">
    <div class = "content">
      <transition name="fade-title">
        <h1 v-if="show" class="title">Together, we get better</h1>
      </transition>
      <transition name="fade-content">
        <p v-if="show" class="description">Welcome to the new era of CLUG X ZeroPage</p>
      </transition>
    </div>
    <transition name="fade-content">
      <footer v-if="show" class="footer">
        <div class="footer-left"></div>
        <div class="footer-right">Developed by BeomJun Baek</div>
      </footer>
    </transition>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";

export default {
  name: "Home",
  setup() {
    const show = ref(false);

    onMounted(() => {
      show.value = true; // 페이지가 로드되면 애니메이션 실행
    });

    return { show };
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

.home-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.content {
  max-width: 1400px;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 1;
}

.footer {
  position: absolute;
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7); /* 텍스트 색상 투명도 */
}

.footer-left {
  text-align: left;
}

.footer-right {
  text-align: right;
}
</style>
