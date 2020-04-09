

const mockMessages = [
    {
        id: 0,
        date: new Date(),
        text: "Hiaaaaaaaaaaaa!",
        fromAdmin: false,
    },
    
]

const state = {
    messages: mockMessages
};

const getters = {
    getMessages: (state) => {
        return state.messages;
    }
}

const actions = {
    loadAllMessagesAction({commit, state}, messages) {
        return new Promise((resolve, reject) => {
            commit('loadAllMessages', messages);
            resolve();
        });
    },
    addMessageAction({commit, state}, message) {
        return new Promise((resolve, reject) => {
            commit('addMessage', message);
            resolve();
        });
    },
}

const mutations = {
    loadAllMessages (state, messages) {
        if(!messages) messages = [];
        state.messages = messages;
    },
    addMessage (state, message) {
        state.messages.push(message);
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}