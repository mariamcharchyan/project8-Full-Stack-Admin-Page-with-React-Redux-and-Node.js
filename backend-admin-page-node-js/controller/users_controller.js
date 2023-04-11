const bcrypt = require('bcrypt');
const jwt_generate = require('../jwt/jwt_generate');
const mailer = require('../mailer/mailer');
const { User } = require('../models/users_schema');

async function register_user(req, res) {
  const { name, surename, age, gender, email, password } = req.body;
  const hashed_password = await bcrypt.hash(password, 10);

  try {
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
    });

    const token = jwt_generate.generateAccessToken(email);
     mailer.send_Mail(email, token);

    return res.send(JSON.stringify({ status: 'User Created', createdData: newUser}));
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
      return res.status(201).json({ status: 'Wrong credentials' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(201).json({ status: 'Wrong credentials' });
    }

    const token = jwt_generate.generateAccessToken(email);
    return res.status(201).json({ status: 'Logged in', jwt: token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  register_user,
  login_user,
}