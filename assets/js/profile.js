'use strict';

/**
 * Helper function for form buttons to construct a JSON from the fields.
 *
 * @param {object} click event
 * @param {string} formID
 * @return {object} dataSet
 *
 */
function constructFormJson(evt, formID) {
  evt.preventDefault();
  let formData = $(("#"+formID)).serializeArray();
  let dataSet = {};
  for (let i = 0; i < formData.length; i++) {
    dataSet[(formData[i])["name"]] = (formData[i])["value"];
  }
  return dataSet;
}


// TODO: use cookie passed, GET req /user for userinfo
//        fill the form fields with their info
function populateForm() {


}

//TODO are we allowing changes to email?
/**
 * Update Profile submit button event handler callback.
 *
 * @param {object} click event
 *
 */
function updateProfileHandler(evt) {
  let updatedData = constructFormJson(evt, "profileForm");
  console.log(JSON.stringify(updatedData));
  $.ajax({
    url: "/editUser",
    type: "POST",
    data: updatedData,
    success: function() {
      alert("Profile updated successfully!");
    },
    error: function() {
      // TODO: Change this to relevant error handling.
      alert("Thar be an error round these parts.");
    }
  });
}

/**
 * Add Update Profile Handler to login button.
 *
 */
function addUpdateProfile() {
  let updateProfileElem = $("#profileForm");
  updateProfileElem.submit(updateProfileHandler);
}


// TODO Use cookie, GET req /ads?email=test@gmail.com
// populate table, add onclick of VIEW = getDetailedAd (access decisions)
// add onclick of delete = deleteListing
function populateMyAds() {

}


/**
 * Init Method.
 */
function init() {
  addUpdateProfile();
 }

$(document).ready(function() {
  init();
});
