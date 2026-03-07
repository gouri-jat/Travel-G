
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

document.getElementById("planBtn").addEventListener("click", () => {
  window.location.href = "PlanTrip.html";
});
document.getElementById("exploreBtn").addEventListener("click", () => {
  window.location.href = "Destinations.html";
});

// REGISTER
const registerForm = document.getElementById("registerForm")
if(registerForm){
registerForm.addEventListener("submit", async function(e){

e.preventDefault()
const name = document.getElementById("name").value
const email = document.getElementById("email").value
const password = document.getElementById("password").value

const res = await fetch("http://localhost:5000/api/auth/register",{

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

alert(data.msg)
})

}


// LOGIN
const loginForm = document.getElementById("loginForm")
if(loginForm){
loginForm.addEventListener("submit", async function(e){
e.preventDefault()

const email = document.getElementById("email").value
const password = document.getElementById("password").value

const res = await fetch("http://localhost:5000/api/auth/login",{

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
localStorage.setItem("token",data.token)
alert("Login successful")
})
}



document.getElementById("budgetChart").innerHTML = "";


function generateChart(stay, food, transport, activities) {
  const ctx = document.getElementById('budgetChart').getContext('2d');

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Stay', 'Food', 'Transport', 'Activities'],
      datasets: [{
        data: [stay, food, transport, activities],
        backgroundColor: [
          '#ff6384',
          '#36a2eb',
          '#ffce56',
          '#4bc0c0'
        ]
      }]
    }
  });
}

async function generateTrip(){
const mood = document.getElementById("mood").value
const days = document.getElementById("days").value
const budget = document.getElementById("budget").value
const response = await fetch("http://localhost:5000/api/trip/plan",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({
mood,
days,
budget
})

})
const data = await response.json()

let result = `<h2>Destination: ${data.destination}</h2>`
data.itinerary.forEach(day=>{
result += `<p>${day}</p>`
})
document.getElementById("tripResult").innerHTML = result
}