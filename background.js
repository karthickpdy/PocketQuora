// listening for an event / one-time requests
// coming from the popup
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.type) {
        case "answer_count":
            getAnswersCount();
        break;
        case "access-token":
            getAccessToken();
        break;
    }
    return true;
});

// send a message to the content script
var getAnswersCount = function() {
	chrome.tabs.getSelected(null, function(tab){
	    chrome.tabs.sendMessage(tab.id, {type: "get_answers_count"});
	});
}



var accessToken = null;

function getAccessToken(){
  if (!accessToken) {
    console.log('access token');

    var url = 'https://getpocket.com/v3/oauth/request';
    var data = { "consumer_key": "31911-18716d45d16315514e88e09c",
		  												"redirect_uri": "pocketapp1234:authorizationFinished" }
    $.ajax({
		  url:url,
		  type:"POST",
		  data: JSON.stringify(data),
		  contentType:"application/json",
		  success: function(data, textStatus, xhr){
		  		console.log("success")
		      accessToken = data.split('=')[1];
	        console.log("success")
	        console.log("accessToken = "+accessToken)
		  },
		  error: function(xhr, textStatus, error){
		  	console.log("failure")
		  	console.log(error)
		  }
		}) //post
  }//if
  return accessToken;
}