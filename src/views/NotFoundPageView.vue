<template>
  <div class="not-found-view">
    <h2>404 - Page Not Found</h2>
    <p>The page you are looking for does not exist.</p>
    <router-link to="/">Go to Home</router-link>
  </div>
</template>

<script setup lang="ts">
// No script needed for static not found view
</script>

<style scoped>
.not-found-view {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid var(--border-color, #ccc);
  border-radius: 8px;
  background: var(--background-color, #fff);
  color: var(--text-color, #222);
  text-align: center;
}
h2 {
  margin-bottom: 1rem;
}
p {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}
@media (prefers-color-scheme: dark) {
  .not-found-view {
    --background-color: #181818;
    --text-color: #eee;
    --border-color: #333;
  }
}
</style>
