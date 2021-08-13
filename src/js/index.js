import '../sass/main.scss';
// import debounce from 'lodash.debounce';
import _ from 'lodash';
// pnotify
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { defaults } from '@pnotify/core';
defaults.maxTextHeight = null;

// inner 
import countryCard from '../templates/template.hbs';
import API from './fetchCountries';
import getRefs from './get-refs';

const debounce = require('lodash.debounce');

const refs = getRefs();
refs.input.addEventListener('input', debounce( onSearch, 500));


function onSearch(e){
  e.preventDefault();
  const inputValue = e.target.value.trim();

  if(!inputValue){
    return console.log('Input the country, please.')    
  }else if(inputValue){
    countriesResult(inputValue);
  }
}

function countriesResult(inputValue){
  API.fetchCountries(inputValue)
  .then(countries =>{
    console.log(countries);
    if(countries.length > 10){
      error ({    
        title: 'Too many matches found.',
        text: ' Please enter a more specific query!',
        styling: 'brighttheme',
        delay: 2000,
        });
      }else if(countries.length === 1){
          const markup = countryCard(countries[0]);
          refs.countriesContainer.innerHTML = markup;         
    }else if (countries.length <= 10){
      const markup = countries.map(country =>
         `<li class="countries-date__item">
         <a href = # class="countries-date__link">${country.name}</a>
         </li>`).join('');
      refs.countriesContainer.innerHTML= `<ul class="countries-container__list">${markup}</ul>`;
      const selectedCountry = document.querySelector('.countries-container__list');
      selectedCountry.addEventListener('click', onChooseCountry); 
    }else if(countries.status === 404){
      console.log('Something was wrong.')
    }else {
      error ({    
        title: 'Too many matches found.',
        text: ' Please enter a more specific query!',
        styling: 'brighttheme',
        delay: 2000,
        });
    }
  })
}



function onChooseCountry(e){
  if (e.target.className === 'countries-date__link'){
    const inputValue = e.target.textContent;
   
    countriesResult(inputValue); 
    
  }
}







// function onSearch(e){
//   e.preventDefault();

//   const form = e.currentTarget;
//   searchValue = form.elements.query.value;

//   API.fetchCountries(searchValue)
//    console.log(searchValue)
//     .then(renderCountryCard)
//     // .then((countries) => console.log(countries.length))
//     .catch(onFetchError)
// }


// function test (e){
  
// const searchValue = e.target.value;
// console.log(searchValue)
// }
// function renderCountryCard(country){
//   const markup = countryCard(country);
//   refs.articlesContainer.innerHTML= markup;
// }

// function onFetchError(error){
//   alert({    
//   title: 'Too many matches found. Please enter a more specific query!',
//   styling: 'brighttheme',
//   delay: 2000,
//   });
// }
