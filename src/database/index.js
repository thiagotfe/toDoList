import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Tasks from '../models/Tasks';

const models = [Tasks];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
