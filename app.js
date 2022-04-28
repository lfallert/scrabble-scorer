// Refer to the online book to access detailed instructions for this project.

// URL = https://education.launchcode.org/intro-to-professional-web-dev/assignments/scrabble-scorer.html

const input = require('readline-sync');

// transforms the oldPointStructure into the newPointStructure
function transform (object) {
    newScore = {};
    for (objectValue in object) {
        for (let i = 0; i < object[objectValue].length; i++) {
            let newKey = object[objectValue][i].toLowerCase();
            let newValue = objectValue
            newScore[newKey] = newValue;
        } 
    }
    return newScore;
}

// greets user and gets index for the array that will be used in the main function
function initialPrompt () {
    let options = "\n0 - Scrabble: The traditional scoring algorithm.\n1 - Simple Score: Each letter is worth 1 point.\n2 - Bonus Vowels: Vowels are worth 3 points, and consonants are worth 1 point.\n";
    let getScoreAlgorithm = input.question(`***Welcome to the Original Scrabble Score Calculator!***\n\nWhich scoring algorithm would you like to use?\n${options}\nEnter 0, 1, or 2: `);
    let emptyString = ''
    while (getScoreAlgorithm < 0 || getScoreAlgorithm > 2 || isNaN(getScoreAlgorithm) || getScoreAlgorithm === emptyString) {
        getScoreAlgorithm = input.question(`\n${options}\n>>> Must Select 0, 1, or 2 <<<\n`);
        }
    return getScoreAlgorithm;
}

// Runs main function - 
function runProgram (array) {
   
    let scoreIndex = initialPrompt();
    console.log(`\nUsing Algorithm: ${array[scoreIndex].name}\n`)

    let keepGoing = true;  

    while (keepGoing) {  
        let word = input.question("Enter a word to be scored or type 'STOP' to quit: ");        

        if (!isNaN(word)) {
        console.log("\nInvalid input. Please enter a word.\n ");
        } else if (word.toUpperCase() === "STOP") {
            keepGoing = false;
            console.log("\nThank you for using our Scrabble Scorer!\nHave a nice day!");
        } else {
            
            let finalScore = array[scoreIndex].scoreFunction(word);
            console.log(`Score for '${word}': ${finalScore}\n`);
        }
    }
}


// Here is the oldPointStructure object:
const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

//creates the newPointStructure that will have 26 keys
let newPointStructure = transform(oldPointStructure);
newPointStructure[' '] = '0';

// The objects and their methods that will be used in the array that passes thru the main function
let scrabble = { 
    name: "Scrabble", 
    description: "The traditional scoring algorithm",
    scoreFunction: scrabbleScore
    };

let simple = {
     name: "Simple Score",
    description: "Each letter is worth one point",
    scoreFunction: simpleScore
    };

let bonus = {
     name: "Bonus Vowels",
    description: "Vowels are 3 pts, consonants are 1 pt",
    scoreFunction: bonusScore
    };

let scoringAlgorithms = [scrabble, simple, bonus];

//Scrabble Score function
function scrabbleScore (word, object) {
    let scrabble = newPointStructure;
    let counter = 0;
     
    for ( let i =0; i < word.length; i++) {
        for (item in scrabble) {
            if (word[i].toLowerCase().includes(item)) {
            counter = counter + Number(scrabble[item]);
            } 
            if (!isNaN(word[i])) {
            counter = counter;
            }
        }
    }
    return counter
}

//SimpleScore Function
function simpleScore (word) {
    let counter = 0;
    for( let i = 0; i < word.length; i++) {
        if (word[i].includes(' ')) {
            counter = counter;
        } else if (!isNaN(word[i])) {
            counter = counter;
        } else {
            counter = counter + 1;
        }
    }
    return counter;
}

//Bonus Score function
function bonusScore (word) {
    let vowels = ['a', 'e', 'i', 'o', 'u'];
    let counter = 0;
            
            for (let i=0; i < word.length; i++) {
                if (vowels.indexOf(word[i]) !== -1) {
                    counter = counter + 3;
                } else if (word[i].includes(' ')) {
                    counter = counter;
                } else if (!isNaN(word[i])) {
                    counter = counter;
                } else {
                    counter = counter + 1;
                }
            }
    return counter;
}

// Calling the main function here!
runProgram(scoringAlgorithms);
