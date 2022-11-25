<template>
  <div>
    <header>
      <nav>
        <router-link :to="{ name: 'HomePage' }" class="nolink">
          <h1 class="title">{{ title }}</h1>
        </router-link>
        <transition name="bounce" mode="out-in">
          <router-link
            :to="{ name: 'CartPage' }"
            class="cart-wrapper"
            :key="cartCount"
          >
            <font-awesome-icon icon="shopping-cart" class="cart-icon icons" />
            <p class="cart-count" v-if="cartCount">{{ cartCount }}</p>
          </router-link>
        </transition>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  name: "PageHeader",
  data() {
    return {
      title: "Tex Store",
    };
  },
  computed: {
    cartCount() {
      return this.$store.getters.getCartCount;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: grey;
  color: white;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 19%);
  z-index: 4;
}
nav {
  display: flex;
  padding: 16px;
  justify-content: space-between;
  align-items: center;
}
.title {
  margin: 0;
}
.cart-wrapper {
  position: relative;
}
.cart-count {
  position: absolute;
  top: -6px;
  right: 6px;
  font-size: 12px;
  color: white;
}
.bounce-enter-active,
.bounce-leave-active {
  transition: all 0.3s ease;
}
.bounce-enter,
.bounce-leave-to {
  transform: translateY(10px);
}
</style>
