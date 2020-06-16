export default function ({ app, store, $axios }) {
  $axios.interceptors.request.use(function (config) {
    config.headers.apitoken = 'vapeindubaiapiv1'
    return config
  })

  // $axios.interceptors.response.use(
  //     response => response,
  //     error => {
  //         let isPublicPage    = process.env.publicRoutes.includes(app.router.currentRoute.fullPath)
  //         let unauthorized    = !isPublicPage && error.response && error.response.status === 401
  //         if (unauthorized) {
  //             store.dispatch('auth/logout')
  //             return
  //         }
  //         return Promise.reject(error)
  //     }
  // )
}
