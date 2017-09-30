<template>
  <div id="app">
    <v-app>
        <div v-if="loading">
          <v-progress-linear v-bind:indeterminate="true"></v-progress-linear>
          one sec..
        </div>
        <div v-else>
          <router-view></router-view>
        </div>
        <v-footer>
          <div v-html="disclaimer"></div>
        </v-footer>
    </v-app>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'app',
  data () {
    return {
      disclaimer: 'Disclaimer: This website does not provide investing advice, and should not be used in such a manner. Build your own neural network using <a href="http://thought.center/nethub">nethub</a> why don\'tcha',
      errors: [],
      image: null
    }
  },
  methods: {
    loadImage: function () {
      axios.get(`https://yesno.wtf/api?force=yes`) // todo: force based on prediction
        .then(response => {
          this.image = response.data.image
          this.loading = false
        })
        .catch(e => {
          this.errors.push(e)
          axios.get(`https://yesno.wtf/api?force=maybe`)
            .then(response => {
              this.image = response.data.image
              this.loading = false
            })
            .catch(e => {
              this.errors.push(e)
            })
        })
    }
  },
  mounted () {
    this.$store.dispatch('getPrediction').then(() => {
      this.$store.dispatch('getImage', this.answer).then(() => {
        this.$store.commit('setLoading', false)
      })
    })
  },
  computed: mapState({
    answer: state => state.answer,
    loading: state => state.loading
  })
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 3px;
}

a {
  color: #42b983;
}
</style>
