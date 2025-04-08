<template>
  <div class="home">
    <!-- Hero Banner Section -->
    <div class="hero-banner">
      <div class="container">
        <div class="hero-content">
          <h1>Welcome to ABC Shop</h1>
          <p>Discover amazing products at great prices</p>
          <router-link to="/products" class="shop-now-btn">Shop Now</router-link>
        </div>
        <div class="hero-image">
          <img src="https://ext.same-assets.com/1656695661/479450343.jpeg" alt="Featured Products" />
        </div>
      </div>
    </div>
    
    <!-- Categories Section -->
    <div class="categories-section">
      <div class="container">
        <h2 class="section-title">Shop by Category</h2>
        <div class="categories-grid">
          <div class="category-card" v-for="category in categories" :key="category.id">
            <router-link :to="`/products?category=${category.slug}`">
              <div class="category-icon">
                <img :src="getCategoryImage(category.slug)" :alt="category.name">
              </div>
              <h3>{{ category.name }}</h3>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Latest Products Section -->
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
    
    <!-- Feature Section -->
    <div class="features-section">
      <div class="container">
        <div class="feature">
          <div class="feature-icon">🚚</div>
          <h3>Fast Shipping</h3>
          <p>Free shipping on all orders over $50</p>
        </div>
        <div class="feature">
          <div class="feature-icon">🔄</div>
          <h3>Easy Returns</h3>
          <p>30-day return policy</p>
        </div>
        <div class="feature">
          <div class="feature-icon">🔒</div>
          <h3>Secure Payment</h3>
          <p>100% secure payment processing</p>
        </div>
        <div class="feature">
          <div class="feature-icon">💬</div>
          <h3>24/7 Support</h3>
          <p>Dedicated support team</p>
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
      // 限制为最新的8个产品
      return this.products.slice(0, 8)
    }
  },
  methods: {
    getCategoryImage(slug) {
      const images = {
        'Bedding': 'https://m.media-amazon.com/images/I/811VZKvFwZL._AC_UL640_FMwebp_QL65_.jpg',
        'Bath': 'https://m.media-amazon.com/images/I/61ML-XytWhL._AC_UL640_FMwebp_QL65_.jpg'
      }
      return images[slug] || 'https://m.media-amazon.com/images/I/811VZKvFwZL._AC_UL640_FMwebp_QL65_.jpg'
    }
  }
}
</script>

<style scoped>
.home {
  padding-bottom: 48px;
}

/* Hero Banner */
.hero-banner {
  background-color: #f0f5ff;
  padding: 64px 0;
  margin-bottom: 48px;
}

.hero-banner .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-content {
  flex: 1;
  padding-right: 48px;
}

.hero-content h1 {
  font-size: 42px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 16px;
  line-height: 1.2;
}

.hero-content p {
  font-size: 18px;
  color: #475569;
  margin-bottom: 32px;
}

.shop-now-btn {
  display: inline-block;
  background-color: #3b82f6;
  color: white;
  font-weight: 600;
  padding: 14px 28px;
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.shop-now-btn:hover {
  background-color: #2563eb;
}

.hero-image {
  flex: 1;
  text-align: right;
}

.hero-image img {
  max-width: 100%;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

/* Categories Section */
.categories-section {
  margin-bottom: 48px;
}

.section-title {
  font-size: 32px;
  font-weight: 600;
  color: #1e293b;
  text-align: center;
  margin-bottom: 32px;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.category-card {
  background-color: #f8fafc;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #e2e8f0;
}

.category-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.category-card a {
  text-decoration: none;
  color: inherit;
}

.category-icon {
  height: 120px;
  width: 120px;
  margin: 0 auto 16px;
  overflow: hidden;
  border-radius: 50%;
  border: 4px solid #e0e7ff;
}

.category-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.category-card:hover .category-icon img {
  transform: scale(1.1);
}

.category-card h3 {
  font-size: 18px;
  font-weight: 600;
  color: #334155;
}

/* Latest Products */
.latest-products {
  margin-bottom: 48px;
}

.latest-products .container {
  max-width: 1200px;
  margin: 0 auto;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
}

/* Features Section */
.features-section {
  background-color: #f8fafc;
  padding: 48px 0;
  margin-top: 48px;
}

.features-section .container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
}

.feature {
  text-align: center;
  padding: 24px;
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.feature h3 {
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.feature p {
  color: #475569;
}

/* Responsive Styles */
@media (max-width: 992px) {
  .hero-banner .container {
    flex-direction: column;
    padding: 0 24px;
  }
  
  .hero-content {
    padding-right: 0;
    margin-bottom: 32px;
    text-align: center;
  }
  
  .hero-image {
    width: 100%;
  }
  
  .categories-section .container,
  .latest-products .container {
    padding: 0 24px;
  }
}

@media (max-width: 768px) {
  .hero-banner {
    padding: 48px 0;
  }
  
  .hero-content h1 {
    font-size: 32px;
  }
  
  .section-title {
    font-size: 28px;
    margin-bottom: 24px;
  }
}

@media (max-width: 480px) {
  .hero-content h1 {
    font-size: 28px;
  }
  
  .feature {
    padding: 16px;
  }
}
</style>
