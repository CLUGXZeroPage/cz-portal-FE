<template>
  <div class="about-container">

    <transition name="fade-title">
      <div v-if="show">
        <h1 class="title">About Us</h1>
      </div>
    </transition>

    <transition name="fade-content">
      <div v-if="show">
        <p class="description">
          select club you want to learn more about to get started.
        </p>
      </div>
    </transition>

    <transition name="fade-content">
      <div v-if="show">
        <div class="selection-container">
          <button @click="selectClub('CLUG')" :class="{ active: selectedClub === 'CLUG' }">CLUG</button>
          <button @click="selectClub('ZeroPage')" :class="{ active: selectedClub === 'ZeroPage' }">ZeroPage</button>
        </div>
      </div>
    </transition>

    <transition name="fade-opacity">
      <button v-if="selectedClub" class="next-button fade-in" @click="goToClubPage">
        ?
      </button>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "About",
  setup() {
    const show = ref(false);
    const selectedClub = ref(null);
    const router = useRouter();

    onMounted(() => {
      show.value = true;
    });

    const selectClub = (club) => {
      selectedClub.value = club;
    };

    const goToClubPage = () => {
      if (selectedClub.value === "CLUG") {
        router.push("/clug");
      } else if (selectedClub.value === "ZeroPage") {
        router.push("/zeropage");
      }
    };

    return { show, selectedClub, selectClub, goToClubPage };
  },
};
</script>

<style scoped>
.about-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.description {
  margin-bottom: 20px;
}

.selection-container {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.selection-container button {
  padding: 10px 20px;
  font-size: 1.2rem;
  cursor: pointer;
  border: none;
  background: #444;
  color: white;
  border-radius: 8px;
  transition: 0.3s;
}

.selection-container button.active {
  background:  #FFA559;
  color: black;
}

.next-button {
  position: absolute;
  bottom: 50px;
  padding: 10px 20px;
  font-size: 1.5rem;
  cursor: pointer;
  border: none;
  background:  #FFA559;
  color: black;
  border-radius: 8px;
}

.next-button:hover {
  background: #FFA559;
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

.fade-opacity-enter-active {
  transition: opacity 1s ease, transform 0.8s ease;
}
.fade-opacity-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
</style>
