import { rm } from 'fs/promises';
import path from 'path';

async function teardown() {
  const pgContainer = global.pgContainer;
  await pgContainer.stop();
  const migrationPath = path.join(__dirname, './migrations');
  try {
    // Remove all contents in the `migrations` directory but keep the directory itself
    await rm(migrationPath, { recursive: true, force: true });
    console.log(`Successfully removed all files in ${migrationPath}`);
  } catch (error) {
    console.error(`Error removing files in ${migrationPath}:`, error);
  }
}

export default teardown;
