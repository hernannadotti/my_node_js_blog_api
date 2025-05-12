const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // Vercel sets NODE_ENV to 'production' automatically.
    // For local, dotenv loads .env. For Vercel, use Vercel's env vars.
    const mongoURI = process.env.NODE_ENV === 'production' 
      ? process.env.MONGO_URI // Use MONGODB_URI in production (Vercel)
      : process.env.MONGO_URI;  // Use MONGO_URI locally (from .env)

    if (!mongoURI) {
      console.error('[db.js] CRITICAL: MongoDB connection URI is undefined or empty.');
      if (process.env.NODE_ENV === 'production') {
        console.error('[db.js] Ensure MONGODB_URI is set in Vercel environment variables.');
      } else {
        console.error('[db.js] Ensure MONGO_URI is set in your .env file for local development.');
      }
      process.exit(1); // Exit if URI is not set
    }

    await mongoose.connect(mongoURI);
    console.log('[db.js] MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
