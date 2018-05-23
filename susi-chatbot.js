var susi_skills_deployed_url = "https://skills.susi.ai";
//appending css
var headTag = document.getElementsByTagName("head")[0];
var link  = document.createElement('link');
link.rel  = 'stylesheet';
link.type = 'text/css';
link.href = susi_skills_deployed_url+'/chat-style.css';
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

        // Dynamic html bot content(Widget style)
        var bot = '<div class="susi-bot-wrap">'+
        '<div class="chatCont" id="chatCont">'+
        '<div class="bot_profile">'+
        '<img src="'+susi_skills_deployed_url+'/susi.svg" class="bot_p_img">'+
        '<div class="close">'+
        '<i class="fa fa-times" aria-hidden="true"></i>'+
        '</div>'+
        '</div><!--bot_profile end-->'+
        '<div id="result_div" class="resultDiv"></div>'+
        '<div class="chatForm" id="chat-div">'+
        '<div class="spinner">'+
        '<div class="bounce1"></div>'+
        '<div class="bounce2"></div>'+
        '<div class="bounce3"></div>'+
        '</div>'+
        '<input type="text" id="chat-input" autocomplete="off" placeholder="Type a message..."'+ 'class="bot-txt"/>'+
        '</div>'+
        '</div><!--chatCont end-->'+

        '<div class="profile_div">'+
        '<div class="row">'+
        '<div class="col-hgt">'+
        '<img src="'+susi_skills_deployed_url+'/susi.svg" class="img-circle img-profile">'+
        '</div><!--col-hgt end-->'+
        '<div class="col-hgt">'+
        '<div class="chat-txt">'+
        'Chat with us now!'+
        '</div>'+
        '</div><!--col-hgt end-->'+
        '</div><!--row end-->'+
        '</div><!--profile_div end-->'+
        '</div>';
        $("body").append(bot);

        // Toggle chatbot
        $('.profile_div').click(function() {
            $('.profile_div').toggle();
            $('.chatCont').toggle();
            $('.bot_profile').toggle();
            $('.chatForm').toggle();
            document.getElementById('chat-input').focus();
        });

        $('.close').click(function() {
            $('.profile_div').toggle();
            $('.chatCont').toggle();
            $('.bot_profile').toggle();
            $('.chatForm').toggle();
        });

        // on input/text enter
        $('#chat-input').on('keyup keypress', function(e) {
            var keyCode = e.keyCode || e.which;
            var text = $("#chat-input").val();
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


        // Send request to API.AI
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
                    console.log (e);
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


        // Set bot response in result_div
        function setBotResponse(val) {
            setTimeout(function(){
                val = val.replace(new RegExp('\r?\n','g'), '<br />');
                var BotResponse = '<p class="botResult">'+val+'</p><div class="clearfix"></div>';
                $(BotResponse).appendTo('#result_div');
                scrollToBottomOfResults();
                hideSpinner();
            }, 100);
        }


        // Set user response in result_div
        function setUserResponse(val) {
            var UserResponse = '<p class="userEnteredText">'+val+'</p><div class="clearfix"></div>';
            $(UserResponse).appendTo('#result_div');
            $("#chat-input").val('');
            scrollToBottomOfResults();
            showSpinner();
        }


        // Scroll to the bottom of the results div
        function scrollToBottomOfResults() {
            var terminalResultsDiv = document.getElementById('result_div');
            terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
        }


        // ASCII Spinner
        function showSpinner() {
            $('.spinner').show();
        }
        function hideSpinner() {
            $('.spinner').hide();
        }
    });
}
