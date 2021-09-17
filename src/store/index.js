import { createStore } from 'vuex'

export default createStore({
  state: {
    userIsConnected: false,
    currentUser: {},
    userIsAdmin: false,
    userToken: null
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
    }
  },
  actions: {
  },
  modules: {
  }
})
