const { MongoClient } = require('mongodb');

// Read from environment (use .env.local in Next.js)
const uri = process.env.MONGODB_URI;

let cached = global._mongo || { conn: null, promise: null };

if (!cached.promise) {
  if (!uri) {
    // If no URI is provided, provide a harmless stub so the app can run locally
    cached.promise = Promise.resolve({ client: null, db: { listCollections: async () => [] } });
    global._mongo = cached;
  } else {
    const client = new MongoClient(uri, { maxPoolSize: 10 });
    cached.promise = client.connect().then((client) => {
      return { client, db: client.db() };
    }).catch(err => {
      // reset so subsequent attempts can retry
      cached.promise = null;
      throw err;
    });
    global._mongo = cached;
  }
}

module.exports = cached.promise;
