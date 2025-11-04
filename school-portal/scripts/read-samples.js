// Script to read sample documents from the test DB.
require('dotenv').config({ path: '.env.local' });
const clientPromise = require('../lib/mongodb');

(async () => {
  try {
    const mongo = await clientPromise;
    const { client, db } = mongo;
    const testDb = client ? client.db('school_portal_test') : db;

    if (!testDb || typeof testDb.collection !== 'function') {
      console.log('No real MongoDB configured (stub in use). Nothing to read.');
      process.exit(0);
    }

    const col = testDb.collection('samples');
    const docs = await col.find({}).sort({ createdAt: -1 }).limit(10).toArray();
    console.log('Last samples (up to 10):');
    docs.forEach(d => console.log('-', d));

    try { await client.close(); } catch (e) {}
    process.exit(0);
  } catch (err) {
    console.error('read-samples error:', err);
    process.exit(1);
  }
})();
