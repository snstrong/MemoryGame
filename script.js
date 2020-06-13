// Memory Game v1.0

const gameContainer = document.getElementById("game");
let countCards = 0;
let countClicks = 0;
let clickedCardList = [];

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.dataset.color = color;
    newDiv.dataset.id = "card" + countCards;
    countCards++;
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function handleCardClick(e) {
  let currentCard = e.target;  
  // First click
  if (countClicks === 0)  {
      if (!currentCard.classList.contains("matched") && !currentCard.classList.contains("flipped")) {
          console.log("You just clicked a card that is not matched or flipped");
          console.log("This should print on the first clicked card");
          currentCard.classList.add("flipped");
          currentCard.style.backgroundColor = currentCard.dataset.color;
          console.log(currentCard.classList);
          clickedCardList.push(currentCard);
          console.log(clickedCardList);
          countClicks++;
          return;
      }
  }
  // Second click
  if (countClicks === 1) {
    console.log("This should print on the second card");
    
    // Clicked same card
    if (currentCard.dataset.id === clickedCardList[0].dataset.id) {
      console.log("you clicked the same card twice");
      console.log("countClicks should be 1: " + countClicks);
      // clickedCardList.pop(currentCard);
      console.log(clickedCardList);
      return;
    }

    if (!currentCard.classList.contains("matched") && !currentCard.classList.contains("flipped")) {
      
      // Change color, add flipped class
      //
      currentCard.style.backgroundColor = currentCard.dataset.color;
      currentCard.classList.add("flipped");
      clickedCardList.push(currentCard);
      console.log("This should say flipped: " + currentCard.classList);
      console.log(clickedCardList);
      
      // Match
      //
      if (currentCard.dataset.color === clickedCardList[0].dataset.color && !(currentCard.dataset.id === clickedCardList[0].dataset.id)) {
        console.log("WE HAVE A MATCH!");
        for (let card of clickedCardList) {
          card.classList.add("matched");
          console.log("This should say flipped, matched: " + card.classList);
        }
        clickedCardList = [];
        countClicks = 0;
      }
      
      // Not a match
      //
      else {
        countClicks = 2;
        setTimeout(function() {
          for (let card of clickedCardList) {
          card.classList.remove("flipped");
          card.style.backgroundColor = "white";
          console.log("NOT A MATCH");
          console.log("This should not inlcude flipped: " + card.classList);
          countClicks = 0;
          console.log("countClicks should be 0: " + countClicks);
          clickedCardList = [];
          console.log("this should be empty array: " + clickedCardList);
        }}, 1000); 
      }
    }
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
