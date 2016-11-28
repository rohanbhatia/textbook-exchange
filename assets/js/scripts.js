// Replaces the entire page with an error
function displayError(err){
	$("#page-content-wrapper").html("<h1>An error has occured. Details: " + err + "</h2>");
}

// Admin view modificaitons
function adminStuff(){
	if(getCookie("adminStatus") == "admin"){
		$(".admin").css('visibility','visible');
	}
}

// Kick out if not admin
function adminStatusCheck(){
	if(getCookie("adminStatus") != "admin"){
		displayError("This page is restricted for admins only!");
	}
}

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
  console.log(dataSet);
  return dataSet;
}


function logout() {
	let cookies = document.cookie.split(";");
	for (let i = 0; i < cookies.length; i++) {
		let cookie = cookies[i];
		let cookieCrumbs = cookie.split("=");
		document.cookie = cookieCrumbs[0] +
												"=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
	}
	//redirect
	window.location.href = "index.html";
}
