var express = require('express');
var router = express.Router();

let visitorObject = function (firstName, lastName, type, priority){
  this.firstName = firstName;
  this.lastName = lastName;
  this.type = type;
  this.priority = priority;
  this.id = Date.now();
}


let serverApptArray = [];


serverApptArray.push(new visitorObject("David", "Park", "Emergency", "High"));
serverApptArray.push(new visitorObject("John", "Doe", "Appointment", "Medium"));
serverApptArray.push(new visitorObject("Adam", "Smith", "Visiting Staff", "Low"));
serverApptArray.push(new visitorObject("Jane", "Park", "Visiting Guest", "Low"));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});

/*get all appts */
router.get('/getAllAppts', function (req, res){
  res.status(200).json(serverApptArray);
});

router.post('/createVisitor', function (req, res){
  let visitor = req.body;
  serverApptArray.push(visitor);
  res.status(200).json(visitor);
});

module.exports = router;
