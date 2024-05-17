import { createRouter } from 'uni-mini-router'
import pagesJsonToRoutes from 'uni-parse-pages'
import { getPageInfos, getPageJson } from './pages'
import { useUserStore } from '~/stores/user'

// 引入uni-parse-pages
// 生成路由表
const routes = pagesJsonToRoutes(getPageJson())
const router = createRouter({
  routes: [...routes], // 路由表信息
})

router.beforeEach((to, from, next) => {
  const { hasLogin } = useUserStore()

  const pageInfo = getPageInfos().filter((pageInfo) => {
    return pageInfo.path === to.path
  }).at(0)

  if (!hasLogin && pageInfo!.needAuth) {
    next({ name: 'login', navType: 'replaceAll' })
    return
  }

  next()
})

// router.afterEach((to, from) => {
// })

export default router
