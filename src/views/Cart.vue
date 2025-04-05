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

.cart-content {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 20px;
}

.cart-items {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.cart-item {
  display: grid;
  grid-template-columns: 80px 1fr auto auto;
  gap: 15px;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-image img {
  width: 80px;
  height: 80px;
  object-fit: cover;
}

.item-title {
  font-size: 16px;
  margin-bottom: 10px;
}

.item-title a {
  color: #333;
  text-decoration: none;
}

.item-price {
  display: flex;
  align-items: center;
}

.current-price {
  font-weight: bold;
  color: #d23c36;
  margin-right: 10px;
}

.original-price {
  font-size: 14px;
  text-decoration: line-through;
  color: #999;
}

.quantity-controls {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.quantity-controls button {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
  font-size: 16px;
  cursor: pointer;
}

.quantity-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-controls input {
  width: 50px;
  height: 30px;
  border: 1px solid #ddd;
  text-align: center;
  font-size: 14px;
  border-left: none;
  border-right: none;
}

.remove-btn {
  background: none;
  border: none;
  color: #d23c36;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
}

.item-total {
  font-weight: bold;
  font-size: 16px;
}

.cart-summary {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  align-self: start;
}

.cart-summary h3 {
  font-size: 18px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.summary-row.total {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #eee;
  font-weight: bold;
  font-size: 18px;
}

.checkout-btn {
  width: 100%;
  padding: 12px 20px;
  background-color: #d23c36;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 15px;
  transition: background-color 0.3s ease;
}

.checkout-btn:hover {
  background-color: #c0392b;
}

.continue-shopping {
  text-align: center;
}

.continue-shopping a {
  color: #333;
  text-decoration: underline;
}

.empty-cart {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 40px 20px;
  text-align: center;
}

.empty-cart-content img {
  width: 80px;
  height: 80px;
  opacity: 0.3;
  margin-bottom: 20px;
}

.empty-cart-content h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.empty-cart-content p {
  color: #777;
  margin-bottom: 30px;
}

.continue-shopping-btn {
  display: inline-block;
  padding: 12px 30px;
  background-color: #d23c36;
  color: white;
  border-radius: 5px;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.continue-shopping-btn:hover {
  background-color: #c0392b;
}

@media (max-width: 768px) {
  .cart-content {
    grid-template-columns: 1fr;
  }

  .cart-item {
    grid-template-columns: 80px 1fr;
    grid-template-areas:
      "image details"
      "image quantity"
      "total total";
    padding: 15px 0;
  }

  .item-image {
    grid-area: image;
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
    margin-top: 10px;
  }
}
</style>
