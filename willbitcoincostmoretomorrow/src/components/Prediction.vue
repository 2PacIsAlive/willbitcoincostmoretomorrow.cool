<template>
  <div class="prediction">
    <v-parallax jumbotron :height="height" :src="prediction.image"><h2>{{ prediction.answer }}</h2></v-parallax>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'prediction',
  data () {
    return {
      loading: true,
      unused: null,
      errors: []
    }
  },
  mounted () {
    this.loadPrediction()
  },
  methods: {
    loadPrediction: function () {
      var phrases = {
        'happy': [
          'Things are looking up for bitcoin tomorrow.',
          'To the moon!',
          'BTC... going up!',
          'Bitcoin will cost more tomorrow.'
        ],
        'sad': [
          'Well, it can\'t always go up now can it.',
          'Bitcoin will cost less tomorrow.'
        ]
      }
      axios.get(`http://thought.center:8081/nethub/jared/cryptopticon`)
        .then(response => {
          this.unused = 'A: ' +
            ((response.data.lastPrediction === 1)
              ? phrases.happy[Math.floor(Math.random() * phrases.happy.length)]
              : phrases.sad[Math.floor(Math.random() * phrases.sad.length)])
        })
        .catch(e => {
          this.errors.push(e)
          this.unused = 'A: Idk. Something went wrong?'
        })
    }
  },
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
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
