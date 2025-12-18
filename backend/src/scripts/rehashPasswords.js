import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';

dotenv.config();

const rehash = async () => {
  try {
    await connectDB();
    const users = await User.find({});
    let updated = 0;
    for (const user of users) {
      // naive check: bcrypt hashes usually start with $2 and are long
      if (!user.password || user.password.length < 20 || !user.password.startsWith('$2')) {
        const hashed = await bcrypt.hash(user.password || '', 10);
        user.password = hashed;
        await user.save();
        updated++;
        console.log(`Re-hashed password for ${user.email}`);
      }
    }
    console.log(`Done. Updated ${updated} users.`);
    process.exit(0);
  } catch (err) {
    console.error('Migration failed', err);
    process.exit(1);
  }
};

rehash();
