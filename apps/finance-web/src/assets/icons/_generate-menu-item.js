const fs = require('fs');

console.log('export const menuItemIcons: string[] = [');

fs.readdirSync('./menu-item').forEach(fileName => {
  console.log(`  'menu-item:${fileName.split('.').slice(0, -1).join('.')}',`);
});

console.log('];');
