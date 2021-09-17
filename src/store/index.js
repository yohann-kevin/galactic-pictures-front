import { createStore } from 'vuex'

export default createStore({
  state: {
    userIsConnected: false,
    currentUser: {},
    userIsAdmin: false
  },
  mutations: {
    currentUser: (state, user) => {
      state.currentUser = user;
      state.userIsConnected = true;
    },
    userIsAdmin(state, isAdmin) {
      state.userIsAdmin = isAdmin;
    }
  },
  actions: {
  },
  modules: {
  }
})
