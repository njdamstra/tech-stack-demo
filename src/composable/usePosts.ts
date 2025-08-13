import { useStore } from '@nanostores/vue';
import { session$ } from '@/stores/sessionStore';

export type CreatePostInput = {
  Title: string;
  Content?: string;
  owner: string;
  State?: 'DRAFTED' | 'PUBLISHED' | 'ARCHIVED';
  publishedAt?: string;
};

export function usePosts() {
  const s = useStore(session$);

  async function createPost(input: CreatePostInput) {
    if (!s.value.jwt) throw new Error('Missing JWT');
    const res = await fetch('/api/publish', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${s.value.jwt}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: 'create',
        ...input
      })
    });
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(`Create failed: ${res.status} ${msg}`);
    }
    return res.json(); // Appwrite execution object (response body included as string)
  }

  return { createPost };
}