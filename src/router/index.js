import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: () => import("@/components/Home"),
    },
    {
      path: "/cart",
      name: "CartPage",
      component: () => import("@/components/Cart"),
    },
  ],
});
