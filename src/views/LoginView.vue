<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStore } from '@nanostores/vue';
import { session$, setSession } from '@/stores/sessionStore';
import { appwrite } from '@/lib/appwrite';

const email = ref('');
const password = ref('');
const s = useStore(session$);
const { account } = appwrite();

onMounted(async () => {
  const jwt = localStorage.getItem('jwt') || undefined;
  if (jwt) setSession({ jwt });
  try {
    const user = await account.get();
    setSession({ user, loading: false });
    if (typeof window !== 'undefined' && window.location.pathname === '/login') {
      window.location.assign('/dashboard');
    }
  } catch {
    setSession({ loading: false });
  }
});

async function login() {
  setSession({ loading: true });
  await account.createEmailPasswordSession(email.value, password.value);
  const jwt = await account.createJWT();
  localStorage.setItem('jwt', jwt.jwt);
  const user = await account.get();
  setSession({ user, jwt: jwt.jwt, loading: false });
  if (typeof window !== 'undefined') window.location.assign('/dashboard');
}
</script>

<template>
  <div class="rounded-2xl p-4 border">
    <template v-if="s.loading">
      <p>Checking session…</p>
    </template>
    <template v-else-if="s.user">
      <p class="mb-2">Logged in. Redirecting…</p>
    </template>
    <template v-else>
      <h3 class="mb-2">Login</h3>
      <form @submit.prevent="login" class="flex flex-col gap-2">
        <input v-model="email" type="email" placeholder="email" required />
        <input v-model="password" type="password" placeholder="password" required />
        <button type="submit">Login</button>
      </form>
      <p class="text-sm opacity-70 mt-2">
        (Use an existing Appwrite user in this project.)
      </p>
    </template>
  </div>
</template>

<style scoped>
input, button { padding: .5rem; border: 1px solid #ddd; border-radius: .5rem; }
button { cursor: pointer; }
</style>
