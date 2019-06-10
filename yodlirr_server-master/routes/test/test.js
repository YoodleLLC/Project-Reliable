// Retrieve
var express = require('express');
var testRouter = express.Router();
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors');
connectionString="mongodb://yoodle:1234@ds131687.mlab.com:31687/yoodle";


// Get all vendors
testRouter.get('/all', function (req, res) {   
    // Connect to the db
    MongoClient.connect(connectionString, function(err, db) {
        try{
            if(err) { return console.dir(err); }

          console.log(db)
            

            
        }catch(e)
        {console.log(e)}
    })
})

 

 module.exports=testRouter;
