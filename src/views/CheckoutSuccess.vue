<template>
  <div class="checkout-success">
    <div class="success-bg">
      <div class="tech-dots"></div>
      <div class="tech-circle tech-circle-left"></div>
      <div class="tech-circle tech-circle-right"></div>
    </div>
    <div class="tech-grid"></div>
    
    <div class="container">
      <div class="success-card">
        <div class="success-icon">
          <div class="checkmark-circle">
            <div class="checkmark"></div>
          </div>
          <div class="success-pulse"></div>
        </div>
        <h1><span class="highlight">Thank You</span> for Your Order!</h1>
        <p class="order-number">Order <span class="order-id">#{{ orderId }}</span></p>

        <div class="success-message">
          <p>Your order has been placed successfully and is being processed.</p>
          <p>A confirmation email has been sent to <strong>{{ customerInfo.email }}</strong>.</p>
        </div>

        <div class="order-details">
          <div class="section-header">
            <h2>Order Details</h2>
            <div class="tech-line"></div>
          </div>

          <div class="details-section">
            <div class="section-header">
              <h3>Shipping Information</h3>
              <div class="tech-line tech-line-sm"></div>
            </div>
            <div class="info-item">
              <span class="label">Name:</span>
              <span class="value">{{ customerInfo.fullName }}</span>
            </div>
            <div class="info-item">
              <span class="label">Address:</span>
              <span class="value">{{ customerInfo.address }}</span>
            </div>
            <div class="info-item">
              <span class="label">City:</span>
              <span class="value">{{ customerInfo.city }}</span>
            </div>
            <div class="info-item" v-if="customerInfo.postalCode">
              <span class="label">Postal Code:</span>
              <span class="value">{{ customerInfo.postalCode }}</span>
            </div>
            <div class="info-item">
              <span class="label">Phone:</span>
              <span class="value">{{ customerInfo.phone }}</span>
            </div>
          </div>

          <div class="details-section">
            <div class="section-header">
              <h3>Payment Information</h3>
              <div class="tech-line tech-line-sm"></div>
            </div>
            <div class="info-item">
              <span class="label">Payment Method:</span>
              <span class="value">{{ paymentMethod }}</span>
            </div>
          </div>

          <div class="details-section">
            <div class="section-header">
              <h3>Order Summary</h3>
              <div class="tech-line tech-line-sm"></div>
            </div>
            <div class="summary-items">
              <div class="summary-item" v-for="item in cart" :key="item.id">
                <span class="item-name">{{ item.name }} × {{ item.quantity }}</span>
                <span class="item-price">Rs. {{ formatPrice(item.price * item.quantity) }}</span>
              </div>
            </div>

            <div class="summary-totals">
              <div class="total-row">
                <span>Subtotal:</span>
                <span>Rs. {{ formatPrice(orderTotal.subtotal) }}</span>
              </div>
              <div class="total-row">
                <span>Shipping:</span>
                <span>Rs. {{ formatPrice(orderTotal.shipping) }}</span>
              </div>
              <div class="total-row grand-total">
                <span>Total:</span>
                <span>Rs. {{ formatPrice(orderTotal.total) }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="actions">
          <router-link to="/" class="continue-btn">
            <span>Continue Shopping</span>
            <div class="btn-shine"></div>
          </router-link>
          <button class="print-btn" @click="printOrder">
            <span>Print Receipt</span>
            <i class="print-icon">🖨️</i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CheckoutSuccess',
  data() {
    return {
      orderId: this.generateOrderId(),
      customerInfo: {},
      orderTotal: {
        subtotal: 0,
        shipping: 0,
        total: 0
      }
    }
  },
  computed: {
    ...mapState(['cart']),
    paymentMethod() {
      const methods = {
        'cod': 'Cash on Delivery',
        'bank': 'Bank Transfer'
      }
      return methods[this.customerInfo.paymentMethod] || this.customerInfo.paymentMethod
    }
  },
  methods: {
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    generateOrderId() {
      // Generate a random order ID
      const prefix = 'SYM'
      const timestamp = new Date().getTime().toString().slice(-6)
      const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
      return `${prefix}${timestamp}${random}`
    },
    printOrder() {
      window.print()
    }
  },
  created() {
    // Retrieve customer information and order details from local storage
    const customerInfoStr = localStorage.getItem('customerInfo')
    const orderTotalStr = localStorage.getItem('orderTotal')

    if (customerInfoStr) {
      this.customerInfo = JSON.parse(customerInfoStr)
    } else {
      // Redirect if no customer info is found
      this.$router.push('/cart')
    }

    if (orderTotalStr) {
      this.orderTotal = JSON.parse(orderTotalStr)
    }

    // Clear the cart after successful checkout
    this.$store.commit('clearCart')
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700&display=swap');

.checkout-success {
  padding: 60px 0;
  position: relative;
  min-height: 80vh;
  color: #f3f4f6;
}

.success-bg {
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

.success-card {
  background-color: rgba(17, 24, 39, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(34, 197, 94, 0.1);
  padding: 48px;
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}

.success-card::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(34, 197, 94, 0.05) 0%, transparent 70%);
  z-index: 0;
}

.success-icon {
  text-align: center;
  margin-bottom: 32px;
  position: relative;
}

.checkmark-circle {
  width: 90px;
  height: 90px;
  background-color: #22c55e;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
}

.success-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background-color: rgba(34, 197, 94, 0.1);
  animation: pulse 2s infinite;
  z-index: 0;
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(0.9);
    opacity: 0.8;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 0.5;
  }
  100% {
    transform: translate(-50%, -50%) scale(0.9);
    opacity: 0.8;
  }
}

.checkmark {
  width: 40px;
  height: 20px;
  border-left: 5px solid white;
  border-bottom: 5px solid white;
  transform: rotate(-45deg);
}

h1 {
  text-align: center;
  color: #f3f4f6;
  font-family: 'Orbitron', sans-serif;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 24px;
  letter-spacing: 1px;
}

.highlight {
  color: #22c55e;
  position: relative;
}

.order-number {
  text-align: center;
  font-size: 18px;
  color: #9ca3af;
  margin-bottom: 32px;
  letter-spacing: 0.5px;
}

.order-id {
  font-family: 'Orbitron', sans-serif;
  color: #22c55e;
  font-weight: 600;
}

.success-message {
  text-align: center;
  margin-bottom: 40px;
  line-height: 1.8;
  color: #d1d5db;
  font-size: 16px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.section-header {
  margin-bottom: 20px;
  position: relative;
}

.section-header h2 {
  font-family: 'Orbitron', sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: #f3f4f6;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
  position: relative;
}

.section-header h3 {
  font-family: 'Orbitron', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #f3f4f6;
  margin-bottom: 6px;
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

.tech-line-sm {
  width: 60%;
}

.order-details {
  margin-bottom: 40px;
  position: relative;
  z-index: 1;
}

.details-section {
  margin-bottom: 32px;
  background-color: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(34, 197, 94, 0.05);
}

.info-item {
  display: flex;
  margin-bottom: 12px;
}

.label {
  font-weight: 600;
  width: 140px;
  flex-shrink: 0;
  color: #9ca3af;
}

.value {
  color: #f3f4f6;
}

.summary-items {
  margin-bottom: 20px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.item-name {
  color: #d1d5db;
}

.item-price {
  font-family: 'Orbitron', sans-serif;
  color: #22c55e;
  font-weight: 500;
}

.summary-totals {
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.total-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  color: #d1d5db;
}

.grand-total {
  font-size: 20px;
  font-weight: 700;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(34, 197, 94, 0.1);
}

.grand-total span:last-child {
  font-family: 'Orbitron', sans-serif;
  color: #22c55e;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 40px;
}

.continue-btn, .print-btn {
  position: relative;
  padding: 14px 30px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
}

.continue-btn {
  background-color: #22c55e;
  color: white;
  overflow: hidden;
}

.print-btn {
  background-color: rgba(255, 255, 255, 0.05);
  color: #d1d5db;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.print-icon {
  font-style: normal;
  font-size: 18px;
  margin-left: 5px;
}

.continue-btn:hover {
  background-color: #16a34a;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(34, 197, 94, 0.2);
}

.print-btn:hover {
  background-color: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
  color: #f3f4f6;
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

.continue-btn:hover .btn-shine {
  left: 100%;
}

@media (max-width: 768px) {
  .success-card {
    padding: 30px 20px;
    margin: 0 15px;
  }

  h1 {
    font-size: 24px;
  }

  .section-header h2 {
    font-size: 20px;
  }

  .info-item {
    flex-direction: column;
  }

  .label {
    width: 100%;
    margin-bottom: 6px;
  }

  .actions {
    flex-direction: column;
    gap: 16px;
    margin-top: 30px;
  }

  .continue-btn, .print-btn {
    width: 100%;
    justify-content: center;
  }

  .details-section {
    padding: 15px;
  }

  .section-header h3 {
    font-size: 16px;
  }

  .checkmark-circle {
    width: 70px;
    height: 70px;
  }

  .checkmark {
    width: 30px;
    height: 15px;
    border-left: 4px solid white;
    border-bottom: 4px solid white;
  }
}

@media (max-width: 480px) {
  .success-card {
    padding: 20px 15px;
  }

  h1 {
    font-size: 20px;
  }

  .order-number {
    font-size: 14px;
  }

  .section-header h2 {
    font-size: 18px;
  }

  .summary-item {
    font-size: 14px;
  }

  .grand-total {
    font-size: 16px;
  }

  .success-message {
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 30px;
  }
}
</style>
