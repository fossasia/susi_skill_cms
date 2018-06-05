var susi_skills_deployed_url = "https://skills.susi.ai/";
//Appending CSS
var headTag = document.getElementsByTagName("head")[0];
var link  = document.createElement('link');
link.rel  = 'stylesheet';
link.type = 'text/css';
link.href = susi_skills_deployed_url+'chatbox-style.min.css';
link.media = 'all';
headTag.appendChild(link);
link = document.createElement('link');
link.rel  = 'stylesheet';
link.type = 'text/css';
link.href = susi_skills_deployed_url+'chat-style.css';
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
	var script_tag = document.getElementById("susi-bot-script");
	var token = script_tag.getAttribute("data-token");
	
	$(document).ready(function() {
		//info[0] stores name, info[1] stores email id, info[2] stores message
		var info = ['', '', ''], flag=0;
		var baseUrl = "https://api.susi.ai/susi/chat.json?q=";
		
		// Add dynamic html bot content(Widget style)
		var mybot = 
		'<div id="susi-frame-container" class="susi-frame-container-active" style="display: none;">'+
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
				                        	'<div class="susi-composer-textarea" id="chat-input">'+ '<pre class="susi-send-button"><?xml version="1.0" encoding="UTF-8"?>'+
				                            '<!DOCTYPE svg  PUBLIC "-//W3C//DTD SVG 1.1//EN"  "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">'+
				                            '<svg width="100%" height="100%" enable-background="new 0 0 535.5 535.5" version="1.1" viewBox="0 0 535.5 535.5" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">'+
				                            '<polygon points="0 497.25 535.5 267.75 0 38.25 0 216.75 382.5 267.75 0 318.75" fill="#2180c0"/>'+'</pre>'+
				                            	'<textarea id="susiTextMessage" placeholder="Enter your response" rows="1">'+'</textarea>'+
				                            '</div>'+
				                        '</div>'+
				                    '</div>'+
				                '</div>'+
				            '</div>'+
				        '</div>'+
				    '</div>'+
				'</div>'+
			'</div>'+
		'</div>'+
		'<div id="susi-launcher-close" title="Close" style="display: none;">'+'</div>'+
		'<div id="susi-launcher-container" class="susi-flex-center susi-avatar-launcher susi-launcher-enabled">'+
			'<div id="susi-avatar-text">'+'Hey there'+'</div>'+
			'<div id="susi-launcher" class="susi-launcher susi-flex-center susi-launcher-active" style="background-color: rgb(91, 75, 159);">'+
				'<div id="susi-launcher-button" class="susi-launcher-button" style="background-image: url('+ susi_skills_deployed_url + 'avatar.jpg' +');">'+'</div>'+
			'</div>'+
		'</div>';

		$("body").append(mybot);

		// Toggle chatbot 
		$('#susi-launcher').click(function() {
			$('.susi-frame-container-active').toggle();
			$('#susi-avatar-text').toggle();
			$('#susi-launcher-close').toggle();
			document.getElementById('chat-input').focus();
			if(flag==0){
				start();
				flag = 1;
			}
			else if(flag==1){
				info[0] = ''; info[1] = ''; info[2] = '';
			}
		});

		$('#susi-launcher-close').click(function() {
			$('.susi-frame-container-active').toggle();
			$('#susi-avatar-text').toggle();
			$('#susi-launcher-close').toggle();
			$('.susi-conversation-parts').empty();
			info[0] = ''; info[1] = ''; info[2] = '';
			flag = 0;
		});

		// Set bot response 
		function setBotResponse(val, type) {
			setTimeout(function(){
				var res = '';
				if(type === 'text') {
					for(i in val){
						val[i] = val[i].replace(new RegExp('\r?\n','g'), '<br />');
						res += '<div class="susi-question-label">'+
							'<div class="message-text">'+val[i]+'</div>'+
						'</div>';
					}
				} else if (type === 'option') {
					for(i in val){
						val[i] = val[i].replace(new RegExp('\r?\n','g'), '<br />');
						res += '<div class="susi-comment-option-wrap" id=\"'+val[i]+'\">'+
						'<div class="susi-comment-content susi-comment-option no-select bubble-animate susi-theme-color susi-theme-border">'+
							val[i]+'</div>'+'</div>';
					}
				}
				var BotResponse = '<div class="susi-conversation-part susi-conversation-part-grouped-first"'+ 'id=\"'+type+'\"' +'>'+
										'<div style="background-image: url('+ susi_skills_deployed_url + 'avatar.jpg' + ')" class="susi-comment-avatar susi-theme-bg">'+
										'</div>'+
										'<div class=" susi-comment susi-comment-by-susi ">'+
											'<div class="susi-comment-body-container">'+
												'<div class="susi-comment-body ">'+
													'<div class="susi-comment-content">'+
														res
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
				'<div class="susi-comment-body">'+
					'<div class="susi-comment-content">'+
						'<div class="message-text">'+
							val+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>'+
	'</div>';
			$(UserResponse).appendTo('.susi-conversation-parts');
			scrollToBottomOfResults();
			$("#susiTextMessage").val('');
		}

		// Scroll to the bottom
		function scrollToBottomOfResults() {
			var textsDiv = document.querySelector('.susi-sheet-content');
			textsDiv.scrollTop = textsDiv.scrollHeight;
		}

		// Event handlers
		$('#susiTextMessage').on('keypress', function(e) {
			var keyCode = e.keyCode || e.which;
			var text = $("#susiTextMessage").val();
			if (keyCode === 13) {
				if(text == "" ||  $.trim(text) == '') {
					e.preventDefault();
					return false;
				} else {
					$("#chat-input").blur();
					setUserResponse(text);
					for(i in info){
						if(info[i] === ''){
							if(i == 1){
								if(validateEmail(text)){
									info[i] = text;
								} else {
									setBotResponse(["Please enter a valid email address"], 'text');
								}
							} else {
								info[i] = text;
							}
							break;
						}
					}
					e.preventDefault();
					return false;
				}
			}
		});
		$('.susi-send-button').click(function(){
			var text = $("#susiTextMessage").val();
			$("#chat-input").blur();
			setUserResponse(text);
			for(i in info){
				if(info[i] === ''){
					if(info[i] === ''){
						if(i == 1){
							if(validateEmail(text)){
								info[i] = text;
							} else {
								setBotResponse(["Please enter a valid email address"], 'text');
							}
						} else {
							info[i] = text;
						}
						break;
					}
				}
			}
		});

		$(document).on('click', '#Yes', function() {
			$("#option").remove();
			setUserResponse("Yes");
			console.log('yes');
			getName();
		});
		$(document).on('click', '#No', function() {
			$("#option").remove();
			setUserResponse("No");
			setLoading();
			setTimeout(function(){
				setBotResponse(["Okay, Bye! See you later."], 'text');
			}, 1700);
			setTimeout(function(){
				$('.susi-conversation-parts').empty();
				$('.susi-frame-container-active').toggle();
				$('#susi-avatar-text').toggle();
				$('#susi-launcher-close').toggle();
				info[0] = ''; info[1] = ''; info[2] = '';
				flag = 0;
				console.log('no');
			}, 4000);
		});

		// Main functions
		function start() {
			setBotResponse(["Hello. I'm SUSI. I'm here to help you."], 'text');
			setTimeout(function(){
				setLoading();
			}, 200);
			setTimeout(function(){
				setBotResponse(["Do you want my assistance?"], 'text');
				setBotResponse(['Yes', 'No'], 'option');
			},1800);
		}

		function getName(){
			setLoading();
			setTimeout(function(){
				setBotResponse(["Okay. Please tell me your name."], 'text');
			}, 1600);
			var toEmail = setInterval(function(){
				if(info[0] !== ''){
					clearInterval(toEmail);
					getEmail();
				}
			}, 800);
		}

		function getEmail() {
			setLoading();
			setTimeout(function(){
				setBotResponse(["Thanks. Kindly give me your Email ID."], 'text');
			}, 1600);
			var toMessage = setInterval(function(){
				if(info[1] !== ''){
					clearInterval(toMessage);
					getMessage();
				}
			}, 800);
		}

		function getMessage() {
			setLoading();
			setTimeout(function(){
				setBotResponse(["What is your message?"], 'text');
			}, 1600);
			var toEnd = setInterval(function(){
				if(info[2] !== ''){
					clearInterval(toEnd);
					end();
				}
			}, 800);
		}

		function end() {
			setLoading();
			setTimeout(function() {
				setBotResponse(["Thank you for your interest. Someone will contact you soon."], 'text');
			}, 1600);
			setTimeout(function(){
				console.log("Name - "+info[0]);
				console.log("Email - "+info[1]);
				console.log("Message - "+info[2]);
				$("#option").remove();
				$('.susi-frame-container-active').toggle();
				$('#susi-avatar-text').toggle();
				$('#susi-launcher-close').toggle();
				$('.susi-conversation-parts').empty();
				info[0] = ''; info[1] = ''; info[2] = '';
				flag = 0;
			}, 4000);
		}

		function setLoading() {
			var BotResponse = '<div class="susi-conversation-part susi-conversation-part-grouped-first" id="load">'+
									'<div style="background-image: url('+ susi_skills_deployed_url + 'avatar.jpg' + ')" class="susi-comment-avatar susi-theme-bg">'+
									'</div>'+
									'<div class=" susi-comment susi-comment-by-susi ">'+
										'<div class="susi-comment-body-container">'+
											'<div class="susi-comment-body ">'+
												'<div class="susi-comment-content">'+
													'<div class="susi-question-label">'+
														'<div class="message-text">'+
															'<img src="'+susi_skills_deployed_url+'loading.gif'+'" style="height:13px;" />'+
														'</div>'+
													'</div>';
												'</div>'+
											'</div>'+
										'</div>'+
									'</div>'+
								'</div>';
			$(BotResponse).appendTo('.susi-conversation-parts');
			scrollToBottomOfResults();
			setTimeout(function() {
				$("#load").remove();
			},1500);
		}

		// Validating email
		function validateEmail(email) {
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		}
	});
}
