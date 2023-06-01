// Sequence Array
const buttonColor = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

// Game Start
$(document).keypress(function () {
if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Color Sound
function colorSound(colorPlaying){
    var audio = new Audio("sounds/" + colorPlaying + ".mp3");
    audio.play();
};

// Game Sequence
function nextSequence(){
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColor[randomNumber];
    $("." + randomChosenColour).animate({opacity: 0}).animate({opacity: 1});
    gamePattern.push(randomChosenColour);
    colorSound(randomChosenColour);
    level++;
    $("h1").text("Level " + level);
    userClickedPattern = [];
};

// User Selected Color
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    colorSound(userChosenColour);
    colorFlash(userChosenColour)
    checkAnswers(userClickedPattern.length - 1)
});

// Color Flash
function colorFlash(colorPlaying){
    $("#" + colorPlaying).addClass("pressed");
    setTimeout(function () {
        $("#" + colorPlaying).removeClass("pressed");
    }, 100);
};

// Check answers
function checkAnswers(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence()
            }, 500);
        }
    } else {
        let wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 300);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOVer();
        }
    };
    
//Restart Game
function startOVer() {
    level = 0;
    gamePattern = [];
    started = false;
}

$("button").click(function () {
    if ($("body").hasClass("light")) {
        $("body").removeClass("light");
        $("button").removeClass("light");
    } else {
        $("body").addClass("light")
        $("button").addClass("light")
   }
})




