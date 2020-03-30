import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SymbolsList from "../views/SymbolsList.vue";
import SymbolView from "../views/SymbolView.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/symbol/:id",
    name: "Symbol",
    component: SymbolView
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
