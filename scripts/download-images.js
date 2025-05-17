const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  { name: 'adobo.jpg', text: 'Adobo' },
  { name: 'sinigang.jpg', text: 'Sinigang' },
  { name: 'sisig.jpg', text: 'Sisig' },
  { name: 'leche-flan.jpg', text: 'Leche Flan' },
  { name: 'halo-halo.jpg', text: 'Halo-Halo' },
  { name: 'empanada.jpg', text: 'Empanada' },
  { name: 'lumpia.jpg', text: 'Lumpia' },
];

const publicDir = path.join(__dirname, '..', 'public', 'images');

// Create public/images directory if it doesn't exist
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

images.forEach(({ name, text }) => {
  const url = `https://placehold.co/600x400/amber/white?text=${encodeURIComponent(text)}`;
  const filePath = path.join(publicDir, name);

  https.get(url, (response) => {
    const file = fs.createWriteStream(filePath);
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${name}`);
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${name}:`, err.message);
  });
}); 