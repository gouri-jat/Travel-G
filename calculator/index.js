// const clickButtons = document.querySelectorAll(".nav-links");
// clickButtons.forEach(button => {
// button.addEventListener("click",() =>{
//     alert("Button Clciked!");
// });
// });
window.onload = function() {
  const inputBox = document.getElementById("inputBox");
  const buttons = document.querySelectorAll(".button");

  let string = "";

  buttons.forEach(button => {
    button.addEventListener("click", e => {
      const value = e.target.innerText;

      if (value === "=") {
        try {
          string = eval(string);
        } catch {
          string = "Error";
        }
        inputBox.value = string;
      } else if (value === "AC") {
        string = "";
        inputBox.value = "";
      } else if (value === "DEL") {
        string = string.slice(0, -1);
        inputBox.value = string;
      } else if (value === "X") {
        string += "*";
        inputBox.value = string;
      } else {
        string += value;
        inputBox.value = string;
      }
    });
  });
};

