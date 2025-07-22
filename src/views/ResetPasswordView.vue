<template>
  <div class="reset-password-view">
    <h2>Reset Password</h2>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="password">New password</label>
        <input type="password" id="password" v-model="password" required />
        <div v-if="passwordValidationMsg" class="error">{{ passwordValidationMsg }}</div>
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm new password</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required />
        <div v-if="confirmPasswordMsg" class="error">{{ confirmPasswordMsg }}</div>
      </div>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="success" class="success">{{ success }}</div>
      <div class="button-row">
        <button
          type="submit"
          :disabled="
            loading ||
            Boolean(passwordValidationMsg) ||
            Boolean(confirmPasswordMsg) ||
            Boolean(error)
          "
          class="btn-spinner-wrapper"
        >
          <span class="btn-text">Reset password</span>
          <span v-if="loading" class="spinner btn-spinner"></span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const success = ref('')
const loading = ref(false)
const token = ref('')

// passwordPattern regex is not needed, validation is handled in computed property

const passwordValidationMsg = computed(() => {
  if (!password.value) return ''
  if (password.value.length < 8) return 'Password must be at least 8 characters.'
  if (!/[A-Z]/.test(password.value)) return 'Password must contain at least 1 uppercase letter.'
  if (!/[a-z]/.test(password.value)) return 'Password must contain at least 1 lowercase letter.'
  if (!/\d/.test(password.value)) return 'Password must contain at least 1 number.'
  if (!/[^A-Za-z\d]/.test(password.value))
    return 'Password must contain at least 1 special character.'
  return ''
})

const confirmPasswordMsg = computed(() => {
  if (!confirmPassword.value) return ''
  if (password.value !== confirmPassword.value) return 'Passwords do not match.'
  return ''
})

onMounted(() => {
  token.value = (route.query.token as string) || ''
  if (!token.value) {
    error.value = 'Invalid or missing token.'
  }
})

watch(password, () => {
  if (error.value && passwordValidationMsg.value) {
    error.value = ''
  }
})
watch(confirmPassword, () => {
  if (error.value && confirmPasswordMsg.value) {
    error.value = ''
  }
})

async function onSubmit() {
  error.value = ''
  success.value = ''
  if (!token.value) {
    error.value = 'Invalid or missing token.'
    return
  }

  loading.value = true
  try {
    const apiUrl = import.meta.env.VITE_API_URL || ''
    const response = await fetch(`${apiUrl}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: token.value, new_password: password.value }),
    })
    const data = await response.json()
    if (response.ok) {
      await router.push({ name: 'PasswordResetSuccess', params: { ok: 'ok' } })
    } else {
      error.value = data.message || 'Failed to reset password.'
    }
  } catch {
    error.value = 'Network error. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Theme-aware styles using CSS variables */
.btn-spinner-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.btn-text {
  opacity: 1;
}
.btn-spinner {
  position: absolute;
  left: 50%;
  top: 25%;
  transform: translate(-50%, -50%);
  z-index: 2;
}
.spinner {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px solid var(--button-text-color, #fff);
  border-top: 2px solid var(--primary-color, #1976d2);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.reset-password-view {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid var(--border-color, #ccc);
  border-radius: 8px;
  background: var(--background-color, #fff);
  color: var(--text-color, #222);
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1.25rem;
}
.form-group label {
  font-weight: 500;
  margin-bottom: 0.25rem;
}
.form-group input {
  padding: 0.5rem;
  border: 1px solid var(--border-color, #ccc);
  border-radius: 4px;
  font-size: 1rem;
  background: var(--input-bg, #f9f9f9);
  color: var(--text-color, #222);
}
.error {
  color: var(--error-color, #d32f2f);
  font-size: 0.95rem;
  margin-top: 0.15rem;
  margin-bottom: 0.5rem;
}
.success {
  color: var(--success-color, #388e3c);
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}
.button-row {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
}
button {
  padding: 0.5rem 1.5rem;
  background: var(--primary-color, #1976d2);
  color: var(--button-text-color, #fff);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background 0.2s;
}
button:disabled {
  background: var(--button-disabled-bg, #90caf9);
  cursor: not-allowed;
}
@media (prefers-color-scheme: dark) {
  .reset-password-view {
    --background-color: #181818;
    --text-color: #eee;
    --border-color: #333;
  }
  .form-group input {
    --input-bg: #222;
  }
  .error {
    --error-color: #ff6f6f;
  }
  .success {
    --success-color: #80e27e;
  }
  button {
    --primary-color: #90caf9;
    --button-text-color: #222;
    --button-disabled-bg: #333;
  }
}
</style>
