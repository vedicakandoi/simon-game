let buttonColors = ["red","blue","green","yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;
function nextSequence() {
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level += 1;
    $("#level-title").text("Level " + level);
}
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}
function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]) {
        if(currentLevel==gamePattern.length-1) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key To Restart")
        startOver();
    }
}
function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
    userClickedPattern = [];
}
$(document).keypress(function() {
    if (!started) {
        nextSequence();
        $("#level-title").text("Level " + level);
        started = true;
    } 
});
$(".btn").on("click",function(){
    let userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})