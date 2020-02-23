import Vue from 'vue';
import Vuex from 'vuex';

import socket from './modules/socket';
import chat from './modules/chat';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        socket,
        chat,
    },
    strict: true,
});