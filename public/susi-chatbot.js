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
var script_tag = document.getElementById("susi-bot-script");
var access_token = script_tag.getAttribute("data-token");
var theme_settings = script_tag.getAttribute("data-theme")?script_tag.getAttribute("data-theme"):null;

// custom theme variables
var botbuilderBackgroundBody = "#ffffff";
var botbuilderBodyBackgroundImg = "";
var botbuilderUserMessageBackground = "#0077e5";
var botbuilderUserMessageTextColor = "#ffffff";
var botbuilderBotMessageBackground = "#f8f8f8";
var botbuilderBotMessageTextColor = "#455a64";
var botbuilderIconColor = "";
var botbuilderIconImg = susi_skills_deployed_url + 'customAvatars/0.png';

if(typeof jQuery=='undefined') {
	var jqTag = document.createElement('script');
	jqTag.type = 'text/javascript';
	jqTag.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';
	jqTag.onload = enableBot;
	headTag.appendChild(jqTag);
} else {
	// to ensure jquery has loaded
	enableBot();
}

// get custom theme from user
function getTheme(){
	if(theme_settings){
		let settings = JSON.parse(theme_settings);
		botbuilderBackgroundBody = settings.botbuilderBackgroundBody?settings.botbuilderBackgroundBody:botbuilderBackgroundBody;
		botbuilderBodyBackgroundImg = settings.botbuilderBodyBackgroundImg?settings.botbuilderBodyBackgroundImg:botbuilderBodyBackgroundImg;
		botbuilderUserMessageBackground = settings.botbuilderUserMessageBackground?settings.botbuilderUserMessageBackground:botbuilderUserMessageBackground;
		botbuilderUserMessageTextColor = settings.botbuilderUserMessageTextColor?settings.botbuilderUserMessageTextColor:botbuilderUserMessageTextColor;
		botbuilderBotMessageBackground = settings.botbuilderBotMessageBackground?settings.botbuilderBotMessageBackground:botbuilderBotMessageBackground;
		botbuilderBotMessageTextColor = settings.botbuilderBotMessageTextColor?settings.botbuilderBotMessageTextColor:botbuilderBotMessageTextColor;
		botbuilderIconColor = settings.botbuilderIconColor?settings.botbuilderIconColor:botbuilderIconColor;
		botbuilderIconImg = settings.botbuilderIconImg?settings.botbuilderIconImg:botbuilderIconImg;
		applyTheme();
	}
	else{
		$.ajax({
			type: "GET",
			url: "https://api.susi.ai/aaa/listUserSettings.json?access_token="+access_token,
			jsonpCallback: 'pa',
			contentType: "application/json",
			dataType: 'jsonp',
			jsonp: 'callback',
			crossDomain: true,
			success: function(data) {
				if(data.settings){
				let settings = data.settings;
				botbuilderBackgroundBody = settings.botbuilderBackgroundBody?"#"+settings.botbuilderBackgroundBody:botbuilderBackgroundBody;
				botbuilderBodyBackgroundImg = settings.botbuilderBodyBackgroundImg?settings.botbuilderBodyBackgroundImg:botbuilderBodyBackgroundImg;
				botbuilderUserMessageBackground = settings.botbuilderUserMessageBackground?"#"+settings.botbuilderUserMessageBackground:botbuilderUserMessageBackground;
				botbuilderUserMessageTextColor = settings.botbuilderUserMessageTextColor?"#"+settings.botbuilderUserMessageTextColor:botbuilderUserMessageTextColor;
				botbuilderBotMessageBackground = settings.botbuilderBotMessageBackground?"#"+settings.botbuilderBotMessageBackground:botbuilderBotMessageBackground;
				botbuilderBotMessageTextColor = settings.botbuilderBotMessageTextColor?"#"+settings.botbuilderBotMessageTextColor:botbuilderBotMessageTextColor;
				botbuilderIconColor = settings.botbuilderIconColor?"#"+settings.botbuilderIconColor:botbuilderIconColor;
				botbuilderIconImg = settings.botbuilderIconImg?settings.botbuilderIconImg:botbuilderIconImg;
				applyTheme();
			}
			},
			error: function(e) {
				console.log(e);
			}
		});
	}
}

// to apply custom theme
function applyTheme(){
	// body background
	$(".susi-sheet-content-container").css("background-color",botbuilderBackgroundBody);
	if(botbuilderBodyBackgroundImg){
		$(".susi-sheet-content-container").css("background-image","url("+botbuilderBodyBackgroundImg+")");
	}
	// user message container
	$(".susi-comment-by-user .susi-comment-body-container").css("background-color",botbuilderUserMessageBackground);
	$("head").append($('<style>.susi-comment-body-container-user:after { border-color:'+ `transparent transparent ${botbuilderUserMessageBackground} ${botbuilderUserMessageBackground} !important` +'}</style>'));
	$(".susi-comment-by-user .susi-comment-body-container").css("color",botbuilderUserMessageTextColor);
	// bot message container
	$(".susi-comment-by-susi .susi-comment-body-container").css("background-color",botbuilderBotMessageBackground);
	$(".susi-comment-by-susi .susi-comment-body-container").css("color",botbuilderBotMessageTextColor);
	// bot icon
	$(".susi-launcher-button").css("background-color",botbuilderIconColor);
	$(".susi-comment-avatar").css("background-color",botbuilderIconColor);
	if(botbuilderIconImg){
		$(".susi-launcher-button").css("background-image","url("+botbuilderIconImg+")");
		$(".susi-comment-avatar").css("background-image","url("+botbuilderIconImg+")");
	}
}

function enableBot() {
	getTheme();
	$(document).ready(function() {

		var baseUrl = "https://api.susi.ai/susi/chat.json?q=";
		var msgNumber = 0;//stores the message number to set id

		// Add dynamic html bot content(Widget style)
		var mybot = '<div id="susi-frame-container" class="susi-frame-container-active" style="display: none;">'+
				'<div id="susi-frame-wrap">'+
				'<div id="susi">'+
				    '<div id="susi-container" class="susi-container susi-reset">'+
				        '<div id="susi-chatbox" class="susi-chatbox">'+
				            '<div id="susi-conversation" class="susi-conversation susi-sheet susi-sheet-active susi-active">'+
				                '<div class="susi-sheet-content">'+
				                    '<div class="susi-sheet-content-container" style="background-color:'+botbuilderBackgroundBody+'">'+
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
			'<div id="susi-launcher-button" class="susi-launcher-button" style="background-image: url('+ botbuilderIconImg +');">'+'</div>'+
			'</div>'+
			'</div>';

		$("body").append(mybot);

		// Toggle chatbot
		$('#susi-launcher').click(function() {
			$('.susi-frame-container-active').toggle();
			$('#susi-avatar-text').toggle();
			$('#susi-launcher-close').toggle();
			document.getElementById('susiTextMessage').focus();
		});

		$('#susi-launcher-close').click(function() {
			$('.susi-frame-container-active').toggle();
			$('#susi-avatar-text').toggle();
			$('#susi-launcher-close').toggle();
		});
		

		// on input/text enter
		$('#susiTextMessage').on('keyup keypress', function(e) {
			var keyCode = e.keyCode || e.which;
			var text = $("#susiTextMessage").val();
			if (keyCode === 13) {
				if(text == "" ||  $.trim(text) == '') {
					e.preventDefault();
					return false;
				} else {
					setUserResponse(text);
					send(text);
					e.preventDefault();
					return false;
				}
			}
		});
		$('.susi-send-button').click(function(){
			var text = $("#susiTextMessage").val();
			if(text !== '') {
				$("#chat-input").blur();
				setUserResponse(text);
				send(text);
			}
		});

		// Send request to SUSI API
		function send(text) {
			var thisMsgNumber = msgNumber;
			msgNumber++;
			setLoadingMessage(thisMsgNumber);
			$.ajax({
				type: "GET",
				url: baseUrl+encodeURIComponent(text),
				contentType: "application/json",
				dataType: "json",
				success: function(data) {
					main(data,thisMsgNumber);
				},
				error: function(e) {
					console.log(e);
					main(null,thisMsgNumber);
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

		function setLoadingMessage(msgNumber){
		    var BotResponse = '<div id="susiMsg-'+msgNumber+'" class="susi-conversation-part susi-conversation-part-grouped-first">'+
		'<div style="background-image: url('+ botbuilderIconImg + ')" class="susi-comment-avatar susi-theme-bg">'+

		'</div>'+
		'<div class="susi-comment susi-comment-by-susi">'+
			'<div class="susi-comment-body-container susi-comment-body-container-susi" style="background-color:'+botbuilderBotMessageBackground+';color:'+botbuilderBotMessageTextColor+'">'+
				'<div class="susi-comment-body ">'+
					'<div class="susi-comment-content">'+
						'<div class="susi-question-label">'+
							'<div class="susi-msg-content-div"> <img src="'+susi_skills_deployed_url+'loading.gif'+'" style="height:13px;" /></div>'+
						'</div>'+
					'</div>'+
				'</div>'+
				'</div>'+
				'</div>'+
				'</div>'+
				'</div>'+
				'</div>';
				$(BotResponse).appendTo('.susi-conversation-parts');
				scrollToBottomOfResults();
		}

		// Main function
		function main(data,msgNumber) {
			var ans;
			if(data && data.answers[0])
				ans = data.answers[0].actions[0].expression;
			else
				ans = "Sorry, I could not understand what you just said."

			setBotResponse(ans,msgNumber);
		}


		// Set bot response
		function setBotResponse(val,msgNumber) {
			val = val.replace(new RegExp('\r?\n','g'), '<br />');
			$("#susiMsg-"+msgNumber+" .susi-msg-content-div").text(val);
			scrollToBottomOfResults();
		}


		// Set user response
		function setUserResponse(val) {
			var UserResponse = '<div class="susi-conversation-part susi-conversation-part-grouped-first">'+
			'<div class=" susi-comment susi-comment-by-user ">'+
			'<div class="susi-comment-body-container susi-comment-body-container-user" style="background-color:'+botbuilderUserMessageBackground+';color:'+botbuilderUserMessageTextColor+'">'+
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
			$("#susiTextMessage").val('');
		}

		// Scroll to the bottom
		function scrollToBottomOfResults() {
			var textsDiv = document.querySelector('.susi-sheet-content');
			textsDiv.scrollTop = textsDiv.scrollHeight;
		}

	});
}
