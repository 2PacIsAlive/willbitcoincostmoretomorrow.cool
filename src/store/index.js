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
        axios({
          method: 'get',
          url: `https://www.quandl.com/api/v3/datasets/BCHARTS/COINBASEUSD.json?limit=1`
        })
          .then(response => {
            console.log(response)
            resolve(response.data.dataset.data[0].slice(1))
          })
          .catch(e => {
            console.log(e)
            resolve()
          })
      })
    },
    getPrediction ({ commit }, latestData) {
      return new Promise((resolve, reject) => {
        if (latestData) {
          axios.post(`/nethub/jared/cryptopticon/predict`, {
            name: 'cryptopticon',
            layers: [
              {
                type: 'input',
                shape: [null, 7]
              }, {
                type: 'fully_connected',
                num_units: 64,
                activation: 'linear'
              }, {
                type: 'dropout',
                keep_prob: 0.8
              }, {
                type: 'fully_connected',
                num_units: 64,
                activation: 'linear'
              }, {
                type: 'dropout',
                keep_prob: 0.8
              }, {
                type: 'fully_connected',
                num_units: 64,
                activation: 'linear'
              }, {
                type: 'fully_connected',
                num_units: 2,
                activation: 'softmax'
              }, {
                type: 'regression',
                optimizer: 'sgd',
                loss_fcn: 'categorical_crossentropy',
                learning_rate: 0.001
              }
            ],
            data: latestData
          })
            .then(response => {
              if (response.status === 200) {
                if (response.data[0] > response.data[1]) {
                  commit('setAnswer', 'no')
                  resolve({'answer': 'no', 'confidence': (response.data[0] * 100)})
                } else {
                  commit('setAnswer', 'yes')
                  resolve({'answer': 'yes', 'confidence': (response.data[1] * 100)})
                }
              } else {
                resolve({'answer': 'maybe', 'confidence': 100})
              }
            })
            .catch(e => {
              console.log(e)
              resolve({'answer': 'maybe', 'confidence': 100})
            })
        } else {
          resolve({'answer': 'maybe', 'confidence': 100})
        }
      })
    },
    getImage ({ commit }, prediction) {
      return new Promise((resolve, reject) => {
        axios.get(`https://yesno.wtf/api?force=${prediction.answer}`)
          .then(response => {
            response.data.confidence = prediction.confidence.toFixed(2)
            commit('setPrediction', response.data)
            resolve()
          })
      })
    }
  }
})
