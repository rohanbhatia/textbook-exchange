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