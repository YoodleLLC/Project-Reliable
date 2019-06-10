var express = require('express');
var vendorRouter = express.Router();
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors');
connectionString="mongodb://yoodle:1234@ds131687.mlab.com:31687/yoodle";
var authenticate=require('../../common/authenticate');
// middleware specific to this router
vendorRouter.use(function timeLog (req, res, next) {
    authenticate(req,res,next);
  });

  // Get all vendors
  vendorRouter.get('/all', function (req, res) {   
    //connect to Mongo Client
   MongoClient.connect(connectionString).
   then(function(db){
       db.collection("vendors").find({}).toArray().
       then(function(data,err){
           res.send(data);
       });
   }).catch(err=>{
       console.log(err)
       res.send(404,"Erro in Getting vendors")
   });
 });

 // Get all vendors of current org session 
 vendorRouter.get('/all/OrgID', function (req, res) {   
    //connect to Mongo Client
   MongoClient.connect(connectionString).
   then(function(db){
    db.collection('projects').find({orgIDs:req.session.user.orgID},{vendors:1,name:1}).toArray().
       then(function(data,err){
           res.send(data);
       });
   }).catch(err=>console.log(err));;
 });
 
 // Get all vendors
 vendorRouter.get('/names', function (req, res) {   
    //connect to Mongo Client
   MongoClient.connect(connectionString).
   then(function(db){
       db.collection("vendors").find({},{name:1,domain:1}).toArray().
       then(function(data,err){
           res.send(data);
       });
   }).catch(err=>console.log(err));;
 });

  
   // Get  user by id
   vendorRouter.post('/add', function (req, res) { 
       
    try {
        res.send(AddVendor(req.body.vendor));
    }catch(err){
        console.log("Error in adding vendor");
        res.statusCode(409);
        res.statusMessage(err);
        res.send();
    }
     
 });

   // Get  user by id
   vendorRouter.post('/update', function (req, res) {   
    res.send(UpdateVendor(req.body.vendor));
});

// Get  user by id
vendorRouter.get('/:id', function (req, res) {   
    //connect to Mongo Client
   MongoClient.connect(connectionString).
   then(function(db){
       db.collection("vendors").find({_id:req.params.id}).toArray().
       then(function(data,err){
           res.send(data);
       });
   }).catch(err=>console.log(err));;
 });

 function UpdateVendor(vendor){
    //connect to Mongo Client
    MongoClient.connect(connectionString).
    then(function(db){
        db.collection("vendors").updateOne(vendor._id.vendor,(err, res) =>{
          if (err) throw err;
            console.log("vendors" +vendor._id +" is updated");
            db.close();            
            return res;
        });
    }).catch(err=>{
        console.log(err);
        throw err;
    }
    );
 }

 function AddVendor(vendor){
     //connect to Mongo Client
    MongoClient.connect(connectionString).
    then(function(db){
        db.collection("vendors").insert(vendor,(err, res) =>{
          if (err) throw err;
            console.log("vendors" +vendor._id +" is inserted");
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

module.exports=vendorRouter;