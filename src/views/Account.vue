<template>
  <div class="account-page">
    <div class="account-bg">
      <div class="tech-dots"></div>
      <div class="tech-circle tech-circle-left"></div>
      <div class="tech-circle tech-circle-right"></div>
    </div>
    <div class="tech-grid"></div>
    
    <div class="container">
      <h1><span class="highlight">My</span> Account</h1>
      <div v-if="!isLoggedIn">
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="username" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" required />
          </div>
          <button type="submit" class="login-btn">
            <span>Login</span>
            <div class="btn-shine"></div>
          </button>
        </form>
      </div>
      <div v-else>
        <p>Welcome, {{ username }}!</p>
        <button @click="logout" class="logout-btn">
          <span>Logout</span>
          <div class="btn-shine"></div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Account',
  data() {
    return {
      username: localStorage.getItem('username') || '',
      password: '',
      isLoggedIn: !!localStorage.getItem('username')
    }
  },
  methods: {
    login() {
      localStorage.setItem('username', this.username)
      this.isLoggedIn = true
      
      // 跳转到首页
      this.$router.push('/')
      
      // 刷新页面以更新顶部导航栏中的用户名显示
      setTimeout(() => {
        window.location.reload()
      }, 100)
    },
    logout() {
      localStorage.removeItem('username')
      this.username = ''
      this.password = ''
      this.isLoggedIn = false
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700&display=swap');

.account-page {
  padding: 60px 0;
  text-align: center;
  position: relative;
  min-height: 80vh;
  color: #f3f4f6;
}

.account-bg {
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

.container {
  max-width: 400px;
  margin: 0 auto;
  background-color: rgba(17, 24, 39, 0.4);
  backdrop-filter: blur(10px);
  padding: 32px;
  border-radius: 16px;
  border: 1px solid rgba(34, 197, 94, 0.1);
  position: relative;
  overflow: hidden;
}

.container::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(34, 197, 94, 0.05) 0%, transparent 70%);
  z-index: 0;
}

h1 {
  font-family: 'Orbitron', sans-serif;
  font-size: 28px;
  margin-bottom: 28px;
  color: #f3f4f6;
  letter-spacing: 1px;
  position: relative;
  z-index: 1;
}

.highlight {
  color: #22c55e;
  position: relative;
}

.form-group {
  margin-bottom: 24px;
  text-align: left;
  position: relative;
  z-index: 1;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: 500;
  color: #d1d5db;
  font-size: 15px;
  letter-spacing: 0.3px;
}

input {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(34, 197, 94, 0.1);
  border-radius: 8px;
  color: #f3f4f6;
  transition: all 0.3s ease;
}

input:focus {
  border-color: rgba(34, 197, 94, 0.4);
  outline: none;
  background-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
}

.login-btn, .logout-btn {
  position: relative;
  width: 100%;
  padding: 14px;
  font-size: 16px;
  background-color: #22c55e;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  margin-top: 10px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.login-btn:hover, .logout-btn:hover {
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

.login-btn:hover .btn-shine, .logout-btn:hover .btn-shine {
  left: 100%;
}
</style>
