// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads the home page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
    /* uncomment this section once all the HTMLs are done
    res.sendFile(path.join(__dirname, "../public/index.html")); 
    */
  });
  
  // cms route loads cms.html
  app.get("/cms", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/cms.html"));
  });

  // forum route loads forum.html
  app.get("/forum", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // authors route loads author-manager.html
  app.get("/authors", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/author-manager.html")); 
  });
};
