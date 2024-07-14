const btnPrev = document.querySelector('.prevBtn');
const btnNext = document.querySelector('.nextBtn');
let active = 6; // sets the selected person

// Function to create image HTML
function createImage(src) {
    return `<img src="./assets/images/${src}">`;
}

// Function to add event listeners to elements
function addEventListeners() {
    const cards = document.querySelectorAll('.personCard');
    cards.forEach(function(card) {
        card.addEventListener('click', e => {
            card.classList.toggle('is-flipped');
        });
    });

    btnNext.addEventListener('click', function() {
        active++;
        showActiveCards(active);
        btnNext.style.transform = 'scale(1.3)';
        setTimeout(function() { btnNext.style.transform = 'scale(1)'; }, 210);
    });

    btnPrev.addEventListener('click', function() {
        active--;
        showActiveCards(active);
        btnPrev.style.transform = 'scale(1.3)';
        setTimeout(function() { btnPrev.style.transform = 'scale(1)'; }, 210);
    });

    document.onkeydown = function(evt) {
        evt = evt || window.event;
        switch (evt.keyCode) {
            case 37:
                leftArrowPressed();
                break;
            case 39:
                rightArrowPressed();
                break;
            case 13:
                enterKeyPressed();
                break;
        }
    };
}

// Function to create card elements and append to carousel
function createCards() {
    for (let i = 0; i < peopleObject.length; i++) {
        let newCard = document.createElement('div');
        newCard.className = 'carousel-cell';
        newCard.id = i;
        let imageFront = createImage(peopleObject[i].frontImageSrc);
        let imageBack = createImage(peopleObject[i].backImageSrc);
        newCard.innerHTML = `<div class="scene">
                                <section class="personCard">
                                    <div class="card cardFront">${imageFront}</div>
                                    <div class="card cardBack">${imageBack}</div>
                                </section>
                            </div>`;
        document.querySelector('.carousel').appendChild(newCard);
    }
}

// Function to show active cards based on the active index
function showActiveCards(activeCard) {
    if (activeCard > -1 && activeCard < peopleObject.length) {
        let allCards = document.querySelectorAll('.carousel-cell');
        allCards.forEach(card => {
            card.className = '';
            card.classList.add('carousel-cell');
            card.classList.add('hidden');
        });

        if (activeCard >= 3) {
            let prevHiddenCard = document.getElementById(activeCard - 3);
            prevHiddenCard.classList.add('prevHidden');
            prevHiddenCard.classList.remove('hidden');
        }

        if (activeCard >= 2) {
            let prevSecondCard = document.getElementById(activeCard - 2);
            prevSecondCard.classList.add('prevSecond');
            prevSecondCard.classList.remove('hidden');
        }

        if (activeCard >= 1) {
            let prevCard = document.getElementById(activeCard - 1);
            prevCard.classList.add('prev');
            prevCard.classList.remove('hidden');
        }

        if (activeCard > -1) {
            let selectedCard = document.getElementById(activeCard);
            selectedCard.classList.add('selected');
            selectedCard.classList.remove('hidden');
        }

        let nextCard = document.getElementById(activeCard + 1);
        nextCard.classList.add('next');
        nextCard.classList.remove('hidden');

        let nextSecondCard = document.getElementById(activeCard + 2);
        nextSecondCard.classList.add('nextSecond');
        nextSecondCard.classList.remove('hidden');

        let nextHiddenCard = document.getElementById(activeCard + 3);
        nextHiddenCard.classList.add('nextHidden');
        nextHiddenCard.classList.remove('hidden');
    } else if (activeCard < 0) {
        active = 0;
    } else if (activeCard > peopleObject.length - 1) {
        active = peopleObject.length - 1;
    }
}

// Function to handle left arrow key press
function leftArrowPressed() {
    active--;
    btnPrev.style.transform = 'scale(1.3)';
    showActiveCards(active);
    setTimeout(function() { btnPrev.style.transform = 'scale(1)'; }, 210);
}

// Function to handle right arrow key press
function rightArrowPressed() {
    active++;
    btnNext.style.transform = 'scale(1.3)';
    showActiveCards(active);
    setTimeout(function() { btnNext.style.transform = 'scale(1)'; }, 210);
}

// Function to handle enter key press
function enterKeyPressed() {
    let selectedCards = document.querySelectorAll('.personCard');
    selectedCards.forEach(card => {
        if (card.parentNode.parentNode.classList.contains('selected')) {
            card.classList.toggle('is-flipped');
        }
    });
}

// Initialization function
function init() {
    createCards();
    addEventListeners();
    showActiveCards(active);
}

init();
