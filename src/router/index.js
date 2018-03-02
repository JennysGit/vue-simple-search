import Vue from 'vue'
import Router from 'vue-router'
import Search from '@/components/search/search.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'search',
      component: Search
    }
  ]
})
