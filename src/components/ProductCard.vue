<template>
  <div class="product-card">
    <div class="product-image">
      <div class="image-container">
        <img
          :src="product.image"
          :alt="product.name"
          @error="handleImageError"
        />
      </div>
      <div class="tech-overlay"></div>
      <div class="tech-dots"></div>
      <div class="discount-badge" v-if="discountPercentage > 0">
        <span class="discount-text">{{ discountPercentage }}%</span>
        <span class="discount-label">OFF</span>
      </div>
      <div class="stock-status" v-if="product.stock <= 5 && product.stock > 0">
        <span>Only {{ product.stock }} left</span>
      </div>
    </div>
    <div class="product-details">
      <div class="product-meta">
        <div class="product-rating">
          <span class="rating-stars">★★★★<span class="half-star">★</span></span>
          <span class="rating-count">{{ Math.floor(Math.random() * 50) + 10 }}</span>
        </div>
        <div class="product-category" v-if="product.category">
          {{ product.category }}
        </div>
      </div>
      <h3 class="product-title">
        <router-link :to="`/product/${product.id}`">{{ product.name }}</router-link>
      </h3>
      <div class="product-price">
        <span class="current-price">Rs. {{ formatPrice(product.price) }}</span>
        <span class="original-price" v-if="product.originalPrice > product.price">
          Rs. {{ formatPrice(product.originalPrice) }}
        </span>
        <span class="price-save" v-if="discountPercentage > 0">Save Rs. {{ formatPrice(product.originalPrice - product.price) }}</span>
      </div>
      <button
        class="add-to-cart-btn"
        @click="addToCart"
        :disabled="product.stock <= 0"
      >
        <span class="btn-text">{{ product.stock > 0 ? 'ADD TO CART' : 'OUT OF STOCK' }}</span>
        <span class="btn-icon" v-if="product.stock > 0">+</span>
      </button>
    </div>
    <div class="quick-actions">
      <button class="action-btn wishlist-btn" title="Add to Wishlist">
        <span>♡</span>
      </button>
      <button class="action-btn view-btn" title="Quick View">
        <span>👁</span>
      </button>
    </div>
    <div class="tech-accent tech-accent-1"></div>
    <div class="tech-accent tech-accent-2"></div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    discountPercentage() {
      if (this.product.originalPrice > this.product.price) {
        return Math.round(
          ((this.product.originalPrice - this.product.price) / this.product.originalPrice) * 100
        )
      }
      return 0
    }
  },
  methods: {
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    addToCart() {
      this.$store.commit('addToCart', this.product)
    },
    handleImageError(e) {
      // Fallback image if product image is not found
      e.target.src = 'https://ext.same-assets.com/3844190759/814572404.jpeg'
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700&display=swap');

.product-card {
  background-color: rgba(10, 13, 20, 0.7);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.3);
  transition: all 0.4s ease;
  position: relative;
  border: 1px solid rgba(34, 197, 94, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(5px);
}

.product-card:hover {
  transform: translateY(-8px);
  border-color: rgba(34, 197, 94, 0.3);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(34, 197, 94, 0.2);
}

.product-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(140deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
  border-radius: 12px;
  z-index: 0;
}

.tech-accent {
  position: absolute;
  background: linear-gradient(90deg, #22c55e, rgba(34, 197, 94, 0));
  border-radius: 4px;
  opacity: 0.3;
  transition: all 0.4s ease;
}

.tech-accent-1 {
  top: 10px;
  left: 10px;
  width: 40px;
  height: 3px;
}

.tech-accent-2 {
  bottom: 10px;
  right: 10px;
  width: 3px;
  height: 40px;
}

.product-card:hover .tech-accent-1 {
  width: 60px;
  opacity: 0.6;
}

.product-card:hover .tech-accent-2 {
  height: 60px;
  opacity: 0.6;
}

.product-image {
  position: relative;
  height: 240px;
  overflow: hidden;
  z-index: 1;
}

.image-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 12px;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
  transition: all 0.5s ease;
  filter: brightness(0.95) contrast(1.1);
}

.product-card:hover .product-image img {
  transform: scale(1.05);
  filter: brightness(1.05) contrast(1.15);
}

.tech-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(34, 197, 94, 0.05), transparent);
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover .tech-overlay {
  opacity: 1;
}

.tech-dots {
  position: absolute;
  width: 100px;
  height: 100px;
  top: -30px;
  right: -30px;
  background-image: radial-gradient(rgba(34, 197, 94, 0.4) 1px, transparent 1px);
  background-size: 10px 10px;
  z-index: 0;
  opacity: 0.3;
  transition: all 0.3s ease;
}

.product-card:hover .tech-dots {
  opacity: 0.6;
}

.discount-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(34, 197, 94, 0.9);
  color: white;
  border-radius: 8px;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 15px rgba(34, 197, 94, 0.4);
  z-index: 2;
  transform: translateZ(0) scale(0.95);
  transition: all 0.3s ease;
}

.product-card:hover .discount-badge {
  transform: translateZ(0) scale(1.05);
  box-shadow: 0 0 20px rgba(34, 197, 94, 0.6);
}

.discount-text {
  font-size: 16px;
  line-height: 1;
  font-weight: 700;
}

.discount-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.stock-status {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(10, 13, 20, 0.85);
  color: #f3f4f6;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  z-index: 2;
  border-left: 2px solid #22c55e;
}

.product-details {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 12px;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 5px;
}

.rating-stars {
  color: #22c55e;
  letter-spacing: -1px;
}

.half-star {
  opacity: 0.5;
}

.rating-count {
  color: #94a3b8;
}

.product-category {
  color: #94a3b8;
  font-size: 12px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.product-title {
  font-size: 17px;
  margin: 0 0 15px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
  min-height: 48px;
}

.product-title a {
  color: #f3f4f6;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.product-title a:hover {
  color: #22c55e;
}

.product-price {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  margin-bottom: 20px;
}

.current-price {
  font-size: 20px;
  font-weight: 700;
  color: #22c55e;
  margin-right: 10px;
  font-family: 'Orbitron', sans-serif;
}

.original-price {
  font-size: 14px;
  text-decoration: line-through;
  color: #94a3b8;
}

.price-save {
  width: 100%;
  font-size: 12px;
  color: #22c55e;
  margin-top: 5px;
}

.add-to-cart-btn {
  margin-top: auto;
  width: 100%;
  padding: 12px 18px;
  background-color: rgba(34, 197, 94, 0.15);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  overflow: hidden;
}

.add-to-cart-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.2), transparent);
  transition: left 0.5s ease;
}

.add-to-cart-btn:hover {
  background-color: rgba(34, 197, 94, 0.25);
  border-color: rgba(34, 197, 94, 0.5);
  color: white;
  transform: translateY(-3px);
}

.add-to-cart-btn:hover::before {
  left: 100%;
}

.add-to-cart-btn:disabled {
  background-color: rgba(100, 116, 139, 0.2);
  border-color: rgba(100, 116, 139, 0.3);
  color: #94a3b8;
  cursor: not-allowed;
  transform: none;
}

.btn-icon {
  font-size: 18px;
  font-weight: normal;
}

.quick-actions {
  position: absolute;
  top: 15px;
  left: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 3;
  transform: translateX(-50px);
  opacity: 0;
  transition: all 0.3s ease;
}

.product-card:hover .quick-actions {
  transform: translateX(0);
  opacity: 1;
}

.action-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(10, 13, 20, 0.8);
  border: 1px solid rgba(34, 197, 94, 0.3);
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  border-color: rgba(34, 197, 94, 0.5);
}

@media (max-width: 768px) {
  .product-image {
    height: 200px;
  }
  
  .product-title {
    font-size: 15px;
    min-height: 42px;
  }
  
  .current-price {
    font-size: 18px;
  }
}
</style>
