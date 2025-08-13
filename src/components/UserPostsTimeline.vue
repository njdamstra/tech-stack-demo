<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useStore } from '@nanostores/vue';
import { session$ } from '@/stores/sessionStore';
import type { Post } from '@/schemas/posts';    

const s = useStore(session$);
const posts = ref<Post[]>([]);
const error = ref<string | null>(null);

async function load() {
  if (!s.value.jwt) return;
  const res = await fetch('/api/posts', {
    headers: { Authorization: `Bearer ${s.value.jwt}` }
  });
  if (!res.ok) {
    error.value = `Failed: ${res.status}`;
    return;
  }
  const data = await res.json() as { documents: Post[] };
  posts.value = data.documents ?? [];
}

onMounted(load);
</script>

<template>
  <div class="rounded-2xl p-4 border">
    <h3 class="m-0 mb-2">Your posts</h3>
    <p v-if="error">{{ error }}</p>
    <ul v-else>
      <li v-for="p in posts" :key="p.$id">{{ p.Title }}</li>
    </ul>
  </div>
  
</template>

<style scoped>
ul { padding-left: 1rem; }
</style>
