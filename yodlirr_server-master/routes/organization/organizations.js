var express = require('express');
var organizationsRouter = express.Router();
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors');
var authenticate=require('../../common/authenticate');

connectionString="mongodb://yoodle:1234@ds131687.mlab.com:31687/yoodle";

// middleware specific to this router
organizationsRouter.use(function timeLog (req, res, next) {
    authenticate(req,res,next) 
  });

  // Get all organizations
  organizationsRouter.get('/all', function (req, res) {   
    //connect to Mongo Client
   MongoClient.connect(connectionString).
   then(function(db){
       db.collection("organizations").find({}).toArray().
       then(function(data,err){
           res.send(data);
       });
   }).catch(err=>{
       console.log(err)
       res.send(409,err)
   });
 });

  // Get  user by id
  organizationsRouter.get('/:id', function (req, res) {   
    //connect to Mongo Client
   MongoClient.connect(connectionString).
   then(function(db){
       db.collection("organizations").find({_id:req.params.id}).toArray().
       then(function(data,err){
           res.send(data);
       });
   }).catch(err=>{
    console.log(err)
    res.send(409,err)
});
 });
   // Get  user by id
   organizationsRouter.post('/add', function (req, res) {   
       try {
        res.send(AddOrgnaization(req.body.organization));
       } catch (err) {
           console.log(err)
           res.send(409,err)
       }
     
 });

   // Get  user by id
   organizationsRouter.post('/update', function (req, res) {   
       try {
        res.send(UpdateOrgnaization(req.body.organization));
       }catch (err) {
        console.log(err)
        res.send(409,err)
    }
    
});

 function UpdateOrgnaization(organization){
    //connect to Mongo Client
    MongoClient.connect(connectionString).
    then(function(db){
        db.collection("organizations").updateOne(organization._id.organization,(err, res) =>{
          if (err) throw err;
            console.log("organization" +organization._id +" is updated");
            db.close();            
            return res;
        });
    }).catch(err=>{
        console.log(err);
        throw err;
    }
    );
 }

 function AddOrgnaization(organization){
    //connect to Mongo Client
    MongoClient.connect(connectionString).
    then(function(db){
        db.collection("organizations").insert(organization,(err, res) =>{
          if (err) throw err;
            console.log("organization" +organization._id +" is inserted");
            db.close();            
            return res;
        });
    }).catch(err=>{
        console.log(err);
        throw err;
    }
    );
 }
 

function MongoException(msg){
    this.msg=msg;
    this.name="Mongo Exception";
}

module.exports=organizationsRouter;