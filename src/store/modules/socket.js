import {getServerUrl} from '../../util';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import {CONNECTED, DISCONNECTED, IDENTIFY_GUEST, INCOMING_MESSAGE, IDENTIFYING_GUEST_SUCCEEDED, GUEST_MESSAGES_SEND, GUEST_MESSAGES_GET, GUEST_COOKIE_SET} from '../../socket/constants';

let socket;

const state = {
    connected: false,
    triedConnecting: false,
    user_id: null,
};

const getters = {
    isConnected: (state) => {
        return state.connected;
    },
    hasTriedConnecting: (state) => {
        return state.triedConnecting;
    }
}

const actions = {
    connectAction({commit, state, dispatch}) {
        return new Promise((resolve) => {
            const host = getServerUrl();
            socket = io(host);

            socket.on(CONNECTED, () => {
                dispatch('identifyUserAction');
                dispatch('connectionChangedAction', true);
            });
            socket.on(DISCONNECTED, () => dispatch('connectionChangedAction', false));
            
            socket.on(INCOMING_MESSAGE, (data) => dispatch('chat/addMessageAction', data.message, {root:true}));
            
            socket.on(IDENTIFYING_GUEST_SUCCEEDED, () => dispatch('afterIdentificationAction'));
            
            socket.on(GUEST_MESSAGES_SEND, (data) => dispatch('chat/loadAllMessagesAction', data.messages, {root: true}));
            
            socket.on(GUEST_COOKIE_SET, (data) => Cookies.set('guest_cookie', data.guest_cookie));

            resolve();
        });
    },
    connectionChangedAction({commit, state}, connected) {
        return new Promise((resolve) => {
            commit('connectionChanged', connected);
            resolve();
        });
    },
    sendMessageAction({commit, state}, {message}) {
        return new Promise((resolve) => {
            socket.emit(INCOMING_MESSAGE, {message});
            resolve();
        });
    },
    identifyUserAction({commit, state}) {
        return new Promise((resolve) => {
            const identMessage = {
                guest_cookie: Cookies.get('guest_cookie'),
                lc_license: window.__lc.license,
            }
            socket.emit(IDENTIFY_GUEST, identMessage);
            resolve();
        });
    },
    disconnectAction({commit, state}) {
        return new Promise((resolve) => {
            socket.disconnect();
            socket = null;
            commit('resetSocket');
            resolve();
        });
    },
    afterIdentificationAction({commit, state}) {
        return new Promise((resolve) => {
            socket.emit(GUEST_MESSAGES_GET);
            resolve();
        });
    }
}
//Cookies.set('guest_cookie', data.guest_cookie);
const mutations = {
    connectionChanged (state, connected) {
        state.triedConnecting = true;
        state.connected = connected;
    },
    resetSocket() {
        state.connected = false;
        state.triedConnecting = false;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}