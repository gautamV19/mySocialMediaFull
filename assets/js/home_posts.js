{
  //method to display post on dom
  let newPostDOM = function (i) {
    return $(`<div id="post-list">
        <div id="post-${i.id}">
          <!-- deleting a post  -->
          <small>
            <a class="delete-post-button" href="/posts/delete/${i.id}">delete</a>
          </small>
      
          <!-- showing a post  -->
          ${i.content}
          <small><p>${i.user.name}</p></small>
      
          <!-- comment section  -->
          <div class="comment-box">
            <form action="/comments/create" method="POST">
              <textarea
                name="content"
                cols="30"
                rows="1"
                placeholder="Start commenting here..."
                required
              ></textarea>
              <input type="hidden" name="post_id" value="${i.id}" />
              <input type="submit" value="Comment" />
            </form>
          </div>
          <div class="post-comment-list">
            <ul id="post-comment-${i.id}">
            </ul>
          </div>
        </div>
      </div>`);
  };

  // method to submit the form data for new post using AJAX
  let handlePost = function () {
    $("#new-post-form").submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: "POST",
        url: "posts/create",
        data: $("#new-post-form").serialize(),
        success: function (data) {
          console.log(data);
          let newPost = newPostDOM(data.data.post);
          $("#post-list").prepend(newPost);
        },
        error: function (error) {
          console.log("********Its error", error.responseText);
        },
      });
      $("#new-post-form>textarea").val("");
    });

    //method to deletepost
    $(".delete-post-button").click(function (e) {
      e.preventDefault();

      // console.log("Delet this post", $(".delete-post-button").prop("href"));
      $.ajax({
        type: "get",
        url: $(".delete-post-button").prop("href"),
        success: function (data) {
          console.log(data);
          // console.log(`#post-${data.data.post_id}`);
          $(`#post-${data.data.post_id}`).remove();
        },
        error: function (error) {
          console.log("********Its error", error.responseText);
        },
      });
    });
  };
  handlePost();
}
