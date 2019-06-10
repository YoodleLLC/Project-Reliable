var express = require('express');
var indexRouter = express.Router();
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors');
connectionString="mongodb://yoodle:1234@ds131687.mlab.com:31687/yoodle";
var index={}
// middleware specific to this router
indexRouter.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now());
    next();
  });

  // Get  user by id
  indexRouter.get('/add',cors(), function (req, res) {   
    //connect to Mongo Client    
  MongoClient.connect(connectionString).
  then(function(db){
    db.collection("projects").find({},{_id:1}).toArray().
    then(function(data,err){
      index.projectId=data[0]!=undefined?data[0]._id:"";
    });
    db.collection("organizations").find({},{_id:1}).toArray().
    then(function(data,err){
      index.organizationId=data[0]!=undefined?data[0]._id:"";
    });
    db.collection("responses").find({},{_id:1}).toArray().
    then(function(data,err){
      index.responseId=data[0]!=undefined?data[0]._id:"";
    });
    db.collection("rfp").find({},{_id:1}).toArray().
    then(function(data,err){
      index.rfpId=data[0]!=undefined?data[0]._id:"";
    });
    db.collection("roles").find({},{_id:1}).toArray().
    then(function(data,err){
      index.roleId=data[0]!=undefined?data[0]._id:"";
    });
    db.collection("savedresponses").find({},{_id:1}).toArray().
    then(function(data,err){
      index.savedresponseId=data[0]!=undefined?data[0]._id:"";
    });
    db.collection("tasks").find({},{_id:1}).toArray().
    then(function(data,err){
      index.taskId=data[0]!=undefined?data[0]._id:"";
    });
    db.collection("templates").find({},{_id:1}).toArray().
    then(function(data,err){
      index.templateId=data[0]!=undefined?data[0]._id:"";
    });
    db.collection("users").find({},{_id:1}).toArray().
    then(function(data,err){
      index.userId=data[0]!=undefined?data[0]._id:"";
    });
    db.collection("vendors").find({},{_id:1}).toArray().
    then(function(data,err){
      index.vendorId=data[0]!=undefined?data[0]._id:"";
      db.collection("currentIndex").insert(index,()=>{
        console.log("inserted");
      })
    });
  });

  res.end();
});

 // Get  user by id
 indexRouter.get('/all',cors(), function (req, res) {  
  //connect to Mongo Client
 MongoClient.connect(connectionString).
 then(function(db){
     db.collection("currentIndex").find({}).toArray().
     then(function(data,err){
          db.close();
         res.send(data);         
     });
 });
});

 // Get  user by id
 indexRouter.get('/info',cors(), function (req, res) {   
  //connect to Mongo Client
 MongoClient.connect(connectionString).
 then(function(db){
     db.collection("templates").find({},{name:1,date:1}).toArray().
     then(function(data,err){
         db.close(); 
         res.send(data);        
     });
 });
});

 
  
  indexRouter.post('/update',cors(), function (req, res) { 
    res.send(UpdateIndex(index)); 
  });
  
  function UpdateIndex(index){
    MongoClient.connect(connectionString).
    then(function(db){
        db.collection("currentIndex").updateOne(index._id,index,(err, res) =>{
          if (err) throw err;
          console.log("1 document updated");
          db.close();
        });
    }).catch(err=>console.log(err));
  }
  

function MongoException(msg){
    this.msg=msg;
    this.name="Mongo Exception";
}

module.exports=indexRouter;