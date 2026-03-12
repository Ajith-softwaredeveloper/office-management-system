const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
    try {
        let uri = process.env.MONGODB_URI;
        let isMock = false;

        if (!uri || uri.includes('<username>') || uri.includes('cluster0.mongodb.net/officemanagement')) {
            const mongoServer = await MongoMemoryServer.create();
            uri = mongoServer.getUri();
            isMock = true;
        }

        await mongoose.connect(uri);
        
        if (isMock) {
            console.log('Free In-Memory MongoDB Connected! (mongodb-memory-server)');
        } else {
            console.log('MongoDB Connected...');
        }
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
module.exports = connectDB;
