import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import ToDoList from '../models/ToDoList';
import Task from '../models/Task';

const models = [ToDoList, Task];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
