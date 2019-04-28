$(document).ready(function () {
  // Getting jQuery references to the post body, title, form, and author select
  var bodyInput = $("#post_body");
  var titleInput = $("#post_title");
  var authorSelect = $("#post_author");
  var categorySelect = $("#post_category");
  var forumForm = $("#post_forum"); // old name cmsForm

  // Adding an event listener for when the form is submitted
  $(forumForm).on("submit", handleFormSubmit);

  // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
  var url = window.location.search;
  var postId;
  var authorId;
  var categoryId;

  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;
  
  // creating or updating a post
  // If we have this section in our url, we pull out the post id from the url
  // In '?post_id=1', postId is 1
  if (url.indexOf("?post_id=") !== -1) {
    postId = url.split("=")[1];
    getPostData(postId, "post");
  }
  // Otherwise if we have an author_id in our url, preset the author select box to be our Author
  else if (url.indexOf("?author_id=") !== -1) {
    authorId = url.split("=")[1];
  }

  // Getting the authors, and their posts
  //getAuthors();

  // Getting the Category dropdown
  getCategory();

  // A function for handling what happens when the form to create a new post is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body, title, or author
    if (!titleInput.val().trim() || !bodyInput.val().trim() || !categorySelect.val()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newPost = {
      post_title: titleInput
        .val()
        .trim(),
      post_body: bodyInput
        .val()
        .trim(),
      categoryId: categorySelect.val(),
      authorId: "1"     // guest author ID is 1
    };

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      newPost.id = postId;
      updatePost(newPost);
    }
    else {
      submitPost(newPost);
    }
  }

  // Submits a new post and brings user to blog page upon completion
  function submitPost(post) {
    $.post("/api/forums", post, function() {
      console.log( post );
      location.reload();   // this is a temporary code
      window.location.href = "/forum"; 
    });
  }

  // Gets post data for the current post if we're editing, or if we're adding to an author's existing posts
  function getPostData(id, type) {
    var queryUrl;
    switch (type) {
    case "post":
      queryUrl = "/api/forums/" + id;
      break;
    case "author":
      queryUrl = "/api/authors/" + id;
      break;
    default:
      return;
    }
    $.get(queryUrl, function(data) {
      if (data) {
        console.log(data.AuthorId || data.id);
        // If this post exists, prefill our forum forms with its data
        titleInput.val(data.title);
        bodyInput.val(data.body);
        authorId = data.AuthorId || data.id;
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }

  // Update a given post, bring user to the blog page when done
  function updatePost(post) {
    $.ajax({
      method: "PUT",
      url: "/api/forums",
      data: post
    })
      .then(function() {
        window.location.href = "/forum";
      });
  }
  // post create / uppdate ends here

  // Getting the authors, and their posts
  getAuthors();

  // Getting the Category dropdown
  getCategory();


  // A function to get Authors and then render our list of Authors
  function getAuthors() {
    $.get("/api/authors", renderAuthorList);
  }
  // Function to either render a list of authors, or if there are none, direct the user to the page
  // to create an author first
  function renderAuthorList(data) {
    if (!data.length) {
      window.location.href = "/authors";
    }
    $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createAuthorRow(data[i]));
    }
    authorSelect.empty();
    authorSelect.append(rowsToAdd);
    authorSelect.val(authorId);
  }

  // Creates the author options in the dropdown
  function createAuthorRow(author) {
    var listOption = $("<option>");
    listOption.attr("value", author.id);
    listOption.text(author.name);
    return listOption;
  }
  // creating author list ends here

  // Getting the category
  getCategory();

  // A function to get Authors and then render our list of Authors
  function getCategory() {
    $.get("/api/category", renderCategoryList);
  }
  // Function to either render a list of authors, or if there are none, direct the user to the page
  // to create an author first
  function renderCategoryList(data) {
    if (!data.length) {
      window.location.href = "/category";
    }
    $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createCategoryRow(data[i]));
    }
    categorySelect.empty();
    categorySelect.append(rowsToAdd);
    categorySelect.val(authorId);
  }

  // Creates the author options in the dropdown
  function createCategoryRow(category) {
    var listOption = $("<option>");
    listOption.attr("value", category.id);
    listOption.text(category.name);
    return listOption;
  }
  // creating author list ends here
});