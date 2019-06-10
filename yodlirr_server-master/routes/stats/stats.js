var express = require('express');
var statsRouter = express.Router();
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors');
var mongo=require('mongodb');
connectionString="mongodb://yoodle:1234@ds131687.mlab.com:31687/yoodle";
var authenticate=require('../../common/authenticate');
var responses="responses";
var cal=require("./cal")
var multiArr=[]  
// middleware specific to this router
statsRouter.use(function timeLog (req, res, next) {
    authenticate(req,res,next);
  });

  // Get all Responses for a proposal 
  statsRouter.get('/:proposalId', function (req, res) {   
    //connect to Mongo Client
   MongoClient.connect(connectionString).
   then(function(db){
       db.collection(responses).find({proposalId:req.params.proposalId}).toArray().
       then(function(data,err){
           res.send(data);
       });
   });
 });


 // Get all Responses for a proposal and Vendor
 statsRouter.get('/:proposalId/:vendorID', function (req, res) {   
    //connect to Mongo Client
   MongoClient.connect(connectionString).
   then(function(db){
       db.collection(responses).find({}).toArray().
       then(function(data,err){
           res.send(data);
       });
   });
 });

 // Get all Responses for a proposal and Vendor
 statsRouter.get('/:proposalId/:vendorID/:evaluatorID', function (req, res) {   
    //connect to Mongo Client
   MongoClient.connect(connectionString).
   then(function(db){
       db.collection(responses).find({}).toArray().
       then(function(data,err){
           res.send(data);
       });
   });
 });

 // Get all Responses for a proposal and Vendor
 statsRouter.post('/calculate', function (req, res) {   
     let proposalId=req.body.proposalId     
    //connect to Mongo Client
   MongoClient.connect(connectionString).
   then(function(db){
       db.collection(responses).findOne({proposalId:proposalId},function(err,data){
           debugger

           if(err) throw(err) 

           let nFields=data.vendors[0].response.length
           let nCases=data.vendors[0].response[0].fields.length          
           let result=[] 
          
           data.vendors.forEach(v=>{
            let multiArr=[]
               v.response.forEach(r=>{
                let tempArr=[]
                r.fields.forEach(f=>{
                    tempArr.push(Math.round(f.score) )
                })
                multiArr.push(tempArr)
                })

                // initialize()
                var kripsAlph=cal.kripsAlphaCalculation(multiArr)
                var fleissKappa=cal.fleissKappaCalcs(multiArr)
                var ppa=cal.pairwisePercentCalcs(multiArr)
                let alpha=JSON.stringify({
                 vendor:v.vendor,
                 kripsAlph,
                 fleissKappa,
                 ppa
                })

                result.push(alpha)
           })
           
          
           debugger
           res.send(JSON.stringify(result));
       });
   });
 });



 
 
 module.exports= statsRouter;