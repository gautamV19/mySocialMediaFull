{
  // method to submit the form data for new post using AJAX
  let createPost = function () {
    $("#new-post-form").submit(function (e) {
      e.preventDefault();
      $.ajax({
        type: "POST",
        url: "posts/create",
        data: $("#new-post-form").serialize(),
        success: function (data) {
          console.log(data);
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  //method to display post on dom

  let newPostDOM = function (post) {
      return ${``}
  };

  createPost();
}
