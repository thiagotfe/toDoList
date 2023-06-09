/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable('toDoList', 'to_do_lists');
  },
};
