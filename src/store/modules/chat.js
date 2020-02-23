import Socket from '../../socket/'

const mockMessages = [
    {
        id: 0,
        date: new Date(),
        text: "Hi!",
        fromAdmin: false,
    },
    {
        id: 1,
        date: new Date(),
        text: "Heyy!",
        fromAdmin: true,
    },
    {
        id: 2,
        date: new Date(),
        text: "How can i help?",
        fromAdmin: true,
    },
    {
        id: 3,
        date: new Date(),
        text: "You can't!",
        fromAdmin: false,
    },    
]

const state = {
    isThereAnyAdminOnline: false,
    admin: {
        email: "",
        typing: false,
        online: false,
    },
    messages: mockMessages
};

const getters = {

}

const actions = {
    loadAllMessages({commit, state}, {messages}) {
        commit('loadAllMessages', {messages});
    },
    addMessage({commit, state}, {message}) {
        commit('addMessage', {message});
    }
}

const mutations = {
    loadAllMessages (state, {messages}) {
        state = {
            ...state,
            messages
        }
    },
    addMessage (state, {message}) {
        state = {
            ...state,
            messages: state.messages.push(message)
        }
    }
    
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}