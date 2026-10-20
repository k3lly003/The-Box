import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const shardClients = [
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL_SHARD1,
      },
    },
  }),
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL_SHARD2,
      },
    },
  }),
];

// metadata_db might have its own schema if needed, but for now we use the same schema
const metadataClient = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_METADATA,
    },
  },
});

export { shardClients, metadataClient };

export const getShardIndex = (key: string): number => {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    const char = key.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash) % shardClients.length;
};

export const getShardClient = (key: string) => {
  const index = getShardIndex(key);
  return shardClients[index];
};
