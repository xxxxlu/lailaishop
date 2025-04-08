<template>
  <div class="product-card">
    <div class="product-image">
      <img
        :src="product.image"
        :alt="product.name"
        @error="handleImageError"
      />
      <div class="discount" v-if="discountPercentage > 0">
        {{ discountPercentage }}% OFF
      </div>
    </div>
    <div class="product-details">
      <h3 class="product-title">
        <router-link :to="`/product/${product.id}`">{{ product.name }}</router-link>
      </h3>
      <div class="product-price">
        <span class="current-price">Rs. {{ formatPrice(product.price) }}</span>
        <span class="original-price" v-if="product.originalPrice > product.price">
          Rs. {{ formatPrice(product.originalPrice) }}
        </span>
      </div>
      <button
        class="add-to-cart-btn"
        @click="addToCart"
        :disabled="product.stock <= 0"
      >
        {{ product.stock > 0 ? 'ORDER NOW' : 'OUT OF STOCK' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    discountPercentage() {
      if (this.product.originalPrice > this.product.price) {
        return Math.round(
          ((this.product.originalPrice - this.product.price) / this.product.originalPrice) * 100
        )
      }
      return 0
    }
  },
  methods: {
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    addToCart() {
      this.$store.commit('addToCart', this.product)
    },
    handleImageError(e) {
      // Fallback image if product image is not found
      e.target.src = 'https://ext.same-assets.com/3844190759/814572404.jpeg'
    }
  }
}
</script>

<style scoped>
.product-card {
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.discount {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #3b82f6;
  color: white;
  padding: 5px 10px;
  border-radius: 3px;
  font-size: 12px;
  font-weight: bold;
}

.product-details {
  padding: 15px;
}

.product-title {
  font-size: 16px;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 44px;
}

.product-title a {
  color: #333;
  text-decoration: none;
}

.product-price {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.current-price {
  font-size: 18px;
  font-weight: bold;
  color: #3b82f6;
  margin-right: 10px;
}

.original-price {
  font-size: 14px;
  text-decoration: line-through;
  color: #999;
}

.add-to-cart-btn {
  width: 100%;
  padding: 8px 15px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.add-to-cart-btn:hover {
  background-color: #0d449b;
}

.add-to-cart-btn:disabled {
  background-color: #999;
  cursor: not-allowed;
}
</style>
