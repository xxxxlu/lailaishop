<template>
  <div class="checkout-success">
    <div class="container">
      <div class="success-card">
        <div class="success-icon">
          <div class="checkmark-circle">
            <div class="checkmark"></div>
          </div>
        </div>
        <h1>Thank You for Your Order!</h1>
        <p class="order-number">Order #{{ orderId }}</p>

        <div class="success-message">
          <p>Your order has been placed successfully and is being processed.</p>
          <p>A confirmation email has been sent to <strong>{{ customerInfo.email }}</strong>.</p>
        </div>

        <div class="order-details">
          <h2>Order Details</h2>

          <div class="details-section">
            <h3>Shipping Information</h3>
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
            <h3>Payment Information</h3>
            <div class="info-item">
              <span class="label">Payment Method:</span>
              <span class="value">{{ paymentMethod }}</span>
            </div>
          </div>

          <div class="details-section">
            <h3>Order Summary</h3>
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
          <router-link to="/" class="continue-btn">Continue Shopping</router-link>
          <button class="print-btn" @click="printOrder">Print Receipt</button>
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
.checkout-success {
  padding: 48px 0;
  background-color: #f8fafc;
}

.success-card {
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 48px;
  max-width: 900px;
  margin: 0 auto;
}

.success-icon {
  text-align: center;
  margin-bottom: 24px;
}

.checkmark-circle {
  width: 80px;
  height: 80px;
  background-color: #4caf50;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
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
  color: #1e293b;
  font-size: 32px;
  margin-bottom: 24px;
}

.order-number {
  text-align: center;
  font-size: 18px;
  color: #475569;
  margin-bottom: 32px;
}

.success-message {
  text-align: center;
  margin-bottom: 32px;
  line-height: 1.8;
  color: #475569;
}

.order-details {
  margin-bottom: 40px;
}

.order-details h2 {
  font-size: 24px;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e2e8f0;
  color: #1e293b;
}

.details-section {
  margin-bottom: 32px;
}

.details-section h3 {
  font-size: 20px;
  margin-bottom: 16px;
  color: #334155;
}

.info-item {
  display: flex;
  margin-bottom: 12px;
}

.label {
  font-weight: 600;
  width: 140px;
  flex-shrink: 0;
  color: #1e293b;
}

.summary-items {
  margin-bottom: 20px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f1f5f9;
}

.summary-totals {
  padding-top: 18px;
}

.total-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.grand-total {
  font-size: 20px;
  font-weight: 700;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e2e8f0;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 24px;
}

.continue-btn, .print-btn {
  padding: 14px 28px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.continue-btn {
  background-color: #3b82f6;
  color: white;
}

.print-btn {
  background-color: #f1f5f9;
  color: #1e293b;
  border: 1px solid #e2e8f0;
}

.continue-btn:hover {
  background-color: #2563eb;
}

.print-btn:hover {
  background-color: #e2e8f0;
}

@media (max-width: 768px) {
  .success-card {
    padding: 24px;
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
    gap: 12px;
  }

  .continue-btn, .print-btn {
    width: 100%;
    text-align: center;
  }
}
</style>
