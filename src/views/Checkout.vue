<template>
  <div class="checkout-page">
    <div class="checkout-page-bg">
      <div class="tech-dots"></div>
      <div class="tech-circle tech-circle-left"></div>
      <div class="tech-circle tech-circle-right"></div>
    </div>
    <div class="tech-grid"></div>

    <div class="container">
      <div class="page-header">
        <h1><span class="highlight">Check</span>out</h1>
        <div class="breadcrumbs">
          <router-link to="/">Home</router-link> 
          <span class="breadcrumb-separator">›</span>
          <router-link to="/cart">Shopping Cart</router-link>
          <span class="breadcrumb-separator">›</span>
          <span>Checkout</span>
        </div>
      </div>

      <div class="checkout-content" v-if="cart.length > 0">
        <div class="customer-details">
          <div class="section-header">
            <h2>Customer Information</h2>
            <div class="tech-line"></div>
          </div>
          <form @submit.prevent="proceedToPayment">
            <div class="form-group">
              <label for="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                v-model="customerInfo.fullName"
                required
              />
            </div>

            <div class="form-group">
              <label for="email">Email *</label>
              <input
                type="email"
                id="email"
                v-model="customerInfo.email"
                required
              />
            </div>

            <div class="form-group">
              <label for="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                v-model="customerInfo.phone"
                required
              />
            </div>

            <div class="form-group">
              <label for="address">Shipping Address *</label>
              <textarea
                id="address"
                v-model="customerInfo.address"
                required
              ></textarea>
            </div>

            <div class="form-group">
              <label for="city">City *</label>
              <input
                type="text"
                id="city"
                v-model="customerInfo.city"
                required
              />
            </div>

            <div class="form-group">
              <label for="postalCode">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                v-model="customerInfo.postalCode"
              />
            </div>

            <div class="form-group">
              <label for="notes">Order Notes (Optional)</label>
              <textarea
                id="notes"
                v-model="customerInfo.notes"
              ></textarea>
            </div>

            <div class="section-header">
              <h2>Payment Method</h2>
              <div class="tech-line"></div>
            </div>
            <div class="payment-methods">
              <div class="payment-method" :class="{'selected': customerInfo.paymentMethod === 'cod'}" @click="customerInfo.paymentMethod = 'cod'">
                <input
                  type="radio"
                  id="cashOnDelivery"
                  value="cod"
                  v-model="customerInfo.paymentMethod"
                />
                <div class="method-content">
                  <div class="method-icon easypaisa-icon">
                    <img src="../assets/easypaisa.png" alt="EasyPaisa" style="width: 100px; height: 80px;">
                  </div>
                  <label for="cashOnDelivery">EasyPaisa</label>
                </div>
                <div class="method-check"></div>
              </div>
              <div class="payment-method" :class="{'selected': customerInfo.paymentMethod === 'bank'}" @click="customerInfo.paymentMethod = 'bank'">
                <input
                  type="radio"
                  id="bankTransfer"
                  value="bank"
                  v-model="customerInfo.paymentMethod"
                />
                <div class="method-content">
                  <div class="method-icon bank-icon">
                    <img src="../assets/Frame.png" alt="Bank Transfer" style="width: 100px; height: 80px;">
                  </div>
                  <label for="bankTransfer">Bank Transfer</label>
                </div>
                <div class="method-check"></div>
              </div>
            </div>

            <div class="form-actions">
              <router-link to="/cart" class="back-to-cart">
                <span class="back-icon">←</span>
                <span>Back to Cart</span>
              </router-link>
              <button type="submit" class="place-order-btn">
                <span>Place Order</span>
                <div class="btn-shine"></div>
              </button>
            </div>
          </form>
        </div>

        <div class="order-summary">
          <div class="section-header">
            <h2>Order Summary</h2>
            <div class="tech-line"></div>
          </div>
          <div class="summary-items">
            <div class="summary-item" v-for="item in cart" :key="item.id">
              <div class="item-image">
                <img
                  :src="item.image"
                  :alt="item.name"
                  @error="handleImageError"
                />
              </div>
              <div class="item-details">
                <h3 class="item-name">{{ item.name }}</h3>
                <div class="item-price-qty">
                  <span>Rs. {{ formatPrice(item.price) }} x {{ item.quantity }}</span>
                </div>
              </div>
              <div class="item-total">
                Rs. {{ formatPrice(item.price * item.quantity) }}
              </div>
            </div>
          </div>

          <div class="summary-totals">
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
              <span>Rs. {{ formatPrice(cartTotal + shippingFee) }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="empty-checkout" v-else>
        <div class="empty-checkout-content">
          <div class="empty-icon">
            <span class="cart-emoji">🛒</span>
            <div class="tech-ring"></div>
          </div>
          <h2>Your cart is empty</h2>
          <p>You need to add products to your cart before checkout.</p>
          <router-link to="/products" class="continue-shopping-btn">
            <span>Continue Shopping</span>
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
  name: 'Checkout',
  data() {
    return {
      shippingFee: 399,
      customerInfo: {
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        notes: '',
        paymentMethod: 'cod' // 默认选择cod支付方式
      }
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
    proceedToPayment() {
      // Save customer info in session/local storage
      localStorage.setItem('customerInfo', JSON.stringify(this.customerInfo))
      localStorage.setItem('orderTotal', JSON.stringify({
        subtotal: this.cartTotal,
        shipping: this.shippingFee,
        total: this.cartTotal + this.shippingFee
      }))

      // In a real app, you would send this data to your server
      // For now, just redirect to success page
      this.$router.push('/checkout-success')
    },
    handleImageError(e) {
      // Fallback image if product image is not found
      e.target.src = 'https://ext.same-assets.com/3844190759/814572404.jpeg'
    }
  },
  created() {
    // Redirect if cart is empty
    if (this.cart.length === 0) {
      this.$router.push('/cart')
    }

    // If returning from payment, don't clear the form
    const savedInfo = localStorage.getItem('customerInfo')
    if (savedInfo) {
      this.customerInfo = JSON.parse(savedInfo)
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700&display=swap');

.checkout-page {
  margin-bottom: 60px;
  position: relative;
  min-height: 70vh;
  color: #f3f4f6;
}

.checkout-page-bg {
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
  padding-top: 40px;
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

.breadcrumbs {
  color: #9ca3af;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.breadcrumbs a {
  color: #d1d5db;
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumbs a:hover {
  color: #22c55e;
}

.breadcrumb-separator {
  color: #4b5563;
}

.checkout-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 30px;
  align-items: start;
}

.customer-details, .order-summary {
  background-color: rgba(17, 24, 39, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(34, 197, 94, 0.1);
  padding: 30px;
  position: relative;
  overflow: hidden;
}

.customer-details::before, .order-summary::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(34, 197, 94, 0.05) 0%, transparent 70%);
  z-index: 0;
}

.section-header {
  margin-bottom: 24px;
  position: relative;
}

.section-header h2 {
  font-family: 'Orbitron', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #f3f4f6;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
  padding-bottom: 12px;
  position: relative;
}

.tech-line {
  height: 1px;
  width: 100%;
  background: linear-gradient(90deg, rgba(34, 197, 94, 0.2), transparent);
  position: relative;
  margin-top: 4px;
}

.form-group {
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #d1d5db;
  letter-spacing: 0.3px;
}

.form-group input, .form-group textarea {
  width: 100%;
  padding: 12px 16px;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(34, 197, 94, 0.1);
  border-radius: 8px;
  font-size: 15px;
  color: #f3f4f6;
  transition: all 0.3s ease;
}

.form-group input:focus, .form-group textarea:focus {
  outline: none;
  border-color: rgba(34, 197, 94, 0.4);
  background-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.1);
}

.form-group textarea {
  height: 100px;
  resize: vertical;
  line-height: 1.5;
}

.payment-methods {
  margin-bottom: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.payment-method {
  position: relative;
  border: 1px solid rgba(34, 197, 94, 0.1);
  background-color: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.payment-method:hover {
  background-color: rgba(255, 255, 255, 0.05);
  transform: translateY(-2px);
}

.payment-method.selected {
  background-color: rgba(34, 197, 94, 0.08);
  border-color: rgba(34, 197, 94, 0.3);
}

.payment-method input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.payment-method {
  cursor: pointer;
}

.method-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
  flex: 1;
}

.method-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
}

.method-check {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid rgba(34, 197, 94, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.payment-method.selected .method-check::after {
  content: '';
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #22c55e;
  box-shadow: 0 0 10px rgba(34, 197, 94, 0.4);
}

.payment-method label {
  font-weight: 500;
  color: #d1d5db;
  cursor: pointer;
  transition: color 0.3s ease;
}

.payment-method.selected label {
  color: #22c55e;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
}

.back-to-cart {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #9ca3af;
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 6px 10px;
}

.back-to-cart:hover {
  color: #22c55e;
  transform: translateX(-5px);
}

.back-icon {
  font-size: 14px;
  transition: transform 0.3s ease;
}

.back-to-cart:hover .back-icon {
  transform: translateX(-3px);
}

.place-order-btn {
  position: relative;
  padding: 14px 30px;
  background-color: #22c55e;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.place-order-btn:hover {
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

.place-order-btn:hover .btn-shine {
  left: 100%;
}

.summary-items {
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
  scrollbar-width: thin;
  scrollbar-color: rgba(34, 197, 94, 0.3) rgba(255, 255, 255, 0.05);
  padding-right: 5px;
}

.summary-items::-webkit-scrollbar {
  width: 6px;
}

.summary-items::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
}

.summary-items::-webkit-scrollbar-thumb {
  background-color: rgba(34, 197, 94, 0.3);
  border-radius: 3px;
}

.summary-item {
  display: flex;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  align-items: center;
}

.summary-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.item-image {
  width: 60px;
  height: 60px;
  margin-right: 15px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(34, 197, 94, 0.1);
  position: relative;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.item-image:hover img {
  transform: scale(1.08);
}

.item-details {
  flex: 1;
}

.item-name {
  font-size: 14px;
  margin-bottom: 6px;
  color: #f3f4f6;
}

.item-price-qty {
  font-size: 13px;
  color: #9ca3af;
}

.item-total {
  font-family: 'Orbitron', sans-serif;
  font-weight: 600;
  margin-left: 15px;
  color: #22c55e;
}

.summary-totals {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  color: #d1d5db;
}

.summary-row.total {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid rgba(34, 197, 94, 0.1);
  font-size: 18px;
  font-weight: 600;
  color: #f3f4f6;
}

.summary-row.total span:last-child {
  font-family: 'Orbitron', sans-serif;
  color: #22c55e;
  font-weight: 700;
}

.empty-checkout {
  background-color: rgba(17, 24, 39, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(34, 197, 94, 0.1);
  padding: 60px 30px;
  text-align: center;
  max-width: 500px;
  margin: 40px auto;
  position: relative;
  overflow: hidden;
}

.empty-checkout::before {
  content: '';
  position: absolute;
  top: -100px;
  right: -100px;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(34, 197, 94, 0.03) 0%, transparent 70%);
  z-index: 0;
}

.empty-icon {
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

.empty-checkout h2 {
  font-family: 'Orbitron', sans-serif;
  font-size: 28px;
  font-weight: 600;
  color: #f3f4f6;
  margin-bottom: 12px;
  letter-spacing: 0.5px;
  position: relative;
  z-index: 1;
}

.empty-checkout p {
  color: #9ca3af;
  margin-bottom: 30px;
  line-height: 1.6;
  position: relative;
  z-index: 1;
}

.continue-shopping-btn {
  position: relative;
  display: inline-block;
  padding: 14px 32px;
  background-color: #22c55e;
  color: white;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
  overflow: hidden;
}

.continue-shopping-btn:hover {
  background-color: #16a34a;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(34, 197, 94, 0.2);
}

.continue-shopping-btn:hover .btn-shine {
  left: 100%;
}

@media (max-width: 992px) {
  .checkout-content {
    grid-template-columns: 1fr;
  }

  .order-summary {
    order: -1;
    margin-bottom: 20px;
  }
}

@media (max-width: 768px) {
  .page-header {
    padding-top: 30px;
    margin-bottom: 20px;
  }
  
  .page-header h1 {
    font-size: 28px;
  }
  
  .customer-details, .order-summary {
    padding: 20px;
  }
  
  .payment-methods {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .page-header h1 {
    font-size: 24px;
  }
  
  .section-header h2 {
    font-size: 18px;
  }
  
  .form-actions {
    flex-direction: column-reverse;
    gap: 15px;
  }
  
  .place-order-btn, .back-to-cart {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .empty-checkout {
    padding: 40px 20px;
  }
  
  .empty-checkout h2 {
    font-size: 22px;
  }
  
  .summary-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .item-image {
    margin-bottom: 10px;
  }
  
  .item-total {
    margin-left: 0;
    margin-top: 10px;
    align-self: flex-end;
  }
}
</style>
