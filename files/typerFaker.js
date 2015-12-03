var robot = require("robotjs");

//global argument values, parsed
var selectedOptions = {
	browser: true,
	wpm: 125,
	wait: 4000,
	textGiven: false,
	lazyBrowser: false,
	maximumRealism: false,
	argsError: false,
}

/*readArgs();
if(!selectedOptions.argsError){
	console.log(selectedOptions);
}
else{
	console.log("yep an error");
}
*/

console.log(process.argv[2] + "/" + process.argv[3]);


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
				selectedOptions.textGiven = process.argv[currentArgPos];//.replace(/"/g, '\\"');
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

//setTimeout(typeItOut, 2000);

function typeItOut(i){
	if(i == undefined){
		i = 0;
	}
	if(i < process.argv[2].split(" ").length){
		setTimeout(function(){
			robot.typeString(process.argv[2].split(" ")[i].replace(/'/g, "\'").replace(/\"/g, '"'));
			robot.keyTap("space");
			typeItOut(i+1);
		}, getWPMof(110));
	}
}


function scaleRand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getWPMof(wpm){
	return wpm * 60 * 1000;
}
