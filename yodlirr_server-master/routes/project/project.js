
var express = require('express');
var projectsRouter = express.Router();
var MongoClient = require('mongodb').MongoClient;
var mongo=require('mongodb');
var cors = require('cors');
const connectionString="mongodb://yoodle:1234@ds131687.mlab.com:31687/yoodle";
var authenticate=require('../../common/authenticate');
var tasksCollection="tasks";


// middleware specific to this router
projectsRouter.use(function timeLog (req, res, next) {
    authenticate(req,res,next);
  });



  // Get  user by id
  projectsRouter.get('/all', function (req, res) {   
    //connect to Mongo Client
   MongoClient.connect(connectionString).
   then(function(db){
       db.collection("projects").find({}).toArray().
       then(function(data,err){
           res.send(data);
       });
   }).catch(err=>{
        console.log(err)   
        res.send(409,err)
    });
 });

 
// Get  user by id
projectsRouter.get('/names', function (req, res) {   
    //connect to Mongo Client
   MongoClient.connect(connectionString).
   then(function(db){
    db.collection('projects').find({'orgIDs':req.session.user.orgID},{name:1}).toArray().
       then(function(data,err){
           res.send(data);
       });
   }).catch(err=>{
    console.log(err)   
    res.send(409,err)
});
 });

 projectsRouter.post('/attachvendors', function (req, res) { 
    //connect to Mongo Client
    MongoClient.connect(connectionString).
        then(function(db){
            let project= req.body.project;
            project._id=new mongo.ObjectID(project._id)
            db.collection("projects").update({_id:project._id},{$set:{vendors:project.vendors}},true,(err, res) =>{
                if (err) throw err;
                console.log("project" +project._id +" is updated"); 
                TaskCreator(req);
                return res;      
        });       
    }).catch(err=>{
        console.log(err)   
        res.send(409,err)
    });
 })

 projectsRouter.get('/keywords', function (req, res) { 
   
    
    //connect to Mongo Client
    MongoClient.connect(connectionString).
        then(function(db){
            let orgId= req.session.user.orgID;
            orgId=new mongo.ObjectID(orgId)
            db.collection("organizations").find({'_id':orgId},{keywords:1}).toArray().
            then(function(data,err){
                res.send(data[0]);
            });
    }).catch(err=>{
        console.log(err)   
        res.send(409,err)
    });


 })

 function TaskCreator(req){
     try {
        MongoClient.connect(connectionString).
        then(function(db){
         db.collection('projects').find({_id: req.body.project._id}).toArray().
            then(function(data,err){
                CreateTask(data[0],req.session.user.orgID);
            });
        });
     } catch (err) {
         console.log(err)
         throw err
     }
    //To Create Tasks
   
 }

 // Get  user by id
projectsRouter.get('/vendors', function (req, res) {   
    //connect to Mongo Client
   MongoClient.connect(connectionString).
   then(function(db){
    db.collection('projects').find({},{name:1,vendors:1}).toArray().
       then(function(data,err){
           res.send(data);
       });
   }).catch(err=>{
    console.log(err)   
    res.send(409,err)
});
 });

   // Get  user by id
   projectsRouter.post('/add', function (req, res) {   
    res.send(AddProject(req.body.project,req.session.user.orgID));
});

  // Get  user by id
  projectsRouter.post('/update', function (req, res) {   
   res.send(UpdateProject(req.body.project));
});

  // Get  user by id
  projectsRouter.get('/:id', function (req, res) {   
    //connect to Mongo Client
        MongoClient.connect(connectionString).
        then(function(db){
            let id=new mongo.ObjectID(req.params.id);
            db.collection("projects").find({_id:id}).toArray().
            then(function(data,err){
                console.dir(data);
                res.send(data);
            });
        }).catch(err=>{
            console.log(err)   
            res.send(409,err)
        });
    
  
 });
 
function UpdateProject(project){
    //connect to Mongo Client
    MongoClient.connect(connectionString).
    then(function(db){
        db.collection("projects").updateOne(project._id,project,(err, res) =>{
          if (err) throw err;
            console.log("project" +project._id +" is updated");
                   
            return res;
        });
    }).catch(err=>{
        console.log(err);
        throw err;
    }
    );
 }

 function AddProject(project,orgID){

    //Change with session

    //let orgId=new mongo.ObjectId(req.session.orgId)
    //project.orgIDs=[orgId]

    project.orgIDs=orgID
    //connect to Mongo Client
    MongoClient.connect(connectionString).
    then(function(db){
        db.collection("projects").insert(project,(err, res) =>{
          if (err) throw err;
            console.log("project" +project._id +" is inserted");                 
            return res;
        });
    }).catch(err=>{
        console.log(err);
        throw err;
    }
    );
 }

 CreateTask=function(proposal,orgID){
    let tasks=[]
    
            //connect to Mongo Client
    MongoClient.connect(connectionString).
    then(function(db){
        var col = db.collection(tasksCollection);
        col.deleteMany({"proposal._id":proposal._id.toString()},(err,res)=>{
            if (err) throw err

            console.dir(res)
        })
    }).catch(err=>console.log(err))
       
   proposal.evaluators.forEach(e=>{
       proposal.vendors.forEach(v=>{
        let task={};
        task.templateId=proposal.templateId;
        task.evaluator=e;
        task.proposal={ name:proposal.name,
                            _id:proposal._id.toString()
                        }
        task.due_date=proposal.due_date;
        task.isPublished=false;
        task.status="unpublished";
        task.vendor=v;
        task.orgID=orgID;
        tasks.push(task);
       });
    });

    //connect to Mongo Client
    MongoClient.connect(connectionString).
    then(function(db){
        var col = db.collection(tasksCollection);
        var batch = col.initializeOrderedBulkOp();

        var sizeOfResult= tasks.length;
        for (var i = 0; i < sizeOfResult; i++) {
            try{
                col.insert(tasks[i],{ordered: false})
            }catch(e){
                console.log(e)
            }
            
        }
    })
    .catch(err=>{
        console.log(err);
    });
   
}

function MongoException(msg){
    this.msg=msg;
    this.name="Mongo Exception";
}

module.exports=projectsRouter;