<template>
  <div class="home">
    <!-- Hero Banner Section -->
    <div class="hero-banner">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <div class="tech-line"></div>
            <h1><span class="highlight">Lailai</span>Shop</h1>
            <h2>Tech-Driven Shopping Experience</h2>
            <p>Discover cutting-edge products at revolutionary prices</p>
            <div class="hero-buttons">
              <router-link to="/products" class="shop-now-btn primary-btn">
                <span class="btn-text">Explore Products</span>
                <span class="btn-icon">→</span>
              </router-link>
              <router-link to="/contact" class="learn-more-btn secondary-btn">
                <span class="btn-text">Learn More</span>
              </router-link>
            </div>
          </div>
        </div>
        <div class="hero-image">
          <div class="tech-circle"></div>
          <img src="https://cdn.pixabay.com/photo/2020/03/21/03/04/future-4952543_1280.jpg" alt="Featured Products" />
          <div class="tech-dots"></div>
        </div>
      </div>
      <div class="tech-triangle tech-triangle-1"></div>
      <div class="tech-triangle tech-triangle-2"></div>
    </div>
    
    <!-- Trending Section -->
    <div class="trending-section">
      <div class="container">
        <div class="section-header">
          <div class="section-line"></div>
          <h2 class="section-title">Trending Now</h2>
          <p class="section-subtitle">Discover what's hot in tech this season</p>
        </div>
        <div class="product-slider">
          <div class="product-grid">
            <product-card
              v-for="product in latestProducts.slice(0, 4)" 
              :key="product.id"
              :product="product"
            />
          </div>
        </div>
      </div>
    </div>
    
    <!-- Latest Products Section -->
    <div class="latest-products">
      <div class="container">
        <div class="section-header">
          <div class="section-line"></div>
          <h2 class="section-title">New Arrivals</h2>
          <p class="section-subtitle">The latest innovations in our store</p>
        </div>
        <div class="product-grid">
          <product-card
            v-for="product in latestProducts"
            :key="product.id"
            :product="product"
          />
        </div>
        <div class="view-all-container">
          <router-link to="/products" class="view-all-btn">
            <span>View All Products</span>
            <span class="arrow">→</span>
          </router-link>
        </div>
      </div>
    </div>
    
    <!-- Tech Features Section -->
    <div class="features-section">
      <div class="tech-overlay"></div>
      <div class="container">
        <div class="section-header light">
          <div class="section-line"></div>
          <h2 class="section-title">Why Choose Us</h2>
          <p class="section-subtitle">Technology at your service</p>
        </div>
        <div class="features-grid">
          <div class="feature">
            <div class="feature-icon-wrapper">
              <div class="feature-icon-bg"></div>
              <div class="feature-icon">🚀</div>
            </div>
            <h3>Fast Delivery</h3>
            <p>Same-day shipping with real-time tracking</p>
          </div>
          <div class="feature">
            <div class="feature-icon-wrapper">
              <div class="feature-icon-bg"></div>
              <div class="feature-icon">🔄</div>
            </div>
            <h3>Easy Returns</h3>
            <p>30-day hassle-free return policy</p>
          </div>
          <div class="feature">
            <div class="feature-icon-wrapper">
              <div class="feature-icon-bg"></div>
              <div class="feature-icon">🔒</div>
            </div>
            <h3>Secure Payments</h3>
            <p>Advanced encryption for all transactions</p>
          </div>
          <div class="feature">
            <div class="feature-icon-wrapper">
              <div class="feature-icon-bg"></div>
              <div class="feature-icon">💬</div>
            </div>
            <h3>24/7 Support</h3>
            <p>AI-powered support team always available</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Newsletter Section -->
    <div class="newsletter-section">
      <div class="container">
        <div class="newsletter-content">
          <h2>Join Our Tech Community</h2>
          <p>Subscribe to receive updates on the latest products and exclusive offers</p>
          <div class="newsletter-form">
            <input type="email" placeholder="Your email address" />
            <button class="subscribe-btn">Subscribe</button>
          </div>
        </div>
      </div>
      <div class="tech-circle tech-circle-left"></div>
      <div class="tech-circle tech-circle-right"></div>
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
  data() {
    return {
      currentSlide: 0,
      autoplayInterval: null
    }
  },
  computed: {
    ...mapState(['products', 'categories']),
    latestProducts() {
      // 限制为最新的8个产品
      return this.products.slice(0, 8)
    },
    trendingProducts() {
      // 获取热门产品
      return this.products.filter(product => product.stock < 10).slice(0, 4)
    }
  },
  methods: {
    getCategoryImage(slug) {
      const images = {
        'Smartphones': 'https://m.media-amazon.com/images/I/61ShPQlW2UL._AC_UY436_FMwebp_QL65_.jpg',
        'Laptops': 'https://m.media-amazon.com/images/I/71OJ8m9zQXL._AC_UY436_FMwebp_QL65_.jpg',
        'Home Appliances': 'https://m.media-amazon.com/images/I/61fTMFIW3wL._AC_UY436_FMwebp_QL65_.jpg',
        'Audio Accessories': 'https://m.media-amazon.com/images/I/61t8Ob6GPwL._AC_UY436_FMwebp_QL65_.jpg',
        'Cameras': 'https://m.media-amazon.com/images/I/81a2+nYahxL._AC_UY436_FMwebp_QL65_.jpg'
      }
      return images[slug] || 'https://m.media-amazon.com/images/I/71OJ8m9zQXL._AC_UY436_FMwebp_QL65_.jpg'
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.latestProducts.length
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.latestProducts.length) % this.latestProducts.length
    },
    startAutoplay() {
      this.autoplayInterval = setInterval(() => {
        this.nextSlide()
      }, 5000)
    },
    stopAutoplay() {
      clearInterval(this.autoplayInterval)
    }
  },
  mounted() {
    this.startAutoplay()
    
    // Add some animation when the page loads
    const heroContent = document.querySelector('.hero-content')
    if (heroContent) {
      heroContent.classList.add('animate-in')
    }
    
    // 监听滚动事件为各部分标题添加动画
    document.addEventListener('scroll', () => {
      const headers = document.querySelectorAll('.section-header')
      headers.forEach(header => {
        const rect = header.getBoundingClientRect()
        if (rect.top <= window.innerHeight * 0.8) {
          header.classList.add('animate')
        }
      })
    })

    // 页面加载时也触发一次检查
    setTimeout(() => {
      const headers = document.querySelectorAll('.section-header')
      headers.forEach(header => {
        const rect = header.getBoundingClientRect()
        if (rect.top <= window.innerHeight * 0.8) {
          header.classList.add('animate')
        }
      })
    }, 300)
  },
  beforeDestroy() {
    this.stopAutoplay()
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700&display=swap');

/* Base Styles */
.home {
  padding-bottom: 0;
  font-family: 'Inter', sans-serif;
  background-color: #030712;
  color: #f8fafc;
  overflow-x: hidden;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 2;
}

/* Animation Keyframes */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}

/* Tech Elements */
.tech-line {
  height: 3px;
  width: 60px;
  background: linear-gradient(90deg, #22c55e, rgba(34, 197, 94, 0.2));
  margin-bottom: 16px;
  border-radius: 4px;
}

.tech-triangle {
  position: absolute;
  border-style: solid;
  border-width: 0 40px 70px 40px;
  border-color: transparent transparent rgba(34, 197, 94, 0.1) transparent;
  z-index: 1;
}

.tech-triangle-1 {
  top: 10%;
  right: 5%;
  transform: rotate(30deg);
}

.tech-triangle-2 {
  bottom: 15%;
  left: 5%;
  transform: rotate(-20deg);
}

.tech-circle {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0) 70%);
  animation: pulse 5s infinite ease-in-out;
}

.tech-dots {
  position: absolute;
  width: 150px;
  height: 150px;
  bottom: -20px;
  right: -20px;
  background-image: radial-gradient(rgba(34, 197, 94, 0.6) 1px, transparent 1px);
  background-size: 10px 10px;
  z-index: 0;
}

/* Hero Banner */
.hero-banner {
  position: relative;
  background-color: #030712;
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(34, 197, 94, 0.15) 0%, rgba(0,0,0,0) 50%),
    radial-gradient(circle at 80% 70%, rgba(34, 197, 94, 0.1) 0%, rgba(0,0,0,0) 50%);
  padding: 120px 0 100px;
  margin-bottom: 80px;
  overflow: hidden;
}

.hero-banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><circle cx="1" cy="1" r="1" fill="rgba(34, 197, 94, 0.05)"/></svg>');
  background-repeat: repeat;
  background-size: 20px 20px;
  opacity: 0.3;
  z-index: 1;
}

.hero-banner .container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.hero-content {
  position: relative;
  z-index: 2;
  opacity: 0;
  transform: translateY(30px);
  animation: slideUp 0.8s forwards ease-out;
  animation-delay: 0.2s;
}

.hero-content.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.hero-text {
  max-width: 600px;
}

.hero-content h1 {
  font-family: 'Orbitron', sans-serif;
  font-size: 52px;
  font-weight: 700;
  color: white;
  margin-bottom: 16px;
  line-height: 1.1;
  letter-spacing: -0.5px;
  opacity: 0;
  animation: fadeIn 1s forwards ease-out;
  animation-delay: 0.4s;
}

.hero-content h1 .highlight {
  position: relative;
  color: #22c55e;
  display: inline-block;
}

.hero-content h1 .highlight::after {
  content: '';
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  height: 6px;
  background: linear-gradient(90deg, rgba(34, 197, 94, 0.7), rgba(34, 197, 94, 0));
  border-radius: 3px;
  z-index: -1;
}

.hero-content h2 {
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: #22c55e;
  margin-bottom: 20px;
  opacity: 0;
  animation: fadeIn 1s forwards ease-out;
  animation-delay: 0.6s;
  letter-spacing: 1px;
}

.hero-content p {
  font-size: 18px;
  line-height: 1.6;
  color: #94a3b8;
  margin-bottom: 32px;
  opacity: 0;
  animation: fadeIn 1s forwards ease-out;
  animation-delay: 0.8s;
}

.hero-buttons {
  display: flex;
  gap: 16px;
  opacity: 0;
  animation: fadeIn 1s forwards ease-out;
  animation-delay: 1s;
}

.primary-btn, .secondary-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 500;
  padding: 14px 28px;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.primary-btn {
  background-color: #22c55e;
  color: white;
  box-shadow: 0 0 20px rgba(34, 197, 94, 0.4);
}

.primary-btn:hover {
  background-color: #16a34a;
  transform: translateY(-3px);
  box-shadow: 0 0 30px rgba(34, 197, 94, 0.6);
}

.primary-btn::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  background: linear-gradient(45deg, #22c55e, transparent, #16a34a, transparent, #22c55e);
  background-size: 400%;
  z-index: -1;
  animation: rotate 5s linear infinite;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 8px;
}

.primary-btn:hover::before {
  opacity: 1;
}

.secondary-btn {
  background-color: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.secondary-btn:hover {
  background-color: rgba(34, 197, 94, 0.2);
  border-color: rgba(34, 197, 94, 0.5);
  transform: translateY(-3px);
}

.btn-icon {
  font-size: 18px;
  transition: transform 0.3s ease;
}

.primary-btn:hover .btn-icon, .secondary-btn:hover .btn-icon {
  transform: translateX(5px);
}

.hero-image {
  position: relative;
  z-index: 2;
  animation: float 6s infinite ease-in-out;
}

.hero-image img {
  max-width: 100%;
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(34, 197, 94, 0.2);
  transition: all 0.5s ease;
  transform: perspective(1000px) rotateY(-5deg);
}

.hero-image:hover img {
  transform: perspective(1000px) rotateY(0deg);
  border-color: rgba(34, 197, 94, 0.5);
}

.hero-image .tech-circle {
  width: 500px;
  height: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
}

/* Section Common Styles */
.section-header {
  text-align: center;
  margin-bottom: 48px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
}

.section-header.light {
  color: white;
}

.section-header .section-line {
  height: 3px;
  width: 60px;
  background: linear-gradient(90deg, #22c55e, rgba(34, 197, 94, 0.2));
  margin: 0 auto 16px;
  border-radius: 4px;
}

.section-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 36px;
  font-weight: 600;
  color: white;
  margin-bottom: 12px;
  letter-spacing: 1px;
}

.section-subtitle {
  font-size: 17px;
  color: #94a3b8;
  max-width: 600px;
  margin: 0 auto;
}

/* Trending Section */
.trending-section {
  padding: 80px 0;
  background-color: #070f1a;
  position: relative;
  margin-bottom: 80px;
}

.trending-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(135deg, rgba(34, 197, 94, 0.05) 25%, transparent 25%),
    linear-gradient(225deg, rgba(34, 197, 94, 0.05) 25%, transparent 25%),
    linear-gradient(315deg, rgba(34, 197, 94, 0.05) 25%, transparent 25%),
    linear-gradient(45deg, rgba(34, 197, 94, 0.05) 25%, transparent 25%);
  background-size: 60px 60px;
  background-position: 0 0, 30px 0, 30px -30px, 0px 30px;
  opacity: 0.1;
}

.product-slider {
  position: relative;
  z-index: 2;
}

/* Categories Section */
.categories-section {
  padding: 100px 0;
  background-color: #0a0d14;
  margin-bottom: 80px;
  position: relative;
  overflow: hidden;
}

.categories-section::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0) 70%);
  border-radius: 50%;
  z-index: 1;
}

.categories-section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(34, 197, 94, 0.05) 0%, rgba(34, 197, 94, 0) 70%);
  border-radius: 50%;
  z-index: 1;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.category-card {
  text-align: center;
  transition: all 0.4s ease;
  position: relative;
  padding: 20px;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(34, 197, 94, 0.1);
}

.category-card:hover {
  transform: translateY(-8px);
  background-color: rgba(34, 197, 94, 0.05);
  border-color: rgba(34, 197, 94, 0.3);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.category-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(140deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
  border-radius: 16px;
  z-index: -1;
}

.category-icon {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  position: relative;
  background-color: rgba(34, 197, 94, 0.05);
  border: 1px solid rgba(34, 197, 94, 0.2);
  transition: all 0.3s ease;
}

.icon-highlight {
  position: absolute;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 2px solid rgba(34, 197, 94, 0.1);
  animation: pulse 3s infinite;
}

.category-card:hover .icon-highlight {
  border-color: rgba(34, 197, 94, 0.3);
}

.category-icon img {
  max-width: 60px;
  max-height: 60px;
  transition: transform 0.3s ease;
  filter: brightness(0.9) saturate(1.5);
}

.category-card:hover .category-icon img {
  transform: scale(1.1);
}

.category-card h3 {
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin-bottom: 12px;
  transition: color 0.3s ease;
}

.category-card:hover h3 {
  color: #22c55e;
}

.category-explore {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 14px;
  color: #94a3b8;
  opacity: 0;
  transform: translateY(5px);
  transition: all 0.3s ease;
}

.category-card:hover .category-explore {
  opacity: 1;
  transform: translateY(0);
  color: #22c55e;
}

.category-explore .arrow {
  transition: transform 0.3s ease;
}

.category-card:hover .category-explore .arrow {
  transform: translateX(3px);
}

.category-card a {
  text-decoration: none;
  color: inherit;
  display: block;
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
  padding: 120px 0;
  background: linear-gradient(135deg, #0f1729 0%, #030712 100%);
  position: relative;
  margin-bottom: 80px;
  overflow: hidden;
}

.tech-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><rect x="29" y="0" width="2" height="60" fill="rgba(34, 197, 94, 0.03)"/><rect x="0" y="29" width="60" height="2" fill="rgba(34, 197, 94, 0.03)"/></svg>');
  opacity: 0.3;
  z-index: 1;
}

.features-section .container {
  position: relative;
  z-index: 2;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.feature {
  text-align: center;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  border: 1px solid rgba(34, 197, 94, 0.1);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.feature:hover {
  transform: translateY(-10px);
  background-color: rgba(34, 197, 94, 0.05);
  border-color: rgba(34, 197, 94, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.feature::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, rgba(34, 197, 94, 0), rgba(34, 197, 94, 0.7), rgba(34, 197, 94, 0));
  opacity: 0;
  transition: opacity 0.4s ease;
}

.feature:hover::before {
  opacity: 1;
}

.feature-icon-wrapper {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
}

.feature-icon-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
  background: radial-gradient(circle, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0) 70%);
  border-radius: 50%;
  z-index: 0;
  transition: all 0.3s ease;
}

.feature:hover .feature-icon-bg {
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, rgba(34, 197, 94, 0) 70%);
}

.feature-icon {
  position: relative;
  z-index: 1;
  font-size: 40px;
  margin-bottom: 0;
  line-height: 80px;
  transition: transform 0.3s ease;
}

.feature:hover .feature-icon {
  transform: scale(1.1);
}

.feature h3 {
  font-size: 22px;
  font-weight: 600;
  color: white;
  margin-bottom: 16px;
  transition: color 0.3s ease;
}

.feature:hover h3 {
  color: #22c55e;
}

.feature p {
  color: #94a3b8;
  font-size: 16px;
  line-height: 1.6;
  transition: color 0.3s ease;
}

.feature:hover p {
  color: #cbd5e1;
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
/* Newsletter Section */
.newsletter-section {
  padding: 100px 0;
  background-color: #070f1a;
  position: relative;
  overflow: hidden;
}

.newsletter-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(34, 197, 94, 0.1) 0%, rgba(0,0,0,0) 50%),
    radial-gradient(circle at 80% 70%, rgba(34, 197, 94, 0.05) 0%, rgba(0,0,0,0) 50%);
}

.tech-circle-left {
  position: absolute;
  width: 300px;
  height: 300px;
  left: -150px;
  top: 50%;
  transform: translateY(-50%);
  background: radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0) 70%);
  border-radius: 50%;
  opacity: 0.5;
}

.tech-circle-right {
  position: absolute;
  width: 400px;
  height: 400px;
  right: -200px;
  top: 50%;
  transform: translateY(-50%);
  background: radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0) 70%);
  border-radius: 50%;
  opacity: 0.5;
}

.newsletter-content {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 2;
}

.newsletter-content h2 {
  font-family: 'Orbitron', sans-serif;
  font-size: 32px;
  font-weight: 600;
  color: white;
  margin-bottom: 16px;
}

.newsletter-content p {
  font-size: 17px;
  color: #94a3b8;
  margin-bottom: 32px;
  line-height: 1.6;
}

.newsletter-form {
  display: flex;
  max-width: 500px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.newsletter-form input {
  flex: 1;
  padding: 16px 24px;
  border-radius: 6px 0 0 6px;
  border: 1px solid rgba(34, 197, 94, 0.3);
  background-color: rgba(34, 197, 94, 0.05);
  color: white;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;
}

.newsletter-form input:focus {
  border-color: rgba(34, 197, 94, 0.5);
  background-color: rgba(34, 197, 94, 0.1);
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2);
}

.newsletter-form input::placeholder {
  color: #94a3b8;
}

.subscribe-btn {
  padding: 0 28px;
  background-color: #22c55e;
  color: white;
  font-weight: 500;
  border: none;
  border-radius: 0 6px 6px 0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.subscribe-btn:hover {
  background-color: #16a34a;
}

/* Responsive Styles */
@media (max-width: 991px) {
  .hero-banner .container {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .hero-content {
    text-align: center;
  }
  
  .hero-text {
    max-width: 100%;
  }
  
  .tech-line {
    margin-left: auto;
    margin-right: auto;
  }
  
  .hero-buttons {
    justify-content: center;
  }
  
  .features-grid {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
  
  .newsletter-form {
    flex-direction: column;
    gap: 16px;
  }
  
  .newsletter-form input,
  .subscribe-btn {
    width: 100%;
    border-radius: 6px;
  }
}

@media (max-width: 767px) {
  .hero-content h1 {
    font-size: 36px;
  }
  
  .categories-grid,
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }
  
  .section-title {
    font-size: 28px;
  }
}

/* Animation for sections when scrolling */
.section-header.animate {
  opacity: 1;
  transform: translateY(0);
}
</style>


