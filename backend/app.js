import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';

//import models
import {
  connectToDatabase as connectUserDB,
  createUser,
  getUserByUsername,
  getUserById,
  unlockLevel,
  unlockBadge,
  resetUserProgress
} from './user_model.mjs';

import {
  connectToDatabase as connectFeedbackDB,
  create_feedback,
  getAllFeedback
} from './feedback_model.mjs';

import {
  connectToDatabase as connectShareDB,
  createShareData,
  getShareDataByShareId
} from './share_model.mjs';

const PORT = process.env.PORT || 3000;
const app = express();

//middleware
app.use(cookieParser()); // Parse cookies from requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add middleware to log response headers for debugging
app.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function(data) {
    if (req.path.includes('/api/users/login') || req.path.includes('/api/users/register')) {
      console.log(`[RESPONSE] ${req.method} ${req.path} - Headers:`, {
        'Set-Cookie': res.get('Set-Cookie'),
        'Access-Control-Allow-Origin': res.get('Access-Control-Allow-Origin'),
        'Access-Control-Allow-Credentials': res.get('Access-Control-Allow-Credentials')
      });
    }
    return originalSend.call(this, data);
  };
  next();
});

// CORS configuration - allow GitHub Pages origin
// GitHub Pages URLs can vary (with/without www, case differences, etc.)
const allowedOrigins = [
  'https://fishtacobidun.github.io',
  'https://FishTacoBidun.github.io',
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    //allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    //normalize origin for comparison (remove trailing slash, lowercase)
    const normalizedOrigin = origin.toLowerCase().replace(/\/$/, '');
    
    //check if origin matches any allowed origin
    const isAllowed = allowedOrigins.some(allowed => {
      const normalizedAllowed = allowed.toLowerCase().replace(/\/$/, '');
      //exact match or starts with (for subpaths like /Sprung-Block)
      return normalizedOrigin === normalizedAllowed || 
             normalizedOrigin.startsWith(normalizedAllowed + '/');
    });
    
    if (isAllowed) {
      //return the exact origin that was sent (required for credentials)
      callback(null, origin);
    } else {
      //log unlisted origins but allow them for now (for debugging)
      console.log(`[CORS] Request from unlisted origin: ${origin}`);
      callback(null, origin); // Allow all for now, return exact origin
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

//session configuration
app.use(session({
  name: 'connect.sid',
  secret: process.env.SESSION_SECRET || 'sprung-block-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_CONNECT_STRING,
    dbName: 'user_sessions',
    ttl: 60 * 60 * 24 * 7 //1 week in seconds
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, //1 week
    secure: process.env.NODE_ENV === 'production', //true in production with HTTPS
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', //'none' for cross-site in production
    path: '/',
    domain: undefined // Don't set domain - let browser use default (allows cross-site)
  }
}));

//error constants
const ERROR_NOT_FOUND = { Error: "Not found" };
const ERROR_INVALID_REQ = { Error: "Invalid request" };
const ERROR_UNAUTHORIZED = { Error: "Unauthorized" };

//middleware to check if user is authenticated
function requireAuth(req, res, next) {
  console.log(`[AUTH] Checking auth for ${req.path}`);
  console.log(`[AUTH] Origin: ${req.get('origin')}`);
  console.log(`[AUTH] Session ID: ${req.sessionID}`);
  console.log(`[AUTH] Session userId: ${req.session.userId}`);
  console.log(`[AUTH] Cookies received: ${JSON.stringify(req.cookies)}`);
  
  if (!req.session.userId) {
    console.error('[AUTH] Unauthorized request - no session userId:', req.path);
    console.error('[AUTH] Full session object:', JSON.stringify(req.session, null, 2));
    console.error('[AUTH] Request headers:', JSON.stringify(req.headers, null, 2));
    return res.status(401).json(ERROR_UNAUTHORIZED);
  }
  console.log(`[AUTH] Authenticated request from user ${req.session.userId} to ${req.path}`);
  next();
}

//USER ENDPOINTS

//POST - REGISTER
app.post('/api/users/register', asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  console.log(`[REGISTER] Attempt from origin: ${req.get('origin')}`);
  console.log(`[REGISTER] Cookies received: ${JSON.stringify(req.cookies)}`);

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
  req.session.userId = user._id.toString();
  
  // Save session and then send response
  await new Promise((resolve, reject) => {
    req.session.save((err) => {
      if (err) {
        console.error('[REGISTER] Error saving session:', err);
        return reject(err);
      }
      console.log(`[REGISTER] Session saved - ID: ${req.sessionID}, userId: ${req.session.userId}`);
      resolve();
    });
  });

  console.log(`[REGISTER] Cookie settings:`, {
    secure: req.session.cookie.secure,
    sameSite: req.session.cookie.sameSite,
    httpOnly: req.session.cookie.httpOnly,
    domain: req.session.cookie.domain,
    path: req.session.cookie.path
  });

  res.status(201).json({
    message: "Account created successfully",
    userId: user._id.toString(),
    username: user.username
  });
}));

//POST - LOGIN
app.post('/api/users/login', asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  console.log(`[LOGIN] Attempt from origin: ${req.get('origin')}`);
  console.log(`[LOGIN] Cookies received: ${JSON.stringify(req.cookies)}`);

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

  req.session.userId = user._id.toString();
  
  // Save session and then send response
  await new Promise((resolve, reject) => {
    req.session.save((err) => {
      if (err) {
        console.error('[LOGIN] Error saving session:', err);
        return reject(err);
      }
      console.log(`[LOGIN] Session saved - ID: ${req.sessionID}, userId: ${req.session.userId}`);
      resolve();
    });
  });

  console.log(`[LOGIN] Cookie settings:`, {
    secure: req.session.cookie.secure,
    sameSite: req.session.cookie.sameSite,
    httpOnly: req.session.cookie.httpOnly,
    domain: req.session.cookie.domain,
    path: req.session.cookie.path
  });

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
  
  const unlockedLevels = Array.isArray(user.unlockedLevels) && user.unlockedLevels.length > 0 
    ? user.unlockedLevels 
    : [1];
  const unlockedBadges = Array.isArray(user.unlockedBadges) 
    ? user.unlockedBadges 
    : [];
  
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

//FEEDBACK ENDPOINTS

//POST - FEEDBACK
app.post('/api/feedback', asyncHandler(async (req, res) => {
  const { name, email, category, message } = req.body;

  if (!name || !email || !category || !message) {
    res.status(400).json(ERROR_INVALID_REQ);
    return;
  }

  const result = await create_feedback(name, email, category, message);
  res.status(201).json(result);
}));

// GET Get all feedback entries (not used)
app.get('/api/feedback', asyncHandler(async (req, res) => {
  const allFeedback = await getAllFeedback();
  res.status(200).json(allFeedback);
}));

//SHARE ENDPOINTS

//POST - create a shareable completion record
app.post("/api/share", asyncHandler(async (req, res) => {
  const { levelNum, time, health, username } = req.body;

  if (
    typeof levelNum !== "number" ||
    typeof time !== "string" ||
    typeof health !== "number" ||
    typeof username !== "string"
  ) {
    res.status(400).json(ERROR_INVALID_REQ);
    return;
  }

  const result = await createShareData(levelNum, time, health, username);
  res.status(201).json({ shareId: result.shareId });
}));

//GET - retrieve a shared run
app.get("/api/share/:shareId", asyncHandler(async (req, res) => {
  const shareId = req.params.shareId;

  const entry = await getShareDataByShareId(shareId);

  if (entry === null) {
    res.status(404).json(ERROR_NOT_FOUND);
    return;
  }

  res.status(200).json(entry);
}));


//start server
app.listen(PORT, async () => {
  try {
    //connect to all databases
    await connectUserDB();
    await connectFeedbackDB();
    await connectShareDB();
    console.log(`Server listening on port ${PORT}...`);
    console.log('All services initialized successfully');
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
});