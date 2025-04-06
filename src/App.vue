<template>
  <div id="app">
    <header>
      <div class="header-top">
        <div class="container">
          <div class="logo">
            <router-link to="/">
              <img src="./assets/Tekcrate.png" alt="Tekcrate" />
            </router-link>
          </div>
          <div class="search-box">
            <input type="text" placeholder="Search" />
            <button><i class="fa fa-search"></i></button>
          </div>
          <div class="header-actions">
            <div class="account">
              <router-link to="/account">My Account</router-link>
            </div>
            <div class="cart">
              <router-link to="/cart">
                <span class="cart-icon">
                  <img src="https://ext.same-assets.com/3844190759/4083373414.png" alt="Cart" />
                  <span class="cart-count">{{ cartCount }}</span>
                </span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <nav class="main-nav">
        <div class="container">
          <ul class="nav-items">
            <li>
              <router-link to="/contact">Contact Us</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </header>

    <main>
      <router-view />
    </main>

    <footer>
      <div class="container">
        <div class="footer-columns">
          <div class="footer-column">
            <h3>CUSTOMER SERVICE</h3>
            <ul>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h3>PAYMENT METHOD</h3>
            <div class="payment-icons">
              <img src="./assets/easypaisa.png" alt="Payment easypaisa" />
              <img src="./assets/Frame.png" alt="Payment Frame" />
            </div>
          </div>
        </div>
        <div class="copyright">
          <p>
            Copyright © 2025 | Powered by Data Network Solutions.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState(['categories']),
    ...mapGetters(['cartCount'])
  },
  created() {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f5f5f5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

a {
  text-decoration: none;
  color: #333;
}

ul {
  list-style: none;
}

/* Header Styles */
header {
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.header-top {
  padding: 15px 0;
  display: flex;
  align-items: center;
}

.header-top .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.logo img {
  height: 60px;
}

.search-box {
  display: flex;
  max-width: 400px;
  width: 100%;
}

.search-box input {
  flex-grow: 1;
  padding: 8px 15px;
  border: 1px solid #ccc;
  border-right: none;
  border-radius: 3px 0 0 3px;
}

.search-box button {
  padding: 8px 15px;
  background-color: #d23c36;
  color: white;
  border: none;
  border-radius: 0 3px 3px 0;
  cursor: pointer;
}

.header-actions {
  display: flex;
  align-items: center;
}

.account, .cart {
  margin-left: 20px;
}

.cart-icon {
  position: relative;
}

.cart-icon img {
  height: 25px;
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #d23c36;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

/* Navigation Styles */
.main-nav {
  background-color: #d23c36;
  padding: 10px 0;
}

.nav-items {
  display: flex;
}

.nav-items li {
  margin-right: 20px;
}

.nav-items a {
  color: white;
  font-weight: 600;
}

/* Main Content Styles */
main {
  min-height: 500px;
  padding: 20px 0;
}

/* Footer Styles */
footer {
  background-color: #333;
  color: #fff;
  padding: 40px 0 20px;
}

.footer-columns {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 30px;
}

.footer-column {
  flex: 1;
  margin-bottom: 20px;
  min-width: 200px;
}

.footer-column h3 {
  font-size: 16px;
  margin-bottom: 15px;
  color: #fff;
}

.footer-column ul li {
  margin-bottom: 8px;
}

.footer-column ul li a {
  color: #ccc;
  transition: color 0.3s ease;
}

.footer-column ul li a:hover {
  color: #fff;
}

.payment-icons img {
  max-width: 100%;
  height: 100px;
}

.copyright {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #444;
  color: #ccc;
  font-size: 14px;
}

@media (max-width: 768px) {
  .header-top {
    flex-direction: column;
  }

  .search-box {
    margin: 15px 0;
    max-width: 100%;
  }

  .nav-items {
    flex-wrap: wrap;
  }

  .nav-items li {
    margin-bottom: 5px;
  }

  .footer-column {
    flex: 0 0 50%;
  }
}

@media (max-width: 480px) {
  .footer-column {
    flex: 0 0 100%;
  }
}
</style>
