const express = require("express");

// desc: poseRoutes is an instance of the express router.
// desc: We use it to define our routes.
// desc: The router will be added as a middleware and will take control of requests starting with path /pose.
const poseRoutes = express.Router();

// desc: This will connect us to the database
const dbo = require("../db/conn");

// desc: This convertS the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// desc: This section will help you get a list of all the poses. GET ALL.
poseRoutes.route("/pose").get(function (req, res) {
  let db_connect = dbo.getDb("yinPoses");
  db_connect
    .collection("pose")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// desc: This section will help you get a single pose by id. GET SINGLE.
poseRoutes.route("/pose/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("pose")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// desc: This section will help you CREATE a new pose.
poseRoutes.route("/pose/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.name,
    desc: req.body.desc,
    bilateral: req.body.bilateral,
    timeMin: req.body.timeMin,
    timeMax: req.body.timeMax,
    benefitGen: req.body.benefitGen,
    sortOrder: req.body.sortOrder,
    enter: req.body.enter,
    exit: req.body.exit,
    mod: req.body.mod,
  };

  db_connect.collection("pose").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// desc: This section will help you EDIT a pose by id.
poseRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      name: req.body.name,
      desc: req.body.desc,
      bilateral: req.body.bilateral,
      timeMin: req.body.timeMin,
      timeMax: req.body.timeMax,
      benefitGen: req.body.benefitGen,
      sortOrder: req.body.sortOrder,
      enter: req.body.enter,
      exit: req.body.exit,
      mod: req.body.mod,
    },
  };

  console.log("pose.js name:" , req.body.name);
  console.log("pose.js desc:" , req.body.desc);

  db_connect
    .collection("pose")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// desc: This section will help you DELETE a pose
poseRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("pose").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = poseRoutes;