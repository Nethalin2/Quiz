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
        question: "In HTML, which attribute is used to specify that an input field must be filled out?",
        imgSrc : "img/html.png",
        choiceA : "required",
        choiceB : "placeholder",
        choiceC : "validate",
        correct: "A"
    },{
        question: "Where in an HTML document is the correct place to refer to an external style sheet?",
        imgSrc : "img/css.png",
        choiceA : "In the head section",
        choiceB : "At the end of the document",
        choiceC : "In the body section",
        correct: "A"

    },{
        question: "JavaScript is the same as Java",
        imgSrc : "img/js.png",
        choiceA : "Its similar but not the same",
        choiceB : "True",
        choiceC : "False",
        correct: "C"
    },{
        question: "Is JS a Truthy Language?",
        imgSrc : "img/js.png",
        choiceA : "Only on tuesdays",
        choiceB : "No",
        choiceC : "Yes",
        correct: "C"

    } ,{
        question: "Who is making Web standards?",
        imgSrc : "img/html.png",
        choiceA : "The World Wide Web Consortium",
        choiceB : "Microsoft",
        choiceC : "Google",
        correct: "A"

    },{
        question: "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?",
        imgSrc : "img/html.png",
        choiceA : "title",
        choiceB : "src",
        choiceC : "alt",
        correct: "C"

    },{
        question: "In HTML, onblur and onfocus are",
        imgSrc : "img/html.png",
        choiceA : "Style attributes",
        choiceB : "Event attributes",
        choiceC : "HTML elements",
        correct: "B"

    },{
        question: "The HTML canvas is used to:",
        imgSrc : "img/html.png",
        choiceA : "create draggable elements",
        choiceB : "draw graphics",
        choiceC : "manipulate data in MySQL",
        correct: "B"

    },{
        question: "How to write an IF statement in JavaScript?",
        imgSrc : "img/js.png",
        choiceA : "if i = 5",
        choiceB : "if i == 5 then",
        choiceC : "if (i == 5)",
        correct: "C"
        

    },{
        question: "Which event occurs when the user clicks on an HTML element?",
        imgSrc : "img/js.png",
        choiceA : "onclick",
        choiceB : "onchange",
        choiceC : "onmouseclick",
        correct: "A"
    }, {
        question: "How do you find the number with the highest value of x and y?",
        imgSrc : "img/js.png",
        choiceA : "ceil(x, y)",
        choiceB : "Math.max(x, y) ",
        choiceC : "Math.ceil(x, y)",
        correct: "B"
    }, {
        question: "Which HTML attribute is used to define inline styles?",
        imgSrc : "img/css.png",
        choiceA : "Styles",
        choiceB : "Style",
        choiceC : "Font",
        correct: "B"
    }, { 
        question: "Which property is used to change the background color?",
        imgSrc : "img/css.png",
        choiceA : "background-color",
        choiceB : "bgcolor",
        choiceC : "color",
        correct: "A"
    },{
        question: "Which CSS property is used to change the text color of an element?",
        imgSrc : "img/css.png",
        choiceA : "text-color",
        choiceB : "color",
        choiceC : "fgcolor",
        correct: "B"
    },{
        question: "Which CSS property controls the text size??",
        imgSrc : "img/css.png",
        choiceA : "font-size",
        choiceB : "text-size",
        choiceC : "text-style",
        correct: "A"
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