/**
 * @description Create a list that holds all of your cards
 */
const cards = [
        'fa-diamond',
        'fa-paper-plane-o',
        'fa-anchor',
        'fa-bolt',
        'fa-cube',
        'fa-anchor',
        'fa-leaf',
        'fa-bicycle',
        'fa-diamond',
        'fa-bomb',
        'fa-leaf',
        'fa-bomb',
        'fa-bolt',
        'fa-bicycle',
        'fa-paper-plane-o',
        'fa-cube'
    ];

/**
 * @description maak een reference naar je open en matched en je shuffled cards
 */
let openCards = []; // maak een lege array
let matchedCards = []; // maak een lege array
let shuffledCards = []; // maak een lege array

/**
 * @description maak een reference naar al je id's
 */
const deck = document.getElementById('deck');

/**
 * @description Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function initGame() {

    /**
     * @description shuffle je cards en wijs ze toe aan shuffledCards[]
     */
    shuffledCards = shuffle(cards);

    /**
     * @description call je create deck functie en voeg de shuffled cards array toe als een param
     */
    createDeck(shuffledCards);

}

/**
 * @description functie voor het maken van je deck
 */
function createDeck(shuffledCards) {

    /**
     * @description loop over je cards array en maak de elements i
     */
    for (var i = 0; i < shuffledCards.length; i++) {
        /**
         * @description maak een li die je later aan de ul toevoegd
         */
        let liEl = document.createElement('li');

        /**
         * @description voeg je card class toe aan je li
         */
        liEl.classList.add('card');

        /**
         * @description maak je i element die je later aan je li toevoegd
         */
        let iEl = document.createElement('i');

        /**
         * @description voeg een class toe aan de iEl voeg de fa class appart toe
         */
        iEl.classList.add('fa');
        iEl.classList.add(shuffledCards[i]);

        /**
         * @description append je iEl aan de liEl als child
         */
        liEl.appendChild(iEl);
        deck.appendChild(liEl);

        /**
         * @description voeg een event listener toe aan je card call de turnCard functie
         */
        liEl.addEventListener('click', turnCard)
    }

}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {

    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;

}

/**
 * @description functie voor het draaien van je cards event target is li.card omdat de eventListener is toegevoegd aan de liEl
 * @param {event} dit is de card die je geklikt hebt
 */
function turnCard(event) {

    /**
     * @description je event target geef je nu de class show
     */
    event.target.classList.add('show');

    /**
     * @description ook verwijder je tijdelijk je eventListener om dubbele clicken te voorkomen en zo je open cards array te vullen met 2 keer dezelfde card
     * je verwijderd de click listener en de turnCard functie later als de 2de card is geclicked en geen match is voeg je deze listener weer toe anders blijft die eraf zo voorkom je dubbele clicken op matched cards.
     */
    event.target.removeEventListener('click', turnCard);

    /**
     * @description call je functie om je cards te checken in deze functie check je of je cards een match zijn
     */
    checkCards(event);

}

/**
 * @description functie om je cards te checken en/of toe te voegen aan je matchedCards[] of de event listener terug te plaatsen
 * @param {event} dit is de card die je geklikt hebt
 */
function checkCards(event) {

    /**
     * @description eerst voeg je je cards toe aan je openCards[]
     */
    openCards.push(event.target.firstChild);

    /**
     * @description hier check je je cards in je openCards[] heb je nu een node van je card waarop je klikte
     */
    if (openCards.length === 2) {

        /**
         * @description eerst check je voor een match
         */
        if(openCards[0].className === openCards[1].className) {

            /**
             * @description als het een match is add een animation class matched bijv et css voeg je daar animatie aan toe
             */
            openCards[0].parentNode.classList.add('matched');
            openCards[1].parentNode.classList.add('matched');

            /**
             * @description maak je open cards array leeg
             * @type {Array}
             */
            openCards = [];

            /**
             * @description push je cards na een nieuwe array genaamd matched cards met deze array kan je een check maken wanneer de game is afgelopen
             */
            matchedCards.push(openCards[0]);
            matchedCards.push(openCards[1]);

        } else {

            /**
             * @description set een timeout voor de animatie zodat deze afspeelt en de user niet al de volgende card kan openen
             */
            setTimeout(function() {
                for (let i = 0; i < openCards.length; i++) {
                    openCards[i].parentNode.addEventListener('click', turnCard);
                }
            }, 1000);

            /**
             * @description verwijder de show class in de removeOpenClass
             */
            setTimeout(removeOpenClass, 1000);

        }

    }

}

/**
 * @description hier verwijder ja alle toegevoegde classes bij een click en empty je je array met open cards
 */
function removeOpenClass() {

    for (let i = 0; i < openCards.length; i++) {
        openCards[i].parentNode.classList.remove('show');
    }

    /**
     * @description set openCards[] naar een lege array
     * @type {Array}
     */
    openCards = [];

}

/**
 * @description start de game
 */
initGame();