const routes = [
  {
    path: '/', // 主路由
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'home', component: () => import('pages/WelcomePage.vue') }, // 欢迎页面
      { path: 'control', component: () => import('pages/ControlPage.vue') }, // 控制面板
      { path: 'check-in', component: () => import('pages/CheckIn.vue') }, // 入住界面
      { path: 'check-out', component: () => import('pages/CheckOut.vue') }, // 结账界面
      { path: 'monitoring', component: () => import('pages/MonitorPage.vue') } // 监控界面
    ]
  },

  // 总是保留这个作为最后一个路由，也可以选择移除
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes;