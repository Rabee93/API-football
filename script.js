'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

function countriesData (data, className='') {
  const html = `<article class="country ${className}" >
    <img class="country__img" src=${data.flags.png}/>
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(+data.population/1000000).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[Object.keys(data.languages)[0]]}</p>
      <p class="country__row"><span>💰</span>${data.currencies[Object.keys(data.currencies)[0]].name}</p>
    </div>
  </article>
  `;
    countriesContainer.insertAdjacentHTML('beforeend',html);
    countriesContainer.style.opacity = 1
}


const countriesAndNeighbor = function(string) {
const request = new XMLHttpRequest();

request.open('GET',`https://restcountries.com/v3.1/name/${string}`);
request.send();

console.log(request.responseText)

request.addEventListener('load', function(){
  const [data] = JSON.parse(this.responseText)
 countriesData(data)
 const neighbour = data.borders[0]
if(!neighbour)return;

 const request2 = new XMLHttpRequest();

 request2.open('GET',`https://restcountries.com/v3.1/alpha/${neighbour}`);
 request2.send();

 request2.addEventListener('load', function(){
   console.log(this.responseText)
   const [data2] = JSON.parse(this.responseText)
  countriesData(data2, 'neighbour')

})
})
}

countriesAndNeighbor('usa')
