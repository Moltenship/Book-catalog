import { createStore } from 'vuex'
import { SET_AUTH_STATUS, SET_USER } from '../utils/mutation-types'
import { signInWithGoogle, fetchUserStatus } from '../api/firebase'

export default createStore({
  state: {
    isLoggedIn: false,
    user: null,
  },
  mutations: {
    [SET_AUTH_STATUS](state) {
      state.isLoggedIn = !state.isLoggedIn
    },
    [SET_USER](state, user) {
      state.user = user
    },
  },
  actions: {
    async signIn({ commit }) {
      await signInWithGoogle(user => commit(SET_USER, user))
    },
    async getUserStatus({ commit }) {
      await fetchUserStatus(user => commit(SET_USER, user))
    },
  },
  modules: {
  },
  getters: {
    isLoggedIn(state) {
      return state.isLoggedIn
    },
    user(state) {
      return state.user
    },
  },
})
