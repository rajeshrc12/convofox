export const env = {
  WEB_URL: import.meta.env.VITE_WEB_URL,
  USER_API_URL: import.meta.env.VITE_USER_API_URL,
  SIGNALING_API_URL: import.meta.env.VITE_SIGNALING_API_URL,
} as const
