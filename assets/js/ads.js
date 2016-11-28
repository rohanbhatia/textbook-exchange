function getDetailedAd(id) {
  $.ajax({
      url: '/ads?id=' + id,
      type: 'GET',
      success: function(response) {
          // Details
          $("#bookname").html(response["ads"][0]["title"]);
          $("#overview").html("<b>Book Name: </b>" + response["ads"][0]["title"]);
          $("#overview").append("<br><b>Author: </b>" + response["ads"][0]["author"]);
          $("#overview").append("<br><b>Description: </b>" + response["ads"][0]["description"]);
          $("#overview").append("<br><b>ISBN: </b>" + response["ads"][0]["isbn"]);
          $("#overview").append("<br><b>Posted Date: </b>" + response["ads"][0]["posteddate"]);
          $("#overview").append("<br><b>Courses: </b>");
          for (c in response["ads"][0]["courses"]){
            $("#overview").append(response["ads"][0]["courses"][c] + "  ");
          }

          // Bid
          $("#currentbid").html("Current Bid: $" + response["ads"][0]["bid"]);
      },
      error: function(response) {
        displayError("Book ID not found");
      }
  });
}

function getAllAds() {
  $.ajax({
      url: '/ads',
      type: 'GET',
      success: function(response) {
        // Start table
        var table = ('<table class="table table-hover"><thead><tr><th>Title</th><th>Author</th><th>Description</th><th>Posted Date</th><th>Current Bid</th><th>View</th></tr></thead><tbody>');

        // Fill in rows
        for (ad in response["ads"]){
          // Details
          table += ("<tr><td>" + response["ads"][ad]["title"] + "</td><td>" + response["ads"][ad]["author"] + "</td><td>" + response["ads"][ad]["description"] + "</td><td>" + response["ads"][ad]["posteddate"] + "</td><td>$" + response["ads"][ad]["bid"]+ "</td><td><a href='viewAd.html?id=" + response["ads"][ad]["id"] + "' class='btn btn-primary'>View</a></td></tr>");
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
          table += ("<tr><td>" + response["ads"][ad]["title"] + "</td><td>" + response["ads"][ad]["author"] + "</td><td>" + response["ads"][ad]["description"] + "</td><td>" + response["ads"][ad]["posteddate"] + "</td><td>$" + response["ads"][ad]["bid"]+ "</td><td><a href='viewAd.html?id=" + response["ads"][ad]["id"] + "' class='btn btn-primary'>View</a></td><td><a class='btn btn-danger' onclick='deleteListing(" + response["ads"][ad]["id"] + ")'>Delete</a></td></tr>");
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
  $.ajax({
      url: '/ads?course=' + code,
      type: 'GET',
      success: function(response) {
        // Start table
        var table = ('<table class="table table-hover"><thead><tr><th>Title</th><th>Author</th><th>Description</th><th>Posted Date</th><th>Current Bid</th><th>View</th></tr></thead><tbody>');

        // Fill in rows
        for (ad in response["ads"]){
          // Details
          table += ("<tr><td>" + response["ads"][ad]["title"] + "</td><td>" + response["ads"][ad]["author"] + "</td><td>" + response["ads"][ad]["description"] + "</td><td>" + response["ads"][ad]["posteddate"] + "</td><td>$" + response["ads"][ad]["bid"]+ "</td><td><a href='viewAd.html?id=" + response["ads"][ad]["id"] + "' class='btn btn-primary'>View</a></td></tr>");
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

function getAdsByTitle(code) {
  $.ajax({
      url: '/ads?title=' + code,
      type: 'GET',
      success: function(response) {
        // Start table
        var table = ('<table class="table table-hover"><thead><tr><th>Title</th><th>Author</th><th>Description</th><th>Posted Date</th><th>Current Bid</th><th>View</th></tr></thead><tbody>');

        // Fill in rows
        for (ad in response["ads"]){
          // Details
          table += ("<tr><td>" + response["ads"][ad]["title"] + "</td><td>" + response["ads"][ad]["author"] + "</td><td>" + response["ads"][ad]["description"] + "</td><td>" + response["ads"][ad]["posteddate"] + "</td><td>$" + response["ads"][ad]["bid"]+ "</td><td><a href='viewAd.html?id=" + response["ads"][ad]["id"] + "' class='btn btn-primary'>View</a></td></tr>");
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
      url: '/comments?id=' + id,
      type: 'GET',
      success: function(response) {

        for (i in response["comments"]){
          $("#comments").val($("#comments").val() + response["comments"][i]["posteddatetime"] + " - " + response["comments"][i]["email"] + " - " + response["comments"][i]["comments"] + "\n");
        }
      },
      error: function() {
        displayError("Communication with the server has failed. Please try again later");
      }
  });
}


function deleteListing(id) {
  if (confirm("You are about to delete a listing. Are you sure?")){
    // Send the info to server
    $.ajax({
        url: '/deleteAd?id=' + id,
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
  //console.log(bidData);
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
        url: "/addComment",
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


function addAcceptBid() {
  let query = window.location.search.substring(1);
  let queryPieces = query.split("=");
  let id = queryPieces[1];
  let acceptData = {"id": id, "token": getCookie("token")};
  $.ajax({
      url: '/ads?id=' + id,
      type: 'GET',
      success: function(response) {
          // Check if person viewing is the owner of the ad
          let email = response["ads"][0]["email"];
          if (getCookie("email") == email) {
            let acceptBtn = $("<button type=\"button\" class=\"btn btn-primary\">Accept Bid</button>");
            $("#bidForm").append(acceptBtn);
            acceptBtn.click(function() {
              $.ajax({
                url: '/acceptBid',
                type: 'POST',
                data: acceptData,
                success: function(res) {
                  if (res == "Success") {
                    alert("Bid accepted successfully!");
                    window.location.href = "yourAds.html";
                  }
                  else {
                    alert("Bid not accepted. Please try again.");
                    window.location.reload();
                  }
                },
                error: function() {
                  displayError("Communication with the server has failed. Please try again later.");
                }
              });
            });
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
  $.ajax({
      url: '/ads?id=' + id,
      type: 'GET',
      success: function(response) {
          // Check if person viewing is the owner of the ad or an admin
          let email = response["ads"][0]["email"];
          if (getCookie("email") == email || getCookie("adminStatus") == "admin") {
            let modifyBtn = $("<button type=\"button\" class=\"btn btn-primary\">Make Modifications</button>");
            $("#overview").append($("<br>"));
            $("#overview").append(modifyBtn);
            modifyBtn.click(function() {
              setCookie("id", id, 10000);
              window.location.href = "editListing.html";
            });
          }
      },
      error: function() {
        displayError("Communication with the server has failed. Please try again later.");
      }
  });
}

$(document).ready(function() {
  addBid();
  addComment();
  addAcceptBid();
  addModifyBtn();
});
