//select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer"); 

//create our questions
let questions = [
    {
        question: "What does HTML stand for?",
        imgSrc : "img/html.png",
        choiceA : "Hyper Text Markup Language",
        choiceB : "Host Technology Makeup Light",
        choiceC : "Hyper Time Medium Listener",
        correct: "A"
    },{
        question: "What does CSS stand for?",
        imgSrc : "img/css.png",
        choiceA : "Cider Sample Season",
        choiceB : "Cascading Style Sheets",
        choiceC : "Cruising Speed Sounds",
        correct: "B"

    },{
        question: "What does JS stand for?",
        imgSrc : "img/js.png",
        choiceA : "JamSlice",
        choiceB : "JingleSleigh",
        choiceC : "JavaScript",
        correct: "C"
    },{
        question: "Is JS a Truthy Language?",
        imgSrc : "img/js.png",
        choiceA : "Only on tuesdays",
        choiceB : "No",
        choiceC : "Yes",
        correct: "C"

    }

]



//create some variables
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

//render a question
const renderQuestion = () => {
    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}


console.log(start)

const startQuiz = () => {
start.style.display = "none";
renderQuestion();
quiz.style.display = "block";
renderProgress();
renderCounter();
TIMER = setInterval(renderCounter,1000);
}

start.addEventListener("click",startQuiz);

//render progress

const renderProgress = () => {
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

const renderCounter = () => {
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

const checkAnswer = (answer) => {
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

const answerIsCorrect = () => {
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
const  answerIsWrong = () => {
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}


const scoreRender = () => {
    scoreContainer.style.display = "block";
    let scorePerCent = Math.round(100 * score / questions.length);
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" : "img/1.png";

    scoreContainer.innerHTML = "<img src=" +img +"><p>" + scorePerCent + "%</p>";         

}