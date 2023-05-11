import fs from "fs";
import path from "path";

import { Router } from "express";

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

const basePath = path.join(__dirname, "..");
const routesPath = path.join(basePath, "routes");
const basename = path.basename(__filename);

const routeFiles = fs.readdirSync(routesPath).filter((file) => {
  return file !== basename;
});

// async function registerRoute(routeFile: string): Promise<void> {
//   const filename = routeFile.split(".")[0];
//   const filePath = path.join(routesPath, routeFile);
//   const route = await import(filePath);
//   console.info(`Route ${filename} loaded`);
//   router.use(`/${filename}`, route);
// }

routeFiles.forEach((file) => {
  const filename = file.split(".")[0];
  const filePath = path.join(routesPath, file);
 
  // registerRoute(file).then(
  //   () => {},
  //   () => {}
  // );

  // ! The only way it works with express-list-endpoints
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  router.use(`/${filename}`, require(filePath).default);

  // import(filePath)
  //   .then((route) => {
  //     console.info(`Route ${filename} loaded`);
  //     router.use(`/${filename}`, route.default);
  //   })
  //   .catch((err) => {
  //     console.error(`Unable to load route ${filename}: ${JSON.stringify(err)}`);
  //   });
  // console.info(`Route ${filename} loaded`);
  
});

export default router;
