import Vuex from "vuex";
import Vue from "vue";
import getCatalogue from "../services/getCatalogue";

Vue.use(Vuex);

// Create a new store instance.
export const store = new Vuex.Store({
  state: {
    catalogueUrl:
      "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json",
    catalogue: [],
    catalogueHash: {},
    cart: {},
    cartCount: 0,
    currency: "Rs",
  },
  mutations: {
    SET_CATALOGUE(state, catalogue) {
      state.catalogue = catalogue;
    },
    SET_CATALOGUE_HASH(state, hash) {
      state.catalogueHash = hash;
    },
    ADD_TO_CART(state, item) {
      if (state.catalogueHash[item.id].quantity) {
        /* eslint-disable */
        if (!state.cart.hasOwnProperty(item.id)) {
          state.cart[item.id] = item;
        }
        state.cart[item.id].booked++;
        state.catalogueHash[item.id].quantity--;
        state.cartCount++;
      } else {
        this._vm.$toastr.i(`No more ${item.name} t-shirt available to add`);
      }
    },
    REMOVE_FROM_CART(state, item) {
      state.cart[item.id].booked--;
      state.catalogueHash[item.id].quantity++;
      state.cartCount--;
      if (!state.cart[item.id].booked) {
        delete state.cart[item.id];
      }
    },
    DELETE_FROM_CART(state, item) {
      /* eslint-disable */
      if (state.cart.hasOwnProperty(item.id)) {
        console.log(state.cart[item.id].booked);
        let booked = state.cart[item.id].booked;
        for (let i = 0; i < booked; i++) {
          this.commit("REMOVE_FROM_CART", item);
        }
      }
    },
  },
  actions: {
    fetchCatalogue() {
      return getCatalogue(this.state.catalogueUrl)
        .then((response) => {
          this.commit("SET_CATALOGUE", response);
          this.dispatch("getCatalogueHash");
        })
        .catch((errorMsg) => {
          this._vm.$toastr.e(errorMsg);
        });
    },
    getCatalogueHash() {
      let catalogueHash = {};
      this.getters.getCatalogue.map((item) => {
        Vue.set(item, "booked", 0);
        catalogueHash[item.id] = item;
      });
      this.commit("SET_CATALOGUE_HASH", catalogueHash);
    },
  },
  getters: {
    getCatalogue: (state) => state.catalogue,
    getCatalogueHash: (state) => state.catalogueHash,
    getCartCount: (state) => state.cartCount,
    getCart: (state) => state.cart,
  },
});
