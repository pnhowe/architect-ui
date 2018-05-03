import Vue from 'vue'
import Router from 'vue-router'

import PlanList from './pages/plan-list'
import PlanDetails from './pages/plan-details'
import Project from './pages/project'

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
    },
    {
      path: '/project',
      name: 'Project',
      component: Project
    }
  ]
})
