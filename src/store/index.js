import { createStore } from 'vuex'
import { SET_AUTH_STATUS, SET_USER, SET_BOOKS, ADD_BOOK, REMOVE_BOOK, SET_BOOK } from './mutation-types'
import { logInWithGoogle, fetchUserStatus, logOut } from '../api/firebaseAuth'
import { fetchBooks, createId, setBook, deleteBookById } from '../api/firebaseCRUD'

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
    [SET_BOOK](state, bookData) {
      const index =  state.books.findIndex(book => book.id === bookData.id)
      state.books.splice(index, 1)
      state.books.push(bookData)
    },
    [ADD_BOOK](state, book) {
      state.books.push(book)
    },
    [REMOVE_BOOK](state, bookId) {
      const index = state.books.findIndex((book, index) => {
        if (book.id === bookId) return index
      })
      state.books.splice(index, 1)
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
    async createBook({ commit }, bookData) {
      const id = createId()
      bookData.id = id
      await setBook(bookData)
      commit(ADD_BOOK, bookData)
    },
    async editBook({ commit }, bookData) {
      await setBook(bookData)
      commit(SET_BOOK, bookData)
    },
    async getBooks({ commit }) {
      const books = await fetchBooks()
      commit(SET_BOOKS, books)
    },
    async deleteBook({ commit }, bookId) {
      await deleteBookById(bookId)
      commit(REMOVE_BOOK, bookId)
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
