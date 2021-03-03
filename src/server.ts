import express from 'express';
import chalk from 'chalk';
import './database/connection';
import path from 'path';

import { routes } from './routes';

const port = process.env.PORT || 3333;

const app = express();

app.use(express.json());
app.use(routes);
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.listen(port, () => console.log(`Server is running on port ${chalk.green(port)}`));