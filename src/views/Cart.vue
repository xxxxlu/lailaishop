<template>
  <div class="cart-page">
    <div class="cart-page-bg">
      <div class="tech-dots"></div>
      <div class="tech-circle tech-circle-left"></div>
      <div class="tech-circle tech-circle-right"></div>
    </div>
    
    <div class="container">
      <div class="page-header">
        <h1><span class="highlight">Shopping</span> Cart</h1>
        <div class="breadcrumbs">
          <router-link to="/">Home</router-link> 
          <span class="breadcrumb-separator">›</span>
          <span>Shopping Cart</span>
        </div>
      </div>

      <template v-if="cart.length > 0">
        <div class="cart-content">
          <div class="cart-items">
            <div class="cart-header">
              <div class="header-item header-product">Product</div>
              <div class="header-item header-price">Price</div>
              <div class="header-item header-quantity">Quantity</div>
              <div class="header-item header-total">Total</div>
            </div>
            
            <div class="cart-item" v-for="item in cart" :key="item.id">
              <div class="item-image-wrapper">
                <div class="item-image">
                  <img
                    :src="item.image"
                    :alt="item.name"
                    @error="handleImageError"
                  />
                  <div class="tech-overlay"></div>
                </div>
                <div class="item-details">
                  <h3 class="item-title">
                    <router-link :to="`/product/${item.id}`">{{ item.name }}</router-link>
                  </h3>
                  <div class="item-price mobile-only">
                    <span class="current-price">Rs. {{ formatPrice(item.price) }}</span>
                    <span class="original-price" v-if="item.originalPrice > item.price">
                      Rs. {{ formatPrice(item.originalPrice) }}
                    </span>
                  </div>
                  <div class="item-stock" v-if="item.stock <= 5">
                    <span>Only {{ item.stock }} left</span>
                  </div>
                </div>
              </div>
              
              <div class="item-price">
                <span class="current-price">Rs. {{ formatPrice(item.price) }}</span>
                <span v-if="item.originalPrice > item.price" class="original-price">Rs. {{ formatPrice(item.originalPrice) }}</span>
              </div>
              
              <div class="item-quantity">
                <div class="quantity-controls">
                  <button class="qty-btn" @click="decreaseQuantity(item.id)" :disabled="item.quantity <= 1">-</button>
                  <input type="number" v-model.number="item.quantity" min="1" :max="item.stock" @change="updateQuantity(item.id, item.quantity)">
                  <button class="qty-btn" @click="increaseQuantity(item.id)">+</button>
                </div>
                <button class="remove-btn" @click="removeItem(item.id)">
                  <span class="remove-icon">×</span>
                  <span>Remove</span>
                </button>
              </div>
              
              <div class="item-total">
                Rs. {{ formatPrice(item.price * item.quantity) }}
              </div>
            </div>
          </div>
          
          <div class="cart-summary">
            <h3 class="summary-title">Order Summary</h3>
            <div class="summary-row">
              <span>Subtotal</span>
              <span>Rs. {{ formatPrice(cartTotal) }}</span>
            </div>
            <div class="summary-row">
              <span>Shipping Fee</span>
              <span>Rs. {{ formatPrice(shippingFee) }}</span>
            </div>
            <div class="summary-row total">
              <span>Total</span>
              <span class="total-price">Rs. {{ formatPrice(cartTotal + shippingFee) }}</span>
            </div>
            <button class="checkout-btn" @click="proceedToCheckout">
              <span>Proceed to Checkout</span>
              <div class="btn-shine"></div>
            </button>
            <div class="continue-shopping">
              <router-link to="/products" class="continue-link">
                <span class="continue-icon">←</span>
                <span>Continue shopping</span>
              </router-link>
            </div>
          </div>
        </div>
      </template>
      
      <div class="empty-cart" v-else>
        <div class="empty-cart-content">
          <div class="empty-cart-icon">
            <span class="cart-emoji">🛒</span>
            <div class="tech-ring"></div>
          </div>
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added any products to your cart yet.</p>
          <router-link to="/products" class="continue-shopping-btn">
            Start Shopping
            <div class="btn-shine"></div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Cart',
  data() {
    return {
      shippingFee: 399
    }
  },
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['cartTotal'])
  },
  methods: {
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    increaseQuantity(id) {
      const item = this.cart.find(item => item.id === id)
      if (item && item.quantity < item.stock) {
        this.$store.commit('updateCartItem', { id, quantity: item.quantity + 1 })
      }
    },
    decreaseQuantity(id) {
      const item = this.cart.find(item => item.id === id)
      if (item && item.quantity > 1) {
        this.$store.commit('updateCartItem', { id, quantity: item.quantity - 1 })
      }
    },
    updateQuantity(id, quantity) {
      const item = this.cart.find(item => item.id === id)
      if (item) {
        // Ensure quantity is valid
        let validQuantity = Math.max(1, Math.min(item.stock, quantity))
        this.$store.commit('updateCartItem', { id, quantity: validQuantity })
      }
    },
    removeItem(id) {
      if (confirm('Are you sure you want to remove this item from your cart?')) {
        this.$store.commit('removeFromCart', id)
      }
    },
    proceedToCheckout() {
      this.$router.push('/checkout')
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

.cart-page {
  padding: 40px 0 60px;
  position: relative;
  min-height: 70vh;
}

.cart-page-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
}

.tech-dots {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(rgba(34, 197, 94, 0.07) 1px, transparent 1px);
  background-size: 30px 30px;
  opacity: 0.3;
}

.tech-circle {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(34, 197, 94, 0.06) 0%, rgba(34, 197, 94, 0) 70%);
}

.tech-circle-left {
  top: 20%;
  left: -200px;
  width: 500px;
  height: 500px;
  opacity: 0.4;
}

.tech-circle-right {
  bottom: 10%;
  right: -150px;
  width: 400px;
  height: 400px;
  opacity: 0.3;
}

.page-header {
  margin-bottom: 40px;
  text-align: center;
  position: relative;
}

.page-header h1 {
  font-family: 'Orbitron', sans-serif;
  font-size: 36px;
  font-weight: 700;
  color: #f3f4f6;
  margin-bottom: 16px;
  letter-spacing: 1px;
  position: relative;
  display: inline-block;
}

.highlight {
  color: #22c55e;
  position: relative;
}

.highlight::after {
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

.breadcrumbs {
  font-size: 14px;
  color: #9ca3af;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.breadcrumbs a {
  color: #22c55e;
  text-decoration: none;
  transition: all 0.3s ease;
}

.breadcrumbs a:hover {
  color: #16a34a;
  text-shadow: 0 0 8px rgba(34, 197, 94, 0.3);
}

.breadcrumb-separator {
  font-size: 16px;
  color: #4b5563;
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 32px;
  position: relative;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 2px;
  background-color: rgba(17, 24, 39, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(34, 197, 94, 0.1);
  overflow: hidden;
}

.cart-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 20px;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(34, 197, 94, 0.1);
  font-size: 14px;
  font-weight: 500;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.cart-item {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 20px;
  padding: 20px;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid rgba(34, 197, 94, 0.05);
  transition: all 0.3s ease;
}

.cart-item:hover {
  background-color: rgba(34, 197, 94, 0.03);
}

.item-image-wrapper {
  display: flex;
  align-items: center;
  gap: 16px;
}

.item-image {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  width: 80px;
  height: 80px;
  border: 1px solid rgba(34, 197, 94, 0.1);
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s ease;
}

.tech-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.item-image:hover img {
  transform: scale(1.08);
  filter: brightness(1.1);
}

.item-image:hover .tech-overlay {
  opacity: 1;
}

.item-title {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 8px;
  line-height: 1.4;
  color: #f3f4f6;
}

.item-title a {
  color: #f3f4f6;
  text-decoration: none;
  transition: all 0.3s ease;
}

.item-title a:hover {
  color: #22c55e;
  text-shadow: 0 0 8px rgba(34, 197, 94, 0.3);
}

.item-stock span {
  background-color: rgba(239, 68, 68, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.item-price {
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: #f3f4f6;
}

.current-price {
  font-family: 'Orbitron', sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #22c55e;
  letter-spacing: 0.5px;
}

.original-price {
  text-decoration: line-through;
  color: #9ca3af;
  font-size: 14px;
}

.quantity-controls {
  display: inline-flex;
  align-items: center;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
}

.quantity-controls button {
  width: 36px;
  height: 36px;
  border: none;
  background-color: #f8fafc;
  color: #475569;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.quantity-controls button:hover:not(:disabled) {
  background-color: #f1f5f9;
  color: #22c55e;
}

.quantity-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-controls input {
  width: 50px;
  height: 36px;
  border: none;
  border-left: 1px solid #e2e8f0;
  border-right: 1px solid #e2e8f0;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  color: #1e293b;
  background-color: #ffffff;
  -moz-appearance: textfield;
  appearance: textfield;
}

.quantity-controls input::-webkit-outer-spin-button,
.quantity-controls input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.remove-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: rgba(239, 68, 68, 0.05);
  border: 1px solid rgba(239, 68, 68, 0.1);
  border-radius: 4px;
  color: #ef4444;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  padding: 6px 10px;
  transition: all 0.3s ease;
  margin-top: 8px;
}

.remove-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.2);
  color: #ef4444;
  transform: translateY(-2px);
}

.remove-icon {
  font-size: 16px;
  font-weight: bold;
}

.item-total {
  font-family: 'Orbitron', sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #22c55e;
  text-align: center;
  letter-spacing: 0.5px;
}

.cart-summary {
  background-color: rgba(17, 24, 39, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(34, 197, 94, 0.1);
  padding: 24px;
  position: relative;
  overflow: hidden;
}

.cart-summary::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(34, 197, 94, 0.05) 0%, transparent 70%);
  z-index: 0;
}

.summary-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #f3f4f6;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(34, 197, 94, 0.1);
  position: relative;
}

.summary-title::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, #22c55e, rgba(34, 197, 94, 0));
  border-radius: 1px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  color: #9ca3af;
  font-size: 15px;
  position: relative;
  z-index: 1;
}

.summary-row.total {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid rgba(34, 197, 94, 0.1);
  font-weight: 600;
  font-size: 18px;
  color: #f3f4f6;
}

.total-price {
  font-family: 'Orbitron', sans-serif;
  color: #22c55e;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.checkout-btn {
  position: relative;
  width: 100%;
  padding: 16px 24px;
  background-color: #22c55e;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin: 24px 0 16px;
  transition: all 0.3s ease;
  overflow: hidden;
}

.checkout-btn:hover {
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

.checkout-btn:hover .btn-shine {
  left: 100%;
}

.continue-shopping {
  text-align: center;
}

.continue-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #9ca3af;
  text-decoration: none;
  font-size: 15px;
  transition: all 0.3s ease;
}

.continue-link:hover {
  color: #22c55e;
  transform: translateX(-5px);
}

.continue-icon {
  font-size: 14px;
  transition: transform 0.3s ease;
}

.continue-link:hover .continue-icon {
  transform: translateX(-3px);
}

.empty-cart {
  background-color: rgba(17, 24, 39, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(34, 197, 94, 0.1);
  padding: 60px 32px;
  text-align: center;
  max-width: 480px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}

.empty-cart::before {
  content: '';
  position: absolute;
  top: -100px;
  right: -100px;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(34, 197, 94, 0.03) 0%, transparent 70%);
  z-index: 0;
}

.empty-cart-icon {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-emoji {
  font-size: 60px;
  opacity: 0.4;
  transition: all 0.4s ease;
  z-index: 2;
}

.tech-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 110px;
  height: 110px;
  border: 1px dashed rgba(34, 197, 94, 0.2);
  border-radius: 50%;
  animation: rotate 20s linear infinite;
}

.tech-ring::before {
  content: '';
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 10px;
  height: 10px;
  background-color: #22c55e;
  border-radius: 50%;
  box-shadow: 0 0 10px #22c55e;
}

@keyframes rotate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.empty-cart-content:hover .cart-emoji {
  opacity: 0.7;
  transform: scale(1.05);
}

.empty-cart-content h2 {
  font-family: 'Orbitron', sans-serif;
  font-size: 28px;
  font-weight: 600;
  color: #f3f4f6;
  margin-bottom: 12px;
  letter-spacing: 0.5px;
}

.empty-cart-content p {
  color: #9ca3af;
  font-size: 16px;
  margin-bottom: 32px;
  line-height: 1.6;
}

.continue-shopping-btn {
  position: relative;
  display: inline-block;
  padding: 16px 32px;
  background-color: #22c55e;
  color: white;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  overflow: hidden;
  transition: all 0.3s ease;
}

.continue-shopping-btn:hover {
  background-color: #16a34a;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(34, 197, 94, 0.2);
}

.continue-shopping-btn:hover .btn-shine {
  left: 100%;
}

@media (max-width: 1200px) {
  .cart-content {
    grid-template-columns: 1fr 350px;
    gap: 24px;
  }
}

@media (max-width: 992px) {
  .cart-content {
    grid-template-columns: 1fr;
  }

  .cart-summary {
    max-width: 600px;
    margin: 0 auto;
  }
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

.cart-container {
  position: relative;
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

.tech-circles {
  position: absolute;
  top: -50px;
  left: -50px;
  right: 0;
  bottom: 0;
  z-index: -1;
  overflow: hidden;
}

.circle {
  position: absolute;
  border-radius: 50%;
  border: 1px dashed rgba(34, 197, 94, 0.1);
}

.circle-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  left: -100px;
  border: 1px dashed rgba(34, 197, 94, 0.1);
  animation: rotate 50s linear infinite;
}

.circle-2 {
  width: 500px;
  height: 500px;
  bottom: 5%;
  right: -200px;
  border: 1px dashed rgba(34, 197, 94, 0.05);
  animation: rotate 70s linear infinite reverse;
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .cart-header {
    display: none;
  }
  
  .cart-item {
    grid-template-columns: 1fr;
    padding: 16px;
    gap: 16px;
  }
  
  .item-image-wrapper {
    flex-direction: column;
    gap: 12px;
  }
  
  .item-image {
    width: 120px;
    height: 120px;
    margin: 0 auto;
  }
  
  .item-title {
    text-align: center;
    font-size: 16px;
  }
  
  .item-price {
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 12px;
    margin: 12px 0;
  }
  
  .item-stock {
    text-align: center;
  }
  
  .desktop-only {
    display: none;
  }
  
  .mobile-only {
    display: block;
  }
  
  .item-quantity {
    align-items: center;
  }
  
  .quantity-controls {
    margin: 0 auto 12px;
  }
  
  .item-total {
    text-align: center;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid rgba(34, 197, 94, 0.1);
  }
  
  .page-header h1 {
    font-size: 28px;
  }
}

@media (max-width: 480px) {
  .cart-page {
    padding: 20px 0 40px;
  }

  .page-header {
    margin-bottom: 20px;
  }

  .page-header h1 {
    font-size: 24px;
  }

  .cart-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .cart-item {
    padding: 16px;
    gap: 10px;
  }

  .item-title {
    font-size: 14px;
    line-height: 1.3;
  }

  .current-price {
    font-size: 15px;
  }

  .quantity-controls {
    width: 100%;
  }

  .qty-btn {
    width: 30px;
    height: 30px;
  }

  .quantity-controls input {
    width: 36px;
    height: 30px;
  }

  .remove-btn {
    width: 100%;
    justify-content: center;
    margin-top: 12px;
    padding: 8px 0;
  }
  
  .cart-summary {
    padding: 20px;
  }
  
  .summary-title {
    font-size: 18px;
    margin-bottom: 16px;
    padding-bottom: 12px;
  }
  
  .summary-row {
    font-size: 14px;
    margin-bottom: 12px;
  }
  
  .summary-row.total {
    margin-top: 20px;
    padding-top: 12px;
  }
  
  .total-price {
    font-size: 18px;
  }
  
  .checkout-btn {
    padding: 14px 20px;
    font-size: 15px;
    margin: 20px 0 14px;
  }

  .empty-cart {
    padding: 40px 20px;
  }

  .empty-cart-content h2 {
    font-size: 22px;
  }

  .empty-cart-content p {
    font-size: 14px;
    margin-bottom: 24px;
  }
  
  .continue-shopping-btn {
    width: 100%;
    padding: 14px 20px;
    font-size: 15px;
  }
  
  .tech-ring {
    width: 90px;
    height: 90px;
  }
}
</style>
