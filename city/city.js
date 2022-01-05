import { 
    checkAuth, 
    logout,
    fetchCity,
    createDefaultCity,
    updateName,
    updateWaterfront,
    updateSkyline,
    updateCastle,
    updateSlogans,

} from '../fetch-utils.js';

checkAuth();

//grab the DOM
const cityNameEl = document.querySelector('.city-name');
const waterfrontDropdown = document.querySelector('#waterfront-dropdown');
const skylineDropdown = document.querySelector('#skyline-dropdown');
const castleDropdown = document.querySelector('#castle-dropdown');
const waterImgEl = document.querySelector('.water-img');
const skylineImgEl = document.querySelector('.skyline-img');
const castleImgEl = document.querySelector('.castle-img');
const nameForm = document.querySelector('.name-form');
const sloganForm = document.querySelector('.slogan-form');
const sloganListEl = document.querySelector('.slogan-list');
const logoutButton = document.getElementById('logout');


logoutButton.addEventListener('click', () => {
    logout();
});

waterfrontDropdown.addEventListener('change', async() => {
    const updatedCity = await updateWaterfront(waterfrontDropdown.value);
    displayCity(updatedCity);
});

skylineDropdown.addEventListener('change', async() => {
    const updatedCity = await updateSkyline(skylineDropdown.value);
    displayCity(updatedCity);
});

castleDropdown.addEventListener('change', async() => {
    const updatedCity = await updateCastle(castleDropdown.value);
    displayCity(updatedCity);
});

// - on load
window.addEventListener('load', async() => {
    //check to see if this user has a city already (try to fetch it from supabase--if it's null, create a new one and load that)
    const city = await fetchCity();
    //if they do not have a city, create a new, default city and display it 
    if (!city) {
        //create a city and display
        const newCity = await createDefaultCity();
        displayCity(newCity);
    } 
    else {
        //display the city
        displayCity(city);
    }
});

//city name input button
//on submit...
nameForm.addEventListener('submit', async(e) => {
    //update the name column for this city in the database 
    e.preventDefault();
    const data = new FormData(nameForm);
    const name = data.get('name');
    //fresh fetch
    const updatedCity = await updateName(name);
    //display "Welcome to City Builder! This is the city of <city name"
    displayCity(updatedCity);
});

//slogan input and button
//on submit (pessimistic loading)...
sloganForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    const data = new FormData(sloganForm);
    //get new slogan input from the form
    const newSlogan = data.get('slogan');
    //fetch old city data from supabase
    const city = await fetchCity();
    //push the new slogan into the array of all the existing slogans
    const sloganArray = city.slogans;
    sloganArray.push(newSlogan);
    //update the slogan column for this city in the database with the new slogan
    const updatedCity = await updateSlogans(sloganArray);
    //fetch the slogans again
    //render and append all slogans
    displayCity(updatedCity);
});


function displayCity(city) {
    //change textContent of city name span to the city name
    cityNameEl.textContent = city.name;
    //change image source of waterfront & skyline & castle image
    waterImgEl.src = `../assets/waterfront-${city.waterfront_id}.webp`;
    skylineImgEl.src = `../assets/skyline-${city.skyline_id}.webp`;
    castleImgEl.src = `../assets/castle-${city.castle_id}.webp`;
    //loop through slogan array; render and append each slogan to the "slogan-list" div
    sloganListEl.textContent = '';
    for (let slogan of city.slogans) {
        const sloganEl = document.createElement('p');
        sloganEl.classList.add('slogan');
        sloganEl.textContent = slogan;
        sloganListEl.append(sloganEl);
    }
    
}


// - water dropdown
//     - update the water_id column for this city in the database 
//     - fresh fetch
//     - display the water picture correctly
// - skyline dropdown
//     - update the skyline_id column for this city in the database 
//     - fresh fetch
//     - display the skyline picture correctly
// - castle dropdown
//     - update the castle_id column for this city in the database 
//     - fresh fetch
//     - display the castle picture correctly