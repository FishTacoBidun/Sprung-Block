import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import {
  connectToDatabase,
  createUser,
  getUserByUsername,
  getUserById,
  unlockLevel,
  unlockBadge,
  resetUserProgress
} from './user_model.mjs';

const ERROR_NOT_FOUND = { Error: "Not found" };
const ERROR_INVALID_REQ = { Error: "Invalid request" };
const ERROR_UNAUTHORIZED = { Error: "Unauthorized" };
//use PORT from env, but default to 3004 if not set (since level_controller uses PORT for 3000)
const PORT = process.env.USER_PORT || process.env.PORT || 3004;
const app = express();

app.use(express.json());

//CORS configuration - allow credentials
app.use(cors({
  origin: 'http://localhost:5500', //whatever your frontend port is
  credentials: true
}));

//session configuration
app.use(session({
  name: 'connect.sid', //session cookie name
  secret: process.env.SESSION_SECRET || 'sprung-block-secret-key-change-in-production',
  resave: false, //force save even if session wasn't modified
  saveUninitialized: false, //save new sessions even if they haven't been modified
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_CONNECT_STRING,
    dbName: 'user_sessions',
    ttl: 60 * 60 * 24 * 7 //1 week in seconds
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    secure: false, //set to true in production with HTTPS
    httpOnly: true,
    sameSite: 'lax', //works for localhost
    path: '/' //cookie available for all paths
  }
}));

//connect to database on server start
app.listen(PORT, async () => {
  try {
    await connectToDatabase();
    console.log(`User API listening on port ${PORT}...`);
  } catch (error) {
    console.error("Failed to start User API:", error);
  }
});

//middleware to check if user is authenticated
function requireAuth(req, res, next) {
  console.log(`[AUTH] Checking auth for ${req.path}, session ID: ${req.sessionID}, userId: ${req.session.userId}`);
  
  if (!req.session.userId) {
    console.error('[AUTH] Unauthorized request - no session userId:', req.path);
    console.error('[AUTH] Session object:', {
      id: req.sessionID,
      userId: req.session.userId,
      cookie: req.session.cookie
    });
    return res.status(401).json(ERROR_UNAUTHORIZED);
  }
  console.log(`[AUTH] Authenticated request from user ${req.session.userId} to ${req.path}`);
  next();
}

//POST - REGISTER
app.post('/api/users/register', asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (password.length < 6 || !/\d/.test(password)) {
    return res.status(400).json({
      message: "Password must be at least 6 characters and contain a number"
    });
  }

  const existingUser = await getUserByUsername(username);
  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const user = await createUser(username, password);

  //this is the only needed user session line
  req.session.userId = user._id.toString();

  //just respond — express-session handles the rest
  res.status(201).json({
    message: "Account created successfully",
    userId: user._id.toString(),
    username: user.username
  });
}));

  
//POST - LOGIN
app.post('/api/users/login', asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const user = await getUserByUsername(username);
  if (!user) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  const isValid = await user.validatePassword(password);
  if (!isValid) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  //only this
  req.session.userId = user._id.toString();

  res.status(200).json({
    message: "Login successful",
    userId: user._id.toString(),
    username: user.username
  });
}));


//POST - LOGOUT
app.post('/api/users/logout', asyncHandler(async (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.status(200).json({ message: "Logout successful" });
  });
}));

//GET - get current user info and progress
app.get('/api/users/me', requireAuth, asyncHandler(async (req, res) => {
  const user = await getUserById(req.session.userId);
  
  if (!user) {
    return res.status(404).json(ERROR_NOT_FOUND);
  }
  
  //ensure arrays exist and have defaults
  const unlockedLevels = Array.isArray(user.unlockedLevels) && user.unlockedLevels.length > 0 
    ? user.unlockedLevels 
    : [1]; //default to level 1 unlocked
  const unlockedBadges = Array.isArray(user.unlockedBadges) 
    ? user.unlockedBadges 
    : []; //default to no badges
  
  res.status(200).json({
    userId: user._id.toString(),
    username: user.username,
    unlockedLevels: unlockedLevels,
    unlockedBadges: unlockedBadges
  });
}));

//PUT - unlock a level
app.put('/api/users/me/levels/:levelId', requireAuth, asyncHandler(async (req, res) => {
  const levelId = parseInt(req.params.levelId);
  
  console.log(`[UNLOCK LEVEL] User ${req.session.userId} attempting to unlock level ${levelId}`);
  
  if (isNaN(levelId) || levelId < 1 || levelId > 3) {
    console.error(`[UNLOCK LEVEL] Invalid levelId: ${levelId}`);
    return res.status(400).json(ERROR_INVALID_REQ);
  }
  
  const user = await unlockLevel(req.session.userId, levelId);
  
  if (!user) {
    console.error(`[UNLOCK LEVEL] User not found: ${req.session.userId}`);
    return res.status(404).json(ERROR_NOT_FOUND);
  }
  
  console.log(`[UNLOCK LEVEL] Success! User ${req.session.userId} now has levels:`, user.unlockedLevels);
  
  res.status(200).json({
    message: "Level unlocked",
    unlockedLevels: user.unlockedLevels
  });
}));

//PUT - unlock a badge
app.put('/api/users/me/badges/:badgeId', requireAuth, asyncHandler(async (req, res) => {
  const badgeId = parseInt(req.params.badgeId);
  
  console.log(`[UNLOCK BADGE] User ${req.session.userId} attempting to unlock badge ${badgeId}`);
  
  if (isNaN(badgeId) || badgeId < 1 || badgeId > 37) {
    console.error(`[UNLOCK BADGE] Invalid badgeId: ${badgeId}`);
    return res.status(400).json(ERROR_INVALID_REQ);
  }
  
  const user = await unlockBadge(req.session.userId, badgeId);
  
  if (!user) {
    console.error(`[UNLOCK BADGE] User not found: ${req.session.userId}`);
    return res.status(404).json(ERROR_NOT_FOUND);
  }
  
  console.log(`[UNLOCK BADGE] Success! User ${req.session.userId} now has badges:`, user.unlockedBadges);
  
  res.status(200).json({
    message: "Badge unlocked",
    unlockedBadges: user.unlockedBadges
  });
}));

//POST - reset user progress (not used)
app.post('/api/users/me/reset', requireAuth, asyncHandler(async (req, res) => {
  const user = await resetUserProgress(req.session.userId);
  
  if (!user) {
    return res.status(404).json(ERROR_NOT_FOUND);
  }
  
  res.status(200).json({
    message: "Progress reset",
    unlockedLevels: user.unlockedLevels,
    unlockedBadges: user.unlockedBadges
  });
}));
