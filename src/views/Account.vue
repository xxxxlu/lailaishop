<template>
  <div class="account-page">
    <div class="container">
      <h1>Account</h1>
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
          <button type="submit" class="login-btn">Login</button>
        </form>
      </div>
      <div v-else>
        <p>Welcome, {{ username }}!</p>
        <button @click="logout" class="logout-btn">Logout</button>
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
.account-page {
  padding: 48px 0;
  text-align: center;
  background-color: #f3f4f6;
}

.container {
  max-width: 400px;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 28px;
  margin-bottom: 24px;
  color: #111827;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #374151;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: #f9fafb;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #3b82f6;
  outline: none;
}

.login-btn, .logout-btn {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-btn:hover, .logout-btn:hover {
  background-color: #2563eb;
}
</style>
