const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');
const readline = require('readline');

// Función para leer el nombre del proyecto desde la consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Ingrese el nombre del proyecto: ', (projectName) => {
  if (!projectName) {
    console.log('Por favor, ingrese un nombre de proyecto válido.');
    rl.close();
    return;
  }

  const projectPath = path.join(process.cwd(), projectName);

  // Crear la carpeta del proyecto
  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath);
  }

  // Cambiar al directorio del proyecto
  process.chdir(projectPath);

  // Inicializar npm en el proyecto
  execSync('npm init -y', { stdio: 'inherit' });

  // Instalar express, cors y nodemon
  execSync('npm install express cors', { stdio: 'inherit' });
  execSync('npm install --save-dev nodemon', { stdio: 'inherit' });

  // Configurar el proyecto para usar módulos ES y scripts personalizados
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  packageJson.type = 'module';
  packageJson.scripts = {
    start: 'node index.js',
    dev: 'nodemon index.js',
  };
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

  // Crear archivos y carpetas necesarios
  const createFile = (filePath, content = '') => {
    fs.writeFileSync(filePath, content, { flag: 'w' });
  };

  const createFolder = (folderPath) => {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  };

  // Crear estructura de archivos y carpetas
  createFile(
    'index.js',
    `// ES MODULES\nimport express from 'express';\nimport cors from 'cors';\n\n// importar data del json (incluir .js)\nimport { } from './data/mockData.js';\n\n// importar rutas\nimport indexRoutes from './routes/index.routes.js';\n\n// helpers /o/ utilities\nimport { } from './utils/utils.js';\n\nconst app = express();\n\n// ---------------------------\n//        Middlewares\n// ---------------------------\napp.use(cors());\napp.use(express.json());\napp.use("API/v1/", indexRoutes);\n\nconst PORT = process.env.PORT || 3000;\n\n// Aviso en consola\napp.listen(PORT, () => {\n  console.log(\`Servidor iniciado en \${PORT}\`);\n});\n\n// ---------------------------\n//          RUTAS\n// ---------------------------\n`
  );

  createFolder('data');
  createFile(path.join('data', 'mockData.js'), '// Aquí puedes agregar tus datos simulados\n');

  createFolder('routes');
  createFile(
    path.join('routes', 'index.routes.js'),
    `import { Router } from 'express';\nconst router = Router();\n\n// Define tus rutas aquí\n\nexport default router;\n`
  );

  createFolder('utils');
  createFile(path.join('utils', 'utils.js'), '// Funciones de utilidad\n');

  console.log(`Proyecto backend '${projectName}' creado con éxito en ${projectPath}`);
  rl.close();
});
