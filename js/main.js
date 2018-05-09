var app = (function (){
    function getQuestions(callback) {
    var serverData = [
        {
            question: 
                { 
                    id: 1, text: '¿Capital de Honduras?' 
                },
            answers: [
                        { 
                            id: 1, text: 'Tegucigalpa' 
                        }, 
                        { 
                            id: 2, text: 'Lima' 
                        }, 
                        { 
                            id: 3, text: 'Buenos Aires' 
                        }
                    ],
            correctAnswerId: 1
        },
        {
            question: 
                {
                 id: 2, text: 'Rio que pasa por Toledo' 
                },
            answers: [
                        { 
                            id: 4, text: 'Miño' 
                        }, 
                        { 
                            id: 5, text: 'Tajo' 
                        }, 
                        { 
                            id: 6, text: 'Duero' 
                        }
                    ],
            correctAnswerId: 5
        },
        {
            question: 
                { 
                    id: 3, text: 'Color Bandera de Argentina' 
                },
            answers: [
                        { 
                            id: 7, text: 'Rojo Blanco' 
                        }, 
                        { 
                            id: 8, text: 'Blanco y Verde' 
                        }, 
                        {
                            id: 9, text: 'Azul Blanco Azul' 
                            }
                    ],
            correctAnswerId: 9
        },
        {
            question: 
                { 
                    id: 3, text: '¿Quién pintó la capilla sixtina?' 
                },
            answers: [
                        { 
                            id: 7, text: 'Picasso' 
                        }, 
                        { 
                            id: 8, text: 'Velazquez' 
                        }, 
                        {
                            id: 9, text: 'Miguel Angel' 
                            }
                    ],
            correctAnswerId: 9
        },
    ]
    callback(serverData);
}

var questions = [];
var questionObtained;
    var btnNext = document.getElementById('btn-next');

getQuestions(function (data) {
    questions = data;
    /*...*/
});

function getQuestionRamdon(){
    var randomPosition = Math.floor(Math.random()* questions.length);
    var questionToGet = questions[randomPosition];
    questions.splice(randomPosition, 1);
    return questionToGet;
}

function paintQuestions () {
    questionObtained = getQuestionRamdon();
    var titleOfQuestionObtained = questionObtained.question.text;
    var anwersOfQuestionObtained = questionObtained.answers;
    var idOfQuestionObtained = questionObtained.question.id;
    var listOfAnswersContainer = '';

    document.getElementById('preguntas').innerHTML = titleOfQuestionObtained;
    for (var i = 0; i < anwersOfQuestionObtained.length; i++) {
        var itemListDefinition = '<li><input id= "item-' + i + '" name = "answers" type="radio" required value = "' + anwersOfQuestionObtained[i].id + '">' + anwersOfQuestionObtained[i].text + ' </li>';
        listOfAnswersContainer += itemListDefinition;
       
    }
    document.getElementById('listaRespuestas').innerHTML = listOfAnswersContainer;
   
}

function getInputValueAndCompare(target) {
    var inputValueOfAnswer = target.value;
    var correctAnswerId = questionObtained.correctAnswerId;
    compareAnswers (correctAnswerId, inputValueOfAnswer);  
    
}

function preventNextQuestion (targetRadio) {
    if (targetRadio.checked) {
        btnNext.disabled = false;
    }
    else{
        btnNext.disabled = true;
    }
}

function handleEvents(event) {
    var target = event.target;
    getInputValueAndCompare(target);
    preventNextQuestion(target);
}

function compareAnswers (answerCorrect, answerOfUser){
    if (answerCorrect == answerOfUser) {
        isCorrect();
    }
    if (answerCorrect != answerOfUser) {
        isIncorrect();
    }
}
function isCorrect() {
    return console.log('Correcto');        
    
}
function isIncorrect() {
    return console.log('Incorrecto!'); 
}

function startApp() {
    paintQuestions();

    var seconds = 0;
    timer = null;
  
    startTimer();

    function setTimeAndConditions() {
        seconds++;
        console.log(seconds);
        if (btnNext.disabled === true) {
            console.log('con botón desabilitado');
            if (questions.length > 0 && seconds > 5) {
                paintQuestions();
                seconds = 0;
            } 
            if (questions.length === 0) {
                stopTimer();
            }
        }
    }
    
    function startTimer() {
        if (!timer) {
            timer = setInterval(setTimeAndConditions, 1000);            
        }
    }

    function stopTimer() {
        if (timer) {
            clearInterval(timer);
            timer = null;
            seconds = 0;
        }
    }
    if (btnNext.disabled === true) {
        console.log('hola');
    }

}

window.onload = function () {

    btnNext.disabled = true;

    startApp();
   
    document.miformulario.addEventListener('click', handleEvents);
    btnNext.addEventListener('click', paintQuestions);
};




// function recalculateWhenNoAnswer(score, seconds){
//     if (seconds === ''){
//         return score - 2;
//     }
//     if (seconds > 20){
//         return score - 3;
//     }
// }

// function recalculateScoreWhenIsCorrect(score, seconds){
//     if (seconds <= 2){
//         return score + 2;
//     }
//     if (seconds >= 2 && seconds < 10){
//         return ++score;
//     }
//     if (seconds > 10){
//         return score;
//     }
// }

// function recalculateScoreWhenIsIncorrect(score, seconds){
//     if (seconds > 10){
//         return score - 2;
//     }
//     if (seconds <= 10){
//         return score - 1;
//     }
// }
    return {
        getQuestionRamdon: getQuestionRamdon,
        paintQuestions: paintQuestions,
        getInputValueAndCompare: getInputValueAndCompare
        
    };
})();


