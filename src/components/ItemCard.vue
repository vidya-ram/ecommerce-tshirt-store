<template>
  <div>
    <div class="card">
      <h3 class="card__title">{{ item.name }}</h3>
      <figure class="card__image">
        <img :src="item.imageURL" :alt="item.name" class="card__image__img" />
      </figure>
      <div class="card__footer">
        <p class="card__footer__price">
          {{ $store.state.currency }} {{ item.price }}
        </p>
        <button @click="$store.commit('ADD_TO_CART', item)" class="btn">
          Add to card
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemCard",
  props: ["item"],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  padding: 16px;
  margin: 0 16px 32px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 19%);
  background: grey;
}
.card__title {
  font-size: 22px;
  text-align: left;
  margin: 0 0 8px;
}
.card__image {
  width: 100%;
  min-height: 150px;
  margin: auto;
}
.card__image__img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  max-height: 220px;
}
.card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0 0;
}
.card__footer__price {
  font-weight: bold;
  font-size: 18px;
  margin: 0;
}
</style>
