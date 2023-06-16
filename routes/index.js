var express = require('express');
var router = express.Router();

var fs = require("fs");
let serverApptArray = [];


let fileManager = {
  read: function() {
    var rawdata = fs.readFileSync('objectdata.json');
    let goodData = JSON.parse(rawdata);
    serverApptArray = goodData;
  },
  write: function() {
    let data = JSON.stringify(serverApptArray);
    fs.writeFileSync('objectdata.json', data);
  },
  validData: function() {
    var rawdata = fs.readFileSync('objectdata.json');
    console.log(rawdata.length);
    if (rawdata.length < 1) {
      return false;
    } else {
      return true;
    }
  }
};


let visitorObject = function (firstName, lastName, type, priority){
  this.firstName = firstName;
  this.lastName = lastName;
  this.type = type;
  this.priority = priority;
  this.id = Date.now();
}




if (!fileManager.validData()) {
  serverApptArray.push(new visitorObject("David", "Park", "Emergency", "High"));
  serverApptArray.push(new visitorObject("John", "Doe", "Appointment", "Medium"));
  serverApptArray.push(new visitorObject("Adam", "Smith", "Visiting Staff", "Low"));
  serverApptArray.push(new visitorObject("Jane", "Park", "Visiting Guest", "Low"));
  fileManager.write();
} else {
  fileManager.read();
}

router.use(express.json());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});

/*get all appts */
router.get('/getAllAppts', function (req, res){
  fileManager.read();
  res.status(200).json(serverApptArray);
});

router.post('/createVisitor', function (req, res){
  let visitor = req.body;
  serverApptArray.push(visitor);
  fileManager.write();
  res.status(200).json(visitor);
});

module.exports = router;