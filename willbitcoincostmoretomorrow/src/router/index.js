import Vue from 'vue'
import Router from 'vue-router'
import Prediction from '@/components/Prediction'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Prediction',
      component: Prediction
    }
  ]
})
