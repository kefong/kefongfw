import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index/index'
import about from '@/components/index/about'
import login from '@/components/index/login'
import logout from '@/components/index/logout'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{ path: '/', name: 'index', component: index, meta:{requiresAuth:true, explain:'index'} },
		{ path: '/about', name: 'about', component: about, meta:{requiresAuth:true, explain:'about'} },
		{ path: '/login', name: 'login', component: login, meta:{requiresAuth:true, explain:'login'} },
		{ path: '/logout', name: 'logout', component: logout, meta:{requiresAuth:true, explain:'logout'} },
	]
})
