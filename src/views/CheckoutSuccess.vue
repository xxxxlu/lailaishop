<template>
  <div class="checkout-success">
    <div class="container">
      <div class="success-card">
        <div class="success-icon">
          <img src="https://ext.same-assets.com/3844190759/2186242231.png" alt="Success" />
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
  margin: 40px 0;
}

.success-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
}

.success-icon {
  text-align: center;
  margin-bottom: 20px;
}

.success-icon img {
  width: 80px;
  height: 80px;
}

h1 {
  text-align: center;
  color: #4caf50;
  margin-bottom: 10px;
}

.order-number {
  text-align: center;
  font-size: 16px;
  color: #777;
  margin-bottom: 30px;
}

.success-message {
  text-align: center;
  margin-bottom: 30px;
  line-height: 1.6;
}

.order-details {
  margin-bottom: 30px;
}

.order-details h2 {
  font-size: 22px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.details-section {
  margin-bottom: 25px;
}

.details-section h3 {
  font-size: 18px;
  margin-bottom: 15px;
  color: #555;
}

.info-item {
  display: flex;
  margin-bottom: 10px;
}

.label {
  font-weight: bold;
  width: 120px;
  flex-shrink: 0;
}

.summary-items {
  margin-bottom: 15px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f5f5f5;
}

.summary-totals {
  padding-top: 15px;
}

.total-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.grand-total {
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #eee;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.continue-btn, .print-btn {
  padding: 12px 25px;
  border-radius: 4px;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.continue-btn {
  background-color: #d23c36;
  color: white;
}

.print-btn {
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
}

.continue-btn:hover {
  background-color: #c0392b;
}

.print-btn:hover {
  background-color: #eee;
}

@media print {
  .actions {
    display: none;
  }

  .checkout-success {
    margin: 0;
  }

  .success-card {
    box-shadow: none;
    padding: 0;
  }
}

@media (max-width: 768px) {
  .success-card {
    padding: 20px;
  }

  .info-item {
    flex-direction: column;
  }

  .label {
    width: 100%;
    margin-bottom: 5px;
  }

  .actions {
    flex-direction: column;
    gap: 10px;
  }

  .continue-btn, .print-btn {
    width: 100%;
    text-align: center;
  }
}
</style>
