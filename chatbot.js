//selecting elements
const chatIcon = document.getElementById("chatbot-icon");
const chatWindow = document.getElementById("chatbot-window");
const chatBody = document.getElementById("chat-body");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");
 
//show or hide chatbot
chatIcon.addEventListener("click",()=>{
    chatWindow.style.display =
    chatWindow.style.display === "flex"? "none":"flex";
});

//send message on button click
sendBtn.addEventListener("click",sendMessage);
//send messaage on enter key
chatInput.addEventListener("keypress",function(e){
    if(e.key === "Enter") sendMessage();
});

//main function to send and reply
function sendMessage(){
    let msg = chatInput.value.trim();
       if(msg === "") return;
       addMessage(msg,"user-msg");
       chatInput.value = " ";

       setTimeout(()=> botReply(msg),500);
}

//display message function
function addMessage(text,className){
    let div = document.createElement("div");
    div.className = className;
    div.innerText  = text;
    chatBody.appendChild(div);

    chatBody.scrollTop = chatBody.scrollHeight;
}

//simple rule-based replies
function botReply(message){
    message = message.toLowerCase();
    if(message.includes("hello") || message.includes("hii")){
        addMessage("Hello! How can I help you plan your trip today?", 'bot-msg');
    }

    else if(message.includes("hill") || message.includes("montain")){
        addMessage("our best hill station recommendations are Manali,Shimla & Mussorie!",'bot-msg');
    }

    else if(message.includes("offer")){
        addMessage("Today's best offer: 40% off on Bali trip pacckages!", 'bot-msg');
    }
    else if(message.includes("contact")){
        addMessage("You can contact us at support@travelg.com",'bot-msg');
    }
    else if(message.includes("thankyou")|| message.includes("ok")){
        addMessage("You're welcome, have a great day🙂",'bot-msg');
    }
    else{
        addMessage("Sorry , I didn't understand that. Try asking about hill stations , offers  or contact.",'bot-msg');
    }
}

