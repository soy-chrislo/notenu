import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function verifyToken(token: string): boolean {
  try {
    decryptToken(token);
    return true;
  } catch (err) {
    return false;
  }
}

function encryptToken(payload: any): string {
  const secret = process.env.JWT_SECRET || 'this_is_not_a_secret';
  const token = jwt.sign(payload, secret, { expiresIn: '1h' });
  return token;
}

function decryptToken(token: string): any {
  const secret = process.env.JWT_SECRET || 'this_is_not_a_secret';
  const payload = jwt.verify(token, secret);
  return payload;
}

export default {
  verifyToken,
  encryptToken,
  decryptToken
};