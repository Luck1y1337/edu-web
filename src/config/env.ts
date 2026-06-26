export const env = {
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL as string | undefined,
} as const;

if (!env.BACKEND_URL && import.meta.env.DEV) {
  console.warn(
    "[env] VITE_BACKEND_URL is not set — falling back to /api/v1. " +
    "Copy .env.example to .env and set the value."
  );
}
