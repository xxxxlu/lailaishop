<template>
  <div class="product-list">
    <div class="products-bg">
      <div class="tech-dots"></div>
      <div class="tech-circle tech-circle-left"></div>
      <div class="tech-circle tech-circle-right"></div>
    </div>
    <div class="tech-grid"></div>
    
    <div class="container">
      <div class="page-header">
        <h1><span class="highlight">{{ categoryTitle }}</span></h1>
        <div class="breadcrumbs">
          <router-link to="/">Home</router-link>
          <span class="breadcrumb-separator">›</span>
          <span>{{ categoryTitle }}</span>
        </div>
      </div>

      <div class="content-wrapper">
        <div class="sidebar">

          <div class="filter-section">
            <div class="section-header">
              <h3>Price Range</h3>
              <div class="tech-line"></div>
            </div>
            <div class="price-inputs">
              <input type="number" placeholder="Min" v-model="priceMin" />
              <span>-</span>
              <input type="number" placeholder="Max" v-model="priceMax" />
            </div>
            <button class="filter-btn" @click="applyFilters">
              <span>Apply Filters</span>
              <div class="btn-shine"></div>
            </button>
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
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700&display=swap');

.product-list {
  margin-bottom: 40px;
  padding: 60px 0;
  position: relative;
  min-height: 80vh;
  color: #f3f4f6;
}

.products-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #111827;
  z-index: -2;
}

.tech-grid {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(34, 197, 94, 0.03) 1px, transparent 1px),
                   linear-gradient(90deg, rgba(34, 197, 94, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  z-index: -1;
  opacity: 0.4;
}

.tech-dots {
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 200px;
  background-image: radial-gradient(rgba(34, 197, 94, 0.2) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.3;
  z-index: -1;
}

.tech-circle {
  position: absolute;
  border-radius: 50%;
  border: 1px dashed rgba(34, 197, 94, 0.1);
  z-index: -1;
}

.tech-circle-left {
  width: 300px;
  height: 300px;
  top: 10%;
  left: -150px;
  animation: rotate 50s linear infinite;
}

.tech-circle-right {
  width: 500px;
  height: 500px;
  bottom: 10%;
  right: -250px;
  animation: rotate 70s linear infinite reverse;
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.page-header {
  margin-bottom: 30px;
  text-align: center;
}

.page-header h1 {
  font-family: 'Orbitron', sans-serif;
  font-size: 36px;
  font-weight: 700;
  color: #f3f4f6;
  margin-bottom: 16px;
  letter-spacing: 1px;
}

.highlight {
  color: #22c55e;
  position: relative;
}

.breadcrumbs {
  color: #9ca3af;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.breadcrumbs a {
  color: #d1d5db;
  text-decoration: none;
  transition: color 0.2s ease;
  font-weight: 500;
}

.breadcrumbs a:hover {
  color: #22c55e;
}

.breadcrumb-separator {
  color: #4b5563;
}

.content-wrapper {
  display: flex;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  margin-bottom: 20px;
  position: relative;
}

.section-header h3 {
  font-family: 'Orbitron', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #f3f4f6;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
  position: relative;
}

.tech-line {
  height: 1px;
  width: 100%;
  background: linear-gradient(90deg, rgba(34, 197, 94, 0.2), transparent);
  position: relative;
  margin-top: 4px;
}

.sidebar {
  width: 280px;
  flex-shrink: 0;
}

.filter-section {
  background-color: rgba(17, 24, 39, 0.4);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 24px;
  border: 1px solid rgba(34, 197, 94, 0.1);
  position: relative;
  overflow: hidden;
}

.filter-section::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(34, 197, 94, 0.05) 0%, transparent 70%);
  z-index: 0;
}

.filter-section ul {
  position: relative;
  z-index: 1;
}

.filter-section ul li {
  margin-bottom: 12px;
  transition: transform 0.3s ease;
}

.filter-section ul li:hover {
  transform: translateX(5px);
}

.filter-section ul li a {
  color: #d1d5db;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 15px;
  display: block;
  padding: 5px 0;
}

.filter-section ul li a:hover {
  color: #22c55e;
}

.price-inputs {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  position: relative;
  z-index: 1;
}

.price-inputs input {
  width: 80px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(34, 197, 94, 0.1);
  border-radius: 8px;
  font-size: 14px;
  color: #f3f4f6;
  transition: all 0.3s ease;
}

.price-inputs input:focus {
  outline: none;
  border-color: rgba(34, 197, 94, 0.4);
  background-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
}

.price-inputs span {
  margin: 0 10px;
  color: #9ca3af;
}

.filter-btn {
  position: relative;
  width: 100%;
  padding: 12px 15px;
  background-color: #22c55e;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  background-color: #16a34a;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(34, 197, 94, 0.2);
}

.btn-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: 0.5s;
}

.filter-btn:hover .btn-shine {
  left: 100%;
}

.main-content {
  flex-grow: 1;
}

.sort-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(17, 24, 39, 0.4);
  backdrop-filter: blur(10px);
  padding: 15px 20px;
  border-radius: 12px;
  margin-bottom: 24px;
  border: 1px solid rgba(34, 197, 94, 0.1);
  color: #f3f4f6;
  position: relative;
  overflow: hidden;
}

.sort-bar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(34, 197, 94, 0.05) 0%, transparent 70%);
  z-index: 0;
}

.sort-options {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
}

.sort-options label {
  margin-right: 10px;
  color: #d1d5db;
}

.sort-options select {
  margin-left: 10px;
  padding: 8px 12px;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(34, 197, 94, 0.1);
  border-radius: 8px;
  color: #f3f4f6;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.sort-options select:focus {
  outline: none;
  border-color: rgba(34, 197, 94, 0.4);
  background-color: rgba(255, 255, 255, 0.08);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.no-products {
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px;
  background-color: rgba(17, 24, 39, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(34, 197, 94, 0.1);
  color: #d1d5db;
  font-size: 16px;
}

@media (max-width: 992px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .page-header h1 {
    font-size: 30px;
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
    padding: 0 20px;
  }

  .sidebar {
    width: 100%;
    margin-bottom: 20px;
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .page-header h1 {
    font-size: 28px;
  }
  
  .section-header h3 {
    font-size: 16px;
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
    width: 100%;
  }
  
  .sort-options select {
    width: 100%;
    margin-left: 0;
    margin-top: 5px;
  }
  
  .price-inputs {
    justify-content: space-between;
  }
  
  .filter-section {
    padding: 15px;
  }
  
  .page-header {
    margin-bottom: 20px;
  }
  
  .page-header h1 {
    font-size: 24px;
  }
}
</style>
