// if(nosacījums){darbības;}

let now = new Date();
let hour_x = 20;
let morning_hour = 10;
let day_hour = 18;
let night_hour_a = 22;
let night_hour_b = 4;
let time_shift = 6;

//now = now + time_shift;
now.setHours(now.getHours() + time_shift);

//console.log(now);
//console.log(typeof(now));

console.log(now.getHours());
//console.log(typeof(now.getHours()));

//console.log(now.getHours() < hour_x);
//console.log(typeof(now.getHours() < hour_x));
/*
if (now.getHours() < hour_x) {
  console.log("Output from if.");
  document.getElementById("demo").innerHTML = "Good day!";
}
*/
/*
if (now.getHours() < hour_x) {
    console.log("Output Nr.1 from if.");
    console.log("Output Nr.2 from if.");
    document.getElementById("demo").innerHTML = "Good day!";
}
*/
/*
if (       0.1      ) {
    console.log("Output Nr.1 from if.");
    console.log("Output Nr.2 from if.");
    document.getElementById("demo").innerHTML = "Good day!";
}
*/

if (now.getHours() > night_hour_b && now.getHours() < morning_hour) {
    document.getElementById("demo").innerHTML = "Good morning!";
}

if (now.getHours() > morning_hour && now.getHours() < day_hour) {
    document.getElementById("demo").innerHTML = "Good day!";
}

if (now.getHours() > day_hour && now.getHours() < night_hour_a) {
    document.getElementById("demo").innerHTML = "Good evening!";
}

if (now.getHours() > night_hour_a || now.getHours() < night_hour_b) {
    document.getElementById("demo").innerHTML = "Good night!";
}
let day;
switch (new Date().getDay()) {
  case 0:
    day = "Sunday";
    break;
  case 1:
    day = "Monday";
    break;
  case 2:
    day = "Tuesday";
    break;
  case 3:
    day = "Wednesday";
    break;
  case 4:
    day = "Thursday";
    break;
  case 5:
    day = "Friday";
    break;
  case  6:
    day = "Saturday";
}
document.getElementById("demo").innerHTML = "Today is " + day;