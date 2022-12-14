import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#search-box');
const countList = document.querySelector('.country-list');
const countInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onSearch, 300));

export function onSearch(e) {
  e.preventDefault();
  const val = input.value.trim();
  fetchCountries(val)
    .then(data => createMarkup(data))
    .catch(error => {
      Notify.failure('Oops, there is no country with that name', {
        opacity: 0.8,
        position: 'center-center',
        timeout: 2000,
        cssAnimationDuration: 300,
        cssAnimationStyle: 'fade',
      });
      countList.innerHTML = null;
      countInfo.innerHTML = null;
      return;
    });
}

export function createMarkup(arr) {
  if (arr.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.', {
      opacity: 0.8,
      position: 'center-center',
      timeout: 2000,
      cssAnimationDuration: 300,
      cssAnimationStyle: 'fade',
    });
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
  <li>Capital: <span class="inf">${item.capital}</span></li>
  <li>Population:<span class="inf">${item.population}</span></li>
  <li>Languages: <span class="inf">${item.languages[0].name}</span></li>
</ul>`
      )
      .join('');
    countInfo.innerHTML = descr;
  } else {
    countInfo.innerHTML = null;
  }
}
