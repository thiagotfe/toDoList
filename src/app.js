import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

dotenv.config();

import './database';
import express from 'express';
// import tasksRoutes from './routes/tasksRoutes';
import toDoListRoutes from './routes/toDoListRoutes';

const corsOptions = {
  origin: '*',
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet({ crossOriginEmbedderPolicy: false }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/toDoList', toDoListRoutes);
  }
}

export default new App().app;
