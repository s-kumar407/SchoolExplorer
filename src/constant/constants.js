export const base_url= process.env.VERCEL_URL
? `https://${process.env.VERCEL_URL}`
: `http://localhost:${process.env.PORT || 3000}`;