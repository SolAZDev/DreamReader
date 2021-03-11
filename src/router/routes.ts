import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        path: '/Symbol',
        component: () => import('pages/Symbol.vue'),
      },
      {
        path: '/Symbol/:id',
        component: () => import('pages/Symbol.vue'),
      },
      {
        path: '/History',
        component: () => import('pages/History.vue'),
      },
      {
        path: '/Saved',
        component: () => import('pages/Saved.vue'),
      },
      {
        path: '/Date',
        component: () => import('pages/DateSet.vue'),
      },
      {
        path: '/Settings',
        component: () => import('pages/SettingsPage.vue'),
      },
      {
        path: '/Privacy',
        component: () => import('pages/Privacy.vue'),
      },
      {
        path: '/About',
        component: () => import('pages/About.vue'),
      },
      {
        path: '/Note',
        component: () => import('pages/NoteView.vue'),
      },
      {
        path: '/NoteEdit',
        component: () => import('pages/NoteEdit.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
