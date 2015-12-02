var robot = require("robotjs");

setTimeout(typeItOut, 2000);

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
