/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('toDoList', 'delivery_date', {
      type: Sequelize.DATEONLY,
      allowNull: true,
    });
  },
};
