const clientPromise = require('../../lib/mongodb');

export default async function handler(req, res) {
  try {
    const mongo = await clientPromise;
    const { db } = mongo;

    // Use a test database name to avoid interfering with production; this will create the DB/collection on first write
    const testDb = db.client ? db.client.db('school_portal_test') : db;

    const col = testDb.collection ? testDb.collection('samples') : null;
    if (!col) {
      // If stubbed (no real DB), return a safe message
      return res.status(200).json({ ok: true, message: 'No MongoDB configured; stub used (no write performed).' });
    }

    const doc = { createdAt: new Date().toISOString(), note: 'sample insert from create-sample API' };
    const result = await col.insertOne(doc);

    // list collections now
    const collections = await testDb.listCollections().toArray();

    res.status(200).json({ ok: true, insertedId: result.insertedId, collections: collections.map(c => c.name) });
  } catch (err) {
    console.error('create-sample error', err);
    res.status(500).json({ ok: false, error: err.message });
  }
}
