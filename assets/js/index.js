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

/**
 * Login submit button event handler callback.
 *
 * @param {object} click event
 *
 */

function loginHandler(evt) {
  let loginData = constructFormJson(evt, "loginForm");
  //console.log(JSON.stringify(loginData));
  // TODO discuss with Tim:
  // GET req: user, do validation here and then POST req to login?
  // Is it possible to do validation here if we use bcrypt?
  // How are we preventing direct requests to REST API?
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
  //console.log(JSON.stringify(signUpData));
  $.ajax({
    url: "/signup",
    type: "POST",
    data: signUpData,
    success: function() {
      alert("Thank you for joining us. Please login to get started!");
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
