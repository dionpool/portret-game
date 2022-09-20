const brands = [
    {
        iconName: "elske-de-wall",
        brandName: "Geboren in Feanwâlden en woont nu in Leeuwarden. Ze heeft een zoon uit een eerdere relatie en samen met haar vriend Appie heeft ze een dochter. Elske is zangeres. Ze voelt zich bevoorrecht dat ze van haar passie haar werk heeft kunnen maken. “Ik ben er trots op dat ik Fries ben. Van huis uit ben ik Fries opgevoed en ik spreek ook Fries met mijn kinderen. Voor mij is dat vanzelfsprekend. Zo geef ik mijn Friese roots aan hen door. Ook in mijn werk ben ik me vaak bewust dat ik Fries ben. Mensen vinden Fryslân vaak ver weg, maar vaak vinden ze het ook leuk dat ik Fries ben.",
        color: "#ff0000"
    },
    {
        iconName: "joop-dijkstra",
        brandName: "Als dj Quickfinger draait hij al jaren muziek in Franeker en omstreken. Joop is eigenaar van Planetenpils, een Franeker bier waarvan de naam gebaseerd is op het Planetarium. Daarnaast is Joop schoenmaker. Joop is een geboren en getogen Fries. “Wat mij een echte Fries maakt, is dat ik open sta voor iedereen. Ik maak graag een praatje wat resulteert in lang boodschappen doen en met een paar dingetjes weer thuiskomen. De mooie Friese luchten en de rust die je hier nog steeds vindt, maakt me toch wel gelukkig.",
        color: "#fd5c63"
    },
    {
        iconName: "piter-wilkens",
        brandName: "Hij is geboren op 26 augustus 1959 in Leeuwarden. Met het maken van muziek verdient hij zijn brood en hij woont al bijna zijn hele leven in Marsum. “Ik voel me Fries door een sterke band met mijn voorouders, allemaal Friezen en Friestaligen of Stadsfries Sprekers. Het zit hem vooral in de taal. Als ik mooi Fries hoor of lees, dan raakt me dat. Fryslân heeft een rijke historie en een eigen gezicht en dat is mooi, maar het is toch vooral het besef dat je als geboren Fries al veel vóór hebt op anderen als het om geluk gaat.",
        color: "#333333"
    },
    {
        iconName: "frederique-kleefstra",
        brandName: "Geboren in Mildam en woont momenteel met haar hondje Lulu bij haar oma in Oudeschoot. In het dagelijks leven verzorgt ze allerlei dieren en begeleidt ze mensen met een beperking. Ze is een DragonGirl en treedt op met onder andere vuurdansen en vuurspuwen. Daarnaast speelt ze in een band, rijdt ze paard en doet ze aan yoga. Ik kom graag bij de ijshockeywedstrijden van de UNIS Flyers en bij het voetbal van mijn club sc Heerenveen. Ik hou van de Friese muziek. Het leukste vind ik, dat als je naar een festival buiten Fryslân gaat, je meteen de andere Friezen vindt, omdat iedere Fries trots met de Friese vlag staat te zwaaien.",
        color: "#a4c639"
    },
    {
        iconName: "arjen-rusticus",
        brandName: "Op 1974 wordt Arjen Rusticus geboren in Leeuwarden. Na de overname van zijn Grandcafe De Walrus houdt hij zich nu vooral bezig met het opzetten van nieuwe bedrijven. Over zijn jeugd is hij ook erg te spreken, samen met zijn zus heeft hij allemaal avonturen beleefd. Als ik de borden “Wolkom yn Fryslan” lees weet ik dat ik weer thuis ben! Er zijn zoveel pareltjes in Friesland waar niemand wat van weet dus het is het zeker waard om een keer op onderzoek te gaan.",
        color: "#a4c639"
    },
    {
        iconName: "alexander-burger",
        brandName: "We starten in Heerenveen, hier wordt Alexander Burger geboren. De helft van zijn roots liggen in Friesland want zijn moeder is hier ook geboren en getogen. Alexander is een filmmaker en zorgt voor veel voice-overs bij verschillende opdrachtgevers. Zijn kinderjaren doorgebracht te hebben in ‘It Lege Midden’ waar hij veel speelde op de boerderij van een vriendinnetje.",
        color: "#a4c639"
    },
    {
        iconName: "gerrit-harman-rypstra",
        brandName: "Dit verhaal gaat over een echte friese bierbrouwer, Gerrit Harman Rypstra! Door Middel van bierbrouwen probeert gerrit het verhaal van friesland te vertellen. Elk biertje heeft een ander verhaal en vertelt wat over de geschiedenis van Friesland. Denken, doen en spreken in het Fries! “Ik voel mij wel een beetje de ambassadeur van de Friese taal, ik wil laten zien dat Fries modern en hip kan zijn.”",
        color: "#a4c639"
    },
    {
        iconName: "tiny-hoekstra",
        brandName: "Ons verhaal begint in Dokkum in het jaar 1996, dit jaar wordt Tiny Hoekstra geboren. Vandaag de dag woont ze in Amsterdam. Hier voetbalt ze voor Ajax sinds 2021. Geboren en getogen in friesland maakt Tiny een echte fries. “Vloeiend de friese taal beheren en mijn nuchterheid zijn twee aspecten die mij echt fries maken.” Ik vind het helemaal mooi hier in amsterdam zegt ze, maar friesland, waar al mijn vrienden en familie wonen, is toch wel echt thuis!",
        color: "#a4c639"
    },
];

let correct = 0;
let total = 0;
const totalDraggableItems = 4;
const totalMatchingPairs = 4; // Should be <= totalDraggableItems

const scoreSection = document.querySelector(".score");
const correctSpan = scoreSection.querySelector(".correct");
const totalSpan = scoreSection.querySelector(".total");
const playAgainBtn = scoreSection.querySelector("#play-again-btn");

const draggableItems = document.querySelector(".draggable-items");
const matchingPairs = document.querySelector(".matching-pairs");
let draggableElements;
let droppableElements;

initiateGame();

function initiateGame() {
    const randomDraggableBrands = generateRandomItemsArray(totalDraggableItems, brands);
    const randomDroppableBrands = totalMatchingPairs<totalDraggableItems ? generateRandomItemsArray(totalMatchingPairs, randomDraggableBrands) : randomDraggableBrands;
    const alphabeticallySortedRandomDroppableBrands = [...randomDroppableBrands].sort((a,b) => a.brandName.toLowerCase().localeCompare(b.brandName.toLowerCase()));

    // Create "draggable-items" and append to DOM
    for(let i=0; i<randomDraggableBrands.length; i++) {
        draggableItems.insertAdjacentHTML("beforeend", `
            <img class="draggable" src="img/${randomDraggableBrands[i].iconName}.png" draggable="true" id="${randomDraggableBrands[i].iconName}">
        `);
    }

    // Create "matching-pairs" and append to DOM
    for(let i=0; i<alphabeticallySortedRandomDroppableBrands.length; i++) {
        matchingPairs.insertAdjacentHTML("beforeend", `
        <div class="matching-pair">
            <span class="label">${alphabeticallySortedRandomDroppableBrands[i].brandName}</span>
            <span class="droppable" data-brand="${alphabeticallySortedRandomDroppableBrands[i].iconName}"></span>
        </div>
        `);
    }

    draggableElements = document.querySelectorAll(".draggable");
    droppableElements = document.querySelectorAll(".droppable");

    draggableElements.forEach(elem => {
        elem.addEventListener("dragstart", dragStart);
        // elem.addEventListener("drag", drag);
        // elem.addEventListener("dragend", dragEnd);
    });

    droppableElements.forEach(elem => {
        elem.addEventListener("dragenter", dragEnter);
        elem.addEventListener("dragover", dragOver);
        elem.addEventListener("dragleave", dragLeave);
        elem.addEventListener("drop", drop);
    });
}

// Drag and Drop Functions
// Events fired on the drag target
function dragStart(event) {
    event.dataTransfer.setData("text", event.target.id); // or "text/plain"
}

// Events fired on the drop target
function dragEnter(event) {
    if(event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
        event.target.classList.add("droppable-hover");
    }
}

function dragOver(event) {
    if(event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
        event.preventDefault();
    }
}

function dragLeave(event) {
    if(event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
        event.target.classList.remove("droppable-hover");
    }
}

function drop(event) {
    event.preventDefault();
    event.target.classList.remove("droppable-hover");

    const draggableElementBrand = event.dataTransfer.getData("text");
    const droppableElementBrand = event.target.getAttribute("data-brand");
    const isCorrectMatching = draggableElementBrand===droppableElementBrand;
    
    total++;

    if(isCorrectMatching) {
        const draggableElement = document.getElementById(draggableElementBrand);
        event.target.classList.add("dropped");
        draggableElement.classList.add("dragged");
        draggableElement.setAttribute("draggable", "false");
        event.target.innerHTML = `<img src="img/${draggableElementBrand}.png">`;
        correct++;  
    }

    scoreSection.style.opacity = 0;

    setTimeout(() => {
        correctSpan.textContent = correct;
        totalSpan.textContent = total;
        scoreSection.style.opacity = 1;
    }, 200);

    if(correct===Math.min(totalMatchingPairs, totalDraggableItems)) { // Game Over!!
        playAgainBtn.style.display = "block";
            setTimeout(() => {
            playAgainBtn.classList.add("play-again-btn-entrance");
        }, 200);
    }
}

// Other Event Listeners
playAgainBtn.addEventListener("click", playAgainBtnClick);

function playAgainBtnClick() {
    playAgainBtn.classList.remove("play-again-btn-entrance");

    correct = 0;
    total = 0;

    draggableItems.style.opacity = 0;
    matchingPairs.style.opacity = 0;

    setTimeout(() => {
        scoreSection.style.opacity = 0;
    }, 100);

    setTimeout(() => {
        playAgainBtn.style.display = "none";

        while (draggableItems.firstChild) draggableItems.removeChild(draggableItems.firstChild);
        while (matchingPairs.firstChild) matchingPairs.removeChild(matchingPairs.firstChild);
        
        initiateGame();

        correctSpan.textContent = correct;
        totalSpan.textContent = total;
        draggableItems.style.opacity = 1;
        matchingPairs.style.opacity = 1;
        scoreSection.style.opacity = 1;
    }, 500);
}

// Auxiliary functions
function generateRandomItemsArray(n, originalArray) {
    let res = [];
    let clonedArray = [...originalArray];

    if(n>clonedArray.length) n=clonedArray.length;

    for(let i=1; i<=n; i++) {
        const randomIndex = Math.floor(Math.random()*clonedArray.length);
        res.push(clonedArray[randomIndex]);
        clonedArray.splice(randomIndex, 1);
    }

    return res;
}