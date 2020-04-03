import Socket from '../../socket/'

const state = {
    connected: false,
    triedConnecting: false,
};

const getters = {
    getAddress: (state) => {
        return state.address;
    },
    isConnected: (state) => {
        return state.connected;
    },
    hasTriedConnecting: (state) => {
        return state.triedConnecting;
    }
}

const actions = {
    connectionChangedAction({commit, state}, connected) {
        return new Promise((resolve) => {
            commit('connectionChanged', connected);
            resolve();
        });
    },
    setAddressAction({commit, state}, address) {
        return new Promise((resolve) => {
            commit('setAddress', address);
            resolve();
        });
    }
}

const mutations = {
    connectionChanged (state, connected) {
        state.triedConnecting = true;
        state.connected = connected;
    },
    setAddress(state, address) {
        state.address = address;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}