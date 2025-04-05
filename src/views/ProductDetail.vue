<template>
  <div class="product-detail">
    <div class="container">
      <div class="breadcrumbs">
        <router-link to="/">Home</router-link> /
        <router-link :to="`/products?category=${product.category}`">
          {{ categoryName }}
        </router-link> /
        <span>{{ product.name }}</span>
      </div>

      <div class="product-container" v-if="product">
        <div class="product-images">
          <div class="main-image">
            <img
              :src="product.image"
              :alt="product.name"
              @error="handleImageError"
            />
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
              <img src="https://ext.same-assets.com/3844190759/3347869897.png" alt="Delivery" />
              <span>Nationwide Delivery</span>
            </div>
            <div class="delivery-option">
              <img src="https://ext.same-assets.com/3844190759/2186242231.png" alt="Warranty" />
              <span>7 Days Replacement Warranty</span>
            </div>
            <div class="delivery-option">
              <img src="https://ext.same-assets.com/3844190759/478585328.png" alt="Customer Service" />
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
      return this.products.find(p => p.id === this.productId) || null
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
      // Fallback image if product image is not found
      e.target.src = 'https://ext.same-assets.com/3844190759/814572404.jpeg'
    }
  }
}
</script>

<style scoped>
.product-detail {
  margin-bottom: 40px;
}

.breadcrumbs {
  margin-bottom: 20px;
  color: #777;
  font-size: 14px;
}

.breadcrumbs a {
  color: #333;
  text-decoration: none;
}

.product-container {
  display: flex;
  gap: 30px;
  margin-bottom: 40px;
}

.product-images {
  flex: 0 0 40%;
}

.main-image {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.main-image img {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.product-info {
  flex: 1;
}

.product-title {
  font-size: 24px;
  margin-bottom: 15px;
}

.product-price {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.current-price {
  font-size: 24px;
  font-weight: bold;
  color: #d23c36;
  margin-right: 15px;
}

.original-price {
  font-size: 18px;
  text-decoration: line-through;
  color: #999;
  margin-right: 15px;
}

.discount {
  background-color: #d23c36;
  color: white;
  padding: 5px 10px;
  border-radius: 3px;
  font-size: 14px;
  font-weight: bold;
}

.stock-status {
  margin-bottom: 20px;
  font-weight: bold;
}

.in-stock {
  color: #4caf50;
}

.out-of-stock {
  color: #f44336;
}

.quantity-selector {
  margin-bottom: 20px;
}

.quantity-selector label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

.quantity-controls {
  display: flex;
  align-items: center;
  max-width: 150px;
}

.quantity-controls button {
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
  font-size: 18px;
  cursor: pointer;
}

.quantity-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-controls input {
  width: 70px;
  height: 40px;
  border: 1px solid #ddd;
  text-align: center;
  font-size: 16px;
  border-left: none;
  border-right: none;
}

.action-buttons {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
}

.add-to-cart-btn, .buy-now-btn {
  flex: 1;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.add-to-cart-btn {
  background-color: #fff;
  color: #d23c36;
  border: 2px solid #d23c36;
}

.buy-now-btn {
  background-color: #d23c36;
  color: #fff;
}

.add-to-cart-btn:hover {
  background-color: #f9f9f9;
}

.buy-now-btn:hover {
  background-color: #c0392b;
}

.add-to-cart-btn:disabled, .buy-now-btn:disabled {
  background-color: #ddd;
  color: #999;
  border-color: #ddd;
  cursor: not-allowed;
}

.product-details {
  margin-bottom: 30px;
}

.product-details h3 {
  font-size: 18px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.delivery-info {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
}

.delivery-option {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.delivery-option img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.related-products {
  margin-top: 40px;
}

.section-title {
  font-size: 24px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #d23c36;
}

.related-products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.loading {
  text-align: center;
  padding: 50px;
  font-size: 18px;
  color: #666;
}

@media (max-width: 992px) {
  .related-products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .product-container {
    flex-direction: column;
  }

  .product-images {
    flex: 0 0 100%;
  }

  .related-products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .related-products-grid {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    flex-direction: column;
  }
}
</style>
