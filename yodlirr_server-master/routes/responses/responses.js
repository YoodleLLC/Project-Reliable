var express = require('express');
var responseRouter = express.Router();
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors');
var mongo=require('mongodb');
var savedResponse=require('../savedresponses/savedresponses');
connectionString="mongodb://yoodle:1234@ds131687.mlab.com:31687/yoodle";
var authenticate=require('../../common/authenticate');
var responses="responses";
var submitted="submitted";

// middleware specific to this router
responseRouter.use(function timeLog (req, res, next) {
    authenticate(req,res,next);
  });

 

//Get  user by id
responseRouter.post('/add', function (req, res) { 
//console.dir(req.body.taskId); 
res.send(AddResponse(req.body.proposal,req.body.vendor,req.session.user))     
 });

 //Get  user by id
 responseRouter.post('/update', function (req, res) { 
    console.dir(req.body.savedResponse)  
  res.send(UpdateResponse(req.body.savedResponse));
});

function AddResponse(proposal,vendor,evaluator){   
    MongoClient.connect(connectionString).
    then(function(db){        
        let obj={
            evaluator:evaluator,
            fields:proposal.fields
        }

        let updateObj={
            "proposalId":proposal._id,
            vendors:[
            {
                "vendor":vendor,
                "response":[]
            }
        ]}        
        db.collection("responses").findOne({"proposalId":proposal._id},(err,res)=>{
            if (err) throw err;           
            if(res!=undefined && res.proposalId==proposal._id ){
                db.collection("responses").findOne({"proposalId":proposal._id,"vendors.vendor._id":vendor._id},updateObj,(err,res1)=>{
                    if (err) throw err;           
                    if(res1!=undefined && res1.vendors.findIndex(v=>{return v.vendor._id==vendor._id})>-1){
                        db.collection("responses").updateOne({"proposalId":proposal._id,"vendors.vendor._id":vendor._id},{ $push: {"vendors.$.response":obj}},(err,res2)=>{
                            if (err) throw err;           
                            if(res2!=undefined){                                               
                            }
                        })
                    }
                    else{                     
                        let temp={
                            "vendor":vendor,
                            "response":[]
                        }                  
                        db.collection("responses").updateOne({"proposalId":proposal._id},{$push:{vendors:temp}},(err,res1)=>{
                            if (err) throw err;           
                            if(res1!=undefined){                                
                                db.collection("responses").updateOne({"proposalId":proposal._id,"vendors.vendor._id":vendor._id},{ $push: {"vendors.$.response":obj}},(err,res2)=>{
                                    if (err) throw err;           
                                    if(res2!=undefined){                                               
                                    }
                                })
                            }
                        })
                    }                  
                })
            }
            else {               
                updateObj.vendors[0].response.push(obj)
                db.collection("responses").insertOne(updateObj,(err,iRes)=>{
                    if (err) throw err;           
                    if(iRes!=undefined && iRes.insertedCount==1){   
                              return "Data Submitted successfully"                             
                    }
                    else{
                        return "Error in insertion" 
                    }
                })
            } 
        })
    })

}


 function UpdateResponse(response){
     
    console.dir(response);
    //connect to Mongo Client
    MongoClient.connect(connectionString).
    then(function(db){
        db.collection(responses).update({vendorId:"",proposalId:""},{$push:{response:response}},(err, res) =>{
          if (err) throw err;
            console.log(response._id+" is pushed");
            db.close();            
            return res;
        });
    }).catch(err=>{
        console.log(err);
        throw err;
    }
    );
 }
 
  // Get all vendors
  responseRouter.get('/proposal/:id', function (req, res) {   
    //connect to Mongo Client
   MongoClient.connect(connectionString).
   then(function(db){
       db.collection(responses).find({proposalId:req.params.id}).toArray().
       then(function(data,err){
           console.log(data[0])
           res.send(data[0]);
       });
   });
 });

function MongoException(msg){
    this.msg=msg;
    this.name="Mongo Exception";
}


module.exports=responseRouter;