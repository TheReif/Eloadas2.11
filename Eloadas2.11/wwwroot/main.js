window.onload = () => {
    fetch('/questions/1')
        .then(response => response.json())
        .then(data => kérdésMegjenítés()
         );
};

var jóVálasz;
var questionId = 4;
var hotList = [];
var questionsInHotList = 3;
var displayedQuestion;
var numberOfQuestions;
var nextQuestion = 1;
function kérdésMegjenítés() {
    let kérdés = hotlist[displayedQuestion].question1;
    if (!kérdés) return;
    console.log(kérdés);
    document.getElementById("kérdés_szöveg").innerText = kérdés.question1
    document.getElementById("válasz1").innerText = kérdés.answer1
    document.getElementById("válasz2").innerText = kérdés.answer2
    document.getElementById("válasz3").innerText = kérdés.answer3
    //document.getElementById("kép").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
    jóVálasz = kérdés.correctAnswer;
    if (kérdés.image) {
        document.getElementById("kép").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
        document.getElementById("kép").classList.remove("rejtett")
    }
    else {
        document.getElementById("kép").classList.add("rejtett")
    }
    
    document.getElementById("válasz1").classList.remove("jó", "rossz");
    document.getElementById("válasz2").classList.remove("jó", "rossz");
    document.getElementById("válasz3").classList.remove("jó", "rossz");
}
/*function kérdésBetöltés(id) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
                //kérdésMegjelenítés(response.json())
            }
        })
        .then(data => kérdésMegjenítés(data));
*/

function kérdésBetöltés(questionNumber,destination) {
    fetch(`/questions/${questionNumber}`)
        .then(result => {
            if (!result.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return result.json()
                //kérdésMegjelenítés(response.json())
            }
        })
        //.then(data => kérdésMegjenítés(data));
    .then(
        q => {
            hotList[destination].question = q;
            hotList[destination].goodAnswers = 0;
            console.log(`A ${questionNumber}. kérdés letöltve a hot lost ${destination}. helyére`)
            if (displayedQuestion == undefined && destination == 0) {
                displayedQuestion = 0;
                kérdésMegjenítés();
            }
        }
    );
}
function előre() {
    /*questionId++;
    kérdésBetöltés(questionId)*/
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kérdésMegjenítés()
}

function vissza() {
    questionId--;
    kérdésBetöltés(questionId)
}

window.onload = function (e) {
    console.log("Oldal betöltve...");
    document.getElementById("előre_gomb").onclick = előre;
    document.getElementById("vissza_gomb").onclick = vissza;
    kérdésBetöltés(questionId)
}
function választás(n) {
    if (n != jóVálasz) {
        document.getElementById(`válasz${n}`).classList.add("rossz");
        document.getElementById(`válasz${jóVálasz}`).classList.add("jó");
    }
    else {
        document.getElementById(`válasz${jóVálasz}`).classList.add("jó");
    }
}

function kiíratás(lista) {
    console.log(lista)
    for (var i = 0; i < lista.length; i++) {
        let újElem = document.createElement("div");
        újElem.innerText = lista[i];
        document.getElementById("eredmeny").appendChild(újElem);
        ;
    }
}
function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = q;
    }

    
    for (var i = 0; i < questionsInHotList; i++) {
        kérdésBetöltés(nextQuestion, i);
        nextQuestion++;
    }
}




