import 'dotenv/config'

import chalk from 'chalk';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import path from 'path';
import { routes } from './routes';
import handler from './errors/handler';
import mongoose from 'mongoose';

const port = process.env.PORT || 3333;

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.use(handler);

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log(chalk.green('Database connected'))
    app.listen(port, () => console.log(`${chalk.green('Server is running')}`));
}).catch(err => {
    console.log(chalk.red('Error:'))
    console.log(err)
});