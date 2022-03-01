const secHand = document.querySelector(".sec-hand");
const hourHand = document.querySelector(".hour-hand");
const minHand = document.querySelector(".min-hand");
const transitionTxt = "all 0.05s cubic-bezier(0.1, 2.7, 0.58, 1)";

function setDate() {
  const now = new Date();
  const seconds = now.getSeconds();
  const hour = now.getHours();
  const min = now.getMinutes();
  const secondsDegrees = (seconds / 60) * 360 + 90; //adding 90 to set its offset to 12'O clock
  const hourDegrees = (hour / 12) * 360 + (min / 60) * 30 + 90;
  const minDegrees = (min / 60) * 360 + (seconds / 60) * 6 + 90;
  // @bug animation when rotate() resets from 450deg to 90deg
  // element rotates unexpectedly before it comes back quickly to it's right position
  //   secHand.style.transform = `rotate(${secondsDegrees}deg)`;
  //   hourHand.style.transform = `rotate(${hourDegrees}deg)`;
  //   minHand.style.transform = `rotate(${minDegrees}deg)`;
  animateHand(seconds, secHand, secondsDegrees);
  animateHand(min, minHand, minDegrees);
  animateHand(hour, hourHand, hourDegrees);
  console.log(hour, min, seconds);
}
function animateHand(time, hand, degree) {
  // @fix remove transition @ time = 0 before degree resets from 450 to 90
  if (time === 0) {
    hand.style.transition = "none";
  } else {
    hand.style.transition = transitionTxt;
  }
  hand.style.transform = `rotate(${degree}deg)`;
}

setInterval(setDate, 1000);
