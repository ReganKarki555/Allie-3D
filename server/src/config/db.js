const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let memoryServer;

async function connectDB() {
  mongoose.set('bufferCommands', false);

  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not configured. Set it in server/.env');
    }

    const connection = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`MongoDB connected: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);

    if (!memoryServer) {
      memoryServer = await MongoMemoryServer.create({
        instance: {
          dbName: 'ecommerce'
        }
      });
    }

    const memoryUri = memoryServer.getUri();
    const connection = await mongoose.connect(memoryUri);
    process.env.MONGO_URI = memoryUri;
    console.log('MongoDB fallback connected: in-memory server');
    return connection;
  }
}

module.exports = connectDB;
