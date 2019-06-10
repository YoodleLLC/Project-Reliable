var express = require('express');
var rfpsRouter = express.Router();
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors');
var mongo=require('mongodb');
connectionString="mongodb://yoodle:1234@ds131687.mlab.com:31687/yoodle";
var authenticate=require('../../common/authenticate');
// middleware specific to this router
rfpsRouter.use(function timeLog (req, res, next) {
    authenticate(req,res,next) 
  });

  var RFP="rfp"
  // Get  user by id
  rfpsRouter.post('/getByVendorId', function (req, res) {   
    //connect to Mongo Client
    console.log(req.body.vendorId)
   MongoClient.connect(connectionString).
   then(function(db){
       //db.collection(RFP).find({vendorId:req.body.vendorId}).toArray().
       db.collection(RFP).find({vendorId:req.body.vendorId}).toArray().
       then(function(data,err){
           res.send( JSON.stringify(data));
       });
   });
 });

 rfpsRouter.post('/getById', function (req, res) {   
    //connect to Mongo Client
    console.log(req.body.id)
   MongoClient.connect(connectionString).
   then(function(db){
       //db.collection(RFP).find({vendorId:req.body.vendorId}).toArray().
       db.collection(RFP).find({vendorId:req.body.id}).toArray().
       then(function(data,err){
           res.send( JSON.stringify(data));
       });
   });
 });


 rfpsRouter.post('/attach', function (req, res) {   
    
     let rfp=req.body.RFP
        //connect to Mongo Client
      MongoClient.connect(connectionString).
      then(function(db){
          db.collection(RFP).insertOne(rfp,(err, r) =>{
            if (err) throw err;
              console.log(rfp+" is inserted");
              db.close();            
              res.send(r);
          });
      }).catch(err=>{
          console.log(err);
          throw err;
      }
      );
})

rfpsRouter.post('/delete', function (req, res) { 
    let _id=new mongo.ObjectID(req.body.id)  
       //connect to Mongo Client
     MongoClient.connect(connectionString).
     then(function(db){
         db.collection(RFP).deleteOne({_id},(err, r) =>{
           if (err) throw err;
             console.log(req.body.id+" is deleted");
             db.close();            
              res.send(r);
         });
     }).catch(err=>{
         console.log(err);
         throw err;
     }
     );
})


function MongoException(msg){
    this.msg=msg;
    this.name="Mongo Exception";
}

module.exports=rfpsRouter;