<template>
  <div class="checkout-page">
    <div class="container">
      <div class="page-header">
        <h1>Checkout</h1>
        <div class="breadcrumbs">
          <router-link to="/">Home</router-link> /
          <router-link to="/cart">Shopping Cart</router-link> /
          <span>Checkout</span>
        </div>
      </div>

      <div class="checkout-content" v-if="cart.length > 0">
        <div class="customer-details">
          <h2>Customer Information</h2>
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

            <h2>Payment Method</h2>
            <div class="payment-methods">
              <div class="payment-method">
                <input
                  type="radio"
                  id="cashOnDelivery"
                  value="cod"
                  v-model="customerInfo.paymentMethod"
                />
                <label for="cashOnDelivery"></label>
                <img src="../assets/easypaisa.png" alt="" style="width: 100px; height: 80px;">
              </div>
              <div class="payment-method">
                <input
                  type="radio"
                  id="bankTransfer"
                  value="bank"
                  v-model="customerInfo.paymentMethod"
                />
                <label for="bankTransfer"></label>
                <img src="../assets/Frame.png" alt="" style="width: 100px; height: 80px;">
              </div>
            </div>

            <div class="form-actions">
              <router-link to="/cart" class="back-to-cart">Back to Cart</router-link>
              <button type="submit" class="place-order-btn">Place Order</button>
            </div>
          </form>
        </div>

        <div class="order-summary">
          <h2>Order Summary</h2>
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
          <h2>Your cart is empty</h2>
          <p>You need to add products to your cart before checkout.</p>
          <router-link to="/products" class="continue-shopping-btn">Continue Shopping</router-link>
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
        paymentMethod: 'cod'
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
.checkout-page {
  margin-bottom: 40px;
}

.page-header {
  margin-bottom: 20px;
}

.page-header h1 {
  font-size: 28px;
  margin-bottom: 10px;
}

.breadcrumbs {
  color: #777;
  font-size: 14px;
}

.breadcrumbs a {
  color: #333;
  text-decoration: none;
}

.checkout-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 30px;
}

.customer-details, .order-summary {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 25px;
}

.customer-details h2, .order-summary h2 {
  font-size: 20px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.form-group input, .form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-group textarea {
  height: 80px;
  resize: vertical;
}

.payment-methods {
  margin-bottom: 30px;
}

.payment-method {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.payment-method input {
  margin-right: 10px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.back-to-cart {
  color: #333;
  text-decoration: underline;
}

.place-order-btn {
  padding: 12px 25px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.place-order-btn:hover {
  background-color: #1150b4;
}

.summary-items {
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.summary-item {
  display: flex;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
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
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
}

.item-name {
  font-size: 14px;
  margin-bottom: 5px;
}

.item-price-qty {
  font-size: 13px;
  color: #777;
}

.item-total {
  font-weight: bold;
  margin-left: 15px;
}

.summary-totals {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.summary-row.total {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
  font-size: 18px;
  font-weight: bold;
}

.empty-checkout {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 40px 20px;
  text-align: center;
}

.empty-checkout h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.empty-checkout p {
  color: #777;
  margin-bottom: 30px;
}

.continue-shopping-btn {
  display: inline-block;
  padding: 12px 30px;
  background-color: #3b82f6;
  color: white;
  border-radius: 5px;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.continue-shopping-btn:hover {
  background-color: #c0392b;
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
</style>
