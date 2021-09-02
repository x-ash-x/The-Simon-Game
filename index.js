var gamePattern = []
var colors = ['red','blue','green','yellow']
var userPattern = []
var level = 0;
var gameStarted = false;
var highScore = 0;


// $(document).keydown(function (){
//     if (!gameStarted) {
//         $("h2").text("Level " + level);
//         nextSequence();
//         gameStarted= true;
//     }
// })

$("button").click(function (){
    if (!gameStarted) {
        $("button").text("Level " + level);
        nextSequence();
        gameStarted= true;
    }
})

$(".btn").click(function (event){
    var userChosenColor = event.target.id;
    animatePress(userChosenColor);
    playSound("sounds/"+userChosenColor+".mp3");
    userPattern.push(userChosenColor);
    console.log(userPattern);
    console.log(gamePattern)
    checkAnswer(userPattern.length-1);
})




function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userPattern[currentLevel]){
        if(userPattern.length===gamePattern.length){
            setTimeout(function (){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("sounds/wrong.mp3")
        $("body").removeClass("bg-dark text-white");
        $("body").addClass("game-over");
        $("button").text("Game Over, Press here to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
            $("body").addClass("bg-dark text-white")
        }, 200);
        startOver();
    }
}

function playSound(color){
    var audio = new Audio(color);
    audio.play();
}

//animation
function animatePress(currentColour){
    $("."+currentColour).addClass("pressed-"+currentColour);
    setTimeout(()=>{
        $("."+currentColour).removeClass("pressed-"+currentColour);
    },100);
}

function nextSequence(){

    userPattern = [];
    level++;
    if(level*100>highScore)
        highScore = level*100 -100;
    $("button").text("Level "+level);
    $("h3").text("High Score : "+highScore);
    var randomNumber = Math.floor(Math.random()*4);
    var randomColor = colors[randomNumber];

    gamePattern.push(randomColor);
    $("."+randomColor).fadeOut(100).fadeIn(100);
    // animatePress(randomColor)
    playSound("sounds/"+randomColor+".mp3");
}

function startOver(){
    level = 0;
    gamePattern = [];
    gameStarted = false;
}


