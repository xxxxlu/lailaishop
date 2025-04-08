<template>
  <div class="contact-page">
    <div class="contact-bg">
      <div class="tech-dots"></div>
      <div class="tech-circle tech-circle-left"></div>
      <div class="tech-circle tech-circle-right"></div>
    </div>
    <div class="tech-grid"></div>

    <div class="container">
      <div class="page-header">
        <h1><span class="highlight">Contact</span> Us</h1>
        <div class="breadcrumbs">
          <router-link to="/">Home</router-link>
          <span class="breadcrumb-separator">›</span>
          <span>Contact Us</span>
        </div>
      </div>

      <div class="contact-content">
        <div class="contact-info">
          <div class="section-header">
            <h2>Get in Touch</h2>
            <div class="tech-line"></div>
          </div>
          <p>We're here to help and answer any question you might have. We look forward to hearing from you.</p>
          <div class="info-item">
            <div class="info">
              <h3>Email</h3>
              <p>abcdshop@aontec.club</p>
              <p>We'll respond as soon as possible</p>
            </div>
          </div>

          <div class="info-item">
            <div class="info">
              <h3>Address</h3>
              <p>Symbios.pk Headquarters</p>
              <p>Karachi, Pakistan</p>
            </div>
          </div>

          <div class="social-media">
            <h3>Follow Us</h3>
            <div class="social-icons">
              <a href="#" class="social-icon">
                <img src="https://ext.same-assets.com/3844190759/4083373414.png" alt="Facebook" />
              </a>
              <a href="#" class="social-icon">
                <img src="https://ext.same-assets.com/3844190759/4083373414.png" alt="Twitter" />
              </a>
              <a href="#" class="social-icon">
                <img src="https://ext.same-assets.com/3844190759/4083373414.png" alt="Instagram" />
              </a>
            </div>
          </div>
        </div>

        <div class="contact-form">
          <div class="section-header">
            <h2>Send Us a Message</h2>
            <div class="tech-line"></div>
          </div>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="name">Full Name *</label>
              <input type="text" id="name" v-model="form.name" required />
            </div>

            <div class="form-group">
              <label for="email">Email *</label>
              <input type="email" id="email" v-model="form.email" required />
            </div>

            <div class="form-group">
              <label for="phone">Phone Number</label>
              <input type="tel" id="phone" v-model="form.phone" />
            </div>

            <div class="form-group">
              <label for="subject">Subject *</label>
              <input type="text" id="subject" v-model="form.subject" required />
            </div>

            <div class="form-group">
              <label for="message">Message *</label>
              <textarea id="message" v-model="form.message" rows="5" required></textarea>
            </div>

            <button type="submit" class="submit-btn">
              <span>Send Message</span>
              <div class="btn-shine"></div>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      }
    }
  },
  methods: {
    submitForm() {
      // In a real app, you would send this data to your server
      alert('Thank you for your message! We will get back to you soon.')

      // Reset form
      this.form = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700&display=swap');

.contact-page {
  padding: 60px 0;
  position: relative;
  min-height: 80vh;
  color: #f3f4f6;
}

.contact-bg {
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

.page-header {
  text-align: center;
  margin-bottom: 48px;
}

.page-header h1 {
  font-family: 'Orbitron', sans-serif;
  font-size: 36px;
  font-weight: 700;
  color: #f3f4f6;
  margin-bottom: 16px;
  letter-spacing: 1px;
}

.highlight {
  color: #22c55e;
  position: relative;
}

.breadcrumbs {
  color: #9ca3af;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.breadcrumbs a {
  color: #d1d5db;
  text-decoration: none;
  transition: color 0.2s ease;
  font-weight: 500;
}

.breadcrumbs a:hover {
  color: #22c55e;
}

.breadcrumb-separator {
  color: #4b5563;
}

.section-header {
  margin-bottom: 24px;
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

.tech-line {
  height: 1px;
  width: 100%;
  background: linear-gradient(90deg, rgba(34, 197, 94, 0.2), transparent);
  position: relative;
  margin-top: 4px;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 48px;
  max-width: 1200px;
  margin: 0 auto;
}

.contact-info, .contact-form {
  background-color: rgba(17, 24, 39, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(34, 197, 94, 0.1);
  padding: 32px;
  position: relative;
  overflow: hidden;
}

.contact-info::before, .contact-form::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(34, 197, 94, 0.05) 0%, transparent 70%);
  z-index: 0;
}

.contact-info > p {
  margin-bottom: 32px;
  color: #d1d5db;
  line-height: 1.6;
  font-size: 16px;
  position: relative;
  z-index: 1;
}

.info-item {
  display: flex;
  margin-bottom: 28px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(34, 197, 94, 0.08);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.info-item:hover {
  transform: translateY(-3px);
  background-color: rgba(255, 255, 255, 0.05);
  border-color: rgba(34, 197, 94, 0.15);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.info {
  flex: 1;
}

.info h3 {
  font-family: 'Orbitron', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #22c55e;
  margin-bottom: 12px;
  letter-spacing: 0.5px;
}

.info p {
  color: #d1d5db;
  margin-bottom: 6px;
  font-size: 15px;
}

.social-media {
  margin-top: 40px;
  position: relative;
  z-index: 1;
}

.social-media h3 {
  font-family: 'Orbitron', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #f3f4f6;
  margin-bottom: 20px;
  letter-spacing: 0.5px;
}

.social-icons {
  display: flex;
  gap: 16px;
}

.social-icon {
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(34, 197, 94, 0.1);
  position: relative;
  overflow: hidden;
}

.social-icon::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.2), transparent);
  transition: 0.5s;
}

.social-icon:hover {
  background-color: rgba(34, 197, 94, 0.1);
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 8px 16px rgba(34, 197, 94, 0.15);
}

.social-icon:hover::before {
  left: 100%;
}

.social-icon:hover img {
  filter: brightness(0) invert(1);
}

.social-icon img {
  width: 20px;
  height: 20px;
  transition: all 0.3s ease;
}

.form-group {
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #d1d5db;
  font-size: 15px;
  letter-spacing: 0.3px;
}

.form-group input, .form-group textarea {
  width: 100%;
  padding: 12px 16px;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(34, 197, 94, 0.1);
  border-radius: 8px;
  font-size: 15px;
  color: #f3f4f6;
  transition: all 0.3s ease;
}

.form-group input:focus, .form-group textarea:focus {
  outline: none;
  border-color: rgba(34, 197, 94, 0.4);
  background-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
  line-height: 1.5;
}

.submit-btn {
  position: relative;
  background-color: #22c55e;
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  overflow: hidden;
}

.submit-btn:hover {
  background-color: #16a34a;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(34, 197, 94, 0.2);
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

.submit-btn:hover .btn-shine {
  left: 100%;
}

@media (max-width: 992px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 0 24px;
  }
}

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 32px;
  }

  .contact-info, .contact-form {
    padding: 24px;
  }
  
  .social-icons {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .contact-page {
    padding: 32px 0;
  }

  .page-header {
    margin-bottom: 32px;
  }

  .page-header h1 {
    font-size: 28px;
  }

  .info-item {
    padding: 16px;
  }

  .form-group input, .form-group textarea {
    font-size: 14px;
  }

  .submit-btn {
    padding: 12px 24px;
    font-size: 15px;
  }
  
  .section-header h2 {
    font-size: 20px;
  }
  
  .info h3 {
    font-size: 16px;
  }
}
</style>
