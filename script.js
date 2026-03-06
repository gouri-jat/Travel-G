
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


document.getElementById("budgetChart").innerHTML = "";
function generateTrip() {
  const mood = document.getElementById("mood").value;
  const days = parseInt(document.getElementById("days").value);
  const budget = parseInt(document.getElementById("budget").value);
  const travelType = document.getElementById("travelType").value;

  if (!mood || !days || !budget || !travelType) {
    alert("Please fill all fields");
    return;
  }

  // Rule-based destination logic
  let destination = "";

  if (mood === "relax" && budget > 20000) destination = "Maldives";
  else if (mood === "relax") destination = "Goa";

  if (mood === "adventure" && days >= 5) destination = "Ladakh";
  else if (mood === "adventure") destination = "Manali";

  if (mood === "romantic") destination = "Udaipur";
  if (mood === "budget") destination = "Jaipur";

  // Budget breakdown
  const stay = Math.floor(budget * 0.4);
  const food = Math.floor(budget * 0.25);
  const transport = Math.floor(budget * 0.2);
  const activities = Math.floor(budget * 0.15);

  let resultHTML = `
    <h2>Your Trip Plan</h2>
    <p><strong>Destination:</strong> ${destination}</p>
    <p><strong>Travel Type:</strong> ${travelType}</p>
    <p><strong>Total Days:</strong> ${days}</p>
    <h3>Daily Plan:</h3>
  `;

  for (let i = 1; i <= days; i++) {
    resultHTML += `<p>Day ${i}: Explore attractions & enjoy activities.</p>`;
  }

  resultHTML += `
    <h3>Budget Breakdown</h3>
    <p>Stay: ₹${stay}</p>
    <p>Food: ₹${food}</p>
    <p>Transport: ₹${transport}</p>
    <p>Activities: ₹${activities}</p>
  `;

  document.getElementById("tripResult").innerHTML = resultHTML;

  generateChart(stay, food, transport, activities);
}


const destinations = {
  relax: ["Goa", "Kerala", "Maldives"],
  adventure: ["Manali", "Ladakh", "Rishikesh"],
  romantic: ["Udaipur", "Bali", "Paris"],
  budget: ["Jaipur", "Hampi", "Varanasi"]
};

function showDestinations(mood) {
  const resultDiv = document.getElementById("results");
  resultDiv.innerHTML = "<h3>Suggested Destinations:</h3>";

  destinations[mood].forEach(place => {
    resultDiv.innerHTML += `<p>📍 ${place}</p>`;
  });
}

function calculateBudget() {
  const days = document.getElementById("days").value;
  const budget = document.getElementById("budget").value;

  if (!days || !budget) {
    alert("Please enter both days and budget.");
    return;
  }

  const stay = budget * 0.4;
  const food = budget * 0.25;
  const transport = budget * 0.2;
  const activities = budget * 0.15;

  document.getElementById("budgetResult").innerHTML = `
    <h3>Estimated Budget Breakdown:</h3>
    Stay: ₹${stay}<br>
    Food: ₹${food}<br>
    Transport: ₹${transport}<br>
    Activities: ₹${activities}
  `;
}


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