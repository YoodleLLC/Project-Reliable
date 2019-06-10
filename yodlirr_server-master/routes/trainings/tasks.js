var express = require('express');
var trainingTasksRouter = express.Router();
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors');
var mongo=require('mongodb');
connectionString="mongodb://yoodle:1234@ds131687.mlab.com:31687/yoodle";
var authenticate=require('../../common/authenticate');
var training_tasks="training_tasks";

// middleware specific to this router
trainingTasksRouter.use(function timeLog (req, res, next) {
    authenticate(req,res,next) 
  });

  // Get all vendors
  trainingTasksRouter.get('/all/evaluatorId', function (req, res) {   
    //connect to Mongo Client
   MongoClient.connect(connectionString).
   then(function(db){
       db.collection(training_tasks).find({"evaluator._id":req.session.user.id}).toArray().
       then(function(data,err){
           res.send(data);
       });
   });
 });




  // Get all vendors
  trainingTasksRouter.get('/all/orgId', function (req, res) {   
    
    let orgID=req.session.user.orgID
    //connect to Mongo Client
   MongoClient.connect(connectionString).
   then(function(db){
       db.collection(training_tasks).find({orgID}).toArray().
       then(function(data,err){
           res.send(data);
       });
   });
 });

 

  // Get all vendors
  trainingTasksRouter.post('/deleteTask/byEvaluatorId', function (req, res) {   
    
        //connect to Mongo Client
    MongoClient.connect(connectionString).
    then(function(db){
        db.collection(training_tasks).deleteMany({"evaluator._id":req.body.evaluatorId},(err,deleteRes)=>{
                if (err) throw err
                res.send(deleteRes);
        });
    });
})

 // Get published tasks
  trainingTasksRouter.get('/publishedTasks', function (req, res) { 
      
    //connect to Mongo Client
   MongoClient.connect(connectionString).
   then(function(db){
       db.collection(training_tasks).find({"evaluator._id":req.session.user.id,status:{$not:/^unpublished$/}}).toArray().
       then(function(data,err){
                                 
        res.send(data);
       });       
   });
 });

 

 // Get all vendors
 trainingTasksRouter.post('/changeStatus', function (req, res) { 
        var  taskID=new mongo.ObjectID(req.body.taskId);
        console.log(taskID);
    //connect to Mongo Client
   MongoClient.connect(connectionString).
   then(function(db){
       db.collection(training_tasks).update({_id:taskID},{$set:{isPublished:true,status:req.body.status}},(err, res) =>{
        if (err) throw err;          
          db.close();            
          return res;
      });
   });
 });

 
trainingTasksRouter.get('/evaluator/tasks', function (req, res) {  
    MongoClient.connect(connectionString).
   then(function(db){
       db.collection(training_tasks).find({'evaluator._id':req.session.user.orgID}).toArray().
       then(function(data,err){
           db.close();
           res.send(data);
       });
   }).catch(err=>console.log(err));
});



   // Get  user by id
   trainingTasksRouter.post('/add', function (req, res) { 
       console.dir(req.body.tasks)
       let tasks=req.body.tasks  
       tasks=tasks.map(task => {
          return task.orgID=req.session.user.orgID
       });
       console.dir(tasks)
     res.send(AddTasks(tasks));
 });

    // Get  user by id
    trainingTasksRouter.get('/org/all', function (req, res) { 
        console.dir(req.session.user)
        MongoClient.connect(connectionString).
            then(function(db){
                db.collection(training_tasks).find({orgID:req.session.user.orgID}).toArray().
                then(function(data,err){
                    res.send(data);
                });
            });
                
  });


// Get  user by id
trainingTasksRouter.get('/:id', function (req, res) {   
    //connect to Mongo Client
   MongoClient.connect(connectionString).
   then(function(db){
       db.collection(training_tasks).find({_id:req.params.id}).toArray().
       then(function(data,err){
           res.send(data);
       });
   });
 });


 function AddTasks(tasks){
     
    //connect to Mongo Client
    MongoClient.connect(connectionString).
    then(function(db){
        db.collection(training_tasks).insertMany(tasks,(err, res) =>{
          if (err) throw err;
            console.log(tasks+" is inserted");
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

module.exports=trainingTasksRouter;