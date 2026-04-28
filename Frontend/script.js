/* ========================
   GLOBAL UI LOGIC
======================== */

console.log("script js loaded")
const BASE_URL="https://travel-g-backend.onrender.com"
function openCategory(category) {
    window.location.href = "Destinations.html?category=" + category;
}
function openHotels() {
  window.location.href = "Hotels.html";
}

const cards = document.querySelectorAll(".card");
window.addEventListener("scroll", () => {
    cards.forEach(card => {
        const position = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        if (position < screenPosition) {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }
    });
});

// Navigation Helpers
const setupBtn = (id, url) => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener("click", () => window.location.href = url);
};
setupBtn("planBtn", "PlanTrip.html");
setupBtn("exploreBtn", "Destinations.html");


/* ========================
   TRIP GENERATOR ENGINE
======================== */
function generateTrip() {
    const mood = document.getElementById("mood").value;
    const days = parseInt(document.getElementById("days").value);
    const budget = parseInt(document.getElementById("budget").value);
    const travelType = document.getElementById("travelType").value;

    if (!mood || !days || !budget || !travelType) {
        alert("Please fill all fields");
        return;
    }

    const destinations = [
         {name:"Goa", type:"relax", minBudget:8000, bestDays:3, tags:["beach","friends"]},
        {name:"Kerala", type:"relax", minBudget:15000, bestDays:5, tags:["nature","family"]},
        {name:"Maldives", type:"relax", minBudget:40000, bestDays:5, tags:["luxury","couple"]},
        {name:"Andaman", type:"relax", minBudget:25000, bestDays:5, tags:["beach","couple"]},
        {name:"Pondicherry", type:"relax", minBudget:7000, bestDays:3, tags:["peace","solo"]},
        {name:"Lakshadweep", type:"relax", minBudget:30000, bestDays:4, tags:["luxury","beach"]},
        {name:"Manali", type:"adventure", minBudget:10000, bestDays:4, tags:["mountain","friends"]},
        {name:"Ladakh", type:"adventure", minBudget:25000, bestDays:7, tags:["solo","extreme"]},
        {name:"Rishikesh", type:"adventure", minBudget:6000, bestDays:3, tags:["budget","solo"]},
        {name:"Spiti Valley", type:"adventure", minBudget:20000, bestDays:6, tags:["extreme","solo"]},
        {name:"Auli", type:"adventure", minBudget:12000, bestDays:4, tags:["snow","family"]},
        {name:"Udaipur", type:"romantic", minBudget:12000, bestDays:3, tags:["couple","luxury"]},
        {name:"Bali", type:"romantic", minBudget:50000, bestDays:5, tags:["couple","beach"]},
        {name:"Paris", type:"romantic", minBudget:80000, bestDays:6, tags:["luxury","couple"]},
        {name:"Santorini", type:"romantic", minBudget:70000, bestDays:5, tags:["luxury","couple"]},
        {name:"Jaipur", type:"budget", minBudget:5000, bestDays:2, tags:["culture","family"]},
        {name:"Hampi", type:"budget", minBudget:4000, bestDays:3, tags:["history","budget"]},
        {name:"Varanasi", type:"budget", minBudget:3000, bestDays:2, tags:["spiritual","solo"]},
        {name:"Ranthambore", type:"budget", minBudget:7000, bestDays:3, tags:["wildlife","family"]},
        {name:"Amritsar", type:"budget", minBudget:6000, bestDays:2, tags:["culture","family"]}
    ];
    
// avoid repeating last shown destinations
let lastTrips = JSON.parse(localStorage.getItem("lastTrips")) || [];
    // 1. Scoring & Selection
    let results = destinations.map(dest => {
        let score = 0;
        if (dest.type === mood) score += 40;
        if (budget >= dest.minBudget) score += 25;
        else score -= 10;
        if (days >= dest.bestDays) score += 20;
        if (dest.tags.includes(travelType)) score += 15;
        score+= Math.floor(Math.random() * 20);

        if (lastTrips.includes(dest.name)) score -=30;
        return { ...dest, score };
    }).sort((a, b) => b.score - a.score);

    // let shuffled = results.slice(0,6).sort(() => Math.random() - 0.5)
    // const top3 = shuffled.slice(0, 3);
     let pool = results.slice(0, 8); // bigger pool
      let top3 = [];

while (top3.length < 3 && pool.length > 0) {
    let index = Math.floor(Math.random() * pool.length);
    top3.push(pool[index]);
    pool.splice(index, 1);
}
localStorage.setItem("lastTrips", JSON.stringify(top3.map(d => d.name)));

    // 2. Budget & Itinerary Data
    const stay = Math.floor(budget * 0.4);
    const food = Math.floor(budget * 0.25);
    const transport = Math.floor(budget * 0.2);
    const activities = Math.floor(budget * 0.15);
    const getPercent = (val) => (val / budget) * 100;

    const activitiesList = ["Explore landmarks", "Local Food Tasting", "Adventure Session", "Shopping & Leisure", "Relax at Scenic Spot"];

    // 3. Build HTML Components
    let budgetHtml = `
        <div class="budget-ring-wrapper">
            <div class="donut-ring" style="--p:${getPercent(stay)};"><i class="fa-solid fa-house"></i></div>
            <div class="budget-info">
                <span>Stay</span><br><strong>₹${stay}</strong>
            </div>
        </div>
        <div class="budget-ring-wrapper">
            <div class="donut-ring" style="--p:${getPercent(food)}; --primary:#4ade80;"><i class="fa-solid fa-utensils"></i></div>
            <div class="budget-info">
                <span>Food</span><br><strong>₹${food}</strong>
            </div>
        </div>
        <div class="budget-ring-wrapper">
            <div class="donut-ring" style="--p:${getPercent(transport)}; --primary:#60a5fa;"><i class="fa-solid fa-bus"></i></div>
            <div class="budget-info">
                <span>Transport</span><br><strong>₹${transport}</strong>
            </div>
        </div>
    `;
   let destsHtml = top3.map((dest, i) => `
        <div class="dest-card-mini" style="flex-direction: column; align-items: flex-start;">
            <div class="dest-thumb" style="background-image: url('./images/hotel6.jpg')"></div>
            <div>
                <strong>${dest.name}</strong>
                <p style="font-size:10px; opacity:0.6;">Perfect for ${mood} vibes</p>
            </div>
        </div>
    `).join('');
    let itineraryHtml = '';
    for (let i = 1; i <= days; i++) {
        // let act = activitiesList[i % activitiesList.length];
        let act = activitiesList[Math.floor(Math.random() * activitiesList.length)];
        itineraryHtml += `
            <div class="itinerary-item">
                <span class="day-badge">Day ${i}</span>
                <span>${act}</span>
            </div>
        `;
    }

  

    // 4. Final Injection
    document.getElementById("tripResult").innerHTML = `
        <div class="result-card">
            <h3>Top Picks</h3>
            ${destsHtml}
            <p style="font-size:15px; margin-top:10px; opacity:0.3;">*Based on ${travelType} preferences</p>
        </div>
        <div class="result-card">
            <h3>Plan</h3>
            <div class="itinerary-list">${itineraryHtml}</div>
        </div>
        <div class="result-card">
            <h3>Expenses</h3>
            ${budgetHtml}
            <p style="margin-top:15px; font-size:12px;">✨ Great choice for a <strong>${mood}</strong> trip!</p>
        </div>
    `;
}

// explore destinations card info
function openDestination(place) {

  const data = {
    goa: {
      title: "Goa",
      places: ["Baga Beach", "Calangute Beach", "Fort Aguada"],
      food: ["Seafood", "Prawn Curry", "Feni"],
      bestTime: "Best time to visit: Nov - Feb"
    },
    manali: {
      title: "Manali",
      places: ["Solang Valley", "Rohtang Pass", "Hidimba Temple"],
      food: ["Siddu", "Trout Fish", "Thukpa"],
      bestTime: "Best time: Oct - Feb"
    },
    jaipur: {
      title: "Jaipur",
      places: ["Hawa Mahal", "Amber Fort", "City Palace"],
      food: ["Dal Baati", "Ghewar", "Kachori"],
      bestTime: "Best time: Oct - Mar"
    },
 banaras: {
 title: "Banaras",
  places: ["Kashi Vishwanath Temple", "Dashashwamedh Ghat", "Sarnath"],
  food: ["Kachori Sabzi", "Banarasi Paan", "Lassi"],
  bestTime: "Best time: Oct - Mar"
},

kerala: {
  title: "Kerala",
  places: ["Munnar", "Alleppey Backwaters", "Kochi"],
  food: ["Appam", "Puttu", "Kerala Sadya"],
  bestTime: "Best time: Sep - Mar"
},

agra: {
  title: "Agra",
  places: ["Taj Mahal", "Agra Fort", "Mehtab Bagh"],
  food: ["Petha", "Bedai", "Mughlai Cuisine"],
  bestTime: "Best time: Oct - Mar"
},

kashmir: {
  title: "Kashmir",
  places: ["Srinagar", "Gulmarg", "Pahalgam"],
  food: ["Rogan Josh", "Yakhni", "Kahwa"],
  bestTime: "Best time: Apr - Oct (summer) / Dec - Feb (snow)"
},

rajasthan: {
  title: "Rajasthan",
  places: ["Jaipur", "Jodhpur", "Jaisalmer"],
  food: ["Dal Baati Churma", "Gatte ki Sabzi", "Laal Maas"],
  bestTime: "Best time: Oct - Mar"
}

    // aur bhi add kar sakti ho
  };
  const selected = data[place];
  if (!selected) return;
  document.getElementById("destTitle").innerText = selected.title;
  document.getElementById("destPlaces").innerHTML =
    selected.places.map(p => `<li>${p}</li>`).join("");
  document.getElementById("destFood").innerHTML =
    selected.food.map(f => `<li>${f}</li>`).join("");

  document.getElementById("bestTime").innerText = selected.bestTime;
  document.getElementById("destinationModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("destinationModal").style.display = "none";
}











/* ========================
   AUTH & MODAL LOGIC 
   (Keep your existing Login/Register/Modal functions here)
======================== */
// REGISTER
const registerForm = document.getElementById("registerForm")
if(registerForm){
registerForm.addEventListener("submit", async function(e){

e.preventDefault()
const name = document.getElementById("name").value
const email = document.getElementById("email").value
const password = document.getElementById("password").value

const res = await fetch(`${BASE_URL}/api/auth/register`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({
name,
email,
password
})

})

const data = await res.json()

alert("Registered sucessfully 🎉");
window.location.href="index.html"
});

}


// LOGIN
const loginForm = document.getElementById("loginForm")
if(loginForm){
loginForm.addEventListener("submit", async function(e){
e.preventDefault()

const email = document.getElementById("email").value
const password = document.getElementById("password").value

const res = await fetch(`${BASE_URL}/api/auth/login`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
email,
password
})

})

const data = await res.json()
// imp check bcrypt
if(!res.ok){
  alert(data.msg);
  return;
}
localStorage.setItem("token",data.token)
alert("Login successful 🎉")
window.location.href='index.html'
});
}
 // contact form
const contactForm = document.getElementById("contactForm");

if(contactForm){
contactForm.addEventListener("submit", async function(e){

e.preventDefault();

const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const message = document.getElementById("message").value;

const res = await fetch(`${BASE_URL}/api/contact`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name,
    email,
    message
  })
  
});

const data = await res.json();
alert("Message sent ✅");
contactForm.reset();
});
}


  

//Booking
function bookHotel(hotelName) {
  window.location.href = `booking.html?hotel=${encodeURIComponent(hotelName)}`;
}
// URL se hotel name lena
const params = new URLSearchParams(window.location.search);
const hotel = params.get("hotel");
if (hotel) {
  const hotelInput = document.getElementById("hotelName");
  if (hotelInput) {
    hotelInput.value = hotel;
  }
}

document.addEventListener("DOMContentLoaded", () => {

  const bookingForm = document.getElementById("bookingForm");

  if (bookingForm) {
    bookingForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const checkin = document.getElementById("checkin").value;
      const checkout = document.getElementById("checkout").value;
      const hotel = document.getElementById("hotelName").value;

      console.log("DATA:", { name, email, checkin, checkout, hotel });

      const res = await fetch(`${BASE_URL}/api/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, checkin, checkout, hotel })
      });

      const data = await res.json();
      alert('Booking successful 🎉');
      bookingForm.reset();
    });
  }

});