<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '@nanostores/vue';
import { usePosts } from '@/composable/usePosts';
import { session$ } from '@/stores/sessionStore';
import { PostSchema } from '@/schemas/posts';

const s = useStore(session$);
const { createPost } = usePosts();

const Title = ref('');
const Content = ref('');

const emit = defineEmits<{ (e: 'close'): void; (e: 'created'): void }>();

async function create() {
  const owner = s.value.user?.$id;
  if (!owner || !Title.value.trim()) return;

  await createPost({
    Title: Title.value,
    Content: Content.value || '',
    State: 'PUBLISHED',
    owner,
    publishedAt: new Date().toISOString()
  });

  emit('created');
}
</script>

<template>
    <div class="overlay">
      <div class="modal">
        <h3 class="m-0">New Post</h3>
        <input v-model="Title" placeholder="Title" />
        <textarea v-model="Content" placeholder="Content" rows="4"></textarea>
        <div class="actions">
          <button @click="emit('close')">Cancel</button>
          <button @click="create">Create</button>
        </div>
      </div>
    </div>
  </template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.3);
  display: grid;
  place-items: center;
}
.modal {
  background: white;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: .75rem;
  min-width: 280px;
}
.actions { display: flex; gap: .5rem; justify-content: flex-end; margin-top: .75rem; }
input, button { padding: .5rem; border: 1px solid #ddd; border-radius: .5rem; }
button { cursor: pointer; }
</style>
