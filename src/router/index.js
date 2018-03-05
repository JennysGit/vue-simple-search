import Vue from 'vue'
import Router from 'vue-router'
import Search from '@/components/search/search.vue'
import Edit from '@/components/edit/edit.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'search',
      component: Search
    },
    {
    	path:'/edit/:id',
    	name:'edit',
    	component:Edit
    }
  ]
})
