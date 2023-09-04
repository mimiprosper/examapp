const startBtn = document.querySelector(".start-btn button")
const ruleBox = document.querySelector(".rules-box");
const exitBtn = ruleBox.querySelector(".btns .exit")
const continueBtn = ruleBox.querySelector(".btns .again")
const quizBox = document.querySelector(".quiz-box")
const optionsList = document.querySelector(".options-list");
const timeCount = quizBox.querySelector(".timer .timer-sec")
const timeLine = quizBox.querySelector("header .time-line")

// if start button is clicked
startBtn.onclick = ()=>{
    ruleBox.classList.add("activeInfo"); // add the info box
}

// if exit button is clicked
exitBtn.onclick = ()=>{
    ruleBox.classList.remove("activeInfo"); // removes the info box
}

// if continue button is clicked
continueBtn.onclick = ()=>{
    ruleBox.classList.remove("activeInfo"); // removes the info box
    quizBox.classList.add("activeQuiz"); // add the quiz box
    showQuestion(0)
    queTotalCounter(1)
    startTimer(10)
    startTimerLine(0) 
}

let queCount = 0;
let queNum = 1
let counter;
let counterLine;
let timeValue = 10
let widthValue = 0
let userScore = 0

const nextBtn = quizBox.querySelector(".next-btn")
const resultBox = document.querySelector(".result-box")
const restartQuiz = resultBox.querySelector(".btns .again")
const quitQuiz = resultBox.querySelector(".btns .exit")

restartQuiz.onclick = ()=>{
    resultBox.classList.remove("activeResult")
    quizBox.classList.add("activeQuiz")
    let queCount = 0;
let queNum = 1
let timeValue = 10
let widthValue = 0
let userScore = 0
showQuestion(queCount);
        queTotalCounter(queNum)
        clearInterval(counter)
        startTimer(timeValue) 
        clearInterval(counterLine)
        startTimerLine(widthValue) 
    //    nextBtn.style.display = "none"
}
quitQuiz.onclick = ()=>{
    window.location.reload()
}

// if next btn clicked
nextBtn.onclick = ()=>{
    if (queCount < ques.length - 1){
        queCount++;
        queNum++;
        showQuestion(queCount);
        queTotalCounter(queNum)
        clearInterval(counter)
        startTimer(timeValue) 
        clearInterval(counterLine)
        startTimerLine(widthValue) 
    //    nextBtn.style.display = "none"
    }
    else{
        console.log("question complete")
        showResultBox()
    }

}


function showQuestion(index){
    const queText = document.querySelector(".que-text");
    let queTag = '<span>' + ques[index].numb + ". " + ques[index].question + '</span>'
    let optionTag = '<div class="option">' + ques[index].options[0] + '<span></span></div>'
                    + '<div class="option">' + ques[index].options[1] + '<span></span></div>'
                    + '<div class="option">' + ques[index].options[2] + '<span></span></div>'
                    + '<div class="option">' + ques[index].options[3] + '<span></span></div>'; 
    queText.innerHTML = queTag
    optionsList.innerHTML =  optionTag
    const option = optionsList.querySelectorAll(".option")
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
        
    }
}

    let tickIcon =' <div class="icon tick"><i class="fas fa-check"></i></div>'
    let crossIcon =  '<div class="icon cross"><i class="fas fa-xmark"></i></div>'


function optionSelected(answer) {
    clearInterval(counter)
    clearInterval(counterLine)
    let userAns = answer.textContent;
    let correctAns = ques[queCount].answer;
    let allOptions = optionsList.children.length
    if (userAns == correctAns) {
        userScore += 1
        console.log(userScore)
        answer.classList.add("correct")
    console.log("Answer is correct")
    answer.insertAdjacentHTML("beforeend", tickIcon)
    }
    else{
        answer.classList.add("incorrect")
    console.log("Answer is wrong")
    answer.insertAdjacentHTML("beforeend", crossIcon)

    }
    // if answer is incorrect, then chose the correct answer
    for (let i = 0; i < allOptions; i++) {
      if (optionsList.children[i].textContent == correctAns) {
        optionsList.children[i].setAttribute("class", "option correct");
        optionsList.children[i].insertAdjacentHTML("beforeend", tickIcon)
      } 
         
}

// once user selected, disable all other options
for (let i = 0; i < allOptions; i++) {
    optionsList.children[i].classList.add("disabled");

 }
 nextBtn.style.display = "block"

}

 function showResultBox(){
    ruleBox.classList.remove("activeInfo"); // removes the info box
    quizBox.classList.remove("activeQuiz"); // remove the quiz box
    resultBox.classList.add("activeResult"); // add the result box
    const scoreText = resultBox.querySelector(".score-text")
    if (userScore > 35) {
        let scoreTag = '<span>congrats! you scored <p> '+ userScore +' </p>out of <p> '+ ques.length +' </p></span>'
         scoreText.innerHTML = scoreTag
    }

    else if(userScore > 20){
        let scoreTag = '<span>nice, you scored <p> '+ userScore +' </p>out of <p> '+ ques.length +' </p></span>'
         scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = '<span>Sorry you scored <p> '+ userScore +' </p>out of <p> '+ ques.length +' </p></span>'
         scoreText.innerHTML = scoreTag
    }
 }


function startTimer(time) {
    counter = setInterval(timer, 1000)
    function timer() {
        timeCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.textContent 
            timeCount.textContent = "0" + addZero
        }
        if (time < 0) {
            clearInterval(counter)
        timeCount.textContent = "00";
        }
    }
}
function startTimerLine(time) {
    counterLine = setInterval(timer, 20)
    function timer(){
        time += 1;
        timeLine.style.width = time + "px";
        if (time > 549) {
            clearInterval(counterLine)
        }
    }
}


function queTotalCounter(index){
    const bottomCounter = quizBox.querySelector(".que-total")
    let queTotal =  '<span><p>'+ index +'</p>of<p>'+ ques.length +'</p>Questions</span>';
    bottomCounter.innerHTML = queTotal;
}
