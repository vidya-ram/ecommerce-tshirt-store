import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import VueToastr from "vue-toastr";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faFilter,
  faSearch,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
library.add(faFilter, faSearch, faShoppingCart);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(VueToastr);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
