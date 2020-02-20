import Socket from '../../socket/'

const state = {
    connected: false,
    address: "http://localhost:3000",
};

const getters = {

}

const actions = {
    changeConnectionStatus({commit, state}, connected) {
        commit('changeConnectionStatus', {connected});
    },
}

const mutations = {
    changeConnectionStatus (state, {connected}) {
        state = {
            ...state,
            connected
        }
    },
    
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}