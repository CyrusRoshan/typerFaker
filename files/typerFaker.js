var program = require('commander');
var Promise = require("bluebird");
var robot = require("robotjs");

main();

function main(){
	var programArgs = readArgs();
	if(programArgs.nobrowser){
		setTimeout(function(){typeItOut(programArgs)}, programArgs.wait);
	}
}


function readArgs(){
	var programArgs = program;
	programArgs
		.version('0.0.1')
		.usage('[options]')
		.option('-b, --browser', 'Uses settings for browser, such as keypress activated auto script injection into current tab and keybindings for start, restart, pause, previous/next word navigation, and early exit')
		.option('-n, --nobrowser', 'Uses settings for no browser (disables keybindings used for browser, and automatic script injection)')
		.option('-w, --wpm <n>', 'Desired avg wpm to type at', parseInt)
		.option('-p, --wait <n>', 'Used in addition to --nobrowser and --text. Sets time in ms to wait before automatically typing', parseInt)
		.option('-t, --text [value]', 'Used in addition to --nobrowsesr and --wait. Supplies text to be inputted. Text should have double quotes around it, with interior double quotes prefixed with a backslash, e.g. -text "\"like this\", I say"')
		.option('-l, --lazybrowser', 'Attempts to isolate the text needed to be typed, in addition to finding the correct time to begin typing')
		.option('-m, --maximumrealism', 'Makes the typing as humanlike as possible. Adds simple typos and corrects them, types out each word letter by letter, with faster speeds on sequential letters, slower speeds on characters requiring shift, and in effect makes longer words take longer to type on average than shorter ones.')
		.parse(process.argv);

	return programArgs;
}

function typeItOut(programArgs){
	//basically just go through and type all of the letters in a word at what would be the exact given wpm if calculation/comparison time was 0
	var text = programArgs.text;
	var wpm = programArgs.wpm;
	var mr = programArgs.maximumrealism;

	//fix this function
	function callTyper(){
		if(i < length){
			setTimeout(function(){
				typeWord();
			}, getSpeedOfVariedWPM(selectedOptions.wpm))
		}
	}

	function typeWord(){
		var currentWord = selectedOptions.textGiven.substr(i).split(" ")[0];
		for(var j = 0; j < currentWord.length; j++){
			//so we don't type the backslash that comes before the double quotes, but is actually single quotes because of how the strings end up being stored
			if(selectedOptions.textGiven[i] === "\\" && selectedOptions.textGiven[i+1] === "'"){
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
