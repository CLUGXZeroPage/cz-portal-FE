<template>
  <div class="home-container">
    <div class="content">
      <transition name="fade-title">
        <h1 v-if="show" class="title">{{ displayTitle }}</h1>
      </transition>
      <transition name="fade-content">
        <p v-if="show" class="description">{{ displayDescription }}</p>
      </transition>
    </div>
  </div>
</template>

<script>
import {ref, onMounted, computed} from "vue";

export default {
  name: "Home",
  setup() {
    const show = ref(false);
    const isSmallScreen = computed(() => window.innerWidth <= 480);
    const displayTitle = computed(() => (isSmallScreen.value ? "CLUG X ZeroPage" : "Together, we get better"));
    const displayDescription = computed(() => (isSmallScreen.value ? "Welcome!" : "Welcome to the new era of CLUG X ZeroPage"));

    onMounted(() => {
      show.value = true; // 페이지가 로드되면 애니메이션 실행
    });

    return {show, displayTitle, displayDescription};
  },
};
</script>

<style scoped>
.fade-title-enter-active {
  transition: opacity 0.8s ease, transform 0.6s ease;
}

.fade-title-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-content-enter-active {
  transition: opacity 0.8s ease 0.3s, transform 0.6s ease 0.3s;
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
  overflow: hidden;
  padding: 5% 5% 0;
}

.content {
  max-width: 1400px;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 1;
}

.description {
  font-size: clamp(1rem, 2.5vw, 2rem);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  opacity: 0.8;
  color: white;
}

@media (max-width: 1024px) {

  .description {
    font-size: 1.2rem;
  }
}

@media (max-width: 768px) {
  .home-container {
    padding-top: 10%;
  }
}

@media (max-width: 480px) {
  .title{
    font-size: 2rem;
  }
  .home-container {
    padding-top: 15%;
  }

  .description {
    font-size: 1rem;
  }
}
</style>
