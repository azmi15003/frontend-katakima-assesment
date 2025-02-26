import { createStore } from 'vuex'

export default createStore({
  state: {
    idProduct: null,
    lang: localStorage.getItem('LANG') || 'id',
  },
  mutations: {
    setIdProduct(state, id) {
      state.idProduct = id
    },
    setToggleLang: (state, lang) => {
      localStorage.setItem('LANG', lang)
      state.lang = lang
    },
  },
  actions: {},
  getters: {
    getIdProduct: (state) => state.idProduct,
    getLang: (state) => state.lang
  },
})