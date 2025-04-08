<template>
  <div id="app">
    <div class="tech-background">
      <div class="tech-grid"></div>
      <div class="tech-circle tech-circle-1"></div>
      <div class="tech-circle tech-circle-2"></div>
    </div>
    
    <header>
      <div class="header-top">
        <div class="container">
          <div class="logo">
            <router-link to="/">
              <span class="logo-text"><span class="highlight">Laila</span>Shop</span>
            </router-link>
          </div>
          <nav class="main-nav">
            <ul class="nav-items">
              <li><router-link to="/">Home</router-link></li>
              <li><router-link to="/products">Products</router-link></li>
              <li><router-link to="/contact">Contact</router-link></li>
            </ul>
          </nav>
          <div class="header-actions">
            <div class="account">
              <router-link v-if="username" class="welcome-text" to="/account">  Welcome, {{ username }}!</router-link>
              <router-link v-else to="/account" class="account-btn">
                <span class="account-icon">👤</span>
                <span class="account-text">Account</span>
              </router-link>
            </div>
            <div class="cart">
              <router-link to="/cart" class="cart-btn">
                <span class="cart-icon">🛒</span>
                <span class="cart-count" v-if="cartCount > 0">{{ cartCount }}</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main>
      <router-view />
    </main>

    <footer>
      <div class="footer-tech-overlay"></div>
      <div class="tech-circle footer-circle-left"></div>
      <div class="tech-circle footer-circle-right"></div>
      
      <div class="container">
        <div class="footer-top">
          <div class="footer-logo">
            <span class="logo-text"><span class="highlight">Laila</span>Shop</span>
            <p class="footer-slogan">Tech-Driven Shopping Experience</p>
          </div>
          
          <div class="footer-newsletter">
            <h3>Stay Connected</h3>
            <p>Subscribe to receive updates on new products and exclusive offers</p>
            <div class="newsletter-form">
              <input type="email" placeholder="Your email address" />
              <button class="subscribe-btn">Subscribe</button>
            </div>
          </div>
        </div>
        
        <div class="footer-columns">
          <div class="footer-column">
            <h3>Customer Service</h3>
            <ul>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Shipping Information</a></li>
              <li><a href="#">Returns & Exchanges</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h3>Information</h3>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Site Map</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h3>Contact Info</h3>
            <ul class="contact-info">
              <li><span class="contact-icon">✉️</span> <a href="mailto:abcshop@zontec.club">abcshop@zontec.club</a></li>
              <li><span class="contact-icon">📍</span> 123 Tech Street, Innovation City</li>
            </ul>
          </div>
          <div class="footer-column">
            <h3>Payment Methods</h3>
            <div class="payment-icons">
              <img src="./assets/easypaisa.png" alt="Payment easypaisa" />
              <img src="./assets/Frame.png" alt="Payment Frame" />
            </div>
            <div class="social-icons">
              <a href="#" class="social-icon">📘</a>
              <a href="#" class="social-icon">📸</a>
              <a href="#" class="social-icon">🐦</a>
              <a href="#" class="social-icon">📱</a>
            </div>
          </div>
        </div>
        
        <div class="copyright">
          <div class="tech-line"></div>
          <p>
            Copyright © 2025 | Powered by Data Network Solutions (SMC-Private) Limited
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      username: localStorage.getItem('username') || ''
    }
  },
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
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
  color: #f3f4f6;
  background-color: #030712;
  overflow-x: hidden;
}

#app {
  position: relative;
  min-height: 100vh;
}

/* Tech Background Elements */
.tech-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  overflow: hidden;
}

.tech-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(34, 197, 94, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(34, 197, 94, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.2;
}

.tech-circle {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0) 70%);
  z-index: -1;
}

.tech-circle-1 {
  top: 10%;
  right: -200px;
  width: 600px;
  height: 600px;
  opacity: 0.3;
}

.tech-circle-2 {
  bottom: 5%;
  left: -300px;
  width: 800px;
  height: 800px;
  opacity: 0.2;
}

.tech-line {
  height: 3px;
  width: 60px;
  background: linear-gradient(90deg, #22c55e, rgba(34, 197, 94, 0.2));
  margin: 0 auto 16px;
  border-radius: 4px;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 1;
}

a {
  text-decoration: none;
  color: #f3f4f6;
  transition: all 0.3s ease;
}

ul {
  list-style: none;
}

.highlight {
  position: relative;
  color: #22c55e;
  display: inline-block;
}

.highlight::after {
  content: '';
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  height: 6px;
  background: linear-gradient(90deg, rgba(34, 197, 94, 0.7), rgba(34, 197, 94, 0));
  border-radius: 3px;
  z-index: -1;
}

/* Header Styles */
header {
  background-color: rgba(3, 7, 18, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(34, 197, 94, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-top {
  padding: 16px 0;
}

.header-top .container {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 30px;
  align-items: center;
}

.logo-text {
  font-family: 'Orbitron', sans-serif;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  background: linear-gradient(90deg, #f3f4f6 0%, #9ca3af 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  padding-right: 5px;
}

.logo-text::after {
  content: '';
  position: absolute;
  width: 6px;
  height: 6px;
  background-color: #22c55e;
  border-radius: 50%;
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  box-shadow: 0 0 10px #22c55e;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.search-box {
  position: relative;
  width: 220px;
}

.search-box input {
  width: 100%;
  padding: 8px 36px 8px 12px;
  background-color: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 6px;
  color: #f3f4f6;
  font-size: 14px;
  transition: all 0.3s ease;
}

.search-box input:focus {
  outline: none;
  border-color: #22c55e;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.1);
}

.search-box input::placeholder {
  color: #9ca3af;
}

.search-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  font-size: 16px;
  transition: color 0.3s ease;
}

.search-btn:hover {
  color: #22c55e;
}

.account-btn, .cart-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(34, 197, 94, 0.15);
  color: #f3f4f6;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.account-btn::before, .cart-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.1), transparent);
  transition: 0.5s;
}

.account-btn:hover::before, .cart-btn:hover::before {
  left: 100%;
}

.account-btn:hover, .cart-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: #22c55e;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.15);
}

.account-icon, .cart-icon {
  font-size: 18px;
}

.account-text {
  font-size: 14px;
  font-weight: 500;
}

.welcome-text {
  color: #22c55e;
  font-size: 14px;
  font-weight: 500;
}

.cart-btn {
  padding: 8px 10px;
}

.cart-count {
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: #22c55e;
  color: white;
  border-radius: 20px;
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  padding: 0 6px;
  box-shadow: 0 0 6px rgba(34, 197, 94, 0.5);
}

/* Navigation Styles */
.main-nav {
  display: flex;
  padding: 0;
}

.nav-items {
  display: flex;
  gap: 32px;
}

.nav-items a {
  color: #9ca3af;
  font-weight: 500;
  position: relative;
  padding: 6px 0;
  font-size: 15px;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.nav-items a:hover {
  color: #22c55e;
  text-shadow: 0 0 8px rgba(34, 197, 94, 0.3);
}

.nav-items a::before {
  content: '';
  position: absolute;
  top: 0;
  left: -10px;
  width: 6px;
  height: 6px;
  background-color: transparent;
  border-radius: 50%;
  transition: all 0.3s ease;
  opacity: 0;
}

.nav-items a:hover::before {
  background-color: #22c55e;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.5);
  opacity: 1;
}

.nav-items a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #22c55e, rgba(34, 197, 94, 0.2));
  transition: width 0.3s ease;
}

.nav-items a:hover::after {
  width: 100%;
}

.nav-items a.router-link-active {
  color: #22c55e;
  font-weight: 600;
}

.nav-items a.router-link-active::before {
  background-color: #22c55e;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.5);
  opacity: 1;
}

.nav-items a.router-link-active::after {
  width: 100%;
}

/* Main Content Styles */
main {
  min-height: 600px;
  padding: 40px 0;
  position: relative;
  z-index: 1;
}

/* Footer Styles */
footer {
  background-color: rgba(3, 7, 18, 0.95);
  color: #9ca3af;
  padding: 60px 0 30px;
  position: relative;
  border-top: 1px solid rgba(34, 197, 94, 0.1);
  overflow: hidden;
}

.footer-tech-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(34, 197, 94, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(34, 197, 94, 0.03) 0%, transparent 40%);
  z-index: 0;
}

.footer-circle-left {
  top: -300px;
  left: -200px;
  width: 500px;
  height: 500px;
  opacity: 0.2;
}

.footer-circle-right {
  bottom: -200px;
  right: -100px;
  width: 400px;
  height: 400px;
  opacity: 0.15;
}

.footer-top {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 40px;
  position: relative;
  z-index: 2;
}

.footer-logo {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-slogan {
  color: #9ca3af;
  font-size: 15px;
  max-width: 280px;
  margin-top: 10px;
}

.footer-newsletter h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #f3f4f6;
}

.footer-newsletter p {
  margin-bottom: 20px;
  font-size: 15px;
  max-width: 400px;
}

.newsletter-form {
  display: flex;
  gap: 10px;
}

.newsletter-form input {
  flex: 1;
  padding: 12px 16px;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(34, 197, 94, 0.15);
  border-radius: 6px;
  color: #f3f4f6;
  font-size: 14px;
}

.newsletter-form input:focus {
  outline: none;
  border-color: #22c55e;
  background-color: rgba(255, 255, 255, 0.1);
}

.subscribe-btn {
  padding: 0 20px;
  background-color: #22c55e;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.subscribe-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: 0.5s;
}

.subscribe-btn:hover::before {
  left: 100%;
}

.subscribe-btn:hover {
  background-color: #16a34a;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.25);
}

.footer-columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  margin-bottom: 50px;
  position: relative;
  z-index: 2;
}

.footer-column h3 {
  font-family: 'Orbitron', sans-serif;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 20px;
  color: #f3f4f6;
  position: relative;
  display: inline-block;
}

.footer-column h3::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 30px;
  height: 2px;
  background: linear-gradient(90deg, #22c55e, rgba(34, 197, 94, 0.1));
  border-radius: 1px;
}

.footer-column ul li {
  margin-bottom: 14px;
}

.footer-column ul li a {
  color: #9ca3af;
  font-size: 14px;
  transition: all 0.3s ease;
  position: relative;
  padding-left: 0;
  display: inline-block;
}

.footer-column ul li a:hover {
  color: #22c55e;
  transform: translateX(5px);
}

.footer-column ul li a::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 0;
  height: 1px;
  background-color: #22c55e;
  transition: all 0.3s ease;
  transform: translateY(-50%);
  opacity: 0;
}

.footer-column ul li a:hover::before {
  width: 0;
  opacity: 1;
}

.contact-info li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.contact-icon {
  margin-top: 3px;
  opacity: 0.8;
}

.payment-icons {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 20px;
}

.payment-icons img {
  height: 32px;
  opacity: 0.7;
  transition: all 0.3s ease;
  filter: grayscale(100%);
}

.payment-icons img:hover {
  opacity: 1;
  filter: grayscale(0%);
  transform: translateY(-3px);
}

.social-icons {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.social-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(34, 197, 94, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: all 0.3s ease;
}

.social-icon:hover {
  background-color: rgba(34, 197, 94, 0.2);
  border-color: #22c55e;
  transform: translateY(-3px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.copyright {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  color: #6b7280;
  font-size: 14px;
  position: relative;
  z-index: 2;
}

@media (max-width: 1024px) {
  .header-top .container {
    grid-template-columns: auto 1fr;
  }
  
  .main-nav {
    display: none;
  }
  
  .footer-top {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

@media (max-width: 768px) {
  .header-top .container {
    grid-template-columns: 1fr;
    gap: 20px;
    text-align: center;
  }

  .header-actions {
    flex-direction: column;
    gap: 15px;
    align-items: center;
  }
  
  .search-box {
    width: 100%;
    max-width: 300px;
  }

  .newsletter-form {
    flex-direction: column;
  }
  
  .subscribe-btn {
    width: 100%;
    padding: 12px 0;
  }

  .footer-columns {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
}

@media (max-width: 480px) {
  .footer-columns {
    grid-template-columns: 1fr;
  }

  .payment-icons,
  .social-icons {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
