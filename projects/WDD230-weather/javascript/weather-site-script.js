function toggleMenu() {
    document.getElementById("primaryNav").classList.toggle("hide");
}

let oLastModif = new Date(document.lastModified);

let optionsMonth = { month: 'long', };
let optionsDay = { weekday: 'long', };

let day = oLastModif.toLocaleDateString("en-US", optionsDay);
let date = oLastModif.getDate();
let month = oLastModif.toLocaleDateString("en-US", optionsMonth);
let year = oLastModif.getFullYear();

let dateString = day + ", " + date + " " + month + " " + year;

document.getElementById('lastUpdated').innerHTML = dateString;

// let options = { year: '2-digit', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
// var options = { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
// console.log(today.toLocaleDateString("en-US")); // 9/17/2016
// console.log(today.toLocaleDateString("en-US", options)); // Saturday, September 17, 2016
// document.getElementById("year").innerHTML = new Date().getFullYear();