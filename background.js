// listening for an event / one-time requests
// coming from the popup
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.type) {
        case "answer_count":
            getAnswersCount();
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