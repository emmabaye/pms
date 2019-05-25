import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from "helmet";
import bodyParser from 'body-parser';
import routes from './routes/v1/index';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(cors({ credentials: true, origin: true }));
app.use('/', express.static(`${process.cwd()}/dist`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes(app);

app.listen(port, () => {
  console.log('Server listening on port ', port);
});

export default app;
