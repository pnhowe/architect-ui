import Vue from 'vue'
import Router from 'vue-router'

import PlanList from './pages/plan-list'
import PlanDetails from './pages/plan-details'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/plan-list'
    },
    {
      path: '/plan-list',
      name: 'PlanList',
      component: PlanList
    },
    {
      path: '/plan',
      name: 'PlanDetails',
      component: PlanDetails
    }
  ]
})
