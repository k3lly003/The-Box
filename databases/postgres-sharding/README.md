# PostgreSQL Manual Sharding Demo - Citizen Registry

This project demonstrates manual database sharding across multiple PostgreSQL instances for a high-volume "Citizen Registry" (conceptualized for 20M records).

## Architecture

- **3 PostgreSQL Instances**: 
  - `metadata_db`: Stores the mapping of `citizen_id` to `shard_id`.
  - `shard_1` & `shard_2`: Store the actual citizen records.
- **Node.js + TypeScript + Prisma**:
  - Express.js API for registration and retrieval.
  - Manual routing logic using a Hash-based approach on `city_district`.
  - Multiple Prisma clients, each connected to a specific database instance.

## Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Infrastructure**:
   ```bash
   docker-compose up -d
   ```

3. **Database Setup**:
   Prisma needs to generate the client and push the schema to all 3 databases.
   ```bash
   # Push to shard 1
   DATABASE_URL="postgresql://user:password@localhost:5431/shard_1" npx prisma db push
   # Push to shard 2
   DATABASE_URL="postgresql://user:password@localhost:5432/shard_2" npx prisma db push
   # Push to metadata_db
   DATABASE_URL="postgresql://user:password@localhost:5430/metadata_db" npx prisma db push
   ```

4. **Seed Data**:
   ```bash
   npm run seed
   ```

5. **Start the API**:
   ```bash
   npm run dev
   ```

## Endpoints

- `POST /register`: Registers a new citizen. The shard is determined by `city_district`.
- `GET /citizen/:id`: Retrieves a citizen's info by querying `metadata_db` first to find the correct shard.
- `GET /stats`: Performs a fan-out query across all shards to aggregate total counts.

## Performance Testing

A k6 script is provided to simulate high load (500 VUs).
```bash
npm run load-test
```
