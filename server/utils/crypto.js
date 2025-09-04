import bcrypt from 'bcrypt';

// Salt rounds for bcrypt hashing
const SALT_ROUNDS = 12;

/**
 * Encrypts an API key using bcrypt
 * @param {string} apiKey - The plain text API key to encrypt
 * @returns {Promise<string>} - The encrypted API key
 */
export const encryptApiKey = async (apiKey) => {
  try {
    if (!apiKey || apiKey.trim() === '') {
      return null; // Return null for empty API keys
    }
    
    const hashedApiKey = await bcrypt.hash(apiKey, SALT_ROUNDS);
    return hashedApiKey;
  } catch (error) {
    console.error('❌ Error encrypting API key:', error.message);
    throw new Error('Failed to encrypt API key');
  }
};

/**
 * Verifies if a plain text API key matches the encrypted one
 * Note: bcrypt is a one-way hash, so we can only verify, not decrypt
 * @param {string} plainApiKey - The plain text API key
 * @param {string} hashedApiKey - The encrypted API key from database
 * @returns {Promise<boolean>} - True if they match, false otherwise
 */
export const verifyApiKey = async (plainApiKey, hashedApiKey) => {
  try {
    if (!plainApiKey || !hashedApiKey) {
      return false;
    }
    
    const isMatch = await bcrypt.compare(plainApiKey, hashedApiKey);
    return isMatch;
  } catch (error) {
    console.error('❌ Error verifying API key:', error.message);
    return false;
  }
};

/**
 * Since bcrypt is one-way hashing, we need a different approach for API keys
 * We'll use a reversible encryption method instead
 */
import crypto from 'crypto';

// Encryption key - in production, this should be stored in environment variables
const ENCRYPTION_KEY = process.env.API_ENCRYPTION_KEY || 'your-32-character-secret-key-here!';
const ALGORITHM = 'aes-256-cbc';

/**
 * Encrypts an API key using AES encryption (reversible)
 * @param {string} apiKey - The plain text API key to encrypt
 * @returns {string} - The encrypted API key with IV prepended
 */
export const encryptApiKeyReversible = (apiKey) => {
  try {
    if (!apiKey || apiKey.trim() === '') {
      return null;
    }
    
    // Create a proper 32-byte key from the encryption key
    const key = crypto.createHash('sha256').update(ENCRYPTION_KEY).digest();
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    
    let encrypted = cipher.update(apiKey, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    // Prepend IV to encrypted data
    return iv.toString('hex') + ':' + encrypted;
  } catch (error) {
    console.error('❌ Error encrypting API key:', error.message);
    throw new Error('Failed to encrypt API key');
  }
};

/**
 * Decrypts an API key using AES decryption
 * @param {string} encryptedApiKey - The encrypted API key with IV prepended
 * @returns {string} - The decrypted plain text API key
 */
export const decryptApiKey = (encryptedApiKey) => {
  try {
    if (!encryptedApiKey) {
      return null;
    }
    
    const parts = encryptedApiKey.split(':');
    if (parts.length !== 2) {
      throw new Error('Invalid encrypted API key format');
    }
    
    const iv = Buffer.from(parts[0], 'hex');
    const encryptedData = parts[1];
    
    // Create a proper 32-byte key from the encryption key
    const key = crypto.createHash('sha256').update(ENCRYPTION_KEY).digest();
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    console.error('❌ Error decrypting API key:', error.message);
    throw new Error('Failed to decrypt API key');
  }
};