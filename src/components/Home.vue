<template>
  <div>
    <div class="container">
      <div class="icon-wrapper">
        <input
          type="text"
          class="search-input"
          placeholder="Search for products"
          @input="searchHandler($event)"
        />
        <font-awesome-icon
          icon="search"
          class="search-icon icons icons--small"
        />
        <font-awesome-icon
          icon="filter"
          class="filter-icon icons icons--small"
          @click="showFilterCard"
        />
      </div>
      <div class="wrapper">
        <CatalogueFilter
          :hide-filter-card="hideFilterCard"
          @filter-catalogue="filterCatalogue"
        ></CatalogueFilter>
        <ul class="catalogue">
          <li
            class="catalogue__item"
            v-for="item in filteredCatalogue"
            :key="item.id"
          >
            <ItemCard :item="item"></ItemCard>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import CatalogueFilter from "./CatalogueFilter.vue";
import ItemCard from "./ItemCard.vue";

export default {
  name: "HomePage",
  data() {
    return {
      hideFilterCard: true,
      currency: "Rs",
      filteredCatalogue: [],
      debounceTimerId: "",
    };
  },
  components: {
    CatalogueFilter,
    ItemCard,
  },
  methods: {
    showFilterCard() {
      this.hideFilterCard = !this.hideFilterCard;
    },
    filterCatalogue(filterType, filterPrice) {
      let catalogue = this.$store.getters.getCatalogue;
      for (let category in filterType) {
        catalogue = this.filter(category, filterType[category], catalogue);
      }
      console.log("filterPrice", filterPrice, Object.keys(filterPrice).length);
      if (Object.keys(filterPrice).length) {
        this.filteredCatalogue = this.filterPrice(filterPrice, catalogue);
      } else {
        this.filteredCatalogue = catalogue;
      }
    },
    filter(category, filters, catalogue) {
      if (filters.length === 0) {
        return catalogue;
      } else {
        return catalogue.filter((item) => {
          return filters.indexOf(item[category].toLowerCase()) > -1;
        });
      }
    },
    filterPrice(filterPrice, catalogue) {
      let key = Object.keys(filterPrice)[0];
      if (filterPrice[key].length === 0) {
        return catalogue;
      } else {
        return catalogue.filter((item) => {
          return (
            item[key] >= filterPrice[key][0] && item[key] <= filterPrice[key][1]
          );
        });
      }
    },
    search(text) {
      text = text.toLowerCase();
      let catalogue = this.$store.getters.getCatalogue;
      this.filteredCatalogue = catalogue.filter((item) => {
        return (
          item.name.toLowerCase().includes(text) ||
          item.type.toLowerCase().includes(text) ||
          item.color.toLowerCase().includes(text)
        );
      });
    },
    searchHandler($event) {
      if (this.debounceTimerId) clearTimeout(this.debounceTimerId);
      this.debounceTimerId = setTimeout(() => {
        this.search($event.target.value);
      }, 1000);
    },
  },
  mounted() {
    this.$store.dispatch("fetchCatalogue").then(() => {
      this.filteredCatalogue = this.$store.getters.getCatalogue;
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.icon-wrapper {
  margin: 16px auto 32px;
}
.search-input {
  border: 0;
  border-bottom: 1px solid black;
  margin: 0 8px 0 0;
  outline: none;
  font-size: 18px;
}
@media (min-width: 768px) {
  .filter-icon {
    display: none;
  }
}
.wrapper {
  display: flex;
}
.catalogue {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
}
.catalogue__item {
  width: 100%;
  margin: 0;
}
@media (min-width: 768px) {
  .catalogue {
    margin-left: -16px;
    margin-right: -16px;
  }
  .catalogue__item {
    width: 50%;
  }
}
@media (min-width: 1200px) {
  .catalogue__item {
    width: 33.3%;
  }
}
</style>
