import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import 'dotenv/config';

const USER_DB_NAME = 'user_db';

let connectionUser = undefined;

async function connectToDatabase() {
  try {
    connectionUser = await mongoose.connect(
      process.env.MONGODB_CONNECT_STRING,
      { dbName: USER_DB_NAME }
    );
    console.log("Successfully connected to MongoDB - User DB");
  } catch (err) {
    console.error(err);
    throw Error(`Could not connect to MongoDB - User DB ${err.message}`);
  }
}

//user Schema
const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  
  //track unlocked levels (store levelId numbers, not ObjectIds)
  //level 1 unlocked by default
  unlockedLevels: { type: [Number], default: [1] },
  
  //track unlocked badges (store badgeId numbers, not ObjectIds)
  unlockedBadges: { type: [Number], default: [] },
  
  createdAt: { type: Date, default: Date.now }
});

//method to set password (hashing)
userSchema.methods.setPassword = async function(password) {
  this.passwordHash = await bcrypt.hash(password, 10);
};

//method to validate password
userSchema.methods.validatePassword = async function(password) {
  return await bcrypt.compare(password, this.passwordHash);
};

//compile model from schema
const User = mongoose.model('User', userSchema);

//CREATE - USER
const createUser = async (username, password) => {
  const user = new User({ 
    username,
    unlockedLevels: [1], //level 1 unlocked by default
    unlockedBadges: [] //no badges unlocked by default
  });
  await user.setPassword(password);
  return user.save();
};

//GET - user by username
const getUserByUsername = async (username) => {
  return User.findOne({ username }).exec();
};

//GET - user by ID
const getUserById = async (id) => {
  return User.findById(id).exec();
};

//UPDATE - USER (unlock level)
const unlockLevel = async (userId, levelId) => {
  const user = await User.findById(userId);
  if (!user) {
    console.error(`[MODEL] unlockLevel: User not found: ${userId}`);
    return null;
  }
  
  //ensure unlockedLevels is an array
  if (!Array.isArray(user.unlockedLevels)) {
    user.unlockedLevels = [1]; //default to level 1
  }
  
  if (!user.unlockedLevels.includes(levelId)) {
    user.unlockedLevels.push(levelId);
    //sort to keep levels in order
    user.unlockedLevels.sort((a, b) => a - b);
    await user.save();
    console.log(`[MODEL] unlockLevel: User ${userId} unlocked level ${levelId}. Levels now:`, user.unlockedLevels);
  } else {
    console.log(`[MODEL] unlockLevel: User ${userId} already has level ${levelId} unlocked`);
  }
  return user;
};

//UPDATE - USER (unlock badge)
const unlockBadge = async (userId, badgeId) => {
  const user = await User.findById(userId);
  if (!user) {
    console.error(`[MODEL] unlockBadge: User not found: ${userId}`);
    return null;
  }
  
  //ensure unlockedBadges is an array
  if (!Array.isArray(user.unlockedBadges)) {
    user.unlockedBadges = [];
  }
  
  if (!user.unlockedBadges.includes(badgeId)) {
    user.unlockedBadges.push(badgeId);
    //sort to keep badges in order
    user.unlockedBadges.sort((a, b) => a - b);
    await user.save();
    console.log(`[MODEL] unlockBadge: User ${userId} unlocked badge ${badgeId}. Badges now:`, user.unlockedBadges);
  } else {
    console.log(`[MODEL] unlockBadge: User ${userId} already has badge ${badgeId} unlocked`);
  }
  return user;
};

//RESET - USER (not used)
const resetUserProgress = async (userId) => {
  const user = await User.findById(userId);
  if (!user) return null;
  
  user.unlockedLevels = [1];
  user.unlockedBadges = [];
  await user.save();
  return user;
};

//DELETE - USER
const deleteUserById = async (id) => {
  await User.deleteOne({ _id: id });
};

export {
  connectToDatabase,
  User,
  createUser,
  getUserByUsername,
  getUserById,
  unlockLevel,
  unlockBadge,
  resetUserProgress,
  deleteUserById
};
