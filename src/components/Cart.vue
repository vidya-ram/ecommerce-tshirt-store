<template>
  <div>
    <div class="container">
      <p>Shopping cart</p>
      <ul class="nostyle">
        <li v-for="item in this.$store.getters.getCart" :key="item.id">
          <div class="cart">
            <img :src="item.imageURL" :alt="item.name" class="cart__img" />
            <div>
              <p class="cart__name">{{ item.name }}</p>
              <p class="cart__price">
                {{ $store.state.currency }} {{ item.price }}
              </p>
            </div>
            <div class="cart__btn">
              <button
                @click="$store.commit('ADD_TO_CART', item)"
                class="btn nobtnstyle"
              >
                +
              </button>
              <span class="cart__booked btn nobtnstyle">{{ item.booked }}</span>
              <button
                @click="$store.commit('REMOVE_FROM_CART', item)"
                class="btn nobtnstyle"
              >
                -
              </button>
            </div>
            <button
              @click="$store.commit('DELETE_FROM_CART', item)"
              class="btn"
            >
              Remove
            </button>
          </div>
        </li>
      </ul>
      <hr />
      <div>
        <p>
          Total amount {{ this.$store.state.currency }}
          {{ cartTotal }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartPage",
  computed: {
    cartTotal() {
      let total = 0;
      let cart = this.$store.getters.getCart;
      for (let item in cart) {
        total += cart[item].price * cart[item].booked;
      }
      return total;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  max-width: 500px;
  margin: 8px auto 32px;
}
.cart__img {
  height: 100px;
}
.cart__btn {
  margin-bottom: 8px;
}
@media (min-width: 768px) {
  .cart {
    flex-direction: row;
  }
}
</style>
