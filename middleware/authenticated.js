// import { pmsUserToken } from '@/constants/AppTokens'

export default function ({ route, store, redirect }) {
  if (!route.matched.length) {
    console.error('route-not-exists:', route.path)
    return redirect(404, '/error')
  }
  // If user is not authenticated
  if (!store.getters['auth/auth']) {
    store.commit('auth/purgeAuth')
    return redirect('/')
  }
  // let userData    = JSON.parse(localStorage.getItem(pmsUserToken))
  // console.error('checking', store.getters['auth/userData'].id, userData.id, store.getters['auth/userData'].id === userData.id)
  // if user switched to different account
  // if (store.getters['auth/userData'] && userData && store.getters['auth/userData'].id !== userData.id) {
  //     store.commit('auth/purgeAuth')
  //     return redirect('/')
  // }
}
