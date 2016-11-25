'use strict';

/**
 * Login submit button event handler callback.
 *
 * @param {object} click event
 *
 */

function loginHandler(evt) {
  let loginData = constructFormJson(evt, "loginForm");

  //console.log(JSON.stringify(loginData));
  // TODO
  // check if user is an admin or not

  $.ajax({
    url: "/login",
    type: "POST",
    data: loginData,
    success: function(response) {
      if ((typeof response) == "object") {
        setCookie("token", response.token, 1);
        //redirect
        window.location.href = "allAds.html";
      }
      else {
        alert(response);
      }
    },
    error: function() {
      // TODO: Change this to relevant error handling.
      alert("Thar be an error round these parts.");
    }
  });
}


/**
 * Add loginHandler to login button.
 *
 */
function addLogin() {
  let loginElem = $("#loginForm");
  loginElem.submit(loginHandler);
}


/**
 * Sign Up submit button event handler callback.
 *
 * @param {object} click event
 *
 */
function signUpHandler(evt) {
  let signUpData = constructFormJson(evt, "signUpForm");
  console.log(JSON.stringify(signUpData));

  $.ajax({
    url: "/signup",
    type: "POST",
    data: signUpData,
    success: function(response) {
      console.log("GOt here");
      console.log(response);
      if (response == "Thank you for joining us. Please login to get started!"){
        window.location.reload();
        alert(response);
      }
      else {
        alert(response);
        window.location.reload();
      }

    },
    error: function() {
      // TODO: Change this to relevant error handling.
      alert("Thar be an error round these parts.");
    }
  });
}

/**
 * Add Sign Up Handler to login button.
 *
 */
function addSignUp() {
  let signUpElem = $("#signUpForm");
  signUpElem.submit(signUpHandler);
}

/**
 * Init Method.
 */
function init() {
   addLogin();
   addSignUp();
 }

$(document).ready(function() {
  init();
});
