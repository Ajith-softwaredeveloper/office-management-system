const mongoose = require('mongoose');

// Singleton pattern for serverless to reuse connection across invocations
let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    // If already connected, reuse
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const uri = process.env.MONGODB_URI;

        if (!uri) {
            throw new Error(
                'MONGODB_URI environment variable is not set. ' +
                'Please add a free MongoDB Atlas connection string in your Vercel project settings: ' +
                'Dashboard > Project > Settings > Environment Variables. ' +
                'Get a free Atlas DB at: https://cloud.mongodb.com'
            );
        }

        console.log('Connecting to MongoDB Atlas...');
        cached.promise = mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            bufferCommands: false,
        }).then(mongoose => {
            console.log('✅ MongoDB Connected');
            return mongoose;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
};

module.exports = connectDB;
