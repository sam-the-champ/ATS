// prisma.config.ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // This 'env' helper is specifically for Prisma 7 config files
    url: env("DATABASE_URL"),
  },
});