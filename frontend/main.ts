import Vue from 'Vue'
import {initializer} from 'zum-portal-core/frontend';
import App from './App';
import createRouter from './router';
import createStore from './store';

initializer(() => {
    const router = createRouter()
    const store = createStore()

    return new Vue({
        el: '#app',
        router,
        store
        render: h => (App)
    })
})