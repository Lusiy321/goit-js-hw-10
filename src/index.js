import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#search-box');
const countList = document.querySelector('.country-list');
const countInfo = document.querySelector('.country-info');
input.addEventListener('input', debounce(onSearch, 300));

function onSearch(e) {
  e.preventDefault();
  const val = input.value.trim();
  if (!val) {
    Notify.failure('Please enter correct name', {
      opacity: 0.5,
      position: 'center-top',
      timeout: 2000,
      backOverlay: true,
      cssAnimationDuration: 300,
      backOverlayColor: 'rgb(255,255,255)',
      cssAnimationStyle: 'zoom',
    });
    countList.innerHTML = null;
    countInfo.innerHTML = null;
    return;
  }
  fetchCountries(val)
    .then(data => createMarkup(data))
    .catch(error => {
      Notify.failure('Oops, there is no country with that name', {
        opacity: 0.5,
        position: 'center-top',
        timeout: 2000,
        backOverlay: true,
        cssAnimationDuration: 300,
        backOverlayColor: 'rgb(255,255,255)',
        cssAnimationStyle: 'zoom',
      });
      countList.innerHTML = null;
      countInfo.innerHTML = null;
      return;
    });
}

function createMarkup(arr) {
  if (arr.length > 10) {
    Notify.failure(
      'Too many matches found. Please enter a more specific name.',
      {
        opacity: 0.5,
        position: 'center-top',
        timeout: 2000,
        backOverlay: true,
        cssAnimationDuration: 300,
        backOverlayColor: 'rgb(255,255,255)',
        cssAnimationStyle: 'zoom',
      }
    );
    countList.innerHTML = null;
    countInfo.innerHTML = null;
  } else {
    const markup = arr
      .map(
        item =>
          `<li><img src="${item.flags.png}" alt="${item.name}"><h2>${item.name}</h2></li>`
      )
      .join('');
    countList.innerHTML = markup;
  }

  if (arr.length <= 1) {
    const descr = arr
      .map(
        item =>
          `<ul>
  <li>Capital: ${item.capital}</li>
  <li>Population: ${item.population}</li>
  <li>Languages: ${item.languages[0].name}</li>
</ul>`
      )
      .join('');
    countInfo.innerHTML = descr;
  } else {
    countInfo.innerHTML = null;
  }
}
