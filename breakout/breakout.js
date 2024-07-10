//ramis,mainigie
let board; 
let boardWidth = 500;  //ramja izmeri 
let boardHeight = 500;
let context; // mainigais 

//mainigie,kustigais kubiks
let playerWidth = 80; //500 prieks testa bet mans izveletais 80
let playerHeight = 10;
let playerVelocityX = 10; //lauj kusteties par 10 pikseliem,izmanto tikai x jo tas kustesies tikai pa x asi

let player = { //speletaja objekts
    x : boardWidth/2 - playerWidth/2,  //sadalu tos ar 2 jo tas nem izmerus no malas lidz malai un kustigasi kubiks butu novirzits pa labi
    y : boardHeight - playerHeight - 5,  // -5 lai kustigais kubiks butu nedaudzz vits canvas ramja
    width: playerWidth,
    height: playerHeight,
    velocityX : playerVelocityX
}

//bumba
let ballWidth = 10;
let ballHeight = 10;
let ballVelocityX = 3; //15 for testing, 3 normal
let ballVelocityY = 2; //10 for testing, 2 normal

let ball = {
    x : boardWidth/2,
    y : boardHeight/2,
    width: ballWidth,
    height: ballHeight,
    velocityX : ballVelocityX,
    velocityY : ballVelocityY
}

//bloks
let blockArray = [];
let blockWidth = 50;
let blockHeight = 10;
let blockColumns = 8; 
let blockRows = 3; //pievieno vairak kad spele turpinas
let blockMaxRows = 10; //ierobezojums rindam
let blockCount = 0;

//starts augseja kreisaja sturi,korekcijas
let blockX = 15;
let blockY = 45;

let score = 0;
let gameOver = false;

window.onload = function() { 
    board = document.getElementById("board"); //ar so sasaista rami un canvu lai tur varetu zimet 
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //so izmanto lai zimetu ieks ramja 

    //uzzime sakotnejo speletaju
    context.fillStyle="skyblue";
    context.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(update);// izsaucu animacijas ciklu
    document.addEventListener("keydown", movePlayer);//notikumu klausitajs,klavieturas poga,pievieno funkciju move player

    //create blocks
    createBlocks();
}

function update() {   //funcikas definicija 
    requestAnimationFrame(update); //saja bridi canva jau darbojas ta parzime visu bez apstajas tikai to vel neredz
    //beigt zimet 
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height); // ar so tiek nodzests ieprieksejais kustigais kubiks un uzzimets jauna vieta,atkarigs uz kuru pusi tika kustinats pa labi vai kreisi

    // speletajs
    context.fillStyle = "lightgreen";
    context.fillRect(player.x, player.y, player.width, player.height);

    // bumba
    context.fillStyle = "white";  //bumbas novietojums dalits ar 2 x,y asij lai butu centra 
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    //ja bumba atsitas pret kustigo kubiku
    if (topCollision(ball, player) || bottomCollision(ball, player)) {
        ball.velocityY *= -1;   // pagriez y virzienu uz augšu vai uz leju
    }
    else if (leftCollision(ball, player) || rightCollision(ball, player)) {
        ball.velocityX *= -1;   // pagriez x virzienā pa kreisi vai pa labi
    }

    if (ball.y <= 0) { 
        // ja bumba pieskaras canvas ramim
        ball.velocityY *= -1; //apgriez virzienu
    }
    else if (ball.x <= 0 || (ball.x + ball.width >= boardWidth)) {
        // ja bumba pieskaras labajam vai kreisajam canvas ramim
        ball.velocityX *= -1; //apgriez virzienu
    }
    else if (ball.y + ball.height >= boardHeight) {
        // ja bumba pieskaras canvas apaksai,seko game over un izlec press space
        context.font = "20px sans-serif";
        context.fillText("Game Over: Press 'Space' to Restart", 80, 400);
        gameOver = true;
    }

    //bloks
    context.fillStyle = "skyblue";
    for (let i = 0; i < blockArray.length; i++) {
        let block = blockArray[i];
        if (!block.break) {
            if (topCollision(ball, block) || bottomCollision(ball, block)) {
                block.break = true;     // bloks pazud
                ball.velocityY *= -1;   // maina y virzienu uz augsu vai leju
                score += 100;
                blockCount -= 1;
            }
            else if (leftCollision(ball, block) || rightCollision(ball, block)) {
                block.break = true;     // bloks pazud
                ball.velocityX *= -1;   // maina x virzienu 
                score += 100;
                blockCount -= 1;
            }
            context.fillRect(block.x, block.y, block.width, block.height);
        }
    }

    //nakamais limenis
    if (blockCount == 0) {
        score += 100*blockRows*blockColumns; //bonusa punkti
        blockRows = Math.min(blockRows + 1, blockMaxRows);
        createBlocks();
    }

    //rezultats
    context.font = "20px sans-serif";
    context.fillText(score, 10, 25);
}

function outOfBounds(xPosition) {  //sis zino1s vai speletajs ir izgais arpus ramja vai ne
    return (xPosition < 0 || xPosition + playerWidth > boardWidth);
}

function movePlayer(e) {
    if (gameOver) {
        if (e.code == "Space") {
            resetGame();
            console.log("RESET");
        }
        return;
    }
    if (e.code == "ArrowLeft") {
        // player.x -= player.velocityX;
        let nextplayerX = player.x - player.velocityX;
        if (!outOfBounds(nextplayerX)) {
            player.x = nextplayerX;
        }
    }
    else if (e.code == "ArrowRight") {
        let nextplayerX = player.x + player.velocityX;  //sis nelauj kustigajam kubikam (atsitejam) iziet arpus ramja 
        if (!outOfBounds(nextplayerX)) {
            player.x = nextplayerX;
        }
        // player.x += player.velocityX;    
    }
}

function detectCollision(a, b) {   // starp diviem taisnsturiem a un b
    return a.x < b.x + b.width &&   //a's augsejais kreisasis sturis nesasniedz b's augsejo labo sturi
           a.x + a.width > b.x &&   //a's augsejais labais sturis sasniedz b's augsejo kreisi sturi
           a.y < b.y + b.height &&  //a's augsejais kreisais sturis nesasniedz b's apaskejo kreiso sturi
           a.y + a.height > b.y;    //a's apaksejais kreisais sturis sasniedz b's augsejo reiso sturi
}

function topCollision(ball, block) { //a ir virs b (bumba ir virs (nekustiga) bloka)
    return detectCollision(ball, block) && (ball.y + ball.height) >= block.y;
}

function bottomCollision(ball, block) { //a ir virs b (bumba ir zem bloka)
    return detectCollision(ball, block) && (block.y + block.height) >= ball.y;
}

function leftCollision(ball, block) { //a ir pa kreisi no b (bumba ir pa kreisi no bloka)
    return detectCollision(ball, block) && (ball.x + ball.width) >= block.x;
}

function rightCollision(ball, block) { //a ir pa labi no b (bumba ir pa labi no bloka)
    return detectCollision(ball, block) && (block.x + block.width) >= ball.x;
}

function createBlocks() {
    blockArray = []; //!
    for (let c = 0; c < blockColumns; c++) {
        for (let r = 0; r < blockRows; r++) {
            let block = {
                x : blockX + c*blockWidth + c*10, //c*10 attalums 10 pikselu atstrpe starp kolonam
                y : blockY + r*blockHeight + r*10, //r*10 atstarpe 10 pixelu atstarpe starp rindam
                width : blockWidth,
                height : blockHeight,
                break : false
            }
            blockArray.push(block);
        }
    }
    blockCount = blockArray.length;
}

function resetGame() {
    gameOver = false;
    player = {
        x : boardWidth/2 - playerWidth/2,
        y : boardHeight - playerHeight - 5,
        width: playerWidth,
        height: playerHeight,
        velocityX : playerVelocityX
    }
    ball = {
        x : boardWidth/2,
        y : boardHeight/2,
        width: ballWidth,
        height: ballHeight,
        velocityX : ballVelocityX,
        velocityY : ballVelocityY
    }
    blockArray = [];
    blockRows = 3;
    score = 0;
    createBlocks();
}
