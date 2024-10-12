let countries = [];
let temples = [];
let beaches = [];

const fileURL = 'https://raw.githubusercontent.com/Bharadwaj-0203/JavaScript/refs/heads/master/travel_recommendation_api.json';

fetch(fileURL)
    .then(response => {
        return response.json();
    })
    .then(data => {
        countries = data.countries;
        temples = data.temples;
        beaches = data.beaches;

        const search = document.getElementById('keyword');
        search.addEventListener('click', function () {
            const input = document.getElementById('search-input').value;
            const trimmedInput = input.trim().toLowerCase();
            searchKey(trimmedInput);
        });

        const resetButton = document.getElementById('clear');
        resetButton.addEventListener('click', function () {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = ''; 
            document.getElementById('search-input').value = ''; 
        });
    })
    .catch(error => {
        console.error(error);
    });

    function searchKey(input) {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = ''; // Clear previous results
    
        // Check for beaches
        if (input.includes('beach') || input.includes('beaches')) {
            beaches.forEach(beach => {
                resultsDiv.innerHTML += `
                    <div class="result-item">
                        <img src="${beach.imageUrl}" alt="${beach.name}" />
                        <h3>Beach: ${beach.name}</h3>
                        <p>${beach.description}</p>
                    </div>
                `;
            });
        } 
        // Check for temples
        else if (input.includes('temple') || input.includes('temples')) {
            temples.forEach(temple => {
                resultsDiv.innerHTML += `
                    <div class="result-item">
                        <img src="${temple.imageUrl}" alt="${temple.name}" />
                        <h3>Temple: ${temple.name}</h3>
                        <p>${temple.description}</p>
                    </div>
                `;
            });
        } 
        // Check for "country" or "countries" keyword
        else if (input.includes('country') || input.includes('countries')) {
            // Display all cities from all countries
            countries.forEach(country => {
                country.cities.forEach(city => {
                    resultsDiv.innerHTML += `
                        <div class="result-item">
                            <img src="${city.imageUrl}" alt="${city.name}" />
                            <h3>City: ${city.name} (in ${country.name})</h3>
                            <p>${city.description}</p>
                        </div>
                    `;
                });
            });
        } 
        // Check for specific country name
        else {
            let foundCountry = false; // Track if we found a country
            countries.forEach(country => {
                if (country.name.toLowerCase() === input) {
                    foundCountry = true; // Set flag to true if a country is found
                    resultsDiv.innerHTML += `
                        <div class="result-item">
                            <h3>Country: ${country.name}</h3>
                        </div>
                    `;
    
                    const citiesToShow = country.cities.slice(0, 2); // Get the first two cities
                    citiesToShow.forEach(city => {
                        resultsDiv.innerHTML += `
                            <div class="result-item">
                                <img src="${city.imageUrl}" alt="${city.name}" />
                                <h3>City: ${city.name} (in ${country.name})</h3>
                                <p>${city.description}</p>
                            </div>
                        `;
                    });
                }
            });
    
            if (!foundCountry) {
                resultsDiv.innerHTML = '<p>No results found.</p>';
            }
        }
    }
    

