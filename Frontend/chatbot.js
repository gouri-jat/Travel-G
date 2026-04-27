// selecting elements
const chatIcon = document.getElementById("chatbot-icon");
const chatWindow = document.getElementById("chatbot-window");
const chatBody = document.getElementById("chat-body");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

// show or hide chatbot
chatIcon.addEventListener("click", () => {
  chatWindow.style.display =
    chatWindow.style.display === "flex" ? "none" : "flex";
});

// send message on button click
sendBtn.addEventListener("click", sendMessage);

// send message on enter
chatInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});

// main send function
function sendMessage() {
  let msg = chatInput.value.trim();
  if (msg === "") return;

  addMessage(msg, "user-msg");
  chatInput.value = "";

  setTimeout(() => botReply(msg), 500);
}

// display message
function addMessage(text, className) {
  let div = document.createElement("div");
  div.className = className;
  div.innerText = text;

  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

// chatbot logic
function botReply(message) {

  message = message.toLowerCase();

  // greeting
  if (message.includes("hello") || message.includes("hi")) {
    addMessage("Hello! I'm Travel-G assistant ✈️. How can I help you today?", "bot-msg");
  }

  // trip planning
  else if (message.includes("plan trip") || message.includes("trip")) {
    addMessage("Sure! Opening the Trip Planner for you.", "bot-msg");
    setTimeout(() => {
      window.location.href = "PlanTrip.html";
    }, 1000);
  }

  // destination suggestions
  else if (message.includes("destination") || message.includes("travel")) {
    addMessage("Popular destinations: Goa, Manali, Kerala, Jaipur. You can explore them on the Destinations page.", "bot-msg");
  }

  // hill stations
  else if (message.includes("hill") || message.includes("mountain")) {
    addMessage("Best hill stations: Manali, Shimla, Mussoorie and Kashmir.", "bot-msg");
  }

  // beaches
  else if (message.includes("beach")) {
    addMessage("Top beach destinations: Goa, Kerala, Andaman Islands and Bali.", "bot-msg");
  }

  // budget travel
  else if (message.includes("budget")) {
    addMessage("For budget travel try Jaipur, Rishikesh, Hampi or Varanasi.", "bot-msg");
  }

  // food suggestions
  else if (message.includes("food")) {
    addMessage("Travel tip: Try local food like Goan seafood, Rajasthani Dal Baati and Kerala Sadya!", "bot-msg");
  }

  // offers
  else if (message.includes("offer") || message.includes("discount")) {
    addMessage("Today's offer: 40% off on Bali travel packages!", "bot-msg");
  }

  // contact
  else if (message.includes("contact") || message.includes("support")) {
    addMessage("You can contact us through the Contact page or email: support@travelg.com", "bot-msg");
    setTimeout(() => {
      window.location.href = "Contact.html";
    }, 1500);
  }

  // thanks
  else if (message.includes("thanks") || message.includes("thankyou")) {
    addMessage("You're welcome 🙂. Happy travelling with Travel-G!", "bot-msg");
  }

  // fallback
  else {
    addMessage(
      "I can help with:\n• Trip planning\n• Destination suggestions\n• Budget travel\n• Travel offers\n\nTry asking: 'plan trip', 'beach destinations', or 'budget travel'.",
      "bot-msg"
    );
  }
}