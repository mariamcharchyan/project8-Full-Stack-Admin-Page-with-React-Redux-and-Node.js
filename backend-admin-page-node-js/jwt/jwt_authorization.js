require("dotenv").config();
const jwt = require('jsonwebtoken')
const { User } = require('../models/users_schema') 

function checkStatusAdmin(req, res, next) {
  const token = req.headers.authorization
  const decoded = jwt.decode(token)
  const email = decoded.email

  User.findOne({
    where: { email },
  }).then(user => {
    if (!user || user.status !== 'admin') {
      return res.sendStatus(403)
    }
    next()
  }).catch(err => {
    console.error(err)
    return res.sendStatus(500)
  })
}

function checkStatusUser(req, res, next) {
  const token = req.headers.authorization
  const decoded = jwt.decode(token)
  const email = decoded.email

  User.findOne({
    where: { email },
  }).then(user => {
    if (!user || user.status !== 'user') {
      return res.sendStatus(403)
    }
    next()
  }).catch(err => {
    console.error(err)
    return res.sendStatus(500)
  })
}

module.exports = {
  checkStatusAdmin,
  checkStatusUser
};