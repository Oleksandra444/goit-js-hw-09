import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';

const startButton = document.querySelector('[data-start]');

startButton.addEventListener('click', () => {
  startTimer();
  startButton.disabled = true;
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      Notiflix.Report.info('Dear User', 'Please choose a date in the future', 'Close');
      // alert("Please choose a date in the future");
      // console.log("Please choose a date in the future");
      startButton.disabled = true;
      return;
    } else {startButton.disabled = false;};
  }
}
const datePicker = flatpickr("#datetime-picker", options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

const timerContainer = document.querySelector('.timer');
const daysElement = timerContainer.querySelector('[data-days]');
const hoursElement = timerContainer.querySelector('[data-hours]');
const minutesElement = timerContainer.querySelector('[data-minutes]');
const secondsElement = timerContainer.querySelector('[data-seconds]');

function updateTimer(days, hours, minutes, seconds) {
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

function startTimer() {
  const selectedDate = datePicker.selectedDates[0];
  
  if (!selectedDate) {
    return;
  }
  
  const endDate = selectedDate.getTime();
  
  const timerInterval = setInterval(() => {
    const currentDate = new Date().getTime();
    const remainingTime = endDate - currentDate;
    
    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      updateTimer(0, 0, 0, 0);
      Notiflix.Report.info('Dear User', 'You achieved the result', 'Close');
      return;
    }
    
    const { days, hours, minutes, seconds } = convertMs(remainingTime);

    updateTimer(days, hours, minutes, seconds);
  }, 1000);
}

