import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { shardClients, metadataClient, getShardIndex, getShardClient } from './db.js';

const app = express();
app.use(express.json());

const CitizenSchema = z.object({
  national_id: z.string(),
  full_name: z.string(),
  city_district: z.string(),
  date_of_birth: z.string().transform((str) => new Date(str)),
});

// POST /register: Routes the write to the correct shard.
app.post('/register', async (req, res) => {
  try {
    const validatedData = CitizenSchema.parse(req.body);
    const citizen_id = uuidv4();
    
    // Determine shard based on city_district
    const shardIndex = getShardIndex(validatedData.city_district);
    const client = shardClients[shardIndex];

    // Transaction: 
    // 1. Create in Shard
    // 2. Map in Metadata
    // For simplicity in this demo, we do them sequentially. In a real app, you might want more robustness.
    
    const citizen = await client.citizen.create({
      data: {
        id: citizen_id,
        ...validatedData,
      },
    });

    await metadataClient.citizenMap.create({
      data: {
        id: citizen_id,
        shard_id: shardIndex,
      },
    });

    res.status(201).json(citizen);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// GET /citizen/:id: Finds the shard and retrieves the record.
app.get('/citizen/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Find which shard it belongs to from metadata
    const mapping = await metadataClient.citizenMap.findUnique({
      where: { id },
    });

    if (!mapping) {
      return res.status(404).json({ error: 'Citizen not found' });
    }

    const client = shardClients[mapping.shard_id];
    const citizen = await client.citizen.findUnique({
      where: { id },
    });

    res.json(citizen);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /stats: Aggregates count data from all shards (Fan-out query).
app.get('/stats', async (req, res) => {
  try {
    const counts = await Promise.all(
      shardClients.map((client) => client.citizen.count())
    );

    const total = counts.reduce((acc, count) => acc + count, 0);

    res.json({
      total,
      shards: counts.map((count, index) => ({ shard_id: index, count })),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
