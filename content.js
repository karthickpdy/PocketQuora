var old_answer_count;

function getAnswerCount(){
	var a = document.getElementsByClassName("AnswerActionBar").length;
	return a;
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
	

document.body.onload = function() {
	console.log("content.js loaded");
	getAccessToken();
		
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
		var img =$('<img>')[0];
		img.src= chrome.extension.getURL('icons/pocket.jpeg');
		$("div.AnswerActionBar:not(:has(span.pocket_button))").append("<div class ='action_item'><a href=#><img height='12px' width ='12px' src="+img.src+"><span class='pocket_button'> Pocket</span></a></div>")
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