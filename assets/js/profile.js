'use strict';

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
        displayError("Communication with the server has failed. Please try again later.");
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
        displayError("Communication with the server has failed. Please try again later.");
      }
  });
}

/**
 * Update Profile submit button event handler callback.
 *
 * @param {object} click event
 *
 */
function updateProfileHandler(evt) {
  let updatedData = constructFormJson(evt, "profileForm");
  updatedData["token"] = getCookie("token");
  //console.log(JSON.stringify(updatedData));

  // First line of defense against unauthorised changes
  if (getCookie("email") == updatedData["email"] ||
                              getCookie("adminStatus") == "admin") {
    $.ajax({
      url: "/editUser",
      type: "POST",
      data: updatedData,
      success: function(response) {
        if (response == "Success") {
          alert("Profile updated successfully!");
          window.location.reload();
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
  else {
    alert("Access denied!");
    window.location.reload();
  }

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
