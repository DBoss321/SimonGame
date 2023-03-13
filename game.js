var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var index = -1;

// selects a color from the buttonColors array and 
// pushes in into the gamePattern array
function nextSequence(){
    userClickedPattern = [];
    randomNumber = Math.floor(Math.random()*3);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    level++;
    // choosing the button with same color
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
    $("h1").text("Level "+level);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
    $
}

$(".btn").click(function(){
    userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    console.log(userClickedPattern);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    
    checkAnswer(userClickedPattern.length-1);
})


function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

$(document).keypress(function(){
    started = false;
    if(!started){
        setTimeout(function(){
            nextSequence();
        },100);
        started = true;
    }
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
            console.log("Success");
            console.log(gamePattern);
            console.log(userClickedPattern);
        }
    }
    else{
        var gameOver = new Audio("sounds/wrong.mp3");
        gameOver.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over,Press any key to Restart");
        startOver();
    }
}

function startOver(){
    gamePattern = [];
    level = 0;
    started = false;
}