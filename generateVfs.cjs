// generateVfs.js
const fs = require("fs");
const path = require("path");

// folder where your fonts are stored
const fontsPath = path.join(__dirname, "src/fonts");

// load fonts into base64
const fonts = {
  "Amiri-Regular.ttf": fs.readFileSync(path.join(fontsPath, "Amiri-Regular.ttf")).toString("base64"),
  "Amiri-Bold.ttf": fs.readFileSync(path.join(fontsPath, "Amiri-Bold.ttf")).toString("base64"),
};

// output file
const outFile = path.join(__dirname, "src/vfs_fonts.js");

fs.writeFileSync(
  outFile,
  `const vfs = ${JSON.stringify(fonts)};\nexport default { pdfMake: { vfs } };`
);

console.log("✅ vfs_fonts.js generated at src/vfs_fonts.js");
