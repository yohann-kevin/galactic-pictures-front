import { createStore } from 'vuex'

export default createStore({
  state: {
    userIsConnected: false,
    currentUser: null,
    userIsAdmin: false,
    userToken: null,
    userComment: null
  },
  mutations: {
    currentUser: (state, user) => {
      state.currentUser = user;
      state.userIsConnected = true;
    },
    userIsAdmin(state, isAdmin) {
      state.userIsAdmin = isAdmin;
    },
    userToken(state, token) {
      state.userToken = token;
    },
    userComment(state, comments) {
      state.userComment = comments;
    }
  },
  actions: {
  },
  modules: {
  }
})
