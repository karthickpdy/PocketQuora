var old_answer_count;

function getAnswerCount(){
	var a = document.getElementsByClassName("AnswerActionBar").length;
	return a;
}
	

document.body.onload = function() {
	console.log("content.js loaded");

		
	old_answer_count = getAnswerCount();
	addPocketLinkToAnswers();

	$('body').bind("DOMSubtreeModified",function(){
		// console.log("INSIDE DOMSubtreeModified" + old_answer_count + "new count" + getAnswerCount());
		if(old_answer_count != getAnswerCount())
		addPocketLinkToAnswers();
	});

	function addPocketLinkToAnswers(){
		//add button to all answers present while content.js is loaded
		//get all bars that dont have the link already
		$("div.AnswerActionBar:not(:has(span.pocket_button))").append("<a href=#><span class='pocket_button'>pocket</span></a>")
	}
	
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
			var a= getAnswerCount();
			console.log("answer count called"+a)
		break;
	}
});