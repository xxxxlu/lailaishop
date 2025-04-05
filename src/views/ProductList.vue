<template>
  <div class="product-list">
    <div class="container">
      <div class="page-header">
        <h1>{{ categoryTitle }}</h1>
        <div class="breadcrumbs">
          <router-link to="/">Home</router-link> /
          <span>{{ categoryTitle }}</span>
        </div>
      </div>

      <div class="content-wrapper">
        <div class="sidebar">
          <div class="filter-section">
            <h3>Categories</h3>
            <ul>
              <li v-for="category in categories" :key="category.id">
                <router-link :to="'/products?category=' + category.slug">
                  {{ category.name }}
                </router-link>
              </li>
            </ul>
          </div>

          <div class="filter-section">
            <h3>Price Range</h3>
            <div class="price-inputs">
              <input type="number" placeholder="Min" v-model="priceMin" />
              <span>-</span>
              <input type="number" placeholder="Max" v-model="priceMax" />
            </div>
            <button class="filter-btn" @click="applyFilters">Apply</button>
          </div>
        </div>

        <div class="main-content">
          <div class="sort-bar">
            <span>{{ filteredProducts.length }} products found</span>
            <div class="sort-options">
              <label for="sort">Sort by:</label>
              <select id="sort" v-model="sortOption">
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>

          <div class="products-grid">
            <template v-if="filteredProducts.length > 0">
              <product-card
                v-for="product in filteredProducts"
                :key="product.id"
                :product="product"
              />
            </template>
            <div v-else class="no-products">
              <p>No products found. Try adjusting your filters.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProductCard from '../components/ProductCard.vue'

export default {
  name: 'ProductList',
  components: {
    ProductCard
  },
  data() {
    return {
      sortOption: 'price-low',
      priceMin: '',
      priceMax: '',
      appliedPriceMin: null,
      appliedPriceMax: null
    }
  },
  computed: {
    ...mapState(['products', 'categories']),
    categorySlug() {
      return this.$route.query.category || ''
    },
    categoryTitle() {
      if (this.categorySlug) {
        const category = this.categories.find(cat => cat.slug === this.categorySlug)
        return category ? category.name : 'All Products'
      }
      return 'All Products'
    },
    filteredProducts() {
      let filtered = [...this.products]

      // Filter by category
      if (this.categorySlug) {
        filtered = filtered.filter(product => product.category === this.categorySlug)
      }

      // Filter by price range
      if (this.appliedPriceMin !== null) {
        filtered = filtered.filter(product => product.price >= this.appliedPriceMin)
      }

      if (this.appliedPriceMax !== null) {
        filtered = filtered.filter(product => product.price <= this.appliedPriceMax)
      }

      // Sort products
      switch (this.sortOption) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price)
          break
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price)
          break
        case 'name':
          filtered.sort((a, b) => a.name.localeCompare(b.name))
          break
      }

      return filtered
    }
  },
  methods: {
    applyFilters() {
      this.appliedPriceMin = this.priceMin !== '' ? parseInt(this.priceMin) : null
      this.appliedPriceMax = this.priceMax !== '' ? parseInt(this.priceMax) : null
    }
  },
  watch: {
    '$route.query.category'() {
      // Reset filters when category changes
      this.priceMin = ''
      this.priceMax = ''
      this.appliedPriceMin = null
      this.appliedPriceMax = null
    }
  }
}
</script>

<style scoped>
.product-list {
  margin-bottom: 40px;
}

.page-header {
  margin-bottom: 20px;
}

.page-header h1 {
  font-size: 28px;
  margin-bottom: 10px;
}

.breadcrumbs {
  color: #777;
  font-size: 14px;
}

.breadcrumbs a {
  color: #333;
  text-decoration: none;
}

.content-wrapper {
  display: flex;
  gap: 20px;
}

.sidebar {
  width: 250px;
  flex-shrink: 0;
}

.filter-section {
  background-color: #fff;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.filter-section h3 {
  font-size: 16px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.filter-section ul li {
  margin-bottom: 10px;
}

.filter-section ul li a {
  color: #333;
  text-decoration: none;
}

.filter-section ul li a:hover {
  color: #d23c36;
}

.price-inputs {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.price-inputs input {
  width: 80px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 3px;
}

.price-inputs span {
  margin: 0 10px;
}

.filter-btn {
  width: 100%;
  padding: 8px 15px;
  background-color: #d23c36;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
}

.main-content {
  flex-grow: 1;
}

.sort-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.sort-options select {
  margin-left: 10px;
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 3px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.no-products {
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

@media (max-width: 992px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    margin-bottom: 20px;
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }

  .sort-bar {
    flex-direction: column;
    align-items: flex-start;
  }

  .sort-options {
    margin-top: 10px;
  }
}
</style>
