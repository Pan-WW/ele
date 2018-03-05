import Vue from 'vue'
import Router from 'vue-router'
import Good from '../components/goods/Good'
import Seller from '../components/seller/Seller'
import Rating from '../components/rating/Rating'

Vue.use(Router)

let router = new Router({
  routes: [
    {path: '/goods', name: 'Good', component: Good},
    {path: '/seller', name: 'Seller', component: Seller},
    {path: '/ratings', name: 'Rating', component: Rating}
  ],
  linkActiveClass: 'active'
})

router.push('/goods')

export default router
