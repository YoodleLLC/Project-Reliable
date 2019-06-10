var express = require('express');
var rolesRouter = express.Router();
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors');
var mongo=require('mongodb');
connectionString="mongodb://yoodle:1234@ds131687.mlab.com:31687/yoodle";
var authenticate=require('../../common/authenticate');
// middleware specific to this router
rolesRouter.use(function timeLog (req, res, next) {
    authenticate(req,res,next) 
  });

  // Get  user by id
  rolesRouter.get('/all', function (req, res) {   
    //connect to Mongo Client
   
        MongoClient.connect(connectionString).
        then(function(db){
            db.collection("roles").find({},{ name: { $elemMatch: { type:req.session.user.orgType } }}).toArray().
            then(function(data,err){
                data.map(d=>{
                    d.name=d.name[0].name
                })
                res.send(data);
            });
        });
  
 });

// Get  user by id
rolesRouter.post('/updateRoles', function (req, res) {   
    //connect to Mongo Client
   try {
    var len=req.body.userRoles.length;
    req.body.userRoles.forEach((ur,index) => {

       
        let userID=new mongo.ObjectID(ur._id);
        MongoClient.connect(connectionString).
        then(function(db){
            db.collection("users").updateOne({_id:userID},{$set:{role:ur.role}},function(err,data){
                if (err) throw err;
                console.log(data);   
                if(len==index){
                    res.end();
                }         
            });
        });
    });
      
   } catch (error) {
       console.log(error);
   }
      
  
 });

 
function MongoException(msg){
    this.msg=msg;
    this.name="Mongo Exception";
}

module.exports=rolesRouter;