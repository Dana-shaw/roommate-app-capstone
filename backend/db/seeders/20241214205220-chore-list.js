'use strict';

const { Chore } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Chore.bulkCreate([
      {
        ownerId: 1,
        name: 'Vacuum',
        // assignedTo: 1,
        isCompleted: true
      },
      {
        ownerId: 2,
        name: 'Mop',
        // assignedTo: 2,
        isCompleted: true
      },
      {
        ownerId: 3,
        name: 'Dust and wipe furniture',
        // assignedTo: 3,
        isCompleted: true
      },
      {
        ownerId: 1,
        name: 'Clean oven and microwave',
        // assignedTo: 2,
        dueDate: '2025-01-15',
        isCompleted: false
      },
      {
        ownerId: 2,
        name: 'Clean fridge',
        // assignedTo: 3,
        dueDate: '2025-01-15',
        isCompleted: false
      },
      {
        ownerId: 3,
        name: 'Clean guest bathroom',
        // assignedTo: 1,
        dueDate: '2025-01-15',
        isCompleted: false
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Chores';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
  }
};
