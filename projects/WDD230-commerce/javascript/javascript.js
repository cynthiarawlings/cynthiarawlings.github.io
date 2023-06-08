// Web font loader
WebFont.load({
    google: {
        families: ['EB Garamond', 'Catamaran']
    }
});

// Hamburger menu toggle
function toggleMenu() {
    document.getElementById("primaryNav").classList.toggle("hide");
}

// Home Contact us
function toThanks() {
    window.location.href = "comment-thanks.html";
}

// Home Join Us
function toMembership() {
    window.location.href = "membership.html";
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

// Year for Footer
document.getElementById('year').innerHTML = year;

// Weather Alert Close Button Top
function closeAlertTop() {
    document.getElementById("alert-top").setAttribute('class', "hide");
}

const today = new Date();
const todayDayNumber = today.getDay() + 1;
const weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

// Weather
if (document.getElementById('current-weather')) {
    const OneCallWeatherAPIurl = "//api.openweathermap.org/data/2.5/onecall?lat=28.1614&lon=-81.601738&appid=28e498ae581a0633cfff6d7d29104fdb&units=imperial";
    fetch(OneCallWeatherAPIurl)
        .then((response) => response.json())
        .then((weatherInfo) => {
            console.log(weatherInfo);
            // Current Weather
            document.getElementById('current-weather').textContent = weatherInfo.current.weather[0].description;
            document.getElementById('current-temperature').textContent = Math.round(weatherInfo.current.temp) + "°";
            document.getElementById('current-humidity').textContent = Math.round(weatherInfo.current.humidity) + "%";
            document.getElementById('current-feels-like').textContent = Math.round(weatherInfo.current.feels_like) + "°";
            // Weather Forecast
            let forecastList = weatherInfo.daily;
            let forecastDayNumber = todayDayNumber;
            let forcastCount = 0;
            for (let i = 0; i < forecastList.length && forcastCount <= 2; i++) {
                let theDayName = document.createElement('h3');
                theDayName.textContent = weekday[forecastDayNumber];
                let theTemp = document.createElement('p');
                theTemp.textContent = Math.round(forecastList[i].temp.day) + '\xB0';
                let iconcode = forecastList[i].weather[0].icon;
                let iconPath = "images/home/forecast-icons/" + iconcode + ".png";
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
                theIcon.setAttribute('alt', "forecast-icon");
                document.getElementById('forecast').appendChild(theDay);
                forcastCount++;
                forecastDayNumber += 1;
                if (forecastDayNumber === 7) {
                    forecastDayNumber = 0;
                }
            }
            // Alert
            if (weatherInfo.alerts) {
                document.getElementById("weather-alert-top").textContent = weatherInfo.alerts[0].description;
                document.getElementById("weather-alert-bottom").textContent = weatherInfo.alerts[0].description;
            } else {
                document.getElementById("alert-top").setAttribute('class', "hide");
                document.getElementById("alert").setAttribute('class', "hide");
                document.getElementById("weather-top-row").setAttribute('class', "full-width-current");
            }
        });
}

// Davenport Piechart
if (document.getElementById("piechart")) {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        let data = google.visualization.arrayToDataTable([
            ['Race', 'Percent of the Population'],
            ['White', 3612],
            ['Black or African American', 786],
            ['Two or More Races', 135],
            ['Other', 106],
            ['Asian', 43]
        ]);
        let options = {
            backgroundColor: "transparent",
            fontName: "EB Garamond",
            chartArea: { width: "100%" },
            legend: { position: 'bottom' }
        };
        let chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
    }
}

// Davenport Slideshow
if (document.getElementById('piechart')) {
    let slideIndex = [1, 1];
    let slideId = ["mySlides1", "mySlides2"];
    showSlides(1, 0);
    showSlides(1, 1);
    function plusSlides(n, no) {
        showSlides(slideIndex[no] += n, no);
    }
    function showSlides(n, no) {
        let i;
        let x = document.getElementsByClassName(slideId[no]);
        if (n > x.length) { slideIndex[no] = 1 }
        if (n < 1) { slideIndex[no] = x.length }
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        x[slideIndex[no] - 1].style.display = "block";
    }
}

// Directory Businesses
if (document.getElementById('directory-container')) {
    const directoryURL = 'davenport-directory.json';
    fetch(directoryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonObject) {
            const business = jsonObject['business'];
            console.table(jsonObject);
            for (let i = 0; i < business.length; i++) {
                let card = document.createElement('section');
                let logo = document.createElement('img');
                let name = document.createElement('h2');
                let phone = document.createElement('p');
                let street = document.createElement('p');
                let address = document.createElement('p');
                let website = document.createElement('p');
                logo.setAttribute('src', business[i].logo);
                logo.setAttribute('alt', business[i].name);
                name.textContent = business[i].name;
                phone.textContent = business[i].phone;
                street.textContent = business[i].street;
                address.textContent = business[i].city + ", " + business[i].state + " " + business[i].zip;
                website.textContent = business[i].website;
                card.appendChild(logo);
                card.appendChild(name);
                card.appendChild(street);
                card.appendChild(address);
                card.appendChild(website);
                document.getElementById('directory-container').appendChild(card);
            }
        });
}

// Directory Toggle Grid
if (document.getElementById("directory-container")) {
    function turnGridOn() {
        document.getElementById("directory-container").setAttribute('class', "directory-grid");
    }
    function turnGridOff() {
        document.getElementById("directory-container").setAttribute('class', "directory-block");
    }
}

// Contact Board Members
// Executive
if (document.getElementById('executive')) {
    const executiveURL = 'executive.json';
    fetch(executiveURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonObject) {
            const executive = jsonObject['executive'];
            console.table(jsonObject);
            for (let i = 0; i < executive.length; i++) {
                let card = document.createElement('section');
                let profile = document.createElement('img');
                let position = document.createElement("h3");
                let name = document.createElement('h2');
                let company = document.createElement("h4");
                profile.setAttribute('src', "images/contact/executive-board/" + executive[i]["first-name"] + "-" + executive[i]["last-name"] + ".jpg");
                profile.setAttribute('alt', executive[i]["first-name"]);
                position.textContent = executive[i].position;
                name.textContent = executive[i]["first-name"] + " " + executive[i]["last-name"];
                company.textContent = executive[i].company;
                card.appendChild(profile);
                card.appendChild(position);
                card.appendChild(name);
                card.appendChild(company);
                document.getElementById('executive').appendChild(card);
            }
        });
    // Board
    const boardURL = 'board.json';
    fetch(boardURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonObject) {
            const board = jsonObject['board'];
            console.table(jsonObject);
            for (let i = 0; i < board.length; i++) {
                let card = document.createElement('section');
                let profile = document.createElement('img');
                let name = document.createElement('h2');
                let company = document.createElement("h4");
                profile.setAttribute('src', "images/contact/board/" + board[i]["first-name"] + "-" + board[i]["last-name"] + ".jpg");
                profile.setAttribute('alt', board[i]["first-name"]);
                name.textContent = board[i]["first-name"] + " " + board[i]["last-name"];
                company.textContent = board[i].company;
                card.appendChild(profile);
                card.appendChild(name);
                card.appendChild(company);
                document.getElementById('board').appendChild(card);
            }
        });
    // Staff
    const staffURL = 'staff.json';
    fetch(staffURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonObject) {
            const staff = jsonObject['staff'];
            console.table(jsonObject);
            for (let i = 0; i < staff.length; i++) {
                let card = document.createElement('section');
                let profile = document.createElement('img');
                let position = document.createElement("h3");
                let name = document.createElement('h2');
                profile.setAttribute('src', "images/contact/staff/" + staff[i]["first-name"] + "-" + staff[i]["last-name"] + ".jpg");
                profile.setAttribute('alt', staff[i]["first-name"]);
                position.textContent = staff[i].position;
                name.textContent = staff[i]["first-name"] + " " + staff[i]["last-name"];
                card.appendChild(profile);
                card.appendChild(position);
                card.appendChild(name);
                document.getElementById('staff').appendChild(card);
            }
        });
}