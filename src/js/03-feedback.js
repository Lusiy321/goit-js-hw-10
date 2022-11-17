import throttle from 'lodash.throttle';
const throttle = require('lodash.throttle');

const form = document.querySelector('.feedback-form');

const feedback = 'feedback-form-state';
form.addEventListener('input', throttle(feedbackFoo, 500));
form.addEventListener('submit', submit);

const data = {};
updateData();

function updateData() {
  if (localStorage.getItem(feedback)) {
    const data = JSON.parse(localStorage.getItem(feedback) || '');
    form.elements.email.value = data.email;
    form.elements.message.value = data.message;
  }
}

function feedbackFoo() {
  data.email = form.elements.email.value;
  data.message = form.elements.message.value;
  localStorage.setItem(feedback, JSON.stringify(data));
}

function submit(evt) {
  evt.preventDefault();
  if (form.elements.email.value && form.elements.message.value) {
    console.log(data);
    evt.currentTarget.reset();
    localStorage.clear();
  }
}
