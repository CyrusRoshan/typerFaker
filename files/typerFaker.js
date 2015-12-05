var program = require('commander');
var Promise = require("bluebird");
var robot = require("robotjs");

main();

function main(){
	var programArgs = readArgs();
	if(!(programArgs.text == undefined ^ programArgs.wait == undefined)){
		if(!programArgs.browser){
			typeItOut(programArgs);
		}
	}
	else{
		console.log("\nError, must either include both wait (-p) and text (-t) parameters or include neither. Exiting.\n")
	}
}


function readArgs(){
	var programArgs = program;
	programArgs
		.version('0.0.1')
		.usage('[options]')
		.option('-b, --browser', 'Uses settings for browser, such as keypress activated auto script injection into current tab and keybindings for start, restart, pause, previous/next word navigation, and early exit')
		.option('-w, --wpm <n>', 'Desired avg wpm to type at', parseInt)
		.option('-p, --wait <n>', 'Used in addition to --text. Sets time in ms to wait before automatically typing', parseInt)
		.option('-t, --text [value]', 'Used in addition to --wait. Supplies text to be inputted. Text should have double quotes around it, with interior double quotes prefixed with a backslash, e.g. -text "\"like this\", I say"')
		.option('-l, --lazybrowser', 'Attempts to isolate the text needed to be typed, in addition to finding the correct time to begin typing')
		.option('-m, --maximumrealism', 'Makes the typing as humanlike as possible. Adds simple typos and corrects them, types out each word letter by letter, with faster speeds on sequential letters, slower speeds on characters requiring shift, and in effect makes longer words take longer to type on average than shorter ones.')
		.parse(process.argv);

	if(programArgs.wpm <= 0 || !programArgs.wpm){
		programArgs.wpm = 125;
	}
	if(programArgs.wait < 0){
		programArgs.wait = 0;
	}

	return programArgs;
}

function typeItOut(programArgs){
	//basically just go through and type all of the letters in a word at what would be the exact given wpm if calculation/comparison time was 0
	var text = programArgs.text;
	var wpm = programArgs.wpm;
	var mr = programArgs.maximumrealism;

	var words = text.split(" ");

	typeText(0);

	function typeText(i){
		if(i < words.length){
			typeWord(words[i], 0, i);
		}
	}

	function typeWord(word, j, i){
		//so we don't type the backslash that comes before quotes (of either type)
		if(j < word.length){
			if(word[j] === "\\" && (word[j+1] === "'" || word[j+1] === "\"")){
				typeWord(word, j, i);
			}
			else{
				//print the current letter
				setTimeout(function(){
					console.log(word[j]);
					typeWord(word, j+1, i);
				}, 500);
			}
		}
		else{
			//type the next word
			typeText(i+1);
		}
	};
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
