// Replaces the entire page with an error
function displayError(err){
	$("#page-content-wrapper").html("<h1>An error has occured. Details: " + err + "</h2>");
}