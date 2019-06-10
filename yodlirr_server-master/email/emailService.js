var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'shalin.ebay1@gmail.com',
      pass: '90130111055'
    }
  });
module.exports=transporter;