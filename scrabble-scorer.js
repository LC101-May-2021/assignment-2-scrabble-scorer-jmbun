// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  return input.question("Let's play some scrabble! Enter a word: ");
};

let simpleScore = function(word) {
  return word.length;
};

let vowelBonusScore = function(word) {
  let score = 0;
  for(let i = 0; i < word.length; i++) {
    let isVowel = "aeiouAEIOU".indexOf(word[i]) != -1;
    if (isVowel) {
      score+=3;
    } else {
      score+=1;
    }
  }

  return score;
};

let scrabbleScore = function(word) {
  let score = 0;
  for (let i = 0; i < word.length; i++) {
    score += newPointStructure[word[i].toLowerCase()];
  }

	return score;
}

const scoringAlgorithms = [
  {
    name: "Simple Score",
    description: "Each letter is worth 1 point.",
    scoringFunction: simpleScore
  },
  {
    name: "Bonus Vowels",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scoringFunction: vowelBonusScore
  },
  {
    name: "Scrabble",
    description: "The traditional scoring algorithm.",
    scoringFunction: scrabbleScore
  }
];

function scorerPrompt() {
  console.log("Which scoring algorithm would you like to use? ");
  console.log();
  for(let i = 0; i < scoringAlgorithms.length; i++) {
    let algo = scoringAlgorithms[i];
    console.log(`${i} - ${algo.name} - ${algo.description}`);
  }
  let index = Number(input.question("Enter: "));
  return scoringAlgorithms[index];
}

function transform(oldStructure) {
  const newStructure = {};
  for (const key in oldStructure) {
    for(let i = 0; i < oldStructure[key].length; i++) {
      const value = oldPointStructure[key][i];
      newStructure[value.toLowerCase()] = Number(key);
    }
  }
  //console.log(newStructure);
  return newStructure;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
  let word = initialPrompt();
  let algo = scorerPrompt();
  let score = algo.scoringFunction(word);
  console.log(`Score for '${word}' is ${score}!`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

