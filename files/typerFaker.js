var program = require("commander");
var Promise = require("bluebird");
var robot = require("robotjs");

main();

function main(){
	var programArgs = readArgs();
	if(!(programArgs.text == undefined ^ programArgs.wait == undefined)){
		if(!programArgs.browser){
			setTimeout(() => {
				typeItOut(programArgs);
			}, programArgs.wait);
		}
		else if(programArgs.text && programArgs.browser){
			console.log("\nError, browser (-b) is not intended to be used with the wait (-p) and text (-t) parameters. Exiting.\n")
		}
		else{
			console.log("\nSwitch to browser and type CTRL+I\nThen, copy the text you wish to type\nWhen you want to start typing, click the input box on the webpage to begin");
			//injectScript();
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
		.option('-b, --browser', 'Uses settings for browser, such as keypress activated auto script injection into current tab and keybindings for start, restart, pause, previous/next word navigation, and early exit. Not intended for usage with --wait and --text')
		.option('-w, --wpm <n>', 'Desired avg wpm to type at', parseInt)
		.option('-v, --variance <n>', 'Desired variance for each character\'s typing speed. (0 <= x < 1) E.g. a variance of 0.5 will give speeds from 0.5 to 1.5 times the speed for each character, and will average out to the desired wpm', parseFloat)
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
	if(programArgs.variance == undefined || programArgs.variance < 0){
		programArgs.variance = 0;
	}
	else if(programArgs.variance >= 1){
		programArgs.variance = 1;
	}

	return programArgs;
}

function typeItOut(programArgs){
	//basically just go through and type all of the letters in a word at what would be the average given wpm (with variance) if calculation/comparison time was 0
	var text = programArgs.text;
	var wpm = programArgs.wpm;
	var variance = programArgs.variance;
	var mr = programArgs.maximumrealism;

	var words = text.split(" ");

	typeText(words[0], 0, words.length, 0);
	//if something should happen after all of the words are typed include it here:
	//e.g. press enter now

	//type text, one word at a time. Recursive, so it types all of the words with the above function call
	function typeText(word, j, totalWords, i){
		if(j < word.length){
			//skip backslashes that were used to escape quotes
			if(word[j] === "\\" && (word[j+1] === "'" || word[j+1] === "\"")){
				typeText(word, j+1, totalWords, i);
			}
			//else print the current letter
			else{
				setTimeout(() => {
					console.log(word[j]);
					typeText(word, j+1, totalWords, i);
				}, getSpeedOfVariedWPM(wpm, variance)/(word.length+1));
			}
		}
		else{
			//type the next word
			if(i+1 < words.length){
				setTimeout(() => {
					console.log(" ");
					typeText(words[i+1], 0, totalWords, i+1)
				}, getSpeedOfVariedWPM(wpm, variance)/(word.length+1));
			}
		}
	}
}



function scaleRand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getSpeedOfWPM(wpm){
	return 60000 / wpm;
}

function getSpeedOfVariedWPM(wpm, maxVariance){
	//for example, wpm of 100 and maxVariance of .25 would produce values ranging from 75 to 125 wpm
	//because [wpm speed] * [random between 0 and 1] * (1 + .25) + (1 - .25)
	return getSpeedOfWPM(wpm) * Math.random() / (1 + maxVariance) + (1 - maxVariance);
}
