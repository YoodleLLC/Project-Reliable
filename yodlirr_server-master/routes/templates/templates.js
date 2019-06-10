var express = require('express');
var templatesRouter = express.Router();
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors');
var mongo=require('mongodb');
var authenticate=require('../../common/authenticate');
connectionString="mongodb://yoodle:1234@ds131687.mlab.com:31687/yoodle";

// middleware specific to this router
templatesRouter.use(function timeLog (req, res, next) {
    authenticate(req,res,next) 
  });

  // Get  user by id
  templatesRouter.get('/all', function (req, res) {   
    //connect to Mongo Client
   MongoClient.connect(connectionString).
   then(function(db){
       db.collection("templates").find({org}).toArray().
       then(function(data,err){
           db.close();
           res.send(data);          
           
       });
   });
 });

 // Get  user by id
 templatesRouter.get('/names', function (req, res) {   
  //connect to Mongo Client
 MongoClient.connect(connectionString).
 then(function(db){
     db.collection("templates").find({},{name:1}).toArray().
     then(function(data,err){
          db.close();
         res.send(data);         
     });
 });
});

 // Get  user by id
 templatesRouter.get('/info', function (req, res) {   
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
  // Get  user by id
  templatesRouter.get('/:id', function (req, res) {   
    //connect to Mongo Client
    templateId=new mongo.ObjectID(req.params.id);
   MongoClient.connect(connectionString).
   then(function(db){
       db.collection("templates").find({"_id":templateId,orgID:req.session.user.orgID}).toArray().
       then(function(data,err){
           console.log(data)
           db.close();
           res.send(data);
      });
   });
 });

 templatesRouter.post('/addtemplate', function (req, res) { 
    let template=req.body.template;
    template.orgID=req.session.user.orgID
    res.send(addTemplate(template)); 
  });
  
  templatesRouter.post('/updatetemplate', function (req, res) { 
    let template=req.body.template;
    template.orgID=req.session.user.orgID
    res.send(updateTemplate(req.body.template)); 
  });
  
  function updateTemplate(template){
    MongoClient.connect(connectionString).
    then(function(db){
        db.collection("templates").updateOne(template._id,template,(err, res) =>{
          if (err) throw err;
          console.log("1 document updated");
          db.close();
        });
    }).catch(err=>console.log(err));
  }
  
  function addTemplate(template){
    MongoClient.connect(connectionString).
    then(function(db){
        db.collection("templates").insert(template,(err, res) =>{
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
    }).catch(err=>console.log(err));
  }

function MongoException(msg){
    this.msg=msg;
    this.name="Mongo Exception";
}

module.exports=templatesRouter;