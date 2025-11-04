// Standalone script to test MongoDB connection and create a sample document.
// Loads .env.local then uses the lib/mongodb helper.
require('dotenv').config({ path: '.env.local' });
const clientPromise = require('../lib/mongodb');

(async () => {
  try {
    const mongo = await clientPromise;
    const { client, db } = mongo;

    const testDb = client ? client.db('school_portal_test') : db;
    if (!testDb || typeof testDb.collection !== 'function') {
      console.log('No real MongoDB configured (stub in use). Nothing was written.');
      process.exit(0);
    }

    const col = testDb.collection('samples');
    const doc = { createdAt: new Date().toISOString(), note: 'sample insert from script' };
    const result = await col.insertOne(doc);
    console.log('Inserted id:', result.insertedId.toString());

    const collections = await testDb.listCollections().toArray();
    console.log('Collections in school_portal_test:', collections.map(c => c.name));

    // Close client if present
    try { await client.close(); } catch (e) {}
    process.exit(0);
  } catch (err) {
    console.error('create-sample script error:', err);
    process.exit(1);
  }
})();
