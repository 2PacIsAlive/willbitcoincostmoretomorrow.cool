import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    prediction: {},
    answer: 'maybe',
    loading: true
  },
  mutations: {
    setAnswer (state, answer) {
      state.answer = answer
    },
    setPrediction (state, prediction) {
      state.prediction = prediction
    },
    setLoading (state, loading) {
      state.loading = loading
    }
  },
  actions: {
    getPrediction ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get(`http://thought.center:8081/nethub/jared/cryptopticon`)
          .then(response => {
            commit('setAnswer', (response.data === 0) ? 'no' : 'yes')
            resolve()
          })
          .catch(e => {
            resolve()
          })
      })
    },
    getImage ({ commit }, answer) {
      return new Promise((resolve, reject) => {
        axios.get(`https://yesno.wtf/api?force=${answer}`)
          .then(response => {
            commit('setPrediction', response.data)
            resolve()
          })
      })
    }
  }
})
