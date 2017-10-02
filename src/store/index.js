import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    latestData: null,
    prediction: {},
    answer: 'maybe',
    loading: true
  },
  mutations: {
    setLatestData (state, latestData) {
      state.latestData = latestData
    },
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
    getLatestData ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get(`https://www.quandl.com/api/v3/datasets/BCHARTS/COINBASEUSD?limit=1`)
          .then(response => {
            commit('setLatestData', (response.data.dataset.data[0].slice(1)))
            resolve()
          })
          .catch(e => {
            resolve()
          })
      })
    },
    getPrediction ({ commit }, latestData) {
      return new Promise((resolve, reject) => {
        if (latestData) {
          axios.post(`/nethub/jared/cryptopticon/predict`, latestData)
            .then(response => {
              commit('setAnswer', (response.data[0] > response.data[1]) ? 'no' : 'yes')
              resolve()
            })
            .catch(e => {
              resolve()
            })
        }
        resolve()
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
