<template>
  <div id="app">
    <v-app>
      <main>
        <v-parallax height=800 src="/static/bitcoin.jpg">
          <h1 class="white--text">Q: Will <a style="color: #fff;" href="https://bitcoin.org">Bitcoin</a> cost more tomorrow?</h1>
          <router-view></router-view>
        </v-parallax>
        <v-container>
          <h4 class="text-md-left">How it works:</h4>
          <h5 class="text-md-left">Using a <a href="http://thought.center:8081/nethub/jared/cryptopticon">neural network</a> of course!</h5>
        </v-container>
        <v-parallax height=800 src="/static/bitcoin-chart.jpg">
          <h2 class="white--text text-md-right">Q: Should I use this as investing advice?</h2>
          <h3 class="white--text text-md-right">A: Absolutely not, none of the content published on this webpage constitutes a recommendation that any transaction or investment strategy is suitable for any person.</h3>
          <h4 class="white--text text-md-right">Check out <a style="color: #fff;" href="http://thought.center:8081/nethub">nethub</a> to build and deploy your own neural network.</h4>
        </v-parallax>
      </main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'app'
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
