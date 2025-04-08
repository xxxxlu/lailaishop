<template>
  <div class="cart-page">
    <div class="container">
      <div class="page-header">
        <h1>Shopping Cart</h1>
        <div class="breadcrumbs">
          <router-link to="/">Home</router-link> /
          <span>Shopping Cart</span>
        </div>
      </div>

      <div class="cart-content" v-if="cart.length > 0">
        <div class="cart-items">
          <div class="cart-item" v-for="item in cart" :key="item.id">
            <div class="item-image">
              <img
                :src="item.image"
                :alt="item.name"
                @error="handleImageError"
              />
            </div>
            <div class="item-details">
              <h3 class="item-title">
                <router-link :to="`/product/${item.id}`">{{ item.name }}</router-link>
              </h3>
              <div class="item-price">
                <span class="current-price">Rs. {{ formatPrice(item.price) }}</span>
                <span class="original-price" v-if="item.originalPrice > item.price">
                  Rs. {{ formatPrice(item.originalPrice) }}
                </span>
              </div>
            </div>
            <div class="item-quantity">
              <div class="quantity-controls">
                <button @click="decreaseQuantity(item.id)" :disabled="item.quantity <= 1">-</button>
                <input
                  type="number"
                  v-model.number="item.quantity"
                  min="1"
                  :max="item.stock"
                  @change="updateQuantity(item.id, item.quantity)"
                />
                <button @click="increaseQuantity(item.id)" :disabled="item.quantity >= item.stock">+</button>
              </div>
              <button class="remove-btn" @click="removeItem(item.id)">Remove</button>
            </div>
            <div class="item-total">
              Rs. {{ formatPrice(item.price * item.quantity) }}
            </div>
          </div>
        </div>

        <div class="cart-summary">
          <h3>Order Summary</h3>
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
          <button class="checkout-btn" @click="proceedToCheckout">Proceed to Checkout</button>
          <div class="continue-shopping">
            <router-link to="/products">Continue Shopping</router-link>
          </div>
        </div>
      </div>

      <div class="empty-cart" v-else>
        <div class="empty-cart-content">
          <img src="https://ext.same-assets.com/3844190759/4083373414.png" alt="Empty Cart" />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any products to your cart yet.</p>
          <router-link to="/products" class="continue-shopping-btn">Continue Shopping</router-link>
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
.cart-page {
  padding: 40px 0;
  background-color: #ffffff;
}

.page-header {
  margin-bottom: 32px;
  text-align: center;
}

.page-header h1 {
  font-size: 32px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
}

.breadcrumbs {
  color: #64748b;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.breadcrumbs a {
  color: #475569;
  text-decoration: none;
  transition: color 0.2s ease;
}

.breadcrumbs a:hover {
  color: #3b82f6;
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 32px;
  align-items: start;
}

.cart-items {
  background-color: #ffffff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}

.cart-item {
  display: grid;
  grid-template-columns: 120px 1fr auto auto;
  gap: 24px;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #e2e8f0;
  transition: background-color 0.2s ease;
}

.cart-item:hover {
  background-color: #f8fafc;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-image {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
}

.item-image img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.item-image:hover img {
  transform: scale(1.05);
}

.item-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 12px;
  line-height: 1.4;
}

.item-title a {
  color: #1e293b;
  text-decoration: none;
  transition: color 0.2s ease;
}

.item-title a:hover {
  color: #3b82f6;
}

.item-price {
  display: flex;
  align-items: center;
  gap: 12px;
}

.current-price {
  font-weight: 600;
  color: #3b82f6;
  font-size: 18px;
}

.original-price {
  font-size: 15px;
  text-decoration: line-through;
  color: #94a3b8;
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
  color: #3b82f6;
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
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  padding: 6px 0;
  transition: color 0.2s ease;
}

.remove-btn:hover {
  color: #dc2626;
}

.item-total {
  font-weight: 600;
  font-size: 18px;
  color: #1e293b;
}

.cart-summary {
  background-color: #ffffff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  padding: 24px;
}

.cart-summary h3 {
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  color: #475569;
  font-size: 15px;
}

.summary-row.total {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
  font-weight: 600;
  font-size: 20px;
  color: #1e293b;
}

.checkout-btn {
  width: 100%;
  padding: 16px 24px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin: 24px 0 16px;
  transition: all 0.2s ease;
}

.checkout-btn:hover {
  background-color: #2563eb;
  transform: translateY(-1px);
}

.continue-shopping {
  text-align: center;
}

.continue-shopping a {
  color: #64748b;
  text-decoration: none;
  font-size: 15px;
  transition: color 0.2s ease;
}

.continue-shopping a:hover {
  color: #3b82f6;
}

.empty-cart {
  background-color: #ffffff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  padding: 60px 32px;
  text-align: center;
  max-width: 480px;
  margin: 0 auto;
}

.empty-cart-content img {
  width: 120px;
  height: 120px;
  opacity: 0.4;
  margin-bottom: 24px;
  transition: opacity 0.2s ease;
}

.empty-cart-content:hover img {
  opacity: 0.6;
}

.empty-cart-content h2 {
  font-size: 28px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
}

.empty-cart-content p {
  color: #64748b;
  font-size: 16px;
  margin-bottom: 32px;
  line-height: 1.6;
}

.continue-shopping-btn {
  display: inline-block;
  padding: 16px 32px;
  background-color: #3b82f6;
  color: white;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.continue-shopping-btn:hover {
  background-color: #2563eb;
  transform: translateY(-1px);
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

@media (max-width: 768px) {
  .cart-item {
    grid-template-columns: 100px 1fr;
    grid-template-areas:
      "image details"
      "image quantity"
      "total total";
    gap: 16px;
    padding: 20px;
  }

  .item-image {
    grid-area: image;
  }

  .item-image img {
    width: 100px;
    height: 100px;
  }

  .item-details {
    grid-area: details;
  }

  .item-quantity {
    grid-area: quantity;
  }

  .item-total {
    grid-area: total;
    text-align: right;
    padding-top: 12px;
    margin-top: 12px;
    border-top: 1px solid #e2e8f0;
  }
}

@media (max-width: 480px) {
  .cart-page {
    padding: 24px 0;
  }

  .page-header {
    margin-bottom: 24px;
  }

  .page-header h1 {
    font-size: 28px;
  }

  .cart-item {
    padding: 16px;
  }

  .item-title {
    font-size: 15px;
  }

  .current-price {
    font-size: 16px;
  }

  .quantity-controls {
    width: 100%;
    margin-bottom: 8px;
  }

  .remove-btn {
    width: 100%;
    text-align: center;
    padding: 8px 0;
    background-color: #fef2f2;
    border-radius: 6px;
    color: #ef4444;
  }

  .empty-cart {
    padding: 40px 20px;
  }

  .empty-cart-content h2 {
    font-size: 24px;
  }

  .empty-cart-content p {
    font-size: 15px;
  }
}
</style>
