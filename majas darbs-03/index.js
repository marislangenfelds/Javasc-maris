const choices = ["rock", "paper", "scissors"];
const playerdisplay = document.getElementById("playerdisplay");
const computerdisplay = document.getElementById("computerdisplay");
const resultdisplay = document.getElementById("resultdisplay");
const playerscoredisplay = document.getElementById("playerscoredisplay");
const compuuterscoredisplay = document.getElementById("compuuterscoredisplay");
let playerscore = 0;
let computerscore = 0;

function playgame (playerchoice){

    const computerchoice = choices[Math.floor (Math.random() * 3)];
    let result = "";

    if(playerchoice === computerchoice){
        result = "It's a tie!";

    }
    else{
        switch(playerchoice){
            case "rock":
                (computerchoice === "scissors") ? "you win" : "you lose";
                break;
            case "paper":
                    (computerchoice === "rock") ? "you win" : "you lose";
                    break;
            case "scisors":
                        (computerchoice === "paper") ? "you win" : "you lose";
                        break;


    }

}

playerdisplay.textContent = `Player: ${playerchoice}`;
computerchoice.textContent = `Computer: ${computerchoice}`;
resultdisplay.textContent = result;
}
