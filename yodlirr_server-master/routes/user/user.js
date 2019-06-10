

var express = require('express');
var usersRouter = express.Router();
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors');
connectionString = "mongodb://yoodle:1234@ds131687.mlab.com:31687/yoodle";
var authenticate = require('../../common/authenticate');
var mailer = require('../../email/emailService')
// middleware specific to this router
usersRouter.use(function timeLog(req, res, next) {
  authenticate(req, res, next)
});

var users = [];


// Get  user by id
usersRouter.get('/all', function (req, res) {
  //connect to Mongo Client
  MongoClient.connect(connectionString).
    then(function (db) {
      db.collection("users").find({}).toArray().
        then(function (data, err) {
          console.dir(data[0].fname)
          res.send(data[0].fname)
        });
    }).catch(err => {
      console.log(err)
      res.send(409, err)
    });
});


usersRouter.post('/authenticate', function (req, res) {
  let suc = JSON.stringify({ message: "Yoooo" })
  let err = JSON.stringify({ message: "Error" })

  if (req.session.user) {
    res.send(JSON.stringify(req.session.user));
  } else {
    Authenticate(req.body.user, function (data, user) {
      if (data.isValidate) {
        let sessionUser = {
          id: user._id.toString(),
          username: user.username,
          pass: user.pass,
          orgID: user.organizationId
        }
        req.session.user = sessionUser;
        res.send(JSON.stringify(req.session.user));
      } else {
        res.status(401).send(data);
      }
    });
  }

});

usersRouter.post('/adduser', function (req, res) {
  res.send(AddUser(req.body.user));
});

usersRouter.get('/getevaluators', function (req, res) {

  try {
    MongoClient.connect(connectionString).
      then(function (db) {
        db.collection('users').find({ role: '2' }, { fname: 1, lname: 1, email: 1 }).toArray().
          then(function (data, err) {
            console.dir(data);
            res.send(data);
          }).catch(err => console.log(err))
      });
  } catch (err) {
    console.log(err)
    res.send(409, err)
  };

});

usersRouter.get('/getprocurementofficers', function (req, res) {

  MongoClient.connect(connectionString).
    then(function (db) {
      db.collection('users').find({ role: '3' }, { fname: 1, lname: 1, email: 1 }).toArray().
        then(function (data, err) {
          console.dir(data);
          res.send(data);
        }).catch(err => console.log(err));
    }).catch(err => {
      console.log(err)
      res.send(409, err)
    });;
});

usersRouter.post('/updateuser', function (req, res) {
  res.send(UpdateUser(req.body.user));
});

usersRouter.get('/roles', function (req, res) {
  MongoClient.connect(connectionString).
    then(function (db) {
      db.collection("users").find({ organizationId: req.session.user.orgID }, { fname: 1, role: 1 }).toArray().
        then(function (data, err) {
          console.dir(data);
          db.close();
          res.send(data);
        });
    }).catch(err => {
      console.log(err)
      res.send(409, err)
    });;
});

usersRouter.post('/forgotPass', function (req, res) {
  try {
    res.send(ForgotPass(req.body.username))
  } catch (err) {
    console.log(err)
    res.send(409, err)
  };

})

usersRouter.post('/updatePass', function (req, res) {
  try {
    res.send(UpdatePass(req.body.username, req.body.tempPass))
  } catch (err) {
    console.log(err)
    res.send(409, err)
  };

})

usersRouter.get('/org/all', function (req, res) {
  try {
    if (req.session.user.orgID !== undefined) {
      MongoClient.connect(connectionString).
        then(function (db) {
          db.collection("users").find({ organizationId: req.session.user.orgID }).toArray().
            then(function (data, err) {
              console.dir(data);
              db.close();
              res.send(data);
            });
        });
    }
    else {
      res.send(403, "user is not authenticated")
    }
  } catch (err) {
    console.log(err)
    res.send(409, err)
  };


});

function SendForgotPassEmail(username, newPass) {
  var mailOptions = {
    from: 'shalin.ebay1@gmail.com',
    to: username,
    subject: 'Your temparary password',
    text: 'Temparary password is ' + newPass + '.'
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

function UpdateUsersRoles() {
  MongoClient.connect(connectionString).
    then(function (db) {
      db.collection("users").updateMany(user._id, user, (err, res) => {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
      });
    }).catch(err => console.log(err));
}

function UpdateUser(user) {
  MongoClient.connect(connectionString).
    then(function (db) {
      db.collection("users").updateOne(user._id, user, (err, res) => {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
      });
    }).catch(err => console.log(err));
}

function AddUser(user) {
  MongoClient.connect(connectionString).
    then(function (db) {
      db.collection("users").insert(user, (err, res) => {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
      });
    }).catch(err => console.log(err));
}

function ForgotPass(username) {
  MongoClient.connect(connectionString).
    then(function (db) {
      db.collection("users").findOne({ username }, (err, res) => {
        if (err) throws(err)

        let tempPass = RendomPassGenerator();
        db.collection("users").updateOne({ username }, { $set: { pass: tempPass } }, (err, updateRes) => {
          if (err) throws(err)
          console.log(updateRes)
          SendForgotPassEmail(username, tempPass)
        })
        return res
      })
    }).catch(err => console.log(err));
}

function UpdatePass(username, tempPass) {
  MongoClient.connect(connectionString).
    then(function (db) {
      db.collection("users").updateOne({ username }, { $set: { pass: tempPass } }, (err, updateRes) => {
        if (err) throws(err)
        console.log(updateRes)
        return updateRes
      })
    }).catch(err => console.log(err));
}

function Authenticate(user, callback) {
  let pass;
    //connect to Mongo Client
    MongoClient.connect(connectionString).
      then(function (db) {
        db.collection("users").find({ username: user.username }).toArray().
          then(function (userData, err) {
            let data = {
              isValidate: false,
              message: "initial"
            }
            if (userData.length > 0) {
              if (userData[0].pass == user.pass) {
                console.log("All Goog");
                data.isValidate = true;
                data.message = "User is authenticated";
                callback(data, userData[0]);
              }
              else {
                console.log("Password is incorrect");
                data.isValidate = false;
                data.message = "Password is incorrect";
                callback(data);
              }
            }
            else {
              console.log("Username is not matching");
              data.isValidate = false;
              data.message = "Username is not matching";
              callback(data);
            }
          });
      });
}

function RendomPassGenerator() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  try {
    for (var i = 0; i < 8; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  } catch (error) {
    console.log(error)
  }

}

function MongoException(msg) {
  this.msg = msg;
  this.name = "Mongo Exception";
}

module.exports = usersRouter;