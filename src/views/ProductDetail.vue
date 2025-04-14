<template>
  <div class="product-detail">
    <div class="product-detail-bg">
      <div class="tech-dots"></div>
      <div class="tech-circle tech-circle-left"></div>
      <div class="tech-circle tech-circle-right"></div>
    </div>
    <div class="tech-grid"></div>
    <div class="container">
      <div class="breadcrumbs">
        <router-link to="/">Home</router-link>
        <span class="separator">/</span>
        <router-link :to="`/products?category=${product.category}`">
          {{ categoryName }}
        </router-link>
        <span class="separator">/</span>
        <span class="current">{{ product.name }}</span>
      </div>

      <div class="product-container" v-if="product && Object.keys(product).length > 0">
        <div class="product-images">
          <div class="main-image">
            <div class="image-wrapper">
              <img
                :src="product.image"
                :alt="product.name"
                @error="handleImageError"
              />
            </div>
          </div>
        </div>

        <div class="product-info">
          <h1 class="product-title">{{ product.name }}</h1>

          <div class="product-price">
            <span class="current-price">Rs. {{ formatPrice(product.price) }}</span>
            <span class="original-price" v-if="product.originalPrice > product.price">
              Rs. {{ formatPrice(product.originalPrice) }}
            </span>
            <span class="discount" v-if="discountPercentage > 0">
              {{ discountPercentage }}% OFF
            </span>
          </div>

          <div class="stock-status" :class="{ 'in-stock': product.stock > 0, 'out-of-stock': product.stock <= 0 }">
            {{ product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock' }}
          </div>

          <div class="quantity-selector">
            <label for="quantity">Quantity:</label>
            <div class="quantity-controls">
              <button @click="decreaseQuantity" :disabled="quantity <= 1">-</button>
              <input type="number" id="quantity" v-model.number="quantity" min="1" :max="product.stock" />
              <button @click="increaseQuantity" :disabled="quantity >= product.stock">+</button>
            </div>
          </div>

          <div class="action-buttons">
            <button
              class="add-to-cart-btn"
              @click="addToCart"
              :disabled="product.stock <= 0"
            >
              Add to Cart
            </button>
            <button
              class="buy-now-btn"
              @click="buyNow"
              :disabled="product.stock <= 0"
            >
              Buy Now
            </button>
          </div>

          <div class="product-details">
            <h3>Product Details</h3>
            <p>{{ product.description }}</p>
          </div>

          <div class="delivery-info">
            <div class="delivery-option">
              <span>Nationwide Delivery</span>
            </div>
            <div class="delivery-option">
              <span>7 Days Replacement Warranty</span>
            </div>
            <div class="delivery-option">
              <span>Customer Service: 0311-1444717</span>
            </div>
          </div>
        </div>
      </div>

      <div class="loading" v-else>
        <p>Loading product details...</p>
      </div>

      <div class="related-products" v-if="relatedProducts.length > 0">
        <h2 class="section-title">Related Products</h2>
        <div class="related-products-grid">
          <product-card
            v-for="relatedProduct in relatedProducts"
            :key="relatedProduct.id"
            :product="relatedProduct"
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
  name: 'ProductDetail',
  components: {
    ProductCard
  },
  data() {
    return {
      quantity: 1
    }
  },
  computed: {
    ...mapState(['products', 'categories']),
    productId() {
      return parseInt(this.$route.params.id)
    },
    product() {
      const foundProduct = this.products.find(p => p.id === this.productId);
      if (!foundProduct) {
        console.warn(`Product with ID ${this.productId} not found`);
        return {};
      }
      return foundProduct;
    },
    categoryName() {
      if (this.product) {
        const category = this.categories.find(cat => cat.slug === this.product.category)
        return category ? category.name : 'Products'
      }
      return 'Products'
    },
    discountPercentage() {
      if (this.product && this.product.originalPrice > this.product.price) {
        return Math.round(
          ((this.product.originalPrice - this.product.price) / this.product.originalPrice) * 100
        )
      }
      return 0
    },
    relatedProducts() {
      if (!this.product) return []

      return this.products
        .filter(p => p.category === this.product.category && p.id !== this.productId)
        .slice(0, 4)
    }
  },
  methods: {
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    increaseQuantity() {
      if (this.quantity < this.product.stock) {
        this.quantity++
      }
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--
      }
    },
    addToCart() {
      for (let i = 0; i < this.quantity; i++) {
        this.$store.commit('addToCart', this.product)
      }
      alert('Product added to cart!')
    },
    buyNow() {
      for (let i = 0; i < this.quantity; i++) {
        this.$store.commit('addToCart', this.product)
      }
      this.$router.push('/cart')
    },
    handleImageError(e) {
      console.warn(`Image failed to load: ${e.target.src}`);
      e.target.src = 'https://via.placeholder.com/300';
    }
  }
}
</script>

<style scoped>
.product-detail {
  padding: 48px 0;
  position: relative;
  min-height: 100vh;
  background-color: #111827;
  color: #f3f4f6;
  overflow: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  position: relative;
  z-index: 1;
}

.product-detail-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}

.tech-dots {
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 300px;
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

.tech-grid {
  position: absolute;
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

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.breadcrumbs {
  margin-bottom: 32px;
  color: #94a3b8;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.breadcrumbs a {
  color: #22c55e;
  text-decoration: none;
  transition: color 0.2s ease;
  font-weight: 500;
}

.breadcrumbs a:hover {
  color: #16a34a;
}

.breadcrumbs .separator {
  color: #4b5563;
}

.breadcrumbs .current {
  color: #f3f4f6;
  font-weight: 500;
}

.product-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 64px;
  align-items: start;
  background-color: rgba(17, 24, 39, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 32px;
  border: 1px solid rgba(34, 197, 94, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
}

.product-images {
  position: sticky;
  top: 32px;
}

.image-wrapper {
  position: relative;
  padding-top: 100%;
  border-radius: 16px;
  overflow: hidden;
  background-color: #f8fafc;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.main-image {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.main-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 24px;
  transition: transform 0.3s ease;
}

.main-image:hover img {
  transform: scale(1.05);
}

.product-info {
  position: relative;
}

.product-title {
  font-size: 36px;
  font-weight: 600;
  color: #f3f4f6;
  margin-bottom: 24px;
  line-height: 1.2;
  position: relative;
  display: inline-block;
}

.product-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, #22c55e, transparent);
}

.product-price {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 28px;
  padding: 24px;
  background-color: rgba(15, 23, 42, 0.5);
  border-radius: 12px;
  border: 1px solid rgba(34, 197, 94, 0.1);
  position: relative;
  overflow: hidden;
}

.product-price::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(34, 197, 94, 0.05) 0%, transparent 70%);
  z-index: 0;
}

.current-price {
  font-size: 36px;
  font-weight: 700;
  color: #22c55e;
  line-height: 1;
  position: relative;
  z-index: 1;
}

.original-price {
  font-size: 20px;
  text-decoration: line-through;
  color: #94a3b8;
}

.discount {
  background-color: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  padding: 8px 16px;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  position: relative;
  z-index: 1;
}

.stock-status {
  margin-bottom: 24px;
  font-weight: 500;
  font-size: 15px;
}

.in-stock {
  color: #10b981;
}

.out-of-stock {
  color: #ef4444;
}

.quantity-selector {
  margin-bottom: 32px;
}

.quantity-selector label {
  display: block;
  margin-bottom: 12px;
  font-weight: 500;
  color: #475569;
}

.quantity-controls {
  display: inline-flex;
  align-items: center;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}

.quantity-controls button {
  width: 44px;
  height: 44px;
  border: none;
  background-color: #f8fafc;
  color: #475569;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.quantity-controls button:hover:not(:disabled) {
  background-color: #f1f5f9;
  color: #3b82f6;
}

.quantity-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-controls input {
  width: 60px;
  height: 44px;
  border: none;
  border-left: 1px solid #e2e8f0;
  border-right: 1px solid #e2e8f0;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: #1e293b;
  -moz-appearance: textfield;
  appearance: textfield;
}

.quantity-controls input::-webkit-outer-spin-button,
.quantity-controls input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.action-buttons {
  display: flex;
  gap: 16px;
  margin-bottom: 40px;
}

.add-to-cart-btn, .buy-now-btn {
  flex: 1;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-to-cart-btn {
  background-color: transparent;
  color: #22c55e;
  border: 2px solid #22c55e;
  position: relative;
  overflow: hidden;
}

.buy-now-btn {
  background-color: #22c55e;
  color: #ffffff;
  border: none;
  position: relative;
  overflow: hidden;
}

.add-to-cart-btn::after, .buy-now-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: 0.5s;
}

.add-to-cart-btn:hover::after, .buy-now-btn:hover::after {
  left: 100%;
}

.add-to-cart-btn:hover:not(:disabled) {
  background-color: rgba(34, 197, 94, 0.1);
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(34, 197, 94, 0.2);
}

.buy-now-btn:hover:not(:disabled) {
  background-color: #16a34a;
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(34, 197, 94, 0.3);
}

.add-to-cart-btn:disabled, .buy-now-btn:disabled {
  background-color: #f1f5f9;
  color: #94a3b8;
  border-color: #e2e8f0;
  cursor: not-allowed;
}

.product-details {
  margin-bottom: 40px;
  color: #d1d5db;
  line-height: 1.8;
}

.product-details h3 {
  font-size: 20px;
  font-weight: 600;
  color: #f3f4f6;
  margin-bottom: 16px;
  position: relative;
  display: inline-block;
}

.product-details h3::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, #22c55e, transparent);
}

.delivery-info {
  background-color: rgba(15, 23, 42, 0.5);
  padding: 24px;
  border-radius: 12px;
  border: 1px solid rgba(34, 197, 94, 0.1);
  position: relative;
  overflow: hidden;
}

.delivery-info::before {
  content: '';
  position: absolute;
  bottom: -30px;
  right: -30px;
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(34, 197, 94, 0.05) 0%, transparent 70%);
  z-index: 0;
}

.delivery-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #e2e8f0;
}

.delivery-option:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.delivery-option img {
  width: 24px;
  height: 24px;
  opacity: 0.8;
}

.delivery-option span {
  color: #d1d5db;
  font-size: 15px;
}

.related-products {
  margin-top: 80px;
  position: relative;
  background-color: rgba(17, 24, 39, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 32px;
  border: 1px solid rgba(34, 197, 94, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.section-title {
  font-size: 28px;
  font-weight: 600;
  color: #f3f4f6;
  margin-bottom: 32px;
  text-align: center;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 25%;
  width: 50%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.5), transparent);
}

.related-products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.loading {
  text-align: center;
  padding: 80px;
  color: #64748b;
  font-size: 16px;
}

@media (max-width: 1200px) {
  .product-container {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }

  .related-products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 992px) {
  .product-container {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .product-info {
    padding: 0;
  }
}

@media (max-width: 768px) {
  .related-products-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .product-title {
    font-size: 28px;
  }

  .current-price {
    font-size: 28px;
  }
}

@media (max-width: 480px) {
  .product-detail {
    padding: 24px 0;
  }

  .related-products-grid {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    flex-direction: column;
  }

  .product-title {
    font-size: 24px;
  }

  .current-price {
    font-size: 24px;
  }
}
</style>
