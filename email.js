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

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

// Function to send an email using AWS SES
function sendEmail() {
  const params = {
    Destination: {
      ToAddresses: ['srivastavashubham2003@gmail.com'] // Replace with the recipient email address
    },
    Message: {
      Body: {
        Text: {
          Data: 'Hello, this is the email content.' // Replace with the email content
        }
      },
      Subject: {
        Data: 'try' // Replace with the email subject
      }
    },
    Source: 'srivastavashubham12003@gmail.com' // Replace with the sender email address
  };

  return ses.sendEmail(params).promise()
    .then(data => {
      console.log("Email sent successfully");
    })
    .catch(err => {
      console.log("Error: " + err);
      throw err;
    });
}

// Route to trigger email sending
app.get('/send-email', (req, res) => {
  sendEmail()
    .then(() => {
      res.send("Email sent successfully");
    })
    .catch(err => {
      res.status(500).send("Failed to send email: " + err);
    });
});



// Start the Express.js server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
