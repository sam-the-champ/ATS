import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;

// 1. Create a standard Postgres connection pool
const pool = new pg.Pool({ connectionString });

// 2. Create the Prisma adapter using that pool
const adapter = new PrismaPg(pool);

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// 3. Pass the adapter to the client
export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: adapter, // This tells Prisma how to talk to Postgres
    log: ['query', 'error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;