const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const { pipeline } = require('stream/promises');

const images = {
  'iPhone': 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=800&auto=format&fit=crop',
  'Jacket': 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop',
  'Civic': 'https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=800&auto=format&fit=crop',
  'Sofa': 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop',
  'MacBook': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop',
  'Cricket': 'https://images.unsplash.com/photo-1531315630201-bb15abeb1653?q=80&w=800&auto=format&fit=crop'
};

if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');

const db = new sqlite3.Database('database.sqlite');

async function run() {
  for (const [key, url] of Object.entries(images)) {
    const filename = `uploads/${key.toLowerCase()}.jpg`;
    console.log('Fetching', key);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`unexpected response ${res.statusText}`);
      const fileStream = fs.createWriteStream(filename);
      await pipeline(res.body, fileStream);
      db.run(`UPDATE Ads SET image = '${filename}' WHERE title LIKE '%${key}%'`);
    } catch (e) {
      console.error(`Failed ${key}: ${e.message}`);
    }
  }
}

run().then(() => {
  console.log('Done downloading and updating DB');
  setTimeout(() => db.close(), 1000);
}).catch(console.error);
