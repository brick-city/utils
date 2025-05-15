// Script to split lucide-metadata.json into category-based files
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Read the metadata file
const metadataPath = path.join(dirname, 'lucide-metadata.json');
const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));

// Get all unique primary categories
const categories = new Set();
metadata.forEach((icon) => {

    if (icon.categories && icon.categories.length > 0) {

        categories.add(icon.categories[0]);

    }

});

console.log(`Found ${categories.size} unique primary categories`);

// Group icons by primary category
const categoryIcons = {};
categories.forEach((category) => {

    categoryIcons[category] = [];

});

metadata.forEach((icon) => {

    if (icon.categories && icon.categories.length > 0) {

        const primaryCategory = icon.categories[0];
        categoryIcons[primaryCategory].push(icon);

    }

});

// Create a directory for category files if it doesn't exist
const categoryDir = path.join(dirname, 'categories');
if (!fs.existsSync(categoryDir)) {

    fs.mkdirSync(categoryDir);

}

// Write each category to a separate file
categories.forEach((category) => {

    const icons = categoryIcons[category];
    const fileName = `${category.replace(/[^a-zA-Z0-9]/g, '-')}.js`;
    const filePath = path.join(categoryDir, fileName);

    // Format the icons array with proper indentation and line breaks
    const formattedIcons = icons.map((icon, index) => {

        // Format each icon object according to project style
        const iconStr = `    {
        icon: '${icon.icon}',
        name: '${icon.name}',
        tags: [${icon.tags.length > 0 ? '\r\n            ' : ''}${icon.tags.map((tag) => `'${tag.replace(/'/g, "\\'")}'`).join(',\r\n            ')},${icon.tags.length > 0 ? '\r\n        ' : ''}],
        categories: [${icon.categories.length > 0 ? '\r\n            ' : ''}${icon.categories.map((cat) => `'${cat.replace(/'/g, "\\'")}'`).join(',\r\n            ')},${icon.categories.length > 0 ? '\r\n        ' : ''}],
    }`;
        return iconStr;

    }).join(',\r\n');

    // Create file content with Windows line endings (CRLF)
    const fileContent = `// Icons with primary category: ${category}\r\nconst icons = [\r\n${formattedIcons},\r\n];\r\nexport default icons;\r\n`;

    // Write file with CRLF line endings
    //    fs.writeFileSync(filePath, fileContent.replace(/\n/g, '\r\n'));
    fs.writeFileSync(filePath, fileContent);
    console.log(`Created ${fileName} with ${icons.length} icons`);

});

// Create the main index file that imports all categories
const categoryFiles = Array.from(categories).map((cat) => {

    const fileName = cat.replace(/[^a-zA-Z0-9]/g, '-');
    return {
        category: cat,
        fileName,
    };

});

// Format the imports with Windows line endings
const imports = categoryFiles.map(({ fileName }) => `import ${fileName.replace(/-/g, '_')} from './categories/${fileName}.js';`).join('\r\n');

// Create the combined file content with Windows line endings
const indexFileContent = `// Main file that combines all icon categories\r\n${imports}\r\n\r\n// Combine all icons into a single array\r\nconst allIcons = [\r\n    ${categoryFiles.map(({ fileName }) => `...${fileName.replace(/-/g, '_')}`).join(',\r\n    ')}\r\n];\r\n\r\nexport default allIcons;`;

// Write file with CRLF line endings
// .replace(/\n/g, '\r\n')
fs.writeFileSync(path.join(dirname, 'lucide-metadata-combined.js'), indexFileContent);
console.log('Created lucide-metadata-combined.js');
