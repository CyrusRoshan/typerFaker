var Promise = require("bluebird");
var robot = require("robotjs");

//global argument values, parsed
var selectedOptions = {
	browser: true,
	wpm: 125,
	wait: 4000,
	textGiven: false,
	lazyBrowser: false,
	maximumRealism: false,
	argsError: false
};

readArgs();
//if there are no errors. Otherwise, program will quit
if(!selectedOptions.argsError){
	//if not using browser
	if(!selectedOptions.browser){
		setTimeout(function(){typeItOut(0, selectedOptions.textGiven.length)}, selectedOptions.wait);
	}
	//if user is using browser
	else{

	}
}
else{

}


function readArgs(){
	//start at the 3rd argument
	var currentArgPos = 2;

	//check if any args are added, if not, default values are declared on var initialization for selectedOptions anyway
	while(currentArgPos < process.argv.length){
		switch (currentArg()){
			case "-browser":
				currentArgPos++;
				break;

			case "-nobrowser":
				currentArgPos++;
				selectedOptions.browser = false;

			case "-wpm":
				currentArgPos++;
				if(currentArgPos < process.argv.length){
					selectedOptions.wpm = currentArg();
					currentArgPos++;
				}
				break;

			case "-wait":
				currentArgPos++;
				if(currentArgPos < process.argv.length){
					selectedOptions.wait = currentArg();
					currentArgPos++;
				}
				break;

			case "-text":
				currentArgPos++;
				selectedOptions.textGiven = process.argv[currentArgPos];
				currentArgPos++;
				break;

			case "-lazybrowser":
				selectedOptions.lazyBrowser = true;
				currentArgPos++;
				break;

			case "-maximumrealism":
				selectedOptions.maximumRealism = true;
				currentArgPos++;
				break;

				//effectively exits program if an argument has a typo or is invalid
			default:
				selectedOptions.argsError = true;
				console.log("Unknown option added, exiting program");
				return;
		}
	}

	//function to get current arg
	function currentArg(){
		return process.argv[currentArgPos].toLowerCase();
	}
}

function typeItOut(i, length){
	var currentWord;
	var j;
	//basically just go through and type all of the letters in a word at what would be the exact given wpm if calculation/comparison time was 0

	//fix this function
	if(i < length){
		setInterval(function(){
			typeWord();
		}, getSpeedOfVariedWPM(selectedOptions.wpm))
	}

	function typeWord(){
		currentWord = selectedOptions.textGiven.substr(i).split(" ")[0];
		for(j = 0; j < currentWord.length; j++){
			//so we don't type the backslash that comes before the double quotes, but is actually single quotes because of how the strings end up being stored
			if(selectedOptions.textGiven[i] == "\\" && selectedOptions.textGiven[i+1] == "'"){
				j++;
			}
			//print the current letter in the current word
			console.log(currentWord[j]);
			//robot.typeString(selectedOptions.textGiven[i]);
			//robot.keyTap("space");
		}

		//move i past the current length of the word plus a space
		i += currentWord.length + 1;
	}
}


function scaleRand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


function getSpeedOfWPM(wpm){
	return wpm * 60 * 1000;
}

function getSpeedOfVariedWPM(wpm, maxVariance){
	//for example, wpm of 100 and maxVariance of .25 would produce values ranging from 75 to 125 wpm
	//because [wpm speed] * [random between 0 and 1] * (1 + .25) + (1 - .25)
	return getSpeedOfWPM(wpm) * Math.random() / (1 + variance) + (1 - maxVariance);
}
