<template>
  <div class="prediction">
    <v-parallax jumbotron :height="height" :src="prediction.image">
      <h2>{{ prediction.answer }} (I'm {{ prediction.confidence }}% sure)</h2>
    </v-parallax>
  </div>
</template>

<script>
export default {
  name: 'prediction',
  computed: {
    prediction () {
      return this.$store.state.prediction
    },
    height () {
      return window.innerHeight
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  font-weight: normal;
}
</style>
