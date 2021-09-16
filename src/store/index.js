import { createStore } from 'vuex'

export default createStore({
  state: {
    currentUser: {}
  },
  mutations: {
    currentUser: (state, user) => {
      state.currentUser = user;
    }
  },
  actions: {
  },
  modules: {
  }
})
