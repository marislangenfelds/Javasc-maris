

const weatherform = document.querySelector(".weatherform");
const cityinput = document.querySelector(".cityinput");
const card = document.querySelector(".card");
const apikey = "68ee5e718daca7bd5441e3e4d5239d6b";

weatherform.addEventListener("submit",async event => {

    event.preventDefault();

    const city = cityinput.value;

    if(city){
        try{
            const weatherdata = await getweatherdata(city);
            displayweatherinfo(weatherdata);


        }
        catch(error){
            console.error(error);
            displayerror(error);
        }
 

    }
    else{
        displayerror("ludzu ievadi pilsetu");
    }

});


async function getweatherdata(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon=${city}&appid=${apikey}`;

    const response = await fetch(apiUrl);

    console.log(response);



}

function displayweatherinfo(data){

}
function getweatheremoji(weatherid){

}

function displayerror(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);




}