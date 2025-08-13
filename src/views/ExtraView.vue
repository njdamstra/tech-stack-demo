<!-- 
<template>
    <div>
      <div>
        <form @submit.prevent="onLogin" style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:12px">
          <input v-model="email" placeholder="email" type="email" required />
          <input v-model="password" placeholder="password" type="password" required />
          <button type="submit">Login</button>
          <button type="button" @click="onSignup">Sign up</button>
        </form>
        <p v-if="error" style="color:#b00; margin:0 0 8px">{{ error }}</p>
        <pre style="background:#f9f9f9; padding:12px; border-radius:8px; max-height:50vh; overflow:auto">{{ out }}</pre>
      </div>
    </div>
    
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { appwrite } from '@/lib/appwrite';
  import Phone from '@/components/Phone.vue';
  import img from '../../src/assets/images/IMG_6196.jpg';
  
  const out = ref<string>('{}');
  const error = ref<string>('');
  const email = ref('');
  const password = ref('');
  const imageUrl = ref('../../src/assets/images/IMG_6196.jpg');
  
  const { account } = appwrite();
  
  async function afterAuth() {
    try {
      const { jwt } = await account.createJWT();
      localStorage.setItem('jwt', jwt);
      if (typeof window !== 'undefined') window.location.assign('/dashboard');
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to create JWT';
    }
  }
  
  async function onSignup() {
    error.value = '';
    try {
      // Create account then session
      await account.create('unique()', email.value, password.value);
      await account.createEmailPasswordSession(email.value, password.value);
      out.value = JSON.stringify({ ok: true, action: 'signup' }, null, 2);
      await afterAuth();
    } catch (e: any) {
      error.value = e?.message ?? 'Signup failed';
    }
  }
  
  async function onLogin() {
    error.value = '';
    try {
      await account.createEmailPasswordSession(email.value, password.value);
      out.value = JSON.stringify({ ok: true, action: 'login' }, null, 2);
      await afterAuth();
    } catch (e: any) {
      error.value = e?.message ?? 'Login failed';
    }
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
  input { padding: 8px 12px; border: 1px solid #ccc; border-radius: 8px; }
  </style>
   -->