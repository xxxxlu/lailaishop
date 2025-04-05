<template>
  <div class="home">
    <div class="banner">
      <div class="container">
        <div class="banner-slider">
          <div class="slide">
            <img src="https://ext.same-assets.com/3844190759/1621146294.jpeg" alt="Jadoo Deals" />
          </div>
        </div>
      </div>
    </div>

    <div class="latest-products">
      <div class="container">
        <h2 class="section-title">Latest Products</h2>
        <div class="product-grid">
          <product-card
            v-for="product in latestProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProductCard from '../components/ProductCard.vue'

export default {
  name: 'Home',
  components: {
    ProductCard
  },
  computed: {
    ...mapState(['products', 'categories']),
    latestProducts() {
      return this.products
    }
  },
  methods: {
    getCategoryImage(slug) {
      const images = {
        'mens-watches': 'https://ext.same-assets.com/3844190759/3168748284.png',
        'womens-watches': 'https://ext.same-assets.com/3844190759/171383382.png',
        'smart-watches': 'https://ext.same-assets.com/3844190759/2489728016.png',
        'clocks': 'https://ext.same-assets.com/3844190759/2544317318.png'
      }
      return images[slug] || 'https://ext.same-assets.com/3844190759/3168748284.png'
    }
  }
}
</script>

<style scoped>
.home {
  margin-bottom: 40px;
}

.banner {
  margin-bottom: 30px;
}

.banner-slider {
  width: 100%;
}

.slide img {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.section-title {
  font-size: 24px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #d23c36;
}

.featured-categories {
  margin-bottom: 30px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.category-item {
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.category-item:hover {
  transform: translateY(-5px);
}

.category-image {
  height: 150px;
  overflow: hidden;
}

.category-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category-item h3 {
  padding: 10px;
  text-align: center;
  font-size: 16px;
  color: #333;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.featured-brands {
  margin-top: 40px;
}

.brand-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.brand-item {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.brand-item img {
  max-width: 100%;
  height: 100px;
  object-fit: contain;
  margin-bottom: 10px;
}

.brand-item h3 {
  font-size: 16px;
  color: #333;
}

@media (max-width: 992px) {
  .category-grid, .product-grid, .brand-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .category-grid, .product-grid, .brand-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .category-grid, .product-grid, .brand-grid {
    grid-template-columns: 1fr;
  }
}
</style>
