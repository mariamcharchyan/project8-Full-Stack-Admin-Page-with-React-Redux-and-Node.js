const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_generate = require('../jwt/jwt_generate');
const mailer = require('../mailer/mailer');
const { User } = require('../models/users_schema');

const SECRET = process.env.SECRET
const saltRounds = 10;

async function register_user(req, res) {
  try {
    const { name, surename, age, gender, email, password, image } = req.body;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashed_password = await bcrypt.hash(password, salt);
    console.log({hashed_password:hashed_password});

    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.send(JSON.stringify({ status: 'Email already exists' }));
    }
   
    const newUser = await User.create({
      name,
      surename,
      age,
      gender,
      email,
      password: hashed_password,
      image
    });

    console.log(newUser);

    const token = jwt_generate.generateAccessToken(email);
     mailer.send_Mail(email, token);

    return res.send(JSON.stringify({ status: 'user', createdData: "newUser", token}));
  } catch (error) {
    console.error(error);
    return res.send(JSON.stringify({ status: 'Error Registering' }));
  }
}


async function login_user(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(201).json({ status: 'Wrong email' });
    }

    const match = await bcrypt.compare(password, user.password);
    console.log(user.password);
    console.log(match);
    if (!match) {
      return res.status(201).json({ status: 'Wrong password' });
    }

    const token = jwt_generate.generateAccessToken(email);
    return res.status(201).json({
      status: user.status,
      token 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}

async function get_user_by_email_and_password(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(201).json({ status: 'Wrong email' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(201).json({ status: 'Wrong password' });
    } else {
      res.send(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  register_user,
  login_user,
  get_user_by_email_and_password
}