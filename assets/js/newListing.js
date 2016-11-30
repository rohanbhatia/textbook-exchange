'use strict';

/**
 * submit submit button event handler callback.
 *
 * @param {object} click event
 *
 */

function submitHandler(evt) {
  let submitData = constructFormJson(evt, "newListingForm");
  submitData["email"] = getCookie("email");
  submitData["token"] = getCookie("token");

  $.ajax({
    url: "/newAd",
    type: "POST",
    data: submitData,
    success: function(response) {
      if (response == "Success") {
        alert("New listing added successfully!");
        //redirect
        window.location.href = "yourAds.html";
      }
      else {
        alert("Changes were not saved.");
        window.location.reload();
      }

    },
    error: function() {
      displayError("Communication with the server has failed. Please try again later.");
    }
  });
}


/**
 * Add submitHandler to submit button.
 *
 */
function addSubmit() {
  let submitElem = $("#newListingForm");
  submitElem.submit(submitHandler);
}

/**
 * Init Method.
 */
function init() {
   addSubmit();
 }

$(document).ready(function() {
  init();
});
