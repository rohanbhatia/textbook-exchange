'use strict'

function populateAdForm() {
  let id = getCookie("ad_id");
  $.ajax({
      url: '/ads?ad_id=' + id,
      type: 'GET',
      success: function(response) {
        $("th").text(response["ads"][0]["book_title"]);
        $("#title").val(response["ads"][0]["book_title"]);
        $("#author").val(response["ads"][0]["author"]);
        $("#isbn").val(response["ads"][0]["isbn"]);
        $("#bid").val(response["ads"][0]["bid"]);
        $("#courses").val(response["ads"][0]["course_code"]);
        $("#description").val(response["ads"][0]["desc"]);
      },
      error: function() {
        displayError("Communication with the server has failed. Please try again later.");
      }
  });
}

// On click of "Save Changes" strip out info from form and post to editAd
// if bid changes - must change bidOwner bid
// On successful "Save Changes", delete id cookie

function saveChangesHandler(evt) {
  let updatedListingData = constructFormJson(evt, "listingForm");
  updatedListingData["token"] = getCookie("token");
  updatedListingData["ad_id"] = getCookie("ad_id");
  $.ajax({
    url: '/editAd',
    type: 'POST',
    data: updatedListingData,
    success: function(res) {
      if (res == "Success") {
        alert("Changes saved!");
        window.location.href = "viewAd.html?ad_id=" + getCookie("ad_id");
        document.cookie = "ad_id=; expires=Thu, 01 Jan 1970 00:00:00 GMT";

      }
      else {
        alert("You are not permitted to make changes to this ad!");
        document.cookie = "ad_id=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        window.location.href = "allAds.html";
      }
    },
    error: function() {
      document.cookie = "ad_id=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      displayError("Communication with the server has failed. Please try again later.");
    }
  });
}

function addSaveChangesBtn() {
  let saveChangesElem = $("#listingForm");
  saveChangesElem.submit(saveChangesHandler);
}

$(document).ready(function() {
  populateAdForm();
  addSaveChangesBtn();
});
