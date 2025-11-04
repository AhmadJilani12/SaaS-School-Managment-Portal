const clientPromise = require('../../lib/mongodb');

export default async function handler(req, res) {
  try {
    const mongo = await clientPromise;
    const { db } = mongo;

    // list collections (basic verification)
    const collections = await db.listCollections().toArray();
    res.status(200).json({ ok: true, collections: collections.map(c => c.name) });
  } catch (err) {
    console.error('test-db error', err);
    res.status(500).json({ ok: false, error: err.message });
  }
}
