const mongoose = require('mongoose');

// Configure mongodb-memory-server to use /tmp for Vercel serverless compatibility
process.env.MONGOMS_DOWNLOAD_DIR = process.env.MONGOMS_DOWNLOAD_DIR || '/tmp/mongodb-binaries';
process.env.MONGOMS_DATA_PATH = process.env.MONGOMS_DATA_PATH || '/tmp/mongodb-data';
process.env.MONGOMS_TMPDIR = process.env.MONGOMS_TMPDIR || '/tmp';

let mongoServer = null;

const connectDB = async () => {
    try {
        let uri = process.env.MONGODB_URI;
        let isMock = false;

        const needsMock = !uri ||
            uri.includes('<username>') ||
            uri.includes('<password>') ||
            uri === 'mongodb://localhost/officemanagement';

        if (needsMock) {
            console.log('No real MongoDB URI found. Starting in-memory MongoDB...');
            const { MongoMemoryServer } = require('mongodb-memory-server');
            mongoServer = await MongoMemoryServer.create({
                instance: {
                    dbPath: '/tmp/mongodb-data',
                    storageEngine: 'wiredTiger',
                }
            });
            uri = mongoServer.getUri();
            isMock = true;
        }

        if (mongoose.connection.readyState === 1) {
            console.log('MongoDB already connected.');
            return;
        }

        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        });

        if (isMock) {
            console.log('✅ In-Memory MongoDB Connected (mongodb-memory-server)');
            console.log('⚠️  Note: Data resets on every serverless function cold start.');
            console.log('   Set MONGODB_URI env variable for persistent storage.');
        } else {
            console.log('✅ MongoDB Atlas Connected');
        }
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        console.error('Full error:', err);
        // Don't call process.exit(1) in serverless - just throw
        throw err;
    }
};

module.exports = connectDB;
