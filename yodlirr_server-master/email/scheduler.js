
var MongoClient = require('mongodb').MongoClient;

var mongo = require('mongodb');
connectionString = "mongodb://yoodle:1234@ds131687.mlab.com:31687/yoodle";
var mailer = require('./emailService');

Date.prototype.formatMMDDYYYY = function () {
    var month = this.getMonth() + 1
    if (month < 10) {
        month = "0" + month.toString()
    }
    return (month) +
        "/" + this.getDate() +
        "/" + this.getFullYear();
}

function takeRemaninderIds() {

    MongoClient.connect(connectionString).
        then(function (db) {
            var cursor = db.collection('emails').find({ $and: [{ date: { $gt: new Date().formatMMDDYYYY() } }, { isSubmitted: false }] })

            // Execute the each command, triggers for each document
            cursor.each(function (err, email) {
                // If the item is null then the cursor is exhausted/empty and closed
                if (email != null) {
                    sendEmail(email)
                } else {
                    db.close()
                }
            })


        })
}

function sendEmail(email) {

    var mailOptions = {
        from: 'shalin.ebay1@gmail.com',
        to: email.to,
        subject: 'Sending Email using Node.js',
        text: email.body
    };

    mailer.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.send(info.response);
        }
    });

}

var scheduler = {}
scheduler.run = function () {
    try {
        takeRemaninderIds();
    } catch (err) {
        console.log(err)
    }
   
}

module.exports = scheduler