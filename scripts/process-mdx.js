const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '../content/getting-started');
const outputDir = path.join(__dirname, '../build');

console.log('Content Directory:', contentDir);
console.log('Output Directory:', outputDir);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.readdirSync(contentDir).forEach((file) => {
  if (file.endsWith('.mdx')) {
    console.log(`Processing file: ${file}`);
    const content = fs.readFileSync(path.join(contentDir, file), 'utf-8');
    console.log(`Content of ${file}:`, content);
    fs.writeFileSync(path.join(outputDir, file), content);
  } else {
    console.log(`Skipping non-MDX file: ${file}`);
  }
});
