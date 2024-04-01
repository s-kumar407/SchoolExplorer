export const base_url = process.env.VERCEL_ENV === 'production'
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${process.env.PORT || 3000}`;
