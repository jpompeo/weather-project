const weatherData = {
  currentData: {
    city: 'West Palm Beach',
    state: 'Florida',
    temp: '80',
    condition: 'Sunny'
  },
  forecastData: [{
      day: 'Monday',
      temp: '80',
      condition: 'Sunny'
    },
    {
      day: 'Tuesday',
      temp: '80',
      condition: 'Sunny'
    },
    {
      day: 'Wednesday',
      temp: '80',
      condition: 'Sunny'
    },
    {
      day: 'Thursday',
      temp: '80',
      condition: 'Sunny'
    },
    {
      day: 'Friday',
      temp: '80',
      condition: 'Sunny'
    }
  ]
};

const fetchWeather = (city) => {
  $.ajax ({
    method: "GET",
    url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=e67216f1d8d59d8c6c67f7fbb818fc1b" ,
    dataType: "json",
    success: (data) => {
      addWeather(data);
      renderWeather();
    },
    error: (jqXHR, textStatus, errorThrown) => {
      console.log(textStatus);
    }
  });
};



//store returned weather results
const addWeather = (data) => {
  //store current weather in object
  let currentWeather = {
    city: data.name,
    temp: Math.round(data.main.temp),
    condition: data.weather[0].main
  }

//add current weather object to weatherData object
weatherData.currentData = currentWeather;

/*
//need to take (40) 3 hour forecasts and store them in array of objects with date/temp/condition
//split array into 5 arrays of 8 based on timestamps
//average each of the 5 arrays to find daily temp and condition
//add to weatherData forecast array, assigning day of week based on current day
  let dailyForecast = {
    day: data.[],
    temp: data.[],
    condition: data.[]
  }
  */
};



//take stored weather data and display it on the page
const renderWeather = () => {
  //clear html content from page
  $('#current-weather').empty();
  $('#week').empty();

  //get current weather template
  let currentSource = $('#current-template').html();

  //compile template
  let currentTemplate = Handlebars.compile(currentSource);

  //fill template with data
  let currentHtml = currentTemplate(weatherData.currentData);

  //render final html to page
  $('#current-weather').append(currentHtml);

  //render each forecast result to page with template
  weatherData.forecastData.forEach(result => {
    // get forecast weather template
    let forecastSource = $('#forecast-template').html();

    // compile template
    let forecastTemplate = Handlebars.compile(forecastSource);

    // fill template with data
    let forecastHtml = forecastTemplate(result);

    // render final html to page
    $('#week').append(forecastHtml);

    $('#forecast-header').removeClass('hide');
  });
};

//add click event to search button to get data and render results
$('#search-button').click(() => {
  //fetch data with value of search input
  fetchWeather($('#search-input').val());
  
  //clear input field
  $('search-input').val('');
});
