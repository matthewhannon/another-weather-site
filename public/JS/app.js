const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const searchResultText = document.querySelector('.search-result')
const locationResultText = document.querySelector('.message-1')
const weatherResultText = document.querySelector('.message-2')

const resultsContainer = document.querySelector('.results')
const contentContainer = document.querySelector('.content')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    const url = `/weather?address=${location}`

    fetch(`${url}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                //update DOM with error if any
                searchResultText.textContent = data.location;
                locationResultText.textContent = data.error;

            } else {
                //Results transition flex grow
                resultsContainer.classList.add('grow');
                contentContainer.classList.add('grow');

                //update DOM with results if any
                locationResultText.textContent = data.location;
                weatherResultText.textContent = data.forecastData + '\xB0F';

                //opacity transition on flex grow transitionend
                resultsContainer.addEventListener('transitionend', () => {
                    resultsContainer.style.opacity = 1;
                })
            }
        })
    })
})




