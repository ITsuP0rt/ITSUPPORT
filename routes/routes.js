const express = require('express');
const Model = require('../models/model');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://arumugam:Miot%402019@172.16.10.80:45431/?authMechanism=SCRAM-SHA-1&authSource=arcusairdb';

//Post Method
router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

   
 
//Get all Method
router.get('/getAll', async (req, res, next) => {
    var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://arumugam:Miot%402019@172.16.10.80:45431/?authMechanism=SCRAM-SHA-1&authSource=arcusairdb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("arcusairdb");
  var query = { mrn: '16924' };
  dbo.collection("patients").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
})

router.get('/geto', async (req, res) => {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://arumugam:Miot%402019@172.16.10.80:45431/?authMechanism=SCRAM-SHA-1&authSource=arcusairdb";
    
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("arcusairdb");
      var query = {"mrn": "678340"};
      dbo.collection("patients").find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result);
        db.close();
      });
    });    
})



router.get('/get', async (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("arcusairdb");
          dbo.collection("patients").find().limit(10).toArray(function(err, result){ 
          if (err) throw err;
         // console.log(result);
          res.json(result);
          db.close();
        });
      }); })
//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;