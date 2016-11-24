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
      }
  });
}

function getAllAds() {
  $.ajax({
      url: '/ads',
      type: 'GET',
      success: function(response) {
          var table = ('<table class="table table-hover"><thead><tr><th>Title</th><th>Author</th><th>Description</th><th>Posted Date</th><th>Current Bid</th><th>View</th></tr></thead><tbody>');
          for (ad in response["ads"]){
            // Details
            table += ("<tr><td>" + response["ads"][ad]["title"] + "</td><td>" + response["ads"][ad]["author"] + "</td><td>" + response["ads"][ad]["description"] + "</td><td>" + response["ads"][ad]["posteddate"] + "</td><td>$" + response["ads"][ad]["bid"]+ "</td><td><a href='viewAd.html?id=" + response["ads"][ad]["id"] + "' class='btn btn-primary'>View</a></td></tr>");
            console.log(response["ads"][ad]["title"]);
          }
          table += "</table>";
          $("#AdsTable").html(table);
      }
  });
}