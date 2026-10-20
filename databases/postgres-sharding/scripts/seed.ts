import { v4 as uuidv4 } from 'uuid';
import { shardClients, metadataClient, getShardIndex } from '../src/db.js';

async function seed() {
  console.log('Starting seed process...');
  const BATCH_SIZE = 1000;
  const TOTAL_RECORDS = 10000; // 20M is too much for a quick demo, but the logic remains the same.
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];

  for (let i = 0; i < TOTAL_RECORDS; i += BATCH_SIZE) {
    const batchData: any[][] = [[], []]; // [shard_0_data, shard_1_data]
    const mappingBatch: any[] = [];

    for (let j = 0; j < BATCH_SIZE; j++) {
      if (i + j >= TOTAL_RECORDS) break;

      const id = uuidv4();
      const city_district = cities[Math.floor(Math.random() * cities.length)];
      const shardIndex = getShardIndex(city_district);

      batchData[shardIndex].push({
        id,
        national_id: `NAT-${i + j}-${Math.random().toString(36).substr(2, 9)}`,
        full_name: `Citizen ${i + j}`,
        city_district,
        date_of_birth: new Date(1950 + Math.random() * 50, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)),
      });

      mappingBatch.push({
        id,
        shard_id: shardIndex,
      });
    }

    // Insert batches to shards
    await Promise.all([
      ...shardClients.map((client, index) => 
        client.citizen.createMany({ data: batchData[index], skipDuplicates: true })
      ),
      metadataClient.citizenMap.createMany({ data: mappingBatch, skipDuplicates: true }),
    ]);

    console.log(`Seeded ${Math.min(i + BATCH_SIZE, TOTAL_RECORDS)} / ${TOTAL_RECORDS}`);
  }

  console.log('Seeding completed successfully.');
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await Promise.all(shardClients.map((client) => client.$disconnect()));
    await metadataClient.$disconnect();
  });
