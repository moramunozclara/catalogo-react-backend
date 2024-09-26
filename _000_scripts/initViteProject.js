const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Solicita el nombre del proyecto al usuario
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question('Introduce el nombre de tu proyecto Vite: ', (projectName) => {
  try {
    // Crear el proyecto Vite
    execSync(`npm create vite@latest ${projectName}`, { stdio: 'inherit' });

    // Navegar al directorio del proyecto
    process.chdir(projectName);

    // Instalar dependencias
    execSync('npm install', { stdio: 'inherit' });

    // Crear la estructura de carpetas en src/lib
    const libDir = path.join('src', 'lib');
    const subDirs = ['context', 'data', 'hooks', 'routes'];

    subDirs.forEach((dir) => {
      const fullPath = path.join(libDir, dir);
      fs.mkdirSync(fullPath, { recursive: true });
    });

    console.log('Estructura de carpetas lib creada correctamente.');

    // Crear las carpetas pages y components dentro de src
    const srcSubDirs = ['pages', 'components'];

    srcSubDirs.forEach((dir) => {
      const fullPath = path.join('src', dir);
      fs.mkdirSync(fullPath, { recursive: true });
    });

    console.log('Carpetas pages y components creadas correctamente.');

    // Renombrar App.jsx a Layout.jsx
    const srcDir = path.join('src');
    const appFile = path.join(srcDir, 'App.jsx');
    const layoutFile = path.join(srcDir, 'Layout.jsx');

    if (fs.existsSync(appFile)) {
      fs.renameSync(appFile, layoutFile);
      console.log('App.jsx ha sido renombrado a Layout.jsx.');
    } else {
      // Si no existe App.jsx, crear Layout.jsx
      const layoutContent = `
        import React from 'react';
        import { Outlet } from 'react-router-dom';

        const Layout = () => {
          return (
            <div>
              <header>
                {/* Aquí puedes poner tu barra de navegación */}
              </header>
              <main>
                <Outlet /> {/* Renderiza las rutas hijas */}
              </main>
              <footer>
                {/* Pie de página */}
              </footer>
            </div>
          );
        };

        export default Layout;
      `;
      fs.writeFileSync(layoutFile, layoutContent.trim());
      console.log('Layout.jsx ha sido creado.');
    }

    // Modificar main.jsx para usar Layout.jsx en lugar de App.jsx
    const mainFile = path.join(srcDir, 'main.jsx');
    if (fs.existsSync(mainFile)) {
      let mainContent = fs.readFileSync(mainFile, 'utf8');
      mainContent = mainContent.replace('./App.jsx', './Layout.jsx');
      mainContent = mainContent.replace('App', 'Layout');
      fs.writeFileSync(mainFile, mainContent);
      console.log('main.jsx ha sido actualizado para usar Layout.jsx.');
    }

    // Iniciar el servidor de desarrollo
    execSync('npm run dev', { stdio: 'inherit' });
  } catch (error) {
    console.error('Ocurrió un error:', error);
  } finally {
    readline.close();
  }
});
