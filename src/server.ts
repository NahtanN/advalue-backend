import 'dotenv/config'

import chalk from 'chalk';
import express from 'express';
import 'express-async-errors';
import path from 'path';
import { routes } from './routes';
import handler from './errors/handler';

import './database/connection';

const port = process.env.PORT || 3333;

const app = express();

app.use(express.json());
app.use(routes);
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.use(handler);

app.listen(port, () => console.log(`Server is running on port ${chalk.green(port)}`));