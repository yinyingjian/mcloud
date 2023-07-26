import { app } from '@/stores/localstorage'

// 业务守卫的业务逻辑
export var beforeEachHanler = function (to, from, next) {
  // 判断用户是否登录
  if (to.path.indexOf('/login') !== 0) {
    // 需要判断当前用户是否已经登录
    if (!app.value.isLogin) {
      // 如果没有登录，需要重定向到登录页面去
      // 需要获取router对象? 这么不能不用useRoute
      // 直接跳转到LoginPage去登录
      // 记录下用户需要 去往的目标页面
      // /login?to=TagList
      next({ name: 'LoginPage', query: { to: to.name } })
      return
    }
  }

  // 直接继续后面的路由处理
  next()
}
