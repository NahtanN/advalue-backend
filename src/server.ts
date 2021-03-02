import express from 'express';
import chalk from 'chalk';
import './database/connection';

import { routes } from './routes';

const port = process.env.NODE_ENV || 3333;

const app = express();

app.use(express.json());
app.use(routes);

app.listen(port, () => console.log(`Server is running on port ${chalk.green(port)} `));