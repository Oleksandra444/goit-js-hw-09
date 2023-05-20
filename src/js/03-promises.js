import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

const form = document.querySelector('.form');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const delayInput = document.querySelector("[name='delay']");
  const stepInput = document.querySelector("[name='step']");
  const amountInput = document.querySelector("[name='amount']");

  const delay = parseInt(delayInput.value);
  const step = parseInt(stepInput.value);
  const amount = parseInt(amountInput.value);

  let currentDelay = delay;

  for (let i = 1; i <= amount; i++) {
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.info(`✅ Fulfilled promise ${position} in ${delay}ms`);
        // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.info(`❌ Rejected promise ${position} in ${delay}ms`);
        // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    currentDelay += step;
  }
});