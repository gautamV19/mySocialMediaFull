let commentHandle = function () {
  //** To create comment */
  $("#comment-box").submit(function (e) {
    e.preventDefault();
    // console.log("commenting");
    $.ajax({
      type: "post",
      url: $("#comment-box").prop("action"),
      data: $("#comment-box").serialize(),
      success: function (data) {
        console.log(data);
        let newComment = createNewComment(data.data.comment);
        $(`#post-comment-${data.data.comment.post}`).prepend(newComment);
        $("#comment-box>textarea").val("");
      },
      error: function (error) {
        console.log("********Its error", error.responseText);
        $("#comment-box>textarea").val("");
      },
    });
  });
  //** To show comment */
  function createNewComment(comment) {
    return $(`<li id="comment-${comment.id}">
        <!-- deleting a comment  -->
        
        <small>
          <a href="/comments/delete/${comment.id}" class="Delete-comment-button" >delete</a>
        </small>
    
        <!-- showing a comment  -->
        <div>
          <p>${comment.content}</p>
          <small>${comment.user.name}</small>
        </div>
        </li>
      `);
  }
  //** To delete comment */
  $(".Delete-comment-button").click(function (e) {
    e.preventDefault();
    console.log(
      "delete this comment",
      $(".Delete-comment-button").prop("href")
    );

    $.ajax({
      type: "get",
      url: $(".Delete-comment-button").prop("href"),
      success: function (data) {
        console.log(data);
        $(`#comment-${data.data.id}`).remove();
      },
      error: function (error) {
        console.log("********Its error", error.responseText);
      },
    });
  });
};

commentHandle();
