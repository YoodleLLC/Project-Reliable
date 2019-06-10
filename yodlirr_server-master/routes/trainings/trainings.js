var express = require('express');
var trainingsRouter = express.Router();
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors');
var mongo=require('mongodb');
connectionString="mongodb://yoodle:1234@ds131687.mlab.com:31687/yoodle";
var authenticate=require('../../common/authenticate');
var trainingCollection="trainings";
var training_tasks="training_tasks";

// middleware specific to this router
trainingsRouter.use(function timeLog (req, res, next) {
    authenticate(req,res,next) 
  });

  // Get all vendors
  trainingsRouter.get('/all', function (req, res) {   
    //connect to Mongo Client
   MongoClient.connect(connectionString).
   then(function(db){
       let orgId=req.session.user.orgID
       db.collection(trainingCollection).find({orgId}).toArray().
       then(function(data,err){
           res.send(data);
       });
   });
 });

// Get all vendors
trainingsRouter.get('/getModules/:trainingId', function (req, res) {   
     let trainingId = new mongo.ObjectID(req.params.trainingId)

   MongoClient.connect(connectionString).
    then(function (db) {
        db.collection(trainingCollection).find({_id:trainingId},{"modules.name":1,"modules.id":1}).toArray().
            then(function (data, err) {
                if(data.length>0)
                    res.send(data[0]);
                else 
                    res.send([])    
            });
    });
 });

 
// Get all vendors
trainingsRouter.get('/getselectedmodule/:trainingId/:moduleId', function (req, res) {   
    let trainingId = new mongo.ObjectID(req.params.trainingId)
    let moduleId =parseInt(req.params.moduleId)
  MongoClient.connect(connectionString).
   then(function (db) {
       db.collection(trainingCollection).find({ $and: [{ "modules.id": moduleId },{_id:trainingId}]},{ 'modules.$': 1 }).toArray().
           then(function (data, err) {
               if(data.length>0)
                   res.send(data[0]);
               else 
                   res.send([])    
           });
   });
});

    // Get all vendors
    trainingsRouter.post('/attach/evaluator', (req, res)=> {   
        let {training}=req.body
        let _id=new mongo.ObjectID(training._id)
        let evaluators=training.evaluators
        //connect to Mongo Client
        MongoClient.connect(connectionString).
        then(async (db)=>{
            console.log("in async 2")
            db.collection(trainingCollection).update({_id},{$set:{evaluators}},(err, res) =>{
                console.log("in res")
                if (err) throw err;          
                  db.close();            
                  return res;
              });     
            
              console.log("in res")
              training.assigner=req.session.user.name
              await generateTasks(training,req.session.user.orgID)
        });
       
       
    });
    

  // Get all vendors
  trainingsRouter.get('/table', function (req, res) {   
    //connect to Mongo Client
   MongoClient.connect(connectionString).
   then(function(db){
       let orgId=req.session.user.orgID
       db.collection(trainingCollection).aggregate([{"$project":{_id:1,name:1,due_date:1,totalModules:{$size:"$modules"}}}]).toArray().
       then(function(data,err){
           res.send(data);
       });
   });
 });

 

 // Get all vendors
 trainingsRouter.post('/add', function (req, res) {   
     let training=req.body.training
     let orgId=req.session.user.orgID
     insertTraining(training,orgId,data=>{
         res.send(data)
     })
 });

 trainingsRouter.get('module_name',(req, res)=>{

    // let trainingId = new mongo.ObjectId(req.params.trainingId)
    
    // MongoClient.connect(connectionString).
    // then(function (db) {
    //     db.collection(trainingCollection).find({_id:trainingId},{"modules.name":1,"modules.id":1}).toArray().
    //         then(function (data, err) {
    //             if(data.length>0)
    //                 res.send(data[0]);
    //             else 
    //                 res.send([])    
    //         });
    // });

    console.log("ca")
})

   // Get all vendors
   trainingsRouter.get('/get_by_evaluator/:id', function (req, res) {   
    //connect to Mongo Client
   MongoClient.connect(connectionString).
   then(function(db){

       let _id=new mongo.ObjectID(req.params.id) //5aaacca47ae76b1b60e92a4d
       let name=req.params.name
       db.collection(trainingCollection).find({_id}).toArray().
       then(function(data,err){
           res.send(data);
       });
   });
 });

function generateTasks(training,orgID){
    
    //connect to Mongo Client
    MongoClient.connect(connectionString).
    then(function(db){
        db.collection(training_tasks).deleteMany({"training._id":training._id},async(err,deleteRes)=>{
                if (err) throw err
               console.log(deleteRes)
               let tasks=[]      
               training.evaluators.forEach(e => {     
                let task={}
                task.training={
                    name:training.name,
                    _id:training._id
                }
                task.orgID=orgID
                task.due_date=training.due_date
                task.assigner=training.assigner  
               task.evaluator=e
               tasks.push(task)
               });
               await insertTasks(tasks)
        });
    });

    
    
}

function insertTasks(tasks){
    MongoClient.connect(connectionString).
    then(function(db){                 
            db.collection(training_tasks).insertMany(tasks,{ordered: false},(err,data)=>{
                console.log(data)
            })            
    });
  } 
    

function insertTraining(training,orgId,callback){
    Object.assign(training,training,{orgId})
    MongoClient.connect(connectionString).
    then(function(db){
        //change taskid and evaluatorid using sessions
        db.collection(trainingCollection).insertOne(training).
        then(function(data,err){
            db.close();    
            callback(JSON.stringify(data))
        });       
    });
}

function updateTraining(training,orgId,callback){
    console.log("called")
    var _id=new mongo.ObjectID(training.id);
    MongoClient.connect(connectionString).
    then(function(db){
        db.collection(trainingCollection).update({_id},training,{ upsert: true },(err, res) =>{
          if (err) throw err;
            console.log(training+" is updated");
            db.close();            
            callback( JSON.stringify(res)) ;;
        });
    }).catch(err=>{
        console.log(err);
        throw err;
    }
    );
}

 function UpdatetrainingsRouter(sResponses){     
    //connect to Mongo Client
    console.dir(sResponses)
    MongoClient.connect(connectionString).
    then(function(db){
        db.collection(trainingsRouter).update({taskId:sResponses.taskId,evaluatorId:sResponses.evaluatorId},{$set:{fields:sResponses.fields}},(err, res) =>{
          if (err) throw err;
            console.log(trainingsRouter+" is updated");
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
trainingsRouter.post('/byID', function (req, res) {   
    //connect to Mongo Client
   MongoClient.connect(connectionString).
   then(function(db){
       db.collection(trainingsRouter).find({taskId:req.body.id}).toArray().
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
trainingsRouter.get('/:id', function (req, res) {   
    //connect to Mongo Client
   MongoClient.connect(connectionString).
   then(function(db){
       db.collection(trainingsRouter).find({_id:req.params.id}).toArray().
       then(function(data,err){
           res.send(data);
       });
   });
 });

function MongoException(msg){
    this.msg=msg;
    this.name="Mongo Exception";
}

module.exports=trainingsRouter;