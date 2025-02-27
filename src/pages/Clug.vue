<template>
  <div class="clug-container">
    <div class="content">
      <!-- 페이지 전환 버튼 -->
      <button class="nav-button left" @click="prevPage" v-if="currentPage > 0"><</button>
      <button class="nav-button right" @click="nextPage" v-if="currentPage < sections.length - 1">></button>

      <!-- 현재 페이지의 섹션들 (3개씩 배치) -->
      <transition name="fade-in" mode="out-in">
        <div v-if="showContent" :key="currentPage" class="section-group">
          <div v-if="currentPage === 0" class = "logo-container">
            <div  class="box"><b>
              <img src="@/assets/clug-logo2.jpeg" alt="CLUG Logo" class="clug-logo">
            </b></div>
          </div>
          <div v-for="(item, index) in sections[currentPage]" :key="index" class="section">
            <div class="section-title">{{ item.title }}</div>
            <p class="section-text">{{ item.content }}</p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import {ref, onMounted} from "vue";

export default {
  name: "ZeroPage",
  setup() {
    const currentPage = ref(0);
    const showContent = ref(false); // 처음에는 숨김 상태

    const sections = ref([
      [ // 페이지 1 (로고 포함된 Introduction)
        {
          title: "Introduction",
          content: "안녕하세요! 중앙대학교를 대표하는 오픈소스 소프트웨어 동아리 CLUG입니다!\n" +
              "CLUG는 자유 소프트웨어를 탐구하는, 중앙대학교 리눅스·유닉스 사용자 모임입니다. 다양한 주제의 스터디, 세미나, 멘토링 및 해커톤을 진행합니다. ‘이모저모’와 같은 활동들로 졸업생들과의 만남을 통해 다양한 이야기를 듣고 조언을 얻습니다."
        }
      ],
      [ // 페이지 2
        {
          title: "다양한 주제의 스터디",
          content: "동아리에서 제공해주는 커리큘럼을 따라 스터디원과 함께 공부하는 활동입니다. 운영체제, 네트워크, 보안, AI, 웹 개발 등 다양한 주제를 다룹니다.\n" +
              "혼자 하기 어려웠던 공부를 같이 하면서 동료들과 성장해봐요!"
        },
        {
          title: "깃, 깃허브 활용 세미나",
          content: "본격적인 개발에 앞서 개발에 필수적인 버전 관리 도구인 Git과 GitHub를 학습하는 세미나입니다.\n" +
              "협업 프로젝트에서 필수적으로 사용되는 만큼, 기본 개념부터 실전 활용법까지 익힐 수 있어요!"
        },
        {
          title: "친구야 만나서 반가워~!",
          content: "학교 주변 핫플레이스 지도를 따라 탐방하는 새내기 교류 시스템입니다.\n" +
              "새로운 환경에서 낯설지 않도록 도와주며, 동아리 활동을 통해 새로운 친구들을 사귈 수 있는 기회에요!"
        }
      ],
      [ // 페이지 3
        {
          title: "CLUG 클론 코딩",
          content: "실제 서비스나 웹사이트를 따라 만들며 프레임워크와 개발 기술을 익히는 활동입니다.\n" +
              "부담 없이 개발을 시작할 수 있으며, 실전 경험을 쌓으며 흥미를 붙이기에 좋은 기회에요!"
        },
        {
          title: "CLUG 해커톤",
          content: "매칭된 팀원들과 함께 해커톤 형식으로 프로젝트를 진행합니다.\n" +
              "그동안 학습한 기술을 활용해 실제 서비스를 만들어보며, 협업 능력과 문제 해결 능력을 기를 수 있어요!"
        },
        {
          title: "중앙대 컴공인의 이모저모",
          content: "CLUG 선배님들을 모셔서 컴퓨터공학과 학생들이 궁금해하는 진로 관련 질문을 해결하는 세미나입니다.\n" +
              "업계에서 활동 중인 선배님들과 직접 소통하며 실질적인 조언을 받을 수 있어요!"
        }
      ]
    ]);


    const nextPage = () => {
      if (currentPage.value < sections.value.length - 1) {
        currentPage.value++;
      }
    };

    const prevPage = () => {
      if (currentPage.value > 0) {
        currentPage.value--;
      }
    };

    onMounted(() => {
      setTimeout(() => {
        showContent.value = true; // 페이지 로드 후 0.3초 뒤에 콘텐츠 표시
      }, 100);
    });

    return {currentPage, sections, nextPage, prevPage, showContent};
  },
};
</script>

<style scoped>
.clug-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: left;
  padding: 100px 40px 40px;
  position: relative;
}


.section-group {
  display: flex;
  flex-direction: column;
  gap: 60px;
  min-height: 500px;
}

.section {
  width: 100%;
  max-width: 800px;
  background: var(--glass-bg);
  padding: 25px;
  border: var(--border);
  box-shadow: var(--shadow);
  border-radius: 12px;
}

.logo-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 50px;
  gap: 50px;
}

.logo-container .box {
  position: relative;
  width: 220px;
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
}


.logo-container .box::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 20px;
  background: #f00;
}
.logo-container .box::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 20px;
  background: #f00;
  filter: blur(16px);
}
.logo-container .box b {
  padding: 30px;
  position: absolute;
  display: block;
  inset: 4px;
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.75);
  z-index: 2;
}

.logo-container .box b p {
  font-weight: 200;
  color: #fff;
  text-shadow: 0 0 15px #fff;
}

.logo-container .box:nth-child(1)::before,
.logo-container .box:nth-child(1)::after {
  background: linear-gradient(45deg, #ffbc00, #ff0058);
}

.logo-container .box:nth-child(2)::before,
.logo-container .box:nth-child(2)::after {
  background: linear-gradient(45deg, #03a9f4, #ff0058);
}

.logo-container .box:nth-child(3)::before,
.logo-container .box:nth-child(3)::after {
  background: linear-gradient(45deg, #4dff03, #00d0ff);
}


.clug-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}


/* 섹션 제목 */
.section-title {
  display: inline-block;
  padding: 10px 20px;
  font-size: 1.8rem;
  font-weight: bold;
  color: white;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  border: 2px solid white;
  margin-bottom: 15px;
}

/* 섹션 본문 */
.section-text {
  font-size: 1.2rem;
  line-height: 1.6;
  color: white;
  white-space: pre-line;
}

/* 네비게이션 버튼 */
.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 12px 18px;
  font-size: 1.5rem;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;
  border-radius: 50%;
  transition: 0.3s;
}

.nav-button:hover {
  background: rgba(255, 255, 255, 0.4);
}

.nav-button.left {
  left: 20px;
}

.nav-button.right {
  right: 20px;
}

/* 첫 로딩 시 적용될 Fade-in 애니메이션 */
.fade-in-enter-active {
  transition: opacity 1s ease, transform 0.8s ease;
}

.fade-in-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
</style>
