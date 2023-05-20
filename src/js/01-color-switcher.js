
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function changeBackgroundColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function startChangingBackground() {
  intervalId = setInterval(changeBackgroundColor, 1000);
  startButton.disabled = true;
}

function stopChangingBackground() {
  clearInterval(intervalId);
  startButton.disabled = false;
}

startButton.addEventListener('click', startChangingBackground);
stopButton.addEventListener('click', stopChangingBackground);