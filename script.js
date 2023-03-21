const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userInputPattern = [];
let randomChosenColour;
const gameOver = function () {
    $("body").addClass("game-over");
    setTimeout(() => { $("body").removeClass("game-over"); }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    gamePattern = [];
    userInputPattern = [];
    randomChosenColour = undefined;
}
const nextSequence = function () {
    let lvl_title = $("#level-title").text();
    let current_level = parseInt(lvl_title[lvl_title.length - 1]) + 1;
    $("#level-title").text("Level " + current_level);
    let randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    animateButton(randomChosenColour);
    gamePattern.push(randomChosenColour);
    userInputPattern = [];
};

const animateButton = async function (button) {
    await $("#" + button).fadeOut(150).fadeIn(150);
};

const makeSound = function (input) {
    let audio = new Audio("sounds\\" + input + ".mp3");
    audio.play();
}

const checkAnswer = function (currentLevel) {
    if (userInputPattern[currentLevel] === gamePattern[currentLevel])
        return "Success";
    else
        return "Wrong";
}

$(".btn").click(async function (e) {
    e.preventDefault();
    userInput = e.currentTarget.id;
    userInputPattern.push(userInput);
    $("#" + userInput).addClass("pressed");
    makeSound(userInput);
    setTimeout(() => { $("#" + userInput).removeClass("pressed"); }, 100);
    if (userInputPattern.length < gamePattern.length) {
        let ans = checkAnswer(userInputPattern.length - 1);
        if (ans === "Wrong") {
            gameOver();
        }
    }
    else if (userInputPattern.length === gamePattern.length) {
        let ans = checkAnswer(userInputPattern.length - 1);
        if (ans === "Success") {
            await setTimeout(() => { nextSequence() }, 100);
        }
    }
    else {
        gameOver();
    }
});

$(document).keypress(function (e) {
    const text = $("#level-title").text();
    if (text === "Press A Key to Start" || text === "Game Over, Press Any Key to Restart") {
        $("#level-title").text("Level 0");
        nextSequence();
    }
});
