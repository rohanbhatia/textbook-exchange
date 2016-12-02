'use strict';

// Get user info from server and populate
function populateForm(email) {
  $.ajax({
      url: '/user?email=' + email,
      type: 'GET',
      success: function(response) {
        $("#firstName").val(response["users"][0]["first_name"]);
        $("#lastName").val(response["users"][0]["last_name"]);
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
        var table = ('<table class="table table-hover"><thead><tr><th>First Name</th><th>Last Name</th><th>Email</th><th>Admin</th><th>View</th><th>Delete</th></tr></thead><tbody>');
        var user;
        // Fill in rows
        for (user in response["users"]){
          // Details
          table += ("<tr><td>" + response["users"][user]["first_name"] + "</td><td>" + response["users"][user]["last_name"] + "</td><td>" + response["users"][user]["email"] + "</td><td>" + response["users"][user]["admin_status"] + "</td><td><a href='editUser.html?email=" + response["users"][user]["email"] + "' class='btn btn-primary'>View</a></td><td><a class='btn btn-danger' onclick='deleteUser(\"" + response["users"][user]["email"] + "\")'>Delete</a></td></tr>");
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

function deleteUser(id) {
  if (confirm("You are about to delete a user. Are you sure?")){
    // Send the info to server
    $.ajax({
        url: '/removeUser?email=' + id,
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

/**
 * Add Update Profile Handler to login button.
 *
 */
function addUpdateProfile() {
  let updateProfileElem = $("#profileForm");
  updateProfileElem.submit(updateProfileHandler);
}


/**
 * Admin create user submit button event handler callback.
 *
 * @param {object} click event
 *
 */
function createUserHandler(evt) {
  let createUserData = constructFormJson(evt, "createUserForm");

  $.ajax({
    url: "/signup",
    type: "POST",
    data: createUserData,
    success: function(response) {
      if (response == "Thank you for joining us. Please check your email to get started!"){
        alert("User created successfully!");
        window.location.href = "searchUser.html";
      }
      else {
        alert(response);
        window.location.reload();
      }

    },
    error: function() {
      displayError("Communication with the server has failed. Please try again later.");
    }
  });
}

/**
 * Add Sign Up Handler to login button.
 *
 */
function addCreateProfile() {
  let createUserElem = $("#createUserForm");
  createUserElem.submit(createUserHandler);
}


/**
 * Init Method.
 */
function init() {
  addUpdateProfile();
  addCreateProfile();
 }

$(document).ready(function() {
  init();
});
