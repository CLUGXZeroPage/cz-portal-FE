<template>
  <div class="ranking-container">
    <transition name="fade-title">
      <h1 v-if="show" class="title">
        <span class="full-title">BAEKJOON KING</span>
        <span class="short-title">BJKING</span>
      </h1>
    </transition>

    <transition name="fade-content">
      <p v-if="show" class="subtitle">
        이번 주 시상 종목 : <span class="highlight">[가장 높은 Rating 상승]</span> <br /><br />
        <span class="highlight">Current Top 4</span>
      </p>
    </transition>

    <transition name="fade-content">
      <div v-if="show" class="podium">
        <!-- podium 순서: 왼쪽부터 3등, 2등, 1등, 4등 -->
        <div
            v-for="(user, index) in podiumOrder"
            :key="user.username"
            class="rank-container"
        >
          <div :class="['rank', rankClasses[index]]">
            <div class="rank-box">
              <span class="rank-number">{{ [3, 2, 1, 4][index] }}</span>
            </div>
          </div>
          <div class="user-name">{{ user.nickname }}</div>
        </div>
      </div>
    </transition>

    <transition name="fade-content">
      <footer v-if="show" class="footer">
        <router-link to="/sign" class="btn">참여하기</router-link>
        <router-link to="/rank" class="btn">역대 우승자</router-link>
        <router-link to="/current-rank" class="btn">현재 순위</router-link>
      </footer>
    </transition>
  </div>
</template>

<script>
import {ref, onMounted, computed, onBeforeUnmount} from "vue";

export default {
  name: "BaekjoonKing",
  setup() {
    const show = ref(false);
    const rankingData = ref([]);

    const fetchRankings = async () => {
      try {
        const response = await fetch("https://czportal.site/api/infos/all");
        const data = await response.json();
        rankingData.value = data.result;
      } catch (error) {
        console.error("Error fetching rankings:", error);
      }
    };

    onMounted(async () => {
      show.value = true;
      await fetchRankings();
    });


    //가장 어려운 문제 용 함수 2개
    const getMaxDifficultyIndex = (diffArrayStr) => {
      const levels = diffArrayStr.split(',').map(Number);
      for (let i = levels.length - 1; i >= 0; i--) {
        if (levels[i] > 0) {
          return i; // 가장 어려운 문제의 인덱스
        }
      }
      return -1; // 아무것도 안 푼 경우
    };
    const calculateScore = (user) => {
      const hardestIdx = getMaxDifficultyIndex(user.solvedCountDiffByLevelArray);
      const score = hardestIdx;
      return {
        ...user,
        hardestIdx,
        score,
      };
    };
    //-----------------------------------------------------------

    const sortedRankings = computed(() => {

      //가장 어려운 문제 푼 거 정렬 반환
      /*
      return rankingData.value
          .map(calculateScore)
          .sort((a, b) => {
            return b.score - a.score;
          });
       */

      /*
      //가장 많은 문제 푼 거 정렬
      return rankingData.value.slice().sort((a, b) => {
        return Number(b.solvedCountDiff) - Number(a.solvedCountDiff);
      });
      */

      //rating 상승 폭 정렬
      return rankingData.value.slice().sort((a, b) => {
        return Number(b.ratingDiff) - Number(a.ratingDiff);
      });

    });

    const podiumOrder = computed(() => {
      if (sortedRankings.value.length < 4) {
        return sortedRankings.value;
      }
      return [
        sortedRankings.value[2], // 3등
        sortedRankings.value[1], // 2등
        sortedRankings.value[0], // 1등
        sortedRankings.value[3]  // 4등
      ];
    });

    const rankClasses = ["third", "second", "first", "fourth"];

    return {
      show,
      podiumOrder,
      rankClasses,
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=Noto+Sans+KR:wght@400;700&display=swap');

.title{
  margin-top: clamp(2rem, 6vh, 4rem);
  font-size: clamp(4rem, 5.5vw, 5.5rem);
}
.full-title {
  display: inline;
}
.short-title {
  display: none;
}
.ranking-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: white;
  text-align: center;
  position: relative;
  padding-bottom: clamp(40px, 8vh, 80px);
  font-family: 'Poppins', 'Noto Sans KR', sans-serif;
}

.subtitle {
  font-size: clamp(1rem, 5.5vw, 1.5rem);
  opacity: 0.8;
  margin-bottom: clamp(15px, 4vh, 30px);
}

.highlight {
  font-weight: 700;
  font-size: clamp(1rem, 5.5vw, 1.5rem);
  color: #ffd700;
}

.podium {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: clamp(16px, 4vw, 30px);
  flex-wrap: wrap;
}

.rank-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rank {
  width: clamp(100px, 22vw, 140px);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease-in-out;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.rank-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rank-number {
  font-size: clamp(1rem, 4vw, 2.5rem);
  font-weight: bold;
  margin-bottom: clamp(6px, 1vh, 10px);
  color: white;
}

.user-name {
  font-size: clamp(0.8rem, 3vw, 1.2rem);
  font-weight: bold;
  margin-top: clamp(10px, 2vh, 20px);
  color: white;
}

.first {
  height: clamp(140px, 40vh, 250px);
  background: linear-gradient(145deg, #b8860b, #8b6914);
  box-shadow: 0 10px 30px rgba(184, 134, 11, 0.2);
}
.second {
  height: clamp(120px, 35vh, 220px);
  background: linear-gradient(145deg, #808080, #696969);
  box-shadow: 0 10px 30px rgba(128, 128, 128, 0.2);
}
.third {
  height: clamp(100px, 30vh, 190px);
  background: linear-gradient(145deg, #8b5a2b, #6f4f28);
  box-shadow: 0 10px 30px rgba(139, 90, 43, 0.2);
}
.fourth {
  height: clamp(80px, 25vh, 160px);
  background: linear-gradient(145deg, #4f6272, #3c4a57);
  box-shadow: 0 10px 30px rgba(79, 98, 114, 0.2);
}

.footer {
  position: absolute;
  bottom: clamp(20px, 5vh, 40px);
  width: 100%;
  display: flex;
  justify-content: center;
  gap: clamp(20px, 5vw, 40px);
}

.btn {
  width: clamp(95px, 20vw, 150px);
  height: clamp(15px, 6vh, 50px);
  font-size: clamp(1rem, 2.5vw, 1.2rem);
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

/* 애니메이션 */
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

@media (max-width: 768px) {
  .ranking-container {
    padding-inline: 16px;
  }

  .subtitle {
    font-size: clamp(0.9rem, 4.5vw, 1.1rem);
    line-height: 1.4;
  }

  .highlight {
    font-size: clamp(1rem, 5vw, 1.3rem);
  }

  .podium {
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: clamp(10px, 4vw, 20px);
    padding-bottom: 10px;
    justify-content: flex-start;
  }

  .rank-container {
    flex: 0 0 auto;
  }

  .rank {
    width: clamp(90px, 30vw, 120px);
  }

  .first {
    height: clamp(160px, 30vh, 200px);
  }

  .second {
    height: clamp(140px, 26vh, 180px);
  }

  .rank-number {
    font-size: clamp(1.2rem, 5vw, 1.6rem);
  }

  .user-name {
    font-size: clamp(1rem, 4vw, 1.2rem);
    margin-top: 12px;
  }

  /* 3등, 4등은 그대로 숨기기 */
  .rank-container:nth-child(1),
  .rank-container:nth-child(4) {
    display: none;
  }
}

@media(max-width: 550px){
  .full-title {
    display: none;
  }
  .short-title {
    display: inline;
  }
}
</style>

