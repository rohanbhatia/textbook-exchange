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

