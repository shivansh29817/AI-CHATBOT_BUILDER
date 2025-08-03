import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load service account credentials
const serviceAccountPath = path.join(__dirname, '../firebaseServiceAccountKey.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Middleware to protect routes
export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log('🔐 protect() middleware called');
  console.log('📎 Authorization Header:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('❌ No Bearer token found');
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  const token = authHeader.split(' ')[1];
  console.log('🔑 Extracted Token:', token.slice(0, 10) + '...');

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log('✅ Token verified:', decodedToken.uid);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('❌ Token verification failed:', error.message);
    res.status(401).json({ message: 'Not authorized, invalid token' });
  }
};
