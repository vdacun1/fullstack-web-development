const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();
dotenv.config();
app.use(express.json());

const mongoHost = process.env.MONGO_HOST;
const mongoPort = process.env.MONGO_PORT;
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoDatabase = process.env.MONGO_DB;
const mongoURI = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDatabase}`;

mongoose.connect(mongoURI).then(() => {
  console.log('Connected to MongoDB');
  const UserSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
    },
    email_verification_code: {
      type: String,
    },
  });

  const UserModel = mongoose.model('User', UserSchema);

  app.post('/user/email_verification_code', async (req, res) => {
    let { email } = req.body;
    email = email.toLowerCase();
    const user = await UserModel.findOne({ email });

    const { email_verification_code } = user;

    res
      .status(200)
      .json({
        email_verification_code,
      })
      .send();
  });

  app.listen(32869, () => {
    console.log('Service is running on port 32869');
  });
});
