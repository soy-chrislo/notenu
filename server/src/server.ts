import dotenv from "dotenv";
import express, { type Express } from "express";
import cors from "cors";
import router from "./routes/router";
import { showEndpoints } from "./utils";


// showEndpoints solucionado.
/*
Desahabilitando reglas incompatibles del linter:
- typescript-eslint/no-misused-promises
- @typescript-eslint/no-var-requires
*/
// Login genera jwt si el usuario y contraseña son correctos.
// /api/login/verify valida con exito el jwt.


// Todo: Ya se recibe la jwt y se guarda, pero las rutas protegidas no funcionan bien.
dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);

  console.log('Endpoints: ', showEndpoints(app));
});

