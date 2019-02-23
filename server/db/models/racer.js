const Sequelize = require('sequelize')
const db = require('../db')

const Racer = db.define('racer', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  docusignURL: {
    type: Sequelize.STRING
  },
  paid: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Racer
