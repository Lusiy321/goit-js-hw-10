import './css/styles.css';
import restCountriesNode from 'rest-countries-node';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

const app = restCountriesNode();

// const obj = {
//   name: {
//     common: 'Ukraine',
//     official: 'Ukraine',
//     nativeName: { ukr: { official: 'Україна', common: 'Україна' } },
//   },
// };
