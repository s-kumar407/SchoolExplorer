export const base_url = process.env.NODE_ENV === 'production'
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : `https://localhost:${process.env.PORT || 3000}`;
