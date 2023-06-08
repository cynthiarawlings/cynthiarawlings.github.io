// Web font loader
WebFont.load({
    google: {
        families: ['Cormorant Garamond', 'Varela Round']
    }
});

// Hamburger menu toggle
function toggleMenu() {
    document.getElementById("primaryNav").classList.toggle("hide");
}

// Last updeted
let oLastModif = new Date(document.lastModified);
let optionsMonth = { month: 'long', };
let optionsDay = { weekday: 'long', };
let day = oLastModif.toLocaleDateString("en-US", optionsDay);
let date = oLastModif.getDate();
let month = oLastModif.toLocaleDateString("en-US", optionsMonth);
let year = oLastModif.getFullYear();
let dateString = day + ", " + date + " " + month + " " + year;
document.getElementById('lastUpdated').innerHTML = dateString;

// Weekend message
const today = new Date();
const dayNumber = today.getDay();
const element = document.getElementById("message");
if (element) {
    if (dayNumber == 5) {
        element.classList.add("showme");
    } else {
        element.classList.add("hideme");
    }
}

// Storm Center rating slider
function adjustRating(rating) {
    document.getElementById("ratingvalue").innerHTML = rating;
}

// Progressive loading images
const imagesToLoad = document.querySelectorAll('img[data-src]');
const loadImages = (image) => {
    image.setAttribute('src', image.getAttribute('data-src'));
    image.onload = () => {
        image.removeAttribute('data-src');
    };
};
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((items) => {
        items.forEach((item) => {
            if (item.isIntersecting) {
                loadImages(item.target);
                observer.unobserve(item.target);
            }
        });
    });
    imagesToLoad.forEach((img) => {
        observer.observe(img);
    });
} else {
    imagesToLoad.forEach((img) => {
        loadImages(img);
    });
}

let openPage = document.getElementById('page-name');
// Preston's 5 Day forecast
if (openPage.textContent == "Preston") {
    const todayDayNumber = today.getDay();
    const weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    const forecastAPIurl = "//api.openweathermap.org/data/2.5/forecast?q=Preston,ID,US&appid=abbf45e289104d649c35aef8e8c97def&units=imperial";
    fetch(forecastAPIurl)
        .then((response) => response.json())
        .then((forecastInfo) => {
            console.log(forecastInfo);
            let forecastList = forecastInfo.list;
            let forecastDayNumber = todayDayNumber;
            for (let i = 0; i < forecastList.length; i++) {
                let time = forecastList[i].dt_txt;
                if (time.includes('21:00:00')) {
                    let theDayName = document.createElement('h3');
                    theDayName.textContent = weekday[forecastDayNumber];
                    console.log('>' + weekday[forecastDayNumber]);
                    let theTemp = document.createElement('p');
                    theTemp.textContent = Math.round(forecastList[i].main.temp) + '\xB0';
                    let iconcode = forecastList[i].weather[0].icon;
                    let iconPath = "images/forecast-icons/" + iconcode + ".png";
                    let theIcon = document.createElement('img');
                    theIcon.src = iconPath;
                    let theDay = document.createElement('div');
                    theDay.appendChild(theDayName);
                    theDay.appendChild(theIcon);
                    theDay.appendChild(theTemp);
                    theDay.setAttribute('class', "forecast-box");
                    theDayName.setAttribute('class', "forecast-name");
                    theTemp.setAttribute('class', "forecast-temp");
                    theIcon.setAttribute('class', "forecast-icon");
                    document.getElementById('forecast').appendChild(theDay);
                }
                forecastDayNumber += 1;
                if (forecastDayNumber === 7) {
                    forecastDayNumber = 0;
                }
            }
        });
    const currentWeatherAPIurl = "//api.openweathermap.org/data/2.5/weather?id=5604473&appid=28e498ae581a0633cfff6d7d29104fdb&units=imperial";
    fetch(currentWeatherAPIurl)
        .then((response) => response.json())
        .then((weatherInfo) => {
            console.log(weatherInfo);
            document.getElementById('speed').textContent = weatherInfo.wind.speed;
            document.getElementById('temp').textContent = weatherInfo.main.temp;
            let currentWindSpeed = weatherInfo.wind.speed;
            let currentTemperature = weatherInfo.main.temp;
            let windChill = 35.74 + (0.6215 * currentTemperature) - (35.75 * Math.pow(currentWindSpeed, 0.16)) +
                (0.4275 * currentTemperature * Math.pow(currentWindSpeed, 0.16));
            windChill = Math.round(windChill);
            if (currentTemperature <= 50 && currentWindSpeed > 3) {
                document.getElementById("chill").textContent = "Wind Chill: " + windChill + "°";
            } else {
                document.getElementById("chill").textContent = "No Wind Chill Today.";
            }
        });

    // Events
    const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonObject) {
            const towns = jsonObject['towns'];
            console.log(towns);
            for (let i = 0; i < towns.length; i++) {
                if (i == 6) {
                    let eventList = document.createElement("ul");

                    let events = towns[i].events;
                    console.log(events);

                    for (let event of events) {
                        let eventItem = document.createElement("li");
                        eventItem.textContent = event;
                        eventList.appendChild(eventItem);
                    }
                    document.querySelector('div.event').appendChild(eventList);
                }
            }
        });
}


// Soda Springs's 5 Day forecast
if (openPage.textContent == "Soda Springs") {
    const todayDayNumber = today.getDay();
    const weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    const forecastAPIurl = "//api.openweathermap.org/data/2.5/forecast?q=Soda%20Springs,ID,US&appid=abbf45e289104d649c35aef8e8c97def&units=imperial";
    fetch(forecastAPIurl)
        .then((response) => response.json())
        .then((forecastInfo) => {
            console.log(forecastInfo);
            let forecastList = forecastInfo.list;
            let forecastDayNumber = todayDayNumber;
            for (let i = 0; i < forecastList.length; i++) {
                let time = forecastList[i].dt_txt;
                if (time.includes('21:00:00')) {
                    let theDayName = document.createElement('h3');
                    theDayName.textContent = weekday[forecastDayNumber];
                    console.log('>' + weekday[forecastDayNumber]);
                    let theTemp = document.createElement('p');
                    theTemp.textContent = Math.round(forecastList[i].main.temp) + '\xB0';
                    let iconcode = forecastList[i].weather[0].icon;
                    let iconPath = "images/forecast-icons/" + iconcode + ".png";
                    let theIcon = document.createElement('img');
                    theIcon.src = iconPath;
                    let theDay = document.createElement('div');
                    theDay.appendChild(theDayName);
                    theDay.appendChild(theIcon);
                    theDay.appendChild(theTemp);
                    theDay.setAttribute('class', "forecast-box");
                    theDayName.setAttribute('class', "forecast-name");
                    theTemp.setAttribute('class', "forecast-temp");
                    theIcon.setAttribute('class', "forecast-icon");
                    document.getElementById('forecast').appendChild(theDay);
                }
                forecastDayNumber += 1;
                if (forecastDayNumber === 7) {
                    forecastDayNumber = 0;
                }
            }
        });
    const currentWeatherAPIurl = "//api.openweathermap.org/data/2.5/weather?id=5607916&appid=28e498ae581a0633cfff6d7d29104fdb&units=imperial";
    fetch(currentWeatherAPIurl)
        .then((response) => response.json())
        .then((weatherInfo) => {
            console.log(weatherInfo);
            document.getElementById('speed').textContent = weatherInfo.wind.speed;
            document.getElementById('temp').textContent = weatherInfo.main.temp;
            let currentWindSpeed = weatherInfo.wind.speed;
            let currentTemperature = weatherInfo.main.temp;
            let windChill = 35.74 + (0.6215 * currentTemperature) - (35.75 * Math.pow(currentWindSpeed, 0.16)) +
                (0.4275 * currentTemperature * Math.pow(currentWindSpeed, 0.16));
            windChill = Math.round(windChill);
            if (currentTemperature <= 50 && currentWindSpeed > 3) {
                document.getElementById("chill").textContent = "Wind Chill: " + windChill + "°";
            } else {
                document.getElementById("chill").textContent = "No Wind Chill Today.";
            }
        });

    // Events
    const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonObject) {
            const towns = jsonObject['towns'];
            console.log(towns);
            for (let i = 0; i < towns.length; i++) {
                if (i == 0) {
                    let eventList = document.createElement("ul");

                    let events = towns[i].events;
                    console.log(events);

                    for (let event of events) {
                        let eventItem = document.createElement("li");
                        eventItem.textContent = event;
                        eventList.appendChild(eventItem);
                    }
                    document.querySelector('div.event').appendChild(eventList);
                }
            }
        });
}

// Fish Haven's 5 Day forecast
if (openPage.textContent == "Fish Haven") {
    const todayDayNumber = today.getDay();
    const weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    const forecastAPIurl = "//api.openweathermap.org/data/2.5/forecast?q=Bear%20Lake%20County,ID,US&appid=abbf45e289104d649c35aef8e8c97def&units=imperial";
    fetch(forecastAPIurl)
        .then((response) => response.json())
        .then((forecastInfo) => {
            console.log(forecastInfo);
            let forecastList = forecastInfo.list;
            let forecastDayNumber = todayDayNumber;
            for (let i = 0; i < forecastList.length; i++) {
                let time = forecastList[i].dt_txt;
                if (time.includes('21:00:00')) {
                    let theDayName = document.createElement('h3');
                    theDayName.textContent = weekday[forecastDayNumber];
                    console.log('>' + weekday[forecastDayNumber]);
                    let theTemp = document.createElement('p');
                    theTemp.textContent = Math.round(forecastList[i].main.temp) + '\xB0';
                    let iconcode = forecastList[i].weather[0].icon;
                    let iconPath = "images/forecast-icons/" + iconcode + ".png";
                    let theIcon = document.createElement('img');
                    theIcon.src = iconPath;
                    let theDay = document.createElement('div');
                    theDay.appendChild(theDayName);
                    theDay.appendChild(theIcon);
                    theDay.appendChild(theTemp);
                    theDay.setAttribute('class', "forecast-box");
                    theDayName.setAttribute('class', "forecast-name");
                    theTemp.setAttribute('class', "forecast-temp");
                    theIcon.setAttribute('class', "forecast-icon");
                    document.getElementById('forecast').appendChild(theDay);
                }
                forecastDayNumber += 1;
                if (forecastDayNumber === 7) {
                    forecastDayNumber = 0;
                }
            }
        });
    const currentWeatherAPIurl = "//api.openweathermap.org/data/2.5/weather?id=5585000&appid=28e498ae581a0633cfff6d7d29104fdb&units=imperial";
    fetch(currentWeatherAPIurl)
        .then((response) => response.json())
        .then((weatherInfo) => {
            console.log(weatherInfo);
            document.getElementById('speed').textContent = weatherInfo.wind.speed;
            document.getElementById('temp').textContent = weatherInfo.main.temp;
            let currentWindSpeed = weatherInfo.wind.speed;
            let currentTemperature = weatherInfo.main.temp;
            let windChill = 35.74 + (0.6215 * currentTemperature) - (35.75 * Math.pow(currentWindSpeed, 0.16)) +
                (0.4275 * currentTemperature * Math.pow(currentWindSpeed, 0.16));
            windChill = Math.round(windChill);
            if (currentTemperature <= 50 && currentWindSpeed > 3) {
                document.getElementById("chill").textContent = "Wind Chill: " + windChill + "°";
            } else {
                document.getElementById("chill").textContent = "No Wind Chill Today.";
            }
        });

    // Events
    const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonObject) {
            const towns = jsonObject['towns'];
            console.log(towns);
            for (let i = 0; i < towns.length; i++) {
                if (i == 2) {
                    let eventList = document.createElement("ul");

                    let events = towns[i].events;
                    console.log(events);

                    for (let event of events) {
                        let eventItem = document.createElement("li");
                        eventItem.textContent = event;
                        eventList.appendChild(eventItem);
                    }
                    document.querySelector('div.event').appendChild(eventList);
                }
            }
        });
}

// Home Page Cards
if (openPage.textContent == "Home") {
    const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonObject) {
            const towns = jsonObject['towns'];
            for (let i = 0; i < towns.length; i++) {
                if (i == 0 || i == 2 || i == 6) {
                    let card = document.createElement('section');
                    let text = document.createElement('div');
                    let name = document.createElement('h2');
                    let motto = document.createElement('h3');
                    let yearFounded = document.createElement('p');
                    let currentPopulation = document.createElement('p');
                    let averageRainfall = document.createElement('p');
                    let photo = document.createElement('img');
                    name.textContent = towns[i].name;
                    motto.textContent = towns[i].motto;
                    yearFounded.textContent = 'Year Founded: ' + towns[i].yearFounded;
                    currentPopulation.textContent = 'Population: ' + towns[i].currentPopulation;
                    averageRainfall.textContent = 'Annual Rain Fall: ' + towns[i].averageRainfall;
                    photo.setAttribute('src', 'images/home/' + towns[i].photo);
                    photo.setAttribute('alt', towns[i].name);
                    card.appendChild(text);
                    text.appendChild(name);
                    text.appendChild(motto);
                    text.appendChild(yearFounded);
                    text.appendChild(currentPopulation);
                    text.appendChild(averageRainfall);
                    card.appendChild(photo);
                    document.querySelector('div.cards').appendChild(card);
                    if (i == 2) {
                        card.setAttribute('id', "center");
                        document.querySelector('div.cards').appendChild(card);
                    }
                    if (i == 0) {
                        card.setAttribute('id', "left");
                        document.querySelector('div.cards').appendChild(card);
                    }
                }
            }
        });
}