import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// For prototype mode, use a mock database URL if none is provided
const databaseUrl = process.env.DATABASE_URL || "postgresql://mock:mock@localhost:5432/mock";

export const pool = new Pool({ connectionString: databaseUrl });
export const db = drizzle({ client: pool, schema });
