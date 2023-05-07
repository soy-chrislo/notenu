import dotenv from 'dotenv'
import express, { Express } from 'express'
import cors from 'cors'
import router from './routes/router';
import { showEndpoints } from './utils';

dotenv.config()

const app: Express = express();
const port = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', router);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)

  showEndpoints(app);
})
