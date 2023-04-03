import Sequelize, { Model } from 'sequelize';

export default class Tasks extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: "Task's name must be between 3 and 255 caracters",
          },
        },
      },
      deliveryDate: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
          isInt: {
            msg: 'Status must be integer',
          },
        },
      },
    }, {
      sequelize,
    });
    return this;
  }
}
