import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./configs/schema.js",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:7I6UoTZydrJE@ep-delicate-dust-a5ugy85k.us-east-2.aws.neon.tech/formy?sslmode=require',
  }
});