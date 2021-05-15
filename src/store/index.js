import { createStore } from 'vuex'
import { SET_AUTH_STATUS, SET_USER, SET_BOOKS } from '../utils/mutation-types'
import { logInWithGoogle, fetchUserStatus, logOut } from '../api/firebaseAuth'
import { fetchBooks } from '../api/firebaseCRUD'

export default createStore({
  state: {
    isLoggedIn: false,
    user: null,
    books: [],
  },
  mutations: {
    [SET_AUTH_STATUS](state) {
      state.isLoggedIn = !state.isLoggedIn
    },
    [SET_USER](state, user) {
      state.user = user
    },
    [SET_BOOKS](state, books) {
      state.books = [ ...books ]
    },
  },
  actions: {
    async signIn({ commit }) {
      await logInWithGoogle(user => commit(SET_USER, user))
      commit(SET_AUTH_STATUS)
    },
    async getUserStatus({ commit }) {
      await fetchUserStatus(user => commit(SET_USER, user))
    },
    async signOut({ commit }) {
      await logOut()
      commit(SET_USER, null)
      commit(SET_AUTH_STATUS)
    },
    async getBooks({ commit }) {
      const books = await fetchBooks()
      commit(SET_BOOKS, books)
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
    books(state) {
      return state.books
    },
  },
})
