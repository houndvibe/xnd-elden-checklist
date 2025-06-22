import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Директория с изображениями
const rootDir = path.resolve('public');
// Поддерживаемые форматы изображений
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
// Качество сжатия (0-100)
const quality = 80;

// Функция для рекурсивного обхода директорий
async function processDirectory(directory) {
  console.log(`Обработка директории: ${directory}`);
  
  const items = fs.readdirSync(directory);
  
  for (const item of items) {
    const itemPath = path.join(directory, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory() && !item.includes('desktop.ini')) {
      // Рекурсивно обрабатываем поддиректории
      await processDirectory(itemPath);
    } else if (stat.isFile()) {
      const ext = path.extname(itemPath).toLowerCase();
      if (imageExtensions.includes(ext)) {
        await compressImage(itemPath, ext);
      }
    }
  }
}

// Функция для сжатия изображения
async function compressImage(filePath, extension) {
  try {
    const originalSize = fs.statSync(filePath).size;
    const image = sharp(filePath);
    let compressedBuffer;
    
    switch (extension) {
      case '.jpg':
      case '.jpeg':
        compressedBuffer = await image.jpeg({ quality }).toBuffer();
        break;
      case '.png':
        compressedBuffer = await image.png({ quality }).toBuffer();
        break;
      case '.webp':
        compressedBuffer = await image.webp({ quality }).toBuffer();
        break;
      default:
        return;
    }
    
    // Сохраняем сжатое изображение только если оно меньше оригинала
    if (compressedBuffer.length < originalSize) {
      fs.writeFileSync(filePath, compressedBuffer);
      const newSize = compressedBuffer.length;
      const savings = ((originalSize - newSize) / originalSize * 100).toFixed(2);
      console.log(`Сжато: ${filePath} (${savings}% экономии)`);
    } else {
      console.log(`Пропущено: ${filePath} (сжатие не дало выигрыша)`);
    }
  } catch (error) {
    console.error(`Ошибка при сжатии ${filePath}:`, error.message);
  }
}

// Запуск обработки
console.log('Начинаем сжатие изображений...');
processDirectory(rootDir)
  .then(() => console.log('Сжатие изображений завершено!'))
  .catch(err => console.error('Произошла ошибка:', err));