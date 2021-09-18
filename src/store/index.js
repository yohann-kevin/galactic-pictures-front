import { createStore } from 'vuex'

export default createStore({
  state: {
    userIsConnected: false,
    currentUser: null,
    userIsAdmin: false,
    userToken: null,
    userComment: null,
    favoritePicture: null
  },
  mutations: {
    currentUser: (state, user) => {
      state.currentUser = user;
    },
    userIsConnected: (state, isConnected) => {
      state.userIsConnected = isConnected;
    },
    userIsAdmin(state, isAdmin) {
      state.userIsAdmin = isAdmin;
    },
    userToken(state, token) {
      state.userToken = token;
    },
    userComment(state, comments) {
      state.userComment = comments;
    },
    favoritePicture(state, pictures) {
      state.favoritePicture = pictures;
    }
  },
  actions: {
  },
  modules: {
  }
})
