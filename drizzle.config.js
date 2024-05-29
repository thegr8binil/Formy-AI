import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./schema/*",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL,
  }
});