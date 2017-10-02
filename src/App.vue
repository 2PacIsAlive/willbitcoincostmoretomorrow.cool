<template>
  <div id="app">
    <v-app light>
      <div v-if="loading">
        <v-progress-linear v-bind:indeterminate="true"></v-progress-linear>
        one sec..
      </div>
      <div v-else>
        <router-view></router-view>
        <v-footer class="l">
          <div>Hacked up by <a href=https://github.com/2PacIsAlive>Jared Jolton</a>.</div>
        </v-footer>
        <v-footer dark class="l">
          <div>Contact: jared@willbitcoincostmoretomorrow.cool Donate: { my btc addr }</div>
        </v-footer>
        <v-footer class="l">
          <v-spacer></v-spacer>
          <div v-html="disclaimer"></div>
        </v-footer>
        <v-footer dark class="l">
          <v-spacer></v-spacer>
          <div>Use <a href="http://thought.center/nethub">nethub</a> to build your own bitcoin-price predicting neural network why don'tcha, it's easy <i>and</i> fun!</div>
        </v-footer>
      </div>
    </v-app>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app',
  data () {
    return {
      disclaimer: 'Disclaimer: This website does not provide investment or trading advice.'
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
