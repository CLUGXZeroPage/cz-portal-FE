<template>
  <div class="zp-container">
    <div class="content">
      <button class="nav-button left" @click="prevPage" v-if="currentPage > 0"> < </button>
      <button class="nav-button right" @click="nextPage" v-if="currentPage < sections.length - 1"> > </button>

      <transition name="fade-in" mode="out-in">
        <div v-if="showContent" :key="currentPage" class="section-group">
          <div v-if="currentPage === 0" class = "logo-container">
            <div class="box"><b>
              <img src="@/assets/zp-logo.png" alt="ZP Logo" class="zp-logo">
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
    const showContent = ref(false);

    const sections = ref([
      [ // 페이지 1 (로고 포함된 Introduction)
        {
          title: "Introduction",
          content: "제로페이지는 공부하고자하는 뜻이 있는 사람들이 모인 일종의 인력의 장입니다.\n 그 안에서 뜻이 같은 사람들을 만날수 있기를, 또는 자신이 아는 것에 대해 다른 사람들에게 전달해줄수 있기를, 또는 자신의 부족한 점을 다른 사람들로부터 얻어갈 수 있었으면 합니다.\n 개인의 이익들이 모여서 집단의 이익을 만들어가며, 집단의 이익을 추구하는 것이 곧 개개인들에게 이익이 되는 경지가 되었으면 합니다."
        },
      ],
      [ // 페이지 2
        {title: "Event - OMS", content: "OMS(Open Micro Seminar)는 매주 정기 모임에서 진행되는 짧은 세미나로, 자유로운 주제로 발표합니다. 이를 통해 회원들은 정보 공유, 프레젠테이션 경험 축적, 그리고 상호 이해 증진을 목표로 합니다."},
        {title: "Event - 새싹교실, CodeRace", content: "선후배간의 친목을 도모하는 수업형 행사입니다.\n 관심 분야별 클래스를 진행하여 처음 프로그래밍을 접하는 새내기들뿐만 아니라 새싹 교실의 선생들도 배움을 얻어가는 자리입니다."},
        {title: "Event - EngelsCamp", content: "평소에 아디이어가 떠올랐으나 시도하지 못 했던 것들을 시도하는 무박 2일 해커톤입니다. 실력은 무관합니다. 경험을 얻어가는 것이 중요합니다."}
      ],
      [ // 페이지 3
        {
          title: "Event - DevilsCamp",
          content: "전공과 관련 있는 다양한 주제로 지식과 경험을 공유하는 시간입니다. ZeroPage의 재학생들과 졸업하신 선배님들께서 2~3시간씩 각기 다른 주제로 세미나를 진행하는 방식으로, 학과 커리큘럼 외의 다양한 분야를 접해보고 직접 실습도 해볼 수 있는 흔치 않은 기회입니다."
        },
        {
          title: "Event - 지금그때",
          content: "전통을 자랑하는 선후배 이야기 자리인 지금과 그때(지금그때) 입니다. 여러분의 지금이 우리의 그때보다 낫길 바라며 선후배들이 모여 이야기를 나누고 서로의 시선에서 경험을 나눕니다. 제로페이지 역대 선배들과 이야기를 나눌 수 있는 흔치 않은 기회입니다."
        },
        {
          title: "Event - 기년회",
          content: "연말, 한 해를 되돌아보며 앞으로의 내일을 계획하는 행사입니다."
        }
      ],
      [ // 페이지 4
        {
          title: "Event - MT",
          content: "말 그대로 MT 입니다!"
        },
        {
          title: "Event - 나들이",
          content: "동아리 회원들과 함께 어울리며 자연 속에서 휴식과 즐거움을 즐기는 특별한 야외 활동입니다. 맛있는 것들을 먹으며 친목을 다질 수 있는 기회입니다."
        }
      ],
      [ // 페이지 5
        {
          title: "More Info",
          content: "- 게시판\t: zeropage.org \n - 포탈\t: portal.zeropage.org \n - 위키\t:  wiki.zeropage.org"
        },
        {
          title: "THANKS TO ZP지기",
          content: "감사하게도 ZeroPage 졸업 선배님들이 '지피지기'라는 이름으로 필요할 때마다 자금을 지원해주신 덕에 유익한 행사들을 많이 진행히였고, 앞으로도 유익한 행사를 개최할 것을 약속합니다."
        }
      ],
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
.zp-container {
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


/* ZP 로고 */
.zp-logo {
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
