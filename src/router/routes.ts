import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        path: "/Symbol",
        component: () => import('pages/Symbol.vue'),
      },
      {
        path: "/History",
        component: () => import('pages/History.vue'),
      },
      {
        path: "/Saved",
        component: () => import('pages/Saved.vue'),
      },
    ]
  },
  

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
