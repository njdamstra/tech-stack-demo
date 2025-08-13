import { Client, Databases } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  try {
    const endpoint =
      req.headers['x-appwrite-endpoint'] ||
      process.env.APPWRITE_FUNCTION_API_ENDPOINT ||
      process.env.APPWRITE_ENDPOINT;
    const project =
      req.headers['x-appwrite-project'] ||
      process.env.APPWRITE_FUNCTION_PROJECT_ID ||
      process.env.APPWRITE_PROJECT;
    const apiKey = req.headers['x-appwrite-key'] || process.env.APPWRITE_API_KEY;
    const databaseId =
      req.headers['x-appwrite-database-id'] || process.env.APPWRITE_DATABASE_ID;
    const collectionId =
      req.headers['x-appwrite-collection-id'] || process.env.APPWRITE_COLLECTION_POSTS_ID;
    if (!endpoint || !project || !apiKey || !databaseId || !collectionId) {
      return res.json({ error: 'Missing required env' }, 500);
    }

    const client = new Client().setEndpoint(endpoint).setProject(project).setKey(apiKey);
    const databases = new Databases(client);

    let payload = {};
    try {
      const raw =
        (typeof req.bodyRaw !== 'undefined' ? String(req.bodyRaw) : '') ||
        (typeof req.body !== 'undefined' ? String(req.body) : '') ||
        (await req.text?.()) ||
        '';
      payload = raw ? JSON.parse(raw) : {};
    } catch {}

    const { action, postId, ...data } = payload;

    if (action === 'publish' && postId) {
      const result = await databases.updateDocument(databaseId, collectionId, postId, {
        State: 'PUBLISHED',
        publishedAt: new Date().toISOString()
      });
      return res.json({ ok: true, post: result });
    }

    // default: create new published document
    const doc = await databases.createDocument(databaseId, collectionId, 'unique()', {
      Title: String(data.Title || '').trim(),
      Content: data.Content ?? '',
      State: data.State || 'PUBLISHED',
      owner: data.owner,
      publishedAt: data.publishedAt || new Date().toISOString()
    });

    return res.json({ ok: true, post: doc });
  } catch (e) {
    error?.(e?.message || String(e));
    return res.json({ error: e?.message || 'Unknown error' }, 500);
  }
};
