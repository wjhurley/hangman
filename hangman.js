//Global variables and constants
var arrDictionary = [
  "pepperoni",
  "gyroscope",
  "quod",
  "zirconium",
  "ambisinister",
  "connotation",
  "irregardless",
  "burble",
  "syzygy",
  "cynosure",
  "frabjous",
  "bibliomania",
  "quixotic",
  "quidnunc",
  "flumadiddle",
  "otiose",
  "superfluous",
  "mellifluous",
  "psephology",
  "mondegreen"
];
var arrDefinitions = [
  "a highly seasoned, hard sausage of beef and pork",
  "an apparatus consisting of a rotating wheel so mounted that its axis can turn freely in certain or all directions, and capable of maintaining the same absolute direction in space in spite of movements of the mountings and surrounding parts: used to maintain equilibrium, determine direction, etc",
  "jail",
  "a metallic element found combined in zircon, baddeleyite, etc., resembling titanium chemically: used in steel metallurgy, as a scavenger, as a refractory, and as an opacifier in vitreous enamels",
  "clumsy or unskillful with both hands",
  "something suggested or implied by a word or thing, rather than being explicitly named or described",
  "regardless",
  "to speak in an excited manner; babble",
  "an alignment of three celestial objects, as the sun, the earth, and either the moon or a planet",
  "something that strongly attracts attention by its brilliance, interest, etc",
  "wonderful, elegant, superb, or delicious",
  "excessive fondness for acquiring and possessing books",
  "extravagantly chivalrous or romantic; visionary, impractical, or impracticable",
  "a person who is eager to know the latest news and gossip; a gossip or busybody",
  "utter nonsense",
  "being at leisure; idle; indolent",
  "being more than is sufficient or required; excessive",
  "sweetly or smoothly flowing; sweet-sounding",
  "the study of elections",
  "a word or phrase resulting from a misinterpretation of a word or phrase that has been heard"
];
var intWrong = 1; //Used in letter guess portion of ButtonHandler to keep running total
var intRandom = Math.floor(Math.random() * arrDictionary.length); //Used to find new word upon start/restart
var strWord = ""; //Used to hold uppercase version of chosen word for letter guess
var strMeaning = ""; //Used to hold definition of words from dictionary array

//Start Button Handler
function btnStart() {
  //Call function to set random word and build letter labels
  letterArray();
  //Enable all letter buttons for new game
  for (var i = 0; i < document.forms[0].btnAlphabet.length; i++) {
    document.forms[0].btnAlphabet[i].disabled = false;
  }
  //Reset global variable acting as counter for hangman images
  intWrong = 1;
  //Reset hangman image back to starting image
  document.getElementById("mrSticky").setAttribute("src","hangman0.png");
  //Remove message from previous game
  document.getElementById("gameMessage").innerHTML = " ";
  //Set new random number
  intRandom = Math.floor(Math.random() * arrDictionary.length);
  return false;
}

function letterArray() {
  var strRandWord = "";
  var intDash;
  //Assign uppercase version of random word to global variable to compare guesses
  strWord = arrDictionary[intRandom].toUpperCase();
  //Assign definition of chosen word to global variable for alert shown upon guessing the word correctly
  strMeaning = arrDefinitions[intRandom];
  //Create dashes for random word
  intDash = strWord.length;
  for (var i = 0; i < intDash; i++) {
    strRandWord += "<h1 class='dashes'>_</h1>";
  }
  return document.getElementById("randomWord").innerHTML = strRandWord;
}

//Determine if letter guessed is in random word
function letterGuess(strGuess) {
  var strLetter = document.getElementById(strGuess);
  strLetter.disabled = true;
  if(strWord.indexOf(strGuess) != -1) {
    //Function to show letter to user and check if game is won
    letterGuessCorrect(strGuess, gameMessage);
  } else {
    //Function to show next hangman image and check if game is lost
    letterGuessWrong(gameMessage);
  }
}

function letterGuessCorrect(strGuess, gameMessage) {
  //Steps taken if user guess is right
  var intIndex = 0;
  var intZ = 0;
  var blnDash = false;
  var strLetters = document.getElementsByClassName("dashes");
  //Find location of letter in word and repeat until all occurrences of letter have been found
  while (strWord.indexOf(strGuess, intIndex) > -1) {
    intIndex = strWord.indexOf(strGuess, intIndex);
    strLetters[intIndex].innerHTML = strGuess;
    intIndex++;
  }
  //Loop to check if entire word has been guessed
  while (intZ < strLetters.length && blnDash == false) {
    //Determine if there are still dashes in labels
    if (strLetters[intZ].innerHTML == "_") {
      return blnDash = true;
    } else if (intZ == strLetters.length - 1) {
      //If there are no more dashes, game is won
      gameMessage.innerHTML = "<p>Congratulations, you guessed \"" + strWord + "\" which means \"" + strMeaning + "\" according to <a href='http://www.dictionary.com/' target='_blank'>dictionary.com</a>.</p>";
      blnDash = true;
      //Disable all alphabet buttons until new game is started
      for (var i = 0; i < document.forms[0].btnAlphabet.length; i++) {
        document.forms[0].btnAlphabet[i].disabled = true;
      }
      return document.getElementById("startGame").focus();
    } else {
      intZ++;
    }
  }
  return true;
}

function letterGuessWrong(gameMessage) {
  //Steps taken if user guess is wrong
  if (intWrong < 7) {
    //If guess is wrong, change to next hangman drawing in array
    imageChange();
    intWrong++
    return false;
  } else {
    //If all guesses are exhausted, change to last hangman drawing in array and game is lost
    imageChange();
    //Disable all alphabet buttons until new game is started
    for (var i = 0; i < document.forms[0].btnAlphabet.length; i++) {
      document.forms[0].btnAlphabet[i].disabled = true;
    }
    gameMessage.innerHTML = "<p>Sorry, you did not guess my word \"" + strWord + "\" in time to save Mr. Sticky.</p>";
    //Set focus to "New Game" button for keyboard users
    return document.getElementById("startGame").focus();
  }
}

function imageChange() {
  //Load Hangman drawings into Image array and set PictureBox to first image
  var imgSticky = document.getElementById("mrSticky");
  var strHangman = "hangman" + intWrong + ".png";
  return imgSticky.setAttribute("src", strHangman);
}
