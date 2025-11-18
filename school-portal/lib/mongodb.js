import { MongoClient } from 'mongodb';

// Read from environment (use .env.local in Next.js)
const uri = process.env.MONGODB_URI;

// Keep a cached promise so Next.js hot reload doesn't create new connections
const globalScope = globalThis;
globalScope._mongo = globalScope._mongo || { promise: null };

if (!globalScope._mongo.promise) {
  if (!uri) {
    // If no URI is provided, provide a harmless stub so the app can run locally
    globalScope._mongo.promise = Promise.resolve({ client: null, db: { listCollections: async () => [] } });
  } else {
    const client = new MongoClient(uri, { maxPoolSize: 10 });
    globalScope._mongo.promise = client.connect().then((client) => {
      return { client, db: client.db() };
    }).catch(err => {
      // reset so subsequent attempts can retry
      globalScope._mongo.promise = null;
      throw err;
    });
  }
}

export default globalScope._mongo.promise;
