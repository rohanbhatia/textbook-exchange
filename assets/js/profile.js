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


// Get user info from server and populate
function populateForm(email) {
  $.ajax({
      url: '/user?email=' + email,
      type: 'GET',
      success: function(response) {
        $("#firstName").val(response["users"][0]["firstName"]);
        $("#lastName").val(response["users"][0]["lastName"]);
        $("#email").val(response["users"][0]["email"]);
        $("#password").val(response["users"][0]["password"]);
      },
      error: function() {
        displayError("Communication with the server has failed. Please try again later");
      }
  });
}

// Get all of the users in the form of a list
function getAllUsers() {
  $.ajax({
      url: '/user',
      type: 'GET',
      success: function(response) {
        // Start table
        var table = ('<table class="table table-hover"><thead><tr><th>First Name</th><th>Last Name</th><th>Email</th><th>User Type</th><th>View</th></tr></thead><tbody>');
        var user;
        // Fill in rows
        for (user in response["users"]){
          // Details
          table += ("<tr><td>" + response["users"][user]["firstName"] + "</td><td>" + response["users"][user]["lastName"] + "</td><td>" + response["users"][user]["email"] + "</td><td>" + response["users"][user]["adminStatus"] + "</td><td><a href='editUser.html?email=" + response["users"][user]["email"] + "' class='btn btn-primary'>View</a></td></tr>");
        }

        // End table
        table += "</table>";

        // Draw to screen
        $("#UsersTable").html(table);
      },
      error: function() {
        displayError("Communication with the server has failed. Please try again later");
      }
  });
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


/**
 * Init Method.
 */
function init() {
  addUpdateProfile();
 }

$(document).ready(function() {
  init();
});
