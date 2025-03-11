const { existsSync, mkdirSync, copyFileSync, readdirSync } = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "src", "features", "search", "scrapers");
const destDir = path.join(__dirname, "build", "src", "features", "search", "scrapers");

// Ensure destination directory exists
if (!existsSync(destDir)) {
  mkdirSync(destDir, { recursive: true });
}

// Copy each Python file from src to build folder
readdirSync(srcDir).forEach(file => {
  if (file.endsWith(".py")) {
    const srcFile = path.join(srcDir, file);
    const destFile = path.join(destDir, file);
    copyFileSync(srcFile, destFile);
    console.log(`Copied: ${file}`);
  }
});

console.log("✅ Python files copied successfully!");
