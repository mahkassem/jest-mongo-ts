import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// MongoDB connection string
const MONGO_URI = process.env.MONGO_URI || '';
let MONGO_DB = process.env.MONGO_DB || '';

// NODE_ENV in case of testing we use a different database
const NODE_ENV = process.env.NODE_ENV || '';

// Append -test to MONGO_DB if NODE_ENV is test
if (NODE_ENV === 'test') MONGO_DB += '-test';

// MongoDB client
const client = new MongoClient(MONGO_URI);

// MongoDB connection
client.connect().then(() => {
  console.log('MongoDB connected');
}).catch(err => console.log(err));

// Set Database
const db = client.db(MONGO_DB);

// Export db and client
export default db;
export { client };