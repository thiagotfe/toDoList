import Sequelize, { Model } from 'sequelize';

export default class ToDoList extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: "ToDoList's name must be between 3 and 255 caracters",
          },
        },
      },
      delivery_date: {
        type: Sequelize.DATEONLY,
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

  static associate(models) {
    this.hasMany(models.Task, { foreignKey: 'to_do_list_id' });
  }
}
