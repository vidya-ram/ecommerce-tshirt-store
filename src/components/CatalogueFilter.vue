<template>
  <div class="filter" :class="{ hide: hideFilterCard }">
    <div v-for="category in categoriesNames" :key="category">
      <p class="filer__title">{{ captialize(category) }}</p>
      <ul class="nostyle filter__category">
        <li
          v-for="name in categories[category]"
          class="filter__category__item"
          :key="name"
        >
          <input
            type="checkbox"
            :id="name"
            v-on:input="signalFilter(category, name, $event)"
          /><label :for="name">{{ captialize(name) }}</label>
        </li>
      </ul>
    </div>
    <div>
      <p class="filer__title">
        {{ captialize(priceCategoryName) }}
      </p>
      <ul class="nostyle filter__category">
        <li
          v-for="range in priceRange"
          class="filter__category__item"
          :key="range.id"
        >
          <input
            type="checkbox"
            :id="range.id"
            v-on:input="
              signalFilterPrice(range.lowerLimit, range.upperLimit, $event)
            "
          /><label :for="range.id">{{ range.title }}</label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "CatalogueFilter",
  props: ["hideFilterCard"],
  data() {
    return {
      categoriesNames: ["color", "gender", "type"],
      categories: {
        color: ["black", "blue", "pink", "green", "purple", "grey"],
        gender: ["women", "men"],
        type: ["basic", "polo", "hoodie"],
      },
      selectedCategories: {
        color: [],
        gender: [],
        type: [],
      },
      priceCategoryName: "price",
      priceRange: [
        { title: "0 - Rs 250", lowerLimit: 0, upperLimit: 250, id: "range1" },
        {
          title: "Rs 251 - Rs 450",
          lowerLimit: 251,
          upperLimit: 450,
          id: "range2",
        },
        {
          title: "Rs 451 & above",
          lowerLimit: 451,
          upperLimit: 1000000,
          id: "range3",
        },
      ],
      selectedPrices: [],
      selectedPriceRange: {},
    };
  },
  methods: {
    captialize(item) {
      return item.charAt(0).toUpperCase() + item.slice(1);
    },
    signalFilter(filterType, type, $event) {
      if ($event.target.checked) {
        this.selectedCategories[filterType].push(type);
      } else {
        let index = this.selectedCategories[filterType].indexOf(type);
        this.selectedCategories[filterType].splice(index, 1);
      }
      this.sendFilterEvent();
    },
    signalFilterPrice(lowerLimit, upperLimit, $event) {
      if ($event.target.checked) {
        this.selectedPrices.push(lowerLimit);
        this.selectedPrices.push(upperLimit);
      } else {
        let index = this.selectedPrices.indexOf(lowerLimit);
        this.selectedPrices.splice(index, 1);
        index = this.selectedPrices.indexOf(upperLimit);
        this.selectedPrices.splice(index, 1);
      }
      this.selectedPriceRange[this.priceCategoryName] = [];
      if (this.selectedPrices && this.selectedPrices.length) {
        this.selectedPriceRange[this.priceCategoryName].push(
          Math.min.apply(null, this.selectedPrices),
          Math.max.apply(null, this.selectedPrices)
        );
        this.sendFilterEvent();
      }
    },
    sendFilterEvent() {
      console.log("sendFilterEvent", this.selectedPriceRange);
      this.$emit(
        "filter-catalogue",
        this.selectedCategories,
        this.selectedPriceRange
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.filter {
  padding: 16px;
  width: 180px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 19%);
  margin-right: 48px;
  position: fixed;
  top: 76px;
  bottom: 0;
  left: 0;
  background: white;
  transition: left 1s ease-in-out;
  z-index: 3;
}
.filter.hide {
  left: -300px;
}
@media (min-width: 768px) {
  .filter.hide {
    position: static;
  }
}
.filer__title {
  font-size: 18px;
  font-weight: bold;
  text-align: left;
}
.filter__category {
  padding-left: 0;
}
.filter__category__item {
  text-align: left;
}
.filter__category__item label {
  margin-left: 8px;
}
</style>
