import Sequelize, { Model } from 'sequelize';

export default class Task extends Model {
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
      to_do_list_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'task need a toDoList reference',
          },
        },
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
    this.belongsTo(models.ToDoList, { foreignKey: 'to_do_list_id' });
  }
}
