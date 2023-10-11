import express from 'express';

import path from 'path';
import * as url from 'url';

// export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const router = express.Router();

router.use(express.static(path.join(__dirname, '..', 'public')));

router.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  return;
});

export { router };
