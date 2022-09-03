import debounce from 'lodash.debounce'
import  Notiflix from 'notiflix';
import './css/styles.css';
import API from './fetchCountries';


const inputField = document.querySelector('#search-box');

inputField.addEventListener('input', debounce(onSearch, 300))
function onSearch(evt) {
const searchQuery = inputField.value.toLowerCase().trim();

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
        renderCountryUl(data);
        
    }
    });
}

renderCountryUl(arr)
  
//     API.fetchCountries(searchQuery)
// .then(country => {console.log(country);})
// .catch(error => {console.log(error);})
// .then(response=> {return response.json();}



}

