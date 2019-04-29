// *********************************************************************************
// forum-api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts (we will fetch upto 5 threads)
  app.get("/api/forums", function(req, res) {
    var query = {};
    if (req.query.author_id) {
      query.AuthorId = req.query.author_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case: db.Author, db.Category and db.Response
    db.Post.findAll({
      where: query,
      include: [db.Author, db.Category, db.Response],
      limit: 5
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};
