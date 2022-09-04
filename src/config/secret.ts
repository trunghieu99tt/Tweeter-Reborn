import * as dotenv from 'dotenv';

dotenv.config();

export const getEnv = (key: string, ignore = false): string => {
  const value = process.env[key];
  if (!ignore && value === undefined) {
    console.log(`[ENV] ${key} not found!`);
  }
  return value || '';
};

export const API_URL = getEnv('REACT_APP_API_URL');
export const SOCKET_URL = getEnv('REACT_APP_SOCKET_URL');

export const CLOUDINARY_CLOUD_NAME = getEnv('REACT_APP_CLOUDINARY_CLOUD_NAME');
export const CLOUDINARY_UPLOAD_PRESET = getEnv(
  'REACT_APP_CLOUDINARY_UPLOAD_PRESET',
);
export const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;

export const AGORA_APP_ID = getEnv('REACT_APP_AGORA_APP_ID');
