import Vue from 'vue'
import Router from 'vue-router'
import Default from '@/components/Default'
// import ATL from '@/components/atl'

Vue.use(Router)

export default new Router({
  routes: [
  {
    // path: '/:lot?/:slug?/:map?/:bbox?',
    path: '/:map?/:bbox?/:lot?',
    name: 'Default',
    component: Default
  }
  // ,{
  //   path: '/atl',
  //   name: 'ATL',
  //   component: ATL
  // }
  ]
})
