import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import Home from './components/Home'
import GameLobby from './components/GameLobby'

Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
	{ path: '/', name: 'home', component: Home },
	{ path: '/gameLobby', name: 'gameLobby', component: GameLobby },
	{
		path: '*',
		redirect: '/'
	}
]

const router = new VueRouter({
	routes,
	mode: 'history',
	base: process.env.BASE_URL
})

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
