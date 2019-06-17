import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: process.env.NODE_ENV === "production" ? "hash" : "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter(to, from, next) {
        if (from.name != "home") {
          next();
        }
      }
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue"),
      beforeEnter(to, from, next) {
        if (from.name != "about") {
          next();
        }
      }
    },
    {
      path: "/search",
      name: "search",
      component: () => import("./views/Search.vue"),
      beforeEnter(to, from, next) {
        if (from.name != "search") {
          next();
        }
      }
    },
    {
      path: "/park",
      name: "park",
      component: () => import("./views/Park.vue")
      // beforeEnter(to, from, next) {
      //   if (from.name == "search") {
      //     next();
      //   } else {
      //     next("/search");
      //   }
      // }
    }
  ]
});
