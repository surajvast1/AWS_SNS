const express = require("express");
const app = express();
const AWS = require('aws-sdk');
require('dotenv').config();

const PORT = 3000;

// Configure AWS SDK with your credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

// Function to generate a random number
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Function to send OTP using AWS-SNS
function sendOTP() {
  var mobileNo = "+919892836253";
  var OTP = generateRandomNumber(1000, 9999);

  var params = {
    Message: "Welcome! Your mobile verification code is: " + OTP + " Mobile Number is: " + mobileNo,
    PhoneNumber: mobileNo
  };

  return new AWS.SNS({ apiVersion: '2010-03-31' })
    .publish(params)
    .promise()
    .then(message => {
      console.log("OTP SEND SUCCESS");
    })
    .catch(err => {
      console.log("Error: " + err);
      throw err;
    });
}

// Route to trigger OTP sending
app.get('/send-otp', (req, res) => {
  sendOTP()
    .then(() => {
      res.send("OTP sent successfully");
    })
    .catch(err => {
      res.status(500).send("Failed to send OTP: " + err);
    });
});

// Start the Express.js server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
