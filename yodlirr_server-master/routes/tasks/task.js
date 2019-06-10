
var express = require('express');
var taskRouter = express.Router();
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors');
var mongo=require('mongodb');
const connectionString="mongodb://yoodle:1234@ds131687.mlab.com:31687/yoodle";
var authenticate=require('../../common/authenticate');
const tasksCollection="tasks";

// middleware specific to this router
taskRouter.use(function timeLog (req, res, next) {
    authenticate(req,res,next) 
  });

  // Get all vendors
  taskRouter.get('/all', function (req, res) {   
    //connect to Mongo Client
   MongoClient.connect(connectionString).
   then(function(db){
       db.collection(tasksCollection).find({}).toArray().
       then(function(data,err){
           res.send(data);
       });
   });
 });


  // Get all vendors
  taskRouter.post('/deleteTask/byVendorID', function (req, res) {   

    console.log(req.body.vendorId)
        //connect to Mongo Client
    MongoClient.connect(connectionString).
    then(function(db){
        db.collection(tasksCollection).deleteMany({"vendor._id":req.body.vendorId},(err,deleteRes)=>{
                if (err) throw err
                res.send(deleteRes);
        });
    });
})

 // Get published tasks
  taskRouter.get('/publishedTasks', function (req, res) { 
      
    console.dir(req.session.user.id)
    //connect to Mongo Client
   MongoClient.connect(connectionString).
   then(function(db){
       db.collection(tasksCollection).find({"evaluator._id":req.session.user.id,status:{$not:/^unpublished$/}}).toArray().
       then(function(data,err){
                                 
        res.send(data);
       });       
   });
 });

 

 // Get all vendors
 taskRouter.post('/changeStatus', function (req, res) { 
        var  taskID=new mongo.ObjectID(req.body.taskId);
        console.log(taskID);
    //connect to Mongo Client
   MongoClient.connect(connectionString).
   then(function(db){
       db.collection(tasksCollection).update({_id:taskID},{$set:{isPublished:true,status:req.body.status}},(err, res) =>{
        if (err) throw err;          
          db.close();            
          return res;
      });
   });
 });

taskRouter.get('/evaluator/tasks', function (req, res) {  
    MongoClient.connect(connectionString).
   then(function(db){
       db.collection(tasksCollection).find({'evaluator._id':req.session.user.orgID}).toArray().
       then(function(data,err){
           db.close();
           res.send(data);
       });
   }).catch(err=>console.log(err));
});



   // Get  user by id
   taskRouter.post('/add', function (req, res) { 
       console.dir(req.body.tasks)
       let tasks=req.body.tasks  
       tasks=tasks.map(task => {
          return task.orgID=req.session.user.orgID
       });
       console.dir(tasks)
     res.send(AddTasks(tasks));
 });

    // Get  user by id
    taskRouter.get('/org/all', function (req, res) { 
        console.dir(req.session.user)
        MongoClient.connect(connectionString).
            then(function(db){
                db.collection(tasksCollection).find({orgID:req.session.user.orgID}).toArray().
                then(function(data,err){
                    res.send(data);
                });
            });
                
  });


// Get  user by id
taskRouter.get('/:id', function (req, res) {   
    //connect to Mongo Client
   MongoClient.connect(connectionString).
   then(function(db){
       db.collection(tasksCollection).find({_id:req.params.id}).toArray().
       then(function(data,err){
           res.send(data);
       });
   });
 });


 function AddTasks(tasks){
     
    //connect to Mongo Client
    MongoClient.connect(connectionString).
    then(function(db){
        db.collection(tasksCollection).insertMany(tasks,(err, res) =>{
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

module.exports=taskRouter;