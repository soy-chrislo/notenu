import { Express } from 'express';
import listEndpoints from 'express-list-endpoints';

export default function showEndpoints(app: Express) {
  // const endpoints = app._router.stack
  //   .filter((r: any) => r.route)
  //   .map((r: any) => {
  //     return {
  //       method: Object.keys(r.route.methods)[0].toUpperCase(),
  //       path: r.route.path
  //     };
  //   });

  const endpoints: String[] = listEndpoints(app).map((endpoint) => `${endpoint.methods} - ${endpoint.path}`);
  console.log(endpoints);
}

