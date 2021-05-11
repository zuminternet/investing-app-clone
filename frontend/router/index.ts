import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

export default () => {
    return new Router({
        mode: 'history',
        base: process.env.publicPath,

        routes: [ // 전체 라우트 목록
            // {
            //     path: '/aside',
            //     name: 'aside',
            //     // component: () => import(/* webpackChunkName: "module" */ '@/views/Aside')
            //     component: Aside
            // },
        ]
    });
};