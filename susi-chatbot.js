var susi_skills_deployed_url = "https://skills.susi.ai/";
//Appending CSS
var headTag = document.getElementsByTagName("head")[0];
var link  = document.createElement('link');
link.rel  = 'stylesheet';
link.type = 'text/css';
link.href = susi_skills_deployed_url+'chat-style.css';
link.media = 'all';
headTag.appendChild(link);
link = document.createElement('link');
link.rel  = 'stylesheet';
link.type = 'text/css';
link.href = susi_skills_deployed_url+'chatbox-style.min.css';
link.media = 'all';
headTag.appendChild(link);

if(typeof jQuery=='undefined') {
    var jqTag = document.createElement('script');
    jqTag.type = 'text/javascript';
    jqTag.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';
    jqTag.onload = enableBot;
    headTag.appendChild(jqTag);
} else {
    enableBot();
}

function enableBot(){
	$(document).ready(function() {

		var baseUrl = "https://api.susi.ai/susi/chat.json?q=";
		
		// Add dynamic html bot content(Widget style)
		var mybot = '<div id="susi-frame-container" class="susi-frame-container-active" style="display: none;">'+
			'<div id="susi-frame-wrap">'+
			'<div id="susi">'+
			    '<div id="susi-container" class="susi-container susi-reset">'+
			        '<div id="susi-chatbox" class="susi-chatbox">'+
			            '<div id="susi-conversation" class="susi-conversation susi-sheet susi-sheet-active susi-active">'+
			                '<div class="susi-sheet-content">'+
			                    '<div class="susi-sheet-content-container">'+
			                        '<div class="susi-conversation-parts-container">'+
			                            '<div id="susi-message" class="susi-conversation-parts">'+
			                            '</div>'+
			                        '</div>'+
			                    '</div>'+
			                '</div>'+
			                '<div class="susi-composer-container">'+
			                    '<div id="susi-composer" class="susi-composer ">'+
			                        '<div class="susi-composer-textarea-container">'+
			                            '<div class="susi-composer-textarea" id="chat-input">'+ '<pre class="susi-send-button">'+'</pre>'+
			                                '<textarea id="txMessage" placeholder="Type an answer" rows="1">'+'</textarea>'+
			                            '</div>'+
			                        '</div>'+
			                    '</div>'+
			                '</div>'+
			            '</div>'+
			        '</div>'+
			    '</div>'+
			'</div>'+
		'</div>'+
	'</div>'
			+'</div>'+
			'<div id="susi-launcher-close" title="Close" style="display: none;">'+'</div>'+
		'</div>'+
		'<div id="susi-launcher-container" class="susi-flex-center susi-avatar-launcher susi-launcher-enabled">'+
			'<div id="susi-avatar-text">'+'Hey there'+'</div>'+
			'<div id="susi-launcher" class="susi-launcher susi-flex-center susi-launcher-active" style="background-color: rgb(91, 75, 159);">'+
				'<div id="susi-launcher-button" class="susi-launcher-button" style="background-image: url('+ susi_skills_deployed_url + 'avatar.jpg' +');">'+'</div>'+
			'</div>'+
		'</div>';

		$("body").html(mybot);

		// Toggle chatbot 
		$('#susi-launcher').click(function() {
			$('.susi-frame-container-active').toggle();
			$('#susi-avatar-text').toggle();
			$('#susi-launcher-close').toggle();
			document.getElementById('chat-input').focus();
		});

		$('#susi-launcher-close').click(function() {
			$('.susi-frame-container-active').toggle();
			$('#susi-avatar-text').toggle();
			$('#susi-launcher-close').toggle();
		});

		// on input/text enter
		$('#txMessage').on('keyup keypress', function(e) {
			var keyCode = e.keyCode || e.which;
			var text = $("#txMessage").val();
			if (keyCode === 13) {
				if(text == "" ||  $.trim(text) == '') {
					e.preventDefault();
					return false;
				} else {
					$("#chat-input").blur();
					setUserResponse(text);
					send(text);
					e.preventDefault();
					return false;
				}
			}
		});
		$('.susi-send-button').click(function(){
			var text = $("#txMessage").val();
			$("#chat-input").blur();
			setUserResponse(text);
			send(text);
		});

		// Send request to SUSI API
		function send(text) {
			$.ajax({
				type: "GET",
				url: baseUrl+text,
				contentType: "application/json",
				dataType: "json",
				success: function(data) {
					main(data);
				},
				error: function(e) {
					console.log(e);
				}
			});
		}


		// Main function 
		function main(data) {
			var ans;
			if(data.answers[0])
				ans = data.answers[0].actions[0].expression;
			else
				ans = "Sorry, I could not understand what you just said."
			
			setBotResponse(ans);
		}


		// Set bot response 
		function setBotResponse(val) {
			setTimeout(function(){
				val = val.replace(new RegExp('\r?\n','g'), '<br />');
				var BotResponse = '<div class="susi-conversation-part susi-conversation-part-grouped-first">'+
		'<div style="background-image: url('+ susi_skills_deployed_url + 'avatar.jpg' + ')" class="susi-comment-avatar susi-theme-bg">'+
			
		'</div>'+
		'<div class=" susi-comment susi-comment-by-susi ">'+
			'<div class="susi-comment-body-container">'+
				'<div class="susi-comment-body ">'+
					'<div class="susi-comment-content">'+
						'<div class="susi-question-label">'+
							'<div>'+val+'</div>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>'+
	'</div>';
				$(BotResponse).appendTo('.susi-conversation-parts');
				scrollToBottomOfResults();
			}, 100);
		}


		// Set user response
		function setUserResponse(val) {
			var UserResponse = '<div class="susi-conversation-part susi-conversation-part-grouped-first">'+
		'<div class=" susi-comment susi-comment-by-user ">'+
			'<div class="susi-comment-body-container">'+
				'<div class="susi-comment-body ">'+
					'<div class="susi-comment-content">'+
						val+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>'+
	'</div>';
			$(UserResponse).appendTo('.susi-conversation-parts');
			scrollToBottomOfResults();
			$("#txMessage").val('');
		}

		// Scroll to the bottom
		function scrollToBottomOfResults() {
			var textsDiv = document.querySelector('.susi-sheet-content');
			textsDiv.scrollTop = textsDiv.scrollHeight;
		}

	});
}
