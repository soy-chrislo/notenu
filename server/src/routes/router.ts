import fs from 'fs';
import path from 'path';

import { Router } from 'express';

const router = Router();

// const basename = path.basename(__filename);

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file !== basename
//     );
//   })
//   .forEach((file) => {
//     import(path.join(__dirname, file))
//       .then((route) => {
//         console.info(`Route ${file} loaded`);
//         const routeName = file.split('.')[0];
//         router.use(routeName, route.default);
//       })
//       .catch((err) => {
//         console.error(`Unable to load route ${file}: ${err}`);
//       });
//   });

const basePath = path.join(__dirname, '..');
const routesPath = path.join(basePath, 'routes');
const basename = path.basename(__filename);

const routeFiles = fs.readdirSync(routesPath).filter((file) => {
  return file !== basename;
});

routeFiles.forEach((file) => {
  const filename = file.split('.')[0];
  const filePath = path.join(routesPath, file);
  router.use(`/${filename}`, require(filePath).default);
  console.info(`Route ${filename} loaded`);
});

export default router;