var express = require('express');
var router = express.Router();
var fs = require('fs');

let NoteArray = [];
let dataFilePath = 'objectdata.json';

let fileManager = {
  read: function() {
    try {
      var rawdata = fs.readFileSync(dataFilePath);
      NoteArray = JSON.parse(rawdata);
    } catch (error) {
      console.error('Error reading data file:', error);
      NoteArray = []; // Initialize with an empty array if the file cannot be read or parsed
    }
  },
  write: function() {
    try {
      let data = JSON.stringify(NoteArray);
      fs.writeFileSync(dataFilePath, data);
    } catch (error) {
      console.error('Error writing data file:', error);
    }
  },
};

// Read the initial data on server startup
fileManager.read();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST visitor data */
router.post('/addVisitor', function(req, res) {
  let visitor_FName = req.body.visitorFName;
  let visitor_LName = req.body.visitorLName;
  let visit_Type = req.body.visitType;
  let visit_Priority = req.body.visitPriority;

  if (visitor_FName === '') {
    res.status(400).json({ message: 'First name cannot be blank.' });
    return;
  }

  if (visitor_LName === '') {
    res.status(400).json({ message: 'Last name cannot be blank.' });
    return;
  }

  let visitorObject = {
    firstName: visitor_FName,
    lastName: visitor_LName,
    type: visit_Type,
    priority: visit_Priority,
  };

  NoteArray.push(visitorObject);
  fileManager.write();

  res.status(200).json({ message: 'Visitor added successfully!' });
});

module.exports = router;
