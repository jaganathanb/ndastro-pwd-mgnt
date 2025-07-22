<template>
  <div class="reset-success-view">
    <h2>Password Reset Successful</h2>
    <p>Your password has been reset. You may now close this tab or window.</p>
  </div>
</template>

<style scoped>
.reset-success-view {
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
}
@media (prefers-color-scheme: dark) {
  .reset-success-view {
    --background-color: #181818;
    --text-color: #eee;
    --border-color: #333;
  }
}
</style>
