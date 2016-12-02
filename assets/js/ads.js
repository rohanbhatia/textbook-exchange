function getDetailedAd(id) {
  $.ajax({
      url: '/ads?ad_id=' + id,
      type: 'GET',
      success: function(response) {
          // Details
          $("#bookname").html(response["ads"][0]["book_title"]);
          $("#overview").html("<b>Book Name: </b>" + response["ads"][0]["book_title"]);
          $("#overview").append("<br><b>Author: </b>" + response["ads"][0]["author"]);
          $("#overview").append("<br><b>Description: </b>" + response["ads"][0]["desc"]);
          $("#overview").append("<br><b>ISBN: </b>" + response["ads"][0]["isbn"]);
          $("#overview").append("<br><b>Posted Date: </b>" + response["ads"][0]["posted_date"]);
          $("#overview").append("<br><b>Courses: </b>");
          $("#overview").append(response["ads"][0]["course_code"]);

          // Bid
          $("#currentbid").html("Current Bid: $" + response["ads"][0]["bid"]);

          // Owner check
          if(getCookie("email") == response["ads"][0]["owner_email"]){
              $(".owneronly").css('visibility','visible');
              $(".nonowneronly").css('visibility','hidden');
          }
      },
      error: function(response) {
        displayError("Book ID not found");
      }
  });
}

function getAllAds() {
  if(getCookie("adminStatus") == "admin"){
    $.ajax({
        url: '/ads',
        type: 'GET',
        success: function(response) {
          // Start table
          var table = ('<table class="table table-hover"><thead><tr><th>Title</th><th>Author</th><th>Description</th><th>Posted Date</th><th>Current Bid</th><th>View</th><th>Delete</th></tr></thead><tbody>');

          // Fill in rows
          for (ad in response["ads"]){
            // Details
            table += ("<tr><td>" + response["ads"][ad]["book_title"] + "</td><td>" + response["ads"][ad]["author"] + "</td><td>" + response["ads"][ad]["desc"] + "</td><td>" + response["ads"][ad]["posted_date"] + "</td><td>$" + response["ads"][ad]["bid"]+ "</td><td><a href='viewAd.html?ad_id=" + response["ads"][ad]["ad_id"] + "' class='btn btn-primary'>View</a></td><td><a class='btn btn-danger' onclick='deleteListing(" + response["ads"][ad]["ad_id"] + ")'>Delete</a></td></tr>");
          }

          // End table
          table += "</table>";

          // Draw to screen
          $("#AdsTable").html(table);
        },
        error: function() {
          displayError("Communication with the server has failed. Please try again later");
        }
    });
  }else{
    $.ajax({
        url: '/ads',
        type: 'GET',
        success: function(response) {
          // Start table
          var table = ('<table class="table table-hover"><thead><tr><th>Title</th><th>Author</th><th>Description</th><th>Posted Date</th><th>Current Bid</th><th>View</th></tr></thead><tbody>');

          // Fill in rows
          for (ad in response["ads"]){
            // Details
            table += ("<tr><td>" + response["ads"][ad]["book_title"] + "</td><td>" + response["ads"][ad]["author"] + "</td><td>" + response["ads"][ad]["desc"] + "</td><td>" + response["ads"][ad]["posted_date"] + "</td><td>$" + response["ads"][ad]["bid"]+ "</td><td><a href='viewAd.html?ad_id=" + response["ads"][ad]["ad_id"] + "' class='btn btn-primary'>View</a></td></tr>");
          }

          // End table
          table += "</table>";

          // Draw to screen
          $("#AdsTable").html(table);
        },
        error: function() {
          displayError("Communication with the server has failed. Please try again later");
        }
    });
  }
}

function getAdsByEmail(email) {
  $.ajax({
      url: '/ads?email=' + email,
      type: 'GET',
      success: function(response) {
        // Start table
        var table = ('<table class="table table-hover"><thead><tr><th>Title</th><th>Author</th><th>Description</th><th>Posted Date</th><th>Current Bid</th><th>View</th><th>Delete</th></tr></thead><tbody>');

        // Fill in rows
        for (ad in response["ads"]){
          // Details
          table += ("<tr><td>" + response["ads"][ad]["book_title"] + "</td><td>" + response["ads"][ad]["author"] + "</td><td>" + response["ads"][ad]["desc"] + "</td><td>" + response["ads"][ad]["posted_date"] + "</td><td>$" + response["ads"][ad]["bid"]+ "</td><td><a href='viewAd.html?ad_id=" + response["ads"][ad]["ad_id"] + "' class='btn btn-primary'>View</a></td><td><a class='btn btn-danger' onclick='deleteListing(" + response["ads"][ad]["ad_id"] + ")'>Delete</a></td></tr>");
        }

        // End table
        table += "</table>";

        // Draw to screen
        $("#AdsTable").html(table);
      },
      error: function() {
        displayError("Communication with the server has failed. Please try again later");
      }
  });
}

function getAdsByCourse(code) {
  if(getCookie("adminStatus") == "admin"){
    $.ajax({
        url: '/ads?course_code=' + code,
        type: 'GET',
        success: function(response) {
          // Start table
          var table = ('<table class="table table-hover"><thead><tr><th>Title</th><th>Author</th><th>Description</th><th>Posted Date</th><th>Current Bid</th><th>View</th><th>Delete</th></tr></thead><tbody>');

          // Fill in rows
          for (ad in response["ads"]){
            // Details
            table += ("<tr><td>" + response["ads"][ad]["book_title"] + "</td><td>" + response["ads"][ad]["author"] + "</td><td>" + response["ads"][ad]["desc"] + "</td><td>" + response["ads"][ad]["posted_date"] + "</td><td>$" + response["ads"][ad]["bid"]+ "</td><td><a href='viewAd.html?ad_id=" + response["ads"][ad]["ad_id"] + "' class='btn btn-primary'>View</a></td><td><a class='btn btn-danger' onclick='deleteListing(" + response["ads"][ad]["ad_id"] + ")'>Delete</a></td></tr>");
          }

          // End table
          table += "</table>";

          // Draw to screen
          $("#AdsTable").html(table);
        },
        error: function() {
          displayError("Communication with the server has failed. Please try again later");
        }
    });
  }else{
    $.ajax({
        url: '/ads?course_code=' + code,
        type: 'GET',
        success: function(response) {
          // Start table
          var table = ('<table class="table table-hover"><thead><tr><th>Title</th><th>Author</th><th>Description</th><th>Posted Date</th><th>Current Bid</th><th>View</th></tr></thead><tbody>');

          // Fill in rows
          for (ad in response["ads"]){
            // Details
            table += ("<tr><td>" + response["ads"][ad]["book_title"] + "</td><td>" + response["ads"][ad]["author"] + "</td><td>" + response["ads"][ad]["desc"] + "</td><td>" + response["ads"][ad]["posted_date"] + "</td><td>$" + response["ads"][ad]["bid"]+ "</td><td><a href='viewAd.html?ad_id=" + response["ads"][ad]["ad_id"] + "' class='btn btn-primary'>View</a></td></tr>");
          }

          // End table
          table += "</table>";

          // Draw to screen
          $("#AdsTable").html(table);
        },
        error: function() {
          displayError("Communication with the server has failed. Please try again later");
        }
    });
  }
}

function getAdsByTitle(code) {
  $.ajax({
      url: '/ads?book_title=' + code,
      type: 'GET',
      success: function(response) {
        // Start table
        var table = ('<table class="table table-hover"><thead><tr><th>Title</th><th>Author</th><th>Description</th><th>Posted Date</th><th>Current Bid</th><th>View</th></tr></thead><tbody>');

        // Fill in rows
        for (ad in response["ads"]){
          // Details
          table += ("<tr><td>" + response["ads"][ad]["book_title"] + "</td><td>" + response["ads"][ad]["author"] + "</td><td>" + response["ads"][ad]["desc"] + "</td><td>" + response["ads"][ad]["posted_date"] + "</td><td>$" + response["ads"][ad]["bid"]+ "</td><td><a href='viewAd.html?ad_id=" + response["ads"][ad]["ad_id"] + "' class='btn btn-primary'>View</a></td></tr>");
        }

        // End table
        table += "</table>";

        // Draw to screen
        $("#AdsTable").html(table);
      },
      error: function() {
        displayError("Communication with the server has failed. Please try again later");
      }
  });
}

function getComments(id) {
  $("textarea").val("");
  $.ajax({
      url: '/getAdComments?ad_id=' + id,
      type: 'GET',
      success: function(response) {
        // Catch any incoming errors
        if(response == "Failure\n"){
          displayError("Book ID is not found");
          response = "";
        }
        var arr = $.map(response, function(el) { return el });

        for (i = 0; i < arr.length; i++){
          $.ajax({
              url: '/getComment?comment_id=' + arr[i],
              type: 'GET',
              success: function(response) {
                  $("#comments").val($("#comments").val() + response["posted_date"] + " - " + response["poster_email"] + " - " + response["comment"] + "\n");
                  $('#comments').scrollTop($('#comments')[0].scrollHeight);
              },
              error: function() {
                displayError("Communication with the server has failed. Please try again later. Could not retrieve comments");
              }
          });
        }
      },
      error: function() {
        displayError("Communication with the server has failed. Please try again later. Could not retrieve comments");
      }
  });
}


function deleteListing(id) {
  if (confirm("You are about to delete a listing. Are you sure?")){
    // Send the info to server
    $.ajax({
        url: '/deleteAd?ad_id=' + id,
        type: 'DELETE',
        success: function(response) {
            alert(response);
            location.reload(); // Refresh to page to reflect changes
        },
        error: function() {
          displayError("Communication with the server has failed. Please try again later");
        }
    });
  }
}


function search(){
  // See which radio is checked and perform search accordingly
  if($('#searchTitle').is(':checked')){
    getAdsByTitle($("#searchbar").val());
  }else{
    getAdsByCourse($("#searchbar").val());
  }
}

function postBidHandler(evt) {
  let bidData = constructFormJson(evt, "bidForm");
  let query = window.location.search.substring(1);
  let queryPieces = query.split("=");
  bidData[queryPieces[0]] = queryPieces[1];
  bidData["token"] = getCookie("token");
  bidData["bid_owner"] = getCookie("email");
  $.ajax({
    url: "/bid",
    type: "POST",
    data: bidData,
    success: function(response) {
        alert(response);
        window.location.reload();
    },
    error: function() {
      displayError("Communication with the server has failed. Please try again later.");
    }
  });
}

function addBid() {
  let bidElem = $("#bidForm");
  bidElem.submit(postBidHandler);
}

function addComment() {
  let commentBtn = $("#commentBtn");
  let query = window.location.search.substring(1);
  let queryPieces = query.split("=");
  let id = queryPieces[1];
  let commentData = {"ad_id": id, "email": getCookie("email")};
  commentBtn.click(function() {
      let commentText = $("#comment").val();
      commentData["comment"] = commentText;
      $.ajax({
        url: "/newComment",
        type: "POST",
        data: commentData,
        success: function() {
            $("#comment").val("");
            getComments(id);
        },
        error: function() {
          displayError("Communication with the server has failed. Please try again later.");
        }
      });
  });

}

function acceptBid() {
  let query = window.location.search.substring(1);
  let queryPieces = query.split("=");
  let id = queryPieces[1];
  let acceptData = {"ad_id": id, "token": getCookie("token")};
  $.ajax({
    url: '/acceptBid',
    type: 'POST',
    data: acceptData,
    success: function(res) {
      if (res == "Success") {
        alert("Bid accepted successfully! Check your email for details.");
        window.location.href = "yourAds.html";
      }
      else {
        alert("You are not the owner of this ad! Bid not accepted.");
        window.location.reload();
      }
    },
    error: function() {
      displayError("Communication with the server has failed. Please try again later.");
    }
  });
}


function addModifyBtn() {
  let query = window.location.search.substring(1);
  let queryPieces = query.split("=");
  let id = queryPieces[1];
  if ((window.location.search != "") && queryPieces[0] == "ad_id") {
    $.ajax({
        url: '/ads?ad_id=' + id,
        type: 'GET',
        success: function(response) {
            // Check if person viewing is the owner of the ad or an admin
            let email = response["ads"][0]["owner_email"];
            if (getCookie("email") == email || getCookie("adminStatus") == "admin") {
              let modifyBtn = $("<button type=\"button\" class=\"btn btn-primary\">Make Modifications</button>");
              $("#overview").append($("<br>"));
              $("#overview").append(modifyBtn);
              modifyBtn.click(function() {
                setCookie("ad_id", id, 10000);
                window.location.href = "editListing.html";
              });
            }
        },
        error: function() {
          displayError("Communication with the server has failed. Please try again later.");
        }
    });
  }

}

$(document).ready(function() {
  addBid();
  addComment();
  addModifyBtn();
});
