var express = require('express');
var trainingResponseRouter = express.Router();
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors');
var mongo = require('mongodb');
connectionString = "mongodb://yoodle:1234@ds131687.mlab.com:31687/yoodle";
var authenticate = require('../../common/authenticate');
var training_response = "training_response";
var training_tasks = "training_tasks";

// middleware specific to this router
trainingResponseRouter.use(function timeLog(req, res, next) {
    authenticate(req, res, next)
});

trainingResponseRouter.get('/module/:trainingId/:moduleId', function (req, res) {

    let moduleId = parseInt(req.params.moduleId)
    let evaluatorId = req.session.user.id
    let trainingId =req.params.trainingId

    

    MongoClient.connect(connectionString).
        then(function (db) {
            db.collection(training_response).find({ $and: [{ "module.id": moduleId }, { trainingId }, { evaluatorId }] }).toArray().
                then(function (data, err) {

                    if(data.length>0)
                        res.send(data[0]);
                    else 
                        res.send([])    
                });
        });
})



// Get all vendors
trainingResponseRouter.post('/save', function (req, res) {
    let id = req.body._module.id
    let trainingId = req.body.trainingId
    let evaluatorId = req.session.user.id
    let response = {}
    response.trainingId = trainingId
    response.module = req.body._module
    response.evaluatorId = evaluatorId
    MongoClient.connect(connectionString).
        then(function (db) {
            db.collection(training_response).update({ $and: [{ "module.id": id }, { trainingId }, { evaluatorId }] }, response, { upsert: true }, async (err, data) => {
                res.send(data)
            })
        });
})

// Get published tasks
trainingResponseRouter.post('/submit', function (req, res) {

    let id = req.body._module.id
    let trainingId = req.body.trainingId
    let evaluatorId = req.session.user.id
    let response = {}
    response.trainingId = trainingId
    response.module = req.body._module
    response.evaluatorId = evaluatorId 
    MongoClient.connect(connectionString).
        then(function (db) {
            db.collection(training_response).update({ $and: [{ "module.id": id }, { trainingId }, { evaluatorId }] }, response, { upsert: true }, (err, data) => {


            })

        });

    MongoClient.connect(connectionString).
        then(function (db) {
            db.collection(training_tasks).find({ $and: [{ "evaluator._id": evaluatorId, "training._id": trainingId }] }).toArray().
                then(function (data, err) {
                    if (err) {
                        console.log(err)
                        throw err
                    }

                    let preData = (data[0].perComplete == undefined) ? 0 : data[0].perComplete
                    let perComplete = parseInt(preData) + parseInt(req.body.weightage)

                    db.collection(training_tasks).update({ $and: [{ "evaluator._id": evaluatorId, "training._id": trainingId }] }, { $set: { perComplete } }).
                        then(function (data, err) {
                            if (err) {
                                console.log(err)
                                throw err
                            }
                        })
                    res.send(JSON.stringify("Data submitted successfully"));
                });

        });

});





function MongoException(msg) {
    this.msg = msg;
    this.name = "Mongo Exception";
}

module.exports = trainingResponseRouter;



