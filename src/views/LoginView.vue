<template>
  <div>
    <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:12px">
      <button @click="login">Login (anonymous)</button>
      <button @click="me">Me</button>
      <button @click="logout">Logout</button>
    </div>
    <pre style="background:#f9f9f9; padding:12px; border-radius:8px; max-height:50vh; overflow:auto">{{ out }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const out = ref<string>('{}');

async function call(path: string, init?: RequestInit) {
  const r = await fetch(path, init);
  const t = await r.text();
  try { return JSON.parse(t); } catch { return { raw: t }; }
}

async function login() {
  out.value = JSON.stringify(await call('/api/connect.json', { method: 'POST' }), null, 2);
}
async function me() {
  out.value = JSON.stringify(await call('/api/connect.json'), null, 2);
}
async function logout() {
  out.value = JSON.stringify(await call('/api/connect.json', { method: 'DELETE' }), null, 2);
}
</script>

<style scoped>
button {
  appearance: none;
  border: 1px solid #ccc;
  background: white;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
}
button:hover { background: #f2f2f2; }
</style>







