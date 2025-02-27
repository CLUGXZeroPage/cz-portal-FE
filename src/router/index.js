import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import About from '@/pages/About.vue';
import BaekjoonKing from '@/pages/BaekjoonKing.vue';
import Notice from '@/pages/Notice.vue';
import Articles from '@/pages/Articles.vue';
import ZeroPage from '@/pages/ZeroPage.vue';
import Clug from '@/pages/Clug.vue';
import Sign from '@/pages/SignEvent.vue';
import Ranking from '@/pages/Ranking.vue';
import CurrentRanking from '@/pages/CurrentRanking.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/zeropage', component: ZeroPage },
    { path: '/clug', component: Clug },
    { path: '/baekjoonking', component: BaekjoonKing },
    { path: '/notice', component: Notice },
    { path: '/articles', component: Articles },
    { path: '/sign', component: Sign },
    { path: '/rank', component: Ranking},
    { path: '/current-rank', component:CurrentRanking},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
