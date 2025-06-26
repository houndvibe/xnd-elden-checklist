#!/usr/bin/env node

/**
 * Скрипт для уменьшения всех изображений в папке client/public/images в 2.5 раза
 * и сохранения их в новую папку client/public/images_resized
 */

const fs = require("fs").promises;
const path = require("path");
const sharp = require("sharp");
const readline = require("readline");

// Поддерживаемые форматы изображений
const SUPPORTED_FORMATS = [
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".bmp",
  ".tiff",
  ".webp",
];

// Коэффициент уменьшения
const SCALE_FACTOR = 3.2;

/**
 * Создает интерфейс для ввода пользователя
 */
function createReadlineInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

/**
 * Задает вопрос пользователю и возвращает ответ
 */
function askQuestion(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

/**
 * Проверяет, является ли файл изображением
 */
function isImageFile(filename) {
  const ext = path.extname(filename).toLowerCase();
  return SUPPORTED_FORMATS.includes(ext);
}

/**
 * Получает размер файла в байтах
 */
async function getFileSize(filePath) {
  try {
    const stats = await fs.stat(filePath);
    return stats.size;
  } catch {
    return 0;
  }
}

/**
 * Форматирует размер файла в читаемый вид
 */
function formatFileSize(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * Уменьшает изображение в указанное количество раз
 */
async function resizeImage(inputPath, outputPath, scaleFactor = SCALE_FACTOR) {
  try {
    // Получаем информацию об изображении и размер файла
    const metadata = await sharp(inputPath).metadata();
    const { width, height } = metadata;
    const originalSize = await getFileSize(inputPath);

    // Вычисляем новые размеры
    const newWidth = Math.round(width / scaleFactor);
    const newHeight = Math.round(height / scaleFactor);

    // Создаем директорию если её нет
    await fs.mkdir(path.dirname(outputPath), { recursive: true });

    // Изменяем размер и сохраняем с оптимизацией
    await sharp(inputPath)
      .resize(newWidth, newHeight, {
        kernel: sharp.kernel.lanczos3,
        fit: "fill",
      })
      .png({
        quality: 90,
        compressionLevel: 9,
        progressive: true,
      })
      .toFile(outputPath);

    // Получаем размер нового файла
    const newSize = await getFileSize(outputPath);
    const compressionRatio = (
      ((originalSize - newSize) / originalSize) *
      100
    ).toFixed(1);

    console.log(
      `✓ ${path.basename(
        inputPath
      )}: ${width}x${height} -> ${newWidth}x${newHeight} | ${formatFileSize(
        originalSize
      )} -> ${formatFileSize(newSize)} (-${compressionRatio}%)`
    );

    return { success: true, originalSize, newSize };
  } catch (error) {
    console.error(`✗ Ошибка при обработке ${inputPath}: ${error.message}`);
    return { success: false, originalSize: 0, newSize: 0 };
  }
}

/**
 * Рекурсивно получает все файлы из директории
 */
async function getAllFiles(dir) {
  const files = [];

  async function traverse(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        await traverse(fullPath);
      } else if (entry.isFile() && isImageFile(entry.name)) {
        files.push(fullPath);
      }
    }
  }

  await traverse(dir);
  return files;
}

/**
 * Обрабатывает все изображения в указанной директории
 */
async function processImages(sourceDir, targetDir, scaleFactor = SCALE_FACTOR) {
  let processedCount = 0;
  let errorCount = 0;
  let totalOriginalSize = 0;
  let totalNewSize = 0;

  console.log(`Начинаем обработку изображений...`);
  console.log(`Исходная папка: ${sourceDir}`);
  console.log(`Целевая папка: ${targetDir}`);
  console.log(`Коэффициент уменьшения: ${scaleFactor}`);
  console.log("-".repeat(80));

  try {
    // Получаем все файлы изображений
    const imageFiles = await getAllFiles(sourceDir);

    if (imageFiles.length === 0) {
      console.log("Изображения не найдены!");
      return {
        processedCount: 0,
        errorCount: 0,
        totalOriginalSize: 0,
        totalNewSize: 0,
      };
    }

    console.log(`Найдено ${imageFiles.length} изображений для обработки\n`);

    // Обрабатываем каждое изображение
    for (let i = 0; i < imageFiles.length; i++) {
      const inputPath = imageFiles[i];

      // Показываем прогресс
      const progress = (((i + 1) / imageFiles.length) * 100).toFixed(1);
      process.stdout.write(
        `\r[${progress}%] Обработка ${i + 1}/${imageFiles.length}: `
      );

      // Создаем относительный путь для сохранения структуры папок
      const relativePath = path.relative(sourceDir, inputPath);
      const outputPath = path.join(targetDir, relativePath);

      // Обрабатываем изображение
      const result = await resizeImage(inputPath, outputPath, scaleFactor);

      if (result.success) {
        processedCount++;
        totalOriginalSize += result.originalSize;
        totalNewSize += result.newSize;
      } else {
        errorCount++;
      }
    }
  } catch (error) {
    console.error(`\nОшибка при обработке директории: ${error.message}`);
    errorCount++;
  }

  console.log("\n" + "-".repeat(80));
  console.log(`📊 СТАТИСТИКА ОБРАБОТКИ:`);
  console.log(`✅ Успешно обработано: ${processedCount} изображений`);
  console.log(`❌ Ошибок: ${errorCount}`);
  console.log(`📁 Общий размер до: ${formatFileSize(totalOriginalSize)}`);
  console.log(`📁 Общий размер после: ${formatFileSize(totalNewSize)}`);

  if (totalOriginalSize > 0) {
    const totalSavings = (
      ((totalOriginalSize - totalNewSize) / totalOriginalSize) *
      100
    ).toFixed(1);
    const savedSpace = totalOriginalSize - totalNewSize;
    console.log(
      `💾 Экономия места: ${formatFileSize(savedSpace)} (${totalSavings}%)`
    );
    console.log(
      `🚀 Ускорение загрузки: ~${(totalOriginalSize / totalNewSize).toFixed(
        1
      )}x раз`
    );
  }

  return { processedCount, errorCount, totalOriginalSize, totalNewSize };
}

/**
 * Проверяет существование директории
 */
async function directoryExists(dirPath) {
  try {
    const stats = await fs.stat(dirPath);
    return stats.isDirectory();
  } catch {
    return false;
  }
}

/**
 * Удаляет директорию рекурсивно
 */
async function removeDirectory(dirPath) {
  try {
    await fs.rm(dirPath, { recursive: true, force: true });
    return true;
  } catch (error) {
    console.error(
      `Ошибка при удалении директории ${dirPath}: ${error.message}`
    );
    return false;
  }
}

/**
 * Основная функция
 */
async function main() {
  // Определяем пути
  const sourceDir = path.join(process.cwd(), "public", "images");
  const targetDir = path.join(process.cwd(), "public", "images_resized");

  // Проверяем существование исходной папки
  if (!(await directoryExists(sourceDir))) {
    console.error(`Ошибка: Папка ${sourceDir} не найдена!`);
    console.error("Убедитесь, что скрипт запущен из корневой папки проекта.");
    process.exit(1);
  }

  // Проверяем, установлена ли библиотека sharp
  try {
    require("sharp");
  } catch (error) {
    console.error("Ошибка: Не установлена библиотека sharp!");
    console.error("Установите её командой: npm install sharp");
    process.exit(1);
  }

  const rl = createReadlineInterface();

  try {
    // Информируем пользователя
    console.log(`Будут обработаны все изображения из папки: ${sourceDir}`);
    console.log(`Результат будет сохранен в папку: ${targetDir}`);

    // Проверяем существование целевой папки
    if (await directoryExists(targetDir)) {
      const overwrite = await askQuestion(
        rl,
        `Папка ${targetDir} уже существует. Перезаписать? (y/N): `
      );
      if (!["y", "yes", "да"].includes(overwrite.toLowerCase())) {
        console.log("Операция отменена.");
        process.exit(0);
      } else {
        // Удаляем существующую папку
        if (await removeDirectory(targetDir)) {
          console.log(`Папка ${targetDir} удалена.`);
        }
      }
    }

    // Подтверждение операции
    const proceed = await askQuestion(rl, "Продолжить? (Y/n): ");
    if (["n", "no", "нет"].includes(proceed.toLowerCase())) {
      console.log("Операция отменена.");
      process.exit(0);
    }

    // Запускаем обработку
    const { processedCount, errorCount } = await processImages(
      sourceDir,
      targetDir,
      SCALE_FACTOR
    );

    if (errorCount === 0) {
      console.log(`\n🎉 Все изображения успешно обработаны!`);
    } else {
      console.log(`\n⚠️  Обработка завершена с ${errorCount} ошибками.`);
    }
  } catch (error) {
    console.error(`Неожиданная ошибка: ${error.message}`);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Запускаем скрипт
if (require.main === module) {
  main().catch((error) => {
    console.error(`Критическая ошибка: ${error.message}`);
    process.exit(1);
  });
}
