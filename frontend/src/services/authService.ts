import { AppwriteException, ID, Models } from 'appwrite';
import { account, isAppwriteConfigured } from '../lib/appwrite';

export interface PhoneOtpToken {
  userId: string;
}

export function normalizeIndianPhone(value: string): string | null {
  const digits = value.replace(/\D/g, '');
  const nationalNumber = digits.startsWith('91') && digits.length === 12
    ? digits.slice(2)
    : digits.startsWith('0') && digits.length === 11
      ? digits.slice(1)
      : digits;

  if (!/^[6-9]\d{9}$/.test(nationalNumber)) return null;
  return `+91${nationalNumber}`;
}

function ensureAppwriteConfigured(): void {
  if (!isAppwriteConfigured) {
    throw new Error('Appwrite is not configured. Add the Appwrite values to the .env file and restart Vite.');
  }
}

export async function sendPhoneOtp(phone: string): Promise<PhoneOtpToken> {
  ensureAppwriteConfigured();
  const token = await account.createPhoneToken({
    userId: ID.unique(),
    phone,
  });

  return { userId: token.userId };
}

export async function verifyPhoneOtp(token: PhoneOtpToken, otp: string): Promise<Models.Session> {
  ensureAppwriteConfigured();
  return account.createSession({
    userId: token.userId,
    secret: otp,
  });
}

export async function getCurrentUser(): Promise<Models.User<Models.Preferences> | null> {
  if (!isAppwriteConfigured) return null;
  try {
    return await account.get();
  } catch (error) {
    if (error instanceof AppwriteException && error.code === 401) return null;
    throw error;
  }
}

export async function logout(): Promise<void> {
  ensureAppwriteConfigured();
  await account.deleteSession({ sessionId: 'current' });
}

export function getAuthErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && !(error instanceof AppwriteException)) {
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      return 'Appwrite could not be reached. Check your internet connection and Appwrite Web platform hostname.';
    }
    return fallback;
  }

  const appwriteError = error as AppwriteException;

  switch (appwriteError.code) {
    case 400:
      return 'Please check the phone number or OTP and try again.';
    case 401:
      return 'That OTP is invalid or has expired. Please request a new one.';
    case 402:
      return 'Appwrite phone OTP is unavailable because this project has reached its billing limit. Update the Appwrite budget or upgrade the project plan.';
    case 403:
      return 'Phone authentication is not enabled for this Appwrite project.';
    case 404:
      return 'The Appwrite project or endpoint is not configured correctly.';
    case 501:
      return 'SMS delivery is not configured for this Appwrite project.';
    case 429:
      return 'Too many attempts. Please wait a moment and try again.';
    default:
      return appwriteError.message || fallback;
  }
}