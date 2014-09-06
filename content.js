console.log("content.js loaded")

chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
	switch(message.type) {
		case "get_answers_count":
			console.log("inside get_answers_count")
			var ansCount = document.getElementsByClassName("Answer").length
			alert(ansCount)
		break;
	}
});