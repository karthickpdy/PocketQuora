document.body.onload = function() {
	console.log("content.js loaded")

	//add button to all answers present while content.js is loaded
	$(".AnswerActionBar").append("<a href=#><span class='pocket_button'>pocket</span></a>")

	$("span.pocket_button").on("click", function(e){
			console.log("get_answer_link")
			var parent = $(this).parents(".Answer")
			var link = parent.find("div.ContentFooter span:first a").attr("href");
			var fullLink = "https://quora.com"+link
			console.log(fullLink)
	})

}


chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
	switch(message.type) {
		case "get_answers_count":
			console.log("inside get_answers_count")
			var ansCount = document.getElementsByClassName("Answer").length
			alert(ansCount)
		break;
	}
});