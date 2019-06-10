
var express = require('express');
var emailRouter = express.Router();
var cors = require('cors');
var mailer=require('./emailService');
var scheduler=require('./scheduler');
// middleware specific to this router
emailRouter.use(function timeLog (req, res, next) {
  authenticate(req,res,next) 
  });

 // Get all vendors
 emailRouter.post('/run', function (req, res) {   
    
  setInterval(function(){
    scheduler.run()
  },20000);
  
});
  // Get all vendors
  emailRouter.post('/send', function (req, res) {   
    
    var mailOptions = {
      from: 'shalin.ebay1@gmail.com',
      to: 'shalinpatel51@gmail.com',
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
    };

    mailer.sendMail(mailOptions, function(error, info){
      if (error) {
      console.log(error);
      } else {
      console.log('Email sent: ' + info.response);
      res.send(info.response);
      }
  });
    
 });

 


 module.exports=emailRouter;