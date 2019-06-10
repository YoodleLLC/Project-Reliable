var express=require('express');
var app=express();
var MongoClient=require('mongodb').MongoClient;
var bodyParser=require('body-parser');
var cookieParser=require('cookie-parser');
var router = express.Router();
var cors = require('cors');
var users=require('./routes/user/user');
var roles=require('./routes/roles/roles');
var organizations=require('./routes/organization/organizations');
var projects=require('./routes/project/project');
var tasks =require("./routes/tasks/task");
var templates=require('./routes/templates/templates');
var vendors=require('./routes/vendors/vendor');
var trainings=require('./routes/trainings/trainings');
var savedResponses=require('./routes/savedresponses/savedresponses');
var session=require('express-session');
var test=require('./routes/test/test');
var index={}
var indexes=require('./routes/currentindexes/currentIndexes')
var email=require('./email/email');
var resp=require('./routes/responses/responses');
var morgan  = require('morgan');
var RFPs=require("./routes/rfps/rfps");
var stats=require("./routes/stats/stats");
var training_task=require("./routes/trainings/tasks");
var traininig_response=require("./routes/trainings/responses");

//setting port for server
app.set('port',process.env.PORT || 5000);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials",true);
    next();
  });

app.use(cookieParser())
app.use(morgan('combined'))
// middleware for body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 3600000,secure: false},
    // store: new MongoStore({
    //     url:"mongodb://yoodle:1234@ds131687.mlab.com:31687/yoodle",
    //   })
  }))


//middlerware to log time and requested method
app.use(log);
app.use('/user',users);
app.use('/roles',roles);
app.use('/projects',projects);
app.use('/organizations',organizations);
app.use('/templates',templates);
app.use('/vendors',vendors);
app.use('/index',indexes);
app.use('/tasks',tasks);
app.use('/test',test);
app.use('/savedresponses',savedResponses);
app.use('/email',email);
app.use('/response',resp)
app.use('/RFPs',RFPs)
app.use('/stats',stats)
app.use("/trainings",trainings)
app.use("/trainings/tasks",training_task)
app.use("/trainings/response",traininig_response)

function log(req,res,next){
    console.log(new Date(),req.method,req.url);        
    next();
}

function helloWorld(req,res,next){
    res.send("Hi there");
    next();
}

try {
    var server =app.listen(app.get('port'),function(err){
        console.log("server is running on port: "+app.get('port'));
    });
} catch (err) {
    console.log(err)
}


