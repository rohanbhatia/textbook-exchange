'use strict'

function populateAdForm() {
  let id = getCookie("id");
  $.ajax({
      url: '/ads?id=' + id,
      type: 'GET',
      success: function(response) {
        $("th").text(response["ads"][0]["title"]);
        $("#title").val(response["ads"][0]["title"]);
        $("#author").val(response["ads"][0]["author"]);
        $("#isbn").val(response["ads"][0]["isbn"]);
        $("#bid").val(response["ads"][0]["bid"]);
        $("#courses").val(response["ads"][0]["courses"]);
        $("#description").val(response["ads"][0]["description"]);
      },
      error: function() {
        displayError("Communication with the server has failed. Please try again later.");
      }
  });
}

// On click of "Save Changes" strip out info from form and post to editUser
// if bid changes - must change bidOwner bid
// On successful "Save Changes", delete id cookie

function saveChangesHandler(evt) {
  let updatedListingData = constructFormJson(evt, "listingForm");
  updatedListingData["token"] = getCookie("token");
  
}

function addSaveChangesBtn() {
  let saveChangesElem = $("#listingForm");
  saveChangesElem.submit(saveChangesHandler);
}

$(document).ready(function() {
  populateAdForm();
  addSaveChangesBtn();
});
