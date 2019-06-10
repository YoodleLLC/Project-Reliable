var express = require('express');
var savedResponseRouter = express.Router();
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors');
var mongo=require('mongodb');
connectionString="mongodb://yoodle:1234@ds131687.mlab.com:31687/yoodle";
var authenticate=require('../../common/authenticate');
var savedresponses="savedresponses";

// middleware specific to this router
savedResponseRouter.use(function timeLog (req, res, next) {
    authenticate(req,res,next) 
  });

  

  // Get all vendors
  savedResponseRouter.get('/all', function (req, res) {   
    //connect to Mongo Client
   MongoClient.connect(connectionString).
   then(function(db){
       db.collection(savedResponseRouter).find({}).toArray().
       then(function(data,err){
           res.send(data);
       });
   });
 });

 
  
   //Get  user by id
   savedResponseRouter.post('/addupdate', function (req, res) { 
    if(req.body.savedResponses!=undefined ){ 
        req.body.savedResponses.evaluatorId=req.session.user.id;      
    MongoClient.connect(connectionString).
            then(function(db){

       db.collection(savedresponses).find({taskId:req.body.savedResponses.taskId,evaluatorId:req.session.user.id}).toArray().
        then(function(data,err){
            
            if(data==undefined || data.length<=0){
                res.send(AddSavedResponse(req.body.savedResponses))
            }else{
                res.send(UpdateSavedResponseRouter(req.body.savedResponses))
            }
        });
       }
    )}
     
 });

 function getVendor(taskId){
   
 }

// Get  user by id
savedResponseRouter.get('/getresponses/:id', function (req, res) {   
    console.log("Called");
    //connect to Mongo Client
   MongoClient.connect(connectionString).
   then(function(db){
       //change taskid and evaluatorid using sessions
       db.collection(savedresponses).find({taskId:req.params.id,evaluatorId:req.session.user.id}).toArray().
       then(function(data,err){
           res.send(data);
       });       
   });
 });

 


 function AddSavedResponse(sResponses){
     
    //Need to chage Static value to evaulator ID using session
    console.log("called")
    console.log(sResponses);   
    var tId=new mongo.ObjectID(sResponses.taskId);
    //connect to Mongo Client
    MongoClient.connect(connectionString).
    then(function(db){
        db.collection("tasks").find({_id:tId},{vendor:1}).toArray().
        then(function(data,err){
            if (err) throw err;
            console.log(data);
                sResponses.vendor=data[0].vendor;
                db.collection(savedresponses).insertOne(sResponses,(err, res) =>{
                    if (err) throw err;
                    console.log(sResponses.evaluatorId+" is inserted");
                    getVendor()
                    db.close();            
                    return JSON.stringify(res) ;
                });           
        });
    });

    //connect to Mongo Client
    MongoClient.connect(connectionString).
    then(function(db){
        
    }).catch(err=>{
        console.log(err);
        throw err;
    }
    );
 }
 

 function UpdateSavedResponseRouter(sResponses){     
    //connect to Mongo Client
    console.dir(sResponses)
    MongoClient.connect(connectionString).
    then(function(db){
        db.collection(savedresponses).update({taskId:sResponses.taskId,evaluatorId:sResponses.evaluatorId},{$set:{fields:sResponses.fields}},(err, res) =>{
          if (err) throw err;
            console.log(savedresponses+" is updated");
            db.close();            
             return JSON.stringify(res) ;;
        });
    }).catch(err=>{
        console.log(err);
        throw err;
    }
    );
 }
 
  // Get  user by id
savedResponseRouter.post('/byID', function (req, res) {   
    //connect to Mongo Client
   MongoClient.connect(connectionString).
   then(function(db){
       db.collection(savedresponses).find({taskId:req.body.id}).toArray().
       then(function(data,err){
           if (err) {
               console.log(err)
               throw err
           }
           res.send(JSON.stringify(data[0]));
       });
   });
 });
 
 // Get  user by id
savedResponseRouter.get('/:id', function (req, res) {   
    //connect to Mongo Client
   MongoClient.connect(connectionString).
   then(function(db){
       db.collection(savedresponses).find({_id:req.params.id}).toArray().
       then(function(data,err){
           res.send(data);
       });
   });
 });

function MongoException(msg){
    this.msg=msg;
    this.name="Mongo Exception";
}

module.exports=savedResponseRouter;