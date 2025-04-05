<template>
  <div class="contact-page">
    <div class="container">
      <div class="page-header">
        <h1>Contact Us</h1>
        <div class="breadcrumbs">
          <router-link to="/">Home</router-link> /
          <span>Contact Us</span>
        </div>
      </div>

      <div class="contact-content">
        <div class="contact-info">
          <h2>Get in Touch</h2>
          <p>We're here to help and answer any question you might have. We look forward to hearing from you.</p>

          <div class="info-item">
            <div class="icon">
              <img src="https://ext.same-assets.com/3844190759/478585328.png" alt="Phone" />
            </div>
            <div class="info">
              <h3>Phone</h3>
              <p>0311-1444717</p>
              <p>Monday to Saturday, 9am to 6pm</p>
            </div>
          </div>

          <div class="info-item">
            <div class="icon">
              <img src="https://ext.same-assets.com/3844190759/2186242231.png" alt="Email" />
            </div>
            <div class="info">
              <h3>Email</h3>
              <p>support@symbios.pk</p>
              <p>We'll respond as soon as possible</p>
            </div>
          </div>

          <div class="info-item">
            <div class="icon">
              <img src="https://ext.same-assets.com/3844190759/3347869897.png" alt="Location" />
            </div>
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
          <h2>Send Us a Message</h2>
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

            <button type="submit" class="submit-btn">Send Message</button>
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
.contact-page {
  margin-bottom: 40px;
}

.page-header {
  margin-bottom: 30px;
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

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.contact-info, .contact-form {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 30px;
}

.contact-info h2, .contact-form h2 {
  font-size: 24px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.contact-info > p {
  margin-bottom: 30px;
  color: #666;
  line-height: 1.6;
}

.info-item {
  display: flex;
  margin-bottom: 25px;
}

.icon {
  width: 40px;
  height: 40px;
  background-color: #f5f5f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
}

.icon img {
  width: 20px;
  height: 20px;
}

.info h3 {
  font-size: 18px;
  margin-bottom: 5px;
  color: #333;
}

.info p {
  color: #666;
  margin-bottom: 5px;
}

.social-media {
  margin-top: 30px;
}

.social-media h3 {
  font-size: 18px;
  margin-bottom: 15px;
}

.social-icons {
  display: flex;
}

.social-icon {
  width: 40px;
  height: 40px;
  background-color: #f5f5f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  transition: background-color 0.3s;
}

.social-icon:hover {
  background-color: #e8e8e8;
}

.social-icon img {
  width: 20px;
  height: 20px;
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

.submit-btn {
  background-color: #d23c36;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #c0392b;
}

@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
  }

  .contact-form {
    order: -1;
  }
}
</style>
