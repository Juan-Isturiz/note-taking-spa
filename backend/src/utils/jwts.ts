import { User } from '@repo/schemas';
import jwt from 'jsonwebtoken';
import { env } from '@/config/env';

const secret = env.JWT_SECRET;

/**
 * Generates a JWT token for the given user
 * @param {User} user - The user to generate a token for
 * @returns {string} - The generated JWT token
 */
function generateUserToken(user: User) {
  const token = jwt.sign({ id: user.id, email: user.email }, secret, {
    expiresIn: '2h',
  });
  return token;
}

/**
 * Validate a JWT token
 * @param {string} token - The JWT token to validate
 * @returns {boolean} - True if the token is valid, false otherwise
 */
function validateToken(token: string) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.error(error);
    return false;
  }
}

export const jwtUtils = Object.freeze({
  generateUserToken,
  validateToken,
});
