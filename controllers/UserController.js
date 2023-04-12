const { UserModel } = require('../db/sequelize')
const { Op, UniqueConstraintError, ValidationError } = require('sequelize');

exports.findAllcoworkings = (req, res) => {
  console.log('hello');
}