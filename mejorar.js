// mejorar.js
import fs from "fs";
import path from "path";
import axios from "axios";
import inquirer from "inquirer";
import { fileURLToPath } from "url";
import { config } from "dotenv";

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COMPONENTS_DIR = path.join(__dirname, "src", "componentes");
const VIEWS_DIR = path.join(__dirname, "src", "views");

const API_KEY = process.env.DEEPSEEK_API_KEY || "sk-6dfdb79cd51f4fce93f8e74945751519";

const PROMPT = `
Necesito que completes todo el menu de la aplicación, al menos 10 items con iconos. haceme un menu profesional en base a lo que ya esta
-utilizar tailwindcss
-iconos
-animaciones

Entrega SOLO el código final completo en un solo bloque sin explicaciones.
`;



function getVueFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter(file => file.endsWith(".vue"))
    .map(file => ({ name: file, path: path.join(dir, file) }));
}

async function promptForDirectory() {
  const { location } = await inquirer.prompt([
    {
      type: "list",
      name: "location",
      message: "¿Qué deseas mejorar?",
      choices: [
        { name: "Componente (src/componentes)", value: COMPONENTS_DIR },
        { name: "Vista (src/views)", value: VIEWS_DIR },
      ],
    },
  ]);
  return location;
}

async function promptForFile(files) {
  const { selected } = await inquirer.prompt([
    {
      type: "list",
      name: "selected",
      message: "¿Cuál deseas mejorar?",
      choices: files.map(f => f.name),
    },
  ]);
  return files.find(f => f.name === selected);
}

async function callDeepSeekAPI(content) {
  const response = await axios.post(
    "https://api.deepseek.com/v1/chat/completions",
    {
        //  model: "deepseek-coder",
         model: "deepseek-reasoner",
         max_tokens: 8000,
      messages: [
        { role: "system", content: PROMPT },
        { role: "user", content },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.choices[0].message.content;
}

function getBackupPath(filePath) {
  const isComponent = filePath.includes("/componentes");
  const id = path.basename(filePath, ".vue");
  const now = new Date();
  const formatted = now.toISOString().replace(/T/, "_").replace(/:/g, "-").split(".")[0];

  const backupFolder = isComponent
    ? path.join(COMPONENTS_DIR, "backups")
    : path.join(VIEWS_DIR, "backups");

  if (!fs.existsSync(backupFolder)) fs.mkdirSync(backupFolder, { recursive: true });

  return path.join(backupFolder, `${id}_${formatted}.vue`);
}

async function main() {
  console.log("📂 Cargando carpetas...\n");

  const targetDir = await promptForDirectory();

  console.log("📁 Buscando archivos .vue...\n");

  const vueFiles = getVueFiles(targetDir);
  if (vueFiles.length === 0) {
    console.log("⚠️ No se encontraron archivos .vue en la ruta seleccionada.");
    return;
  }

  const selected = await promptForFile(vueFiles);
  const originalContent = fs.readFileSync(selected.path, "utf8");

  console.log(`📤 Enviando ${selected.name} a DeepSeek para mejorar...\n`);
  try {
    const improved = await callDeepSeekAPI(originalContent);

    const { confirm } = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirm",
        message: `¿Deseas sobrescribir ${selected.name} con la versión mejorada?`,
      },
    ]);

    if (confirm) {
      const backupPath = getBackupPath(selected.path);
      fs.writeFileSync(backupPath, originalContent, "utf8");

      fs.writeFileSync(selected.path, improved, "utf8");

      console.log(`✅ ${selected.name} mejorado y sobrescrito.`);
      console.log(`🗂 Backup guardado en: ${backupPath}`);
    } else {
      console.log("❌ No se hicieron cambios.");
    }
  } catch (err) {
    console.error("❌ Error al llamar a DeepSeek:", err.response?.data || err.message);
  }
}

main();
