const apiKey = 'cfed679d59a400ce311452d1f70e6c4d';
const apiBaseURL = 'https://api.openweathermap.org/data/2.5/';

function initTime() {
    moment.locale('bg');
    const currentTime = moment().format('MMM Do YY');
    $('#current-time').text(currentTime);
}

function initCitySelect() {
    $('#post-city').change( e => {
        const $select = $(e.currentTarget);
        const value = $select.val();
        const cityTitle = $select.find('option:selected').text();
        $('#current-city').text(cityTitle);
        getCurrentWeather(value);
    });
}

function getCurrentWeather(city = 'Plovdiv', route = 'weather') {
    $.ajax({
        method: "GET",
        url: `${apiBaseURL}${route}`,
        data: { 
            q: city,
            units: 'metric',
            appid: apiKey,
         }
    })
    .done(response => {

        $('#current-temperature').text(response.main.temp);
        $('#current-humidity').text(response.main.humidity);
        $('#current-wind').text(response.wind.speed);
        $('#current-weather').text(response.weather[0].main);
        
        // <div class="current-humidity"></div> 
        // <div class="current-time"></div>
        // <div class="current-weather"></div>
    });
}

initTime();
initCitySelect();
getCurrentWeather();
