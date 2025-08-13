<!-- <script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useStore } from '@nanostores/vue';
import { session$, setSession } from '@/stores/sessionStore';
import UserPostsTimeline from '@/components/UserPostsTimeline.vue';
import CreatePostModal from '@/components/CreatePostModal.vue';
import { appwrite } from '@/lib/appwrite';

const s = useStore(session$);
const { account } = appwrite();

const ready = computed(() => !!s.value.jwt);
const displayName = computed(() => s.value.user?.name || s.value.user?.email || 'No user found');

onMounted(async () => {
  const jwt = localStorage.getItem('jwt') || undefined;
  if (jwt && !s.value.jwt) setSession({ jwt });

  if (!s.value.user) {
    try {
      const user = await account.get();
      setSession({ user, loading: false });
    } catch {
      setSession({ loading: false });
    }
  }
});

const showCreate = ref(false);
const timelineKey = ref(0);

function onCreated() {
  showCreate.value = false;
  timelineKey.value++;
}

async function logout() {
  try { await account.deleteSessions(); } catch {}
  localStorage.removeItem('jwt');
  setSession({ user: undefined, jwt: undefined, loading: false });
  if (typeof window !== 'undefined') window.location.assign('/login');
}
</script>

<template>
  <section class="dashboard">
    <header class="header">
      <h2 class="title">Welcome, {{ displayName }}</h2>
      <div class="actions">
        <button v-if="ready" class="btn" @click="logout">Logout</button>
        <button v-if="ready" class="btn" @click="showCreate = true">+ New Post</button>
      </div>
    </header>

    <UserPostsTimeline :key="timelineKey" />

    <CreatePostModal v-if="showCreate" @close="showCreate = false" @created="onCreated" />
  </section>
</template>

<style scoped>
.dashboard { display: grid; gap: 1rem; }
.header { display: flex; align-items: center; justify-content: space-between; }
.title { margin: 0; }
.actions { display: flex; gap: .5rem; }
.btn { padding: .4rem .6rem; border: 1px solid #ddd; border-radius: .5rem; cursor: pointer; }
</style> -->