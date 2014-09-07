// listening for an event / one-time requests
// coming from the popup
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.type) {
        case "authorize_pocket":
        	if (!isPocketAuthorized) {
        		getRequestToken();
        		console.log("REQUEST_TOKEN ="+REQUEST_TOKEN);
        	}
        break;
    }
    return true;
});

var REQUEST_TOKEN = null;
var CONSUMER_KEY = "31911-18716d45d16315514e88e09c";
var REDIRECT_URI = "quora.com";
var API = "https://getpocket.com";
var ACCESS_TOKEN = null;

var isPocketAuthorized = false;

function getRequestToken(){
  if (!REQUEST_TOKEN) {
    console.log('access token');

    var url = API+'/v3/oauth/request';
    var data = { consumer_key: CONSUMER_KEY ,
		  												redirect_uri: REDIRECT_URI}
    $.ajax({
		  url:url,
		  type:"POST",
		  data: JSON.stringify(data),
		  contentType:"application/json",
		  success: function(data, textStatus, xhr){
		  		console.log("success")
		      REQUEST_TOKEN = data.split('=')[1];
	        console.log("success")
	        console.log("REQUEST_TOKEN = "+REQUEST_TOKEN);
	        authorizePocket();
		  },
		  error: function(xhr, textStatus, error){
		  	console.log("failure")
		  	console.log(error)
		  }
		}) //post
  }//if
  return REQUEST_TOKEN;
}

function authorizePocket() {
	var url = API + "/auth/authorize?request_token="+REQUEST_TOKEN+"&redirect_uri="+REDIRECT_URI
	window.open(url,'_blank');
	isPocketAuthorized = true;
	return;
}

function getAccessToken() {
	var url = API + "/v3/oauth/authorize";
	var data = { consumer_key: CONSUMER_KEY ,
		  												code: REQUEST_TOKEN}
    $.ajax({
		  url:url,
		  type:"POST",
		  data: JSON.stringify(data),
		  contentType:"application/json",
		  dataType: "json",
		  success: function(data, textStatus, xhr){
		  		console.log("success")
		      ACCESS_TOKEN = data.access_token
		      USER_NAME = data.username
	        authorizePocket();
		  },
		  error: function(xhr, textStatus, error){
		  	console.log("failure")
		  	console.log(error)
		  }
		}) //post
  
  return ACCESS_TOKEN;
}

function addLinkToPocket(link) {
	var url = API + "/v3/add";
}