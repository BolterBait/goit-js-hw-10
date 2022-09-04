import debounce from 'lodash.debounce'
import  Notiflix from 'notiflix';
import './css/styles.css';
import API from './fetchCountries';


const inputField = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryDiv = document.querySelector('.country-info');

function clearCountryListMarkup() {
    countryList.innerHTML=' ';
    }

function clearCountryDivMarkup() {
    countryDiv.innerHTML = ' ';
    }

inputField.addEventListener('input', debounce(onSearch, 300))
function onSearch() {
const searchQuery = inputField.value.toLowerCase().trim();
if (!searchQuery) {
    clearCountryDivMarkup();
    clearCountryListMarkup();
    return;    
}
if (searchQuery !== ' ' ) {
    API.fetchCountries(searchQuery)
    .then((response) => {
        if (!response.ok || response.status === 404) {
            throw new Error(response.status);            
        }return response.json();
    }).then((data) => {
        const countryListLength = data.length;
        if (countryListLength > 10) { Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        return;
    }if (countryListLength >= 2 && countryListLength <= 10) { 
        clearCountryDivMarkup()
        renderCountryUl(data);
    }if (countryListLength === 1) {
        clearCountryListMarkup();
        renderCountryDiv(data)
        }
    }).catch(error => {Notiflix.Notify.failure("Oops, there is no country with that name");
    clearCountryDivMarkup();
    clearCountryListMarkup();
});
}
}

function renderCountryUl(arr) {
    countryList.innerHTML = arr.map(({ name, flags }) =>     
`<li class="contry-item"><img class="flag-img" src="${flags.svg}" 
alt="${name.official}flag" 
width="60" 
height="40"></>
<span class="name_official">${name.official}
</span>
</li>`).join('')
}

function renderCountryDiv(arr) {
    countryDiv.innerHTML = arr.map(({ flags, name, capital, population, languages }) =>
    `<img class="flag-img" src="${flags.svg}" 
    alt="${name.official}flag" 
    width="100" 
    height="60"></>
    <h1>${name.official}</hi>
    <p class="info-item">
    <span>Capital: </span>${capital}</p>
    <p class="info-item">
    <span>Population: </span>${population}</p>
    <p class="info-item">
    <span>Languages: </span>${Object.values(languages)}</p>`).join('')    
}