# typerFaker
Fake your wpm in typing races
___

###Current status (On hold):
Paused until robotjs can read global input

Program works outside of the browser with the ```--wait``` and ```--text``` commands.

All output is currently in the console via console.log. Simply substitute robot.js's functions to type instead.

Coming next: browser support (automatic script injection and typing activated hotkeys).


###Usage:
	> git clone https://github.com/CyrusRoshan/typerFaker.git
	> cd typerFaker/files
* if using browser based typing challenge
	* ``` > node typerFaker.js -b -w [desired wpm] -v [desired variance]```
	* e.g. ``` > node typerFaker.js -browser -wpm 125 ```

* or if already supplying text to be typed (e.g. in another program or in a VM)
	* ``` > node typerFaker.js -p [ms to wait until starting] -w [desired wpm] -v [desired variance] -t [text, encapsulated in quotes] ```
	* e.g. ``` > node typerFaker.js -p 5000 -w 125 -v [0.5] -t "string to type quickly" ```
* else, ```node typerFaker.js``` is equivalent to ```node typerFaker.js -w 125```

###Options (not yet implemented)
* ```--browser``` or ```-b```, uses settings for browser, such as keypress activated auto script injection into current tab and keybindings for start, restart, pause, previous/next word navigation, and early exit. Not intended to be used with ```--wait``` or ```--text```
* ```--wpm``` or ```-w```, sets desired wpm average
* ```--variance``` or ```-v```, sets desired variance for each character's typing speed. (0 <= x < 1) E.g. a variance of 0.5 will give speeds from 0.5 to 1.5 times the speed for each character, and will average out to the desired wpm
* ```--wait``` or ```-p```, used in addition to ```-text```, sets time in ms to wait before automatically typing
* ```--text``` or ```-t```, used in addition to ```-wait```, supplies text to be inputted. Text should have double quotes around it, with interior double quotes prefixed with a backslash, e.g. ```-text "\"like this\", I say"```
* ```--lazybrowser``` or ```-l```, attempts to isolate the text needed to be typed, in addition to finding the correct time to begin typing
* ```--maximumrealism``` or ```-m```, makes the typing as humanlike as possible. Adds simple typos and corrects them, types out each word letter by letter, with faster speeds on sequential letters, slower speeds on characters requiring shift, and in effect makes longer words take longer to type on average than shorter ones.




___
##License:
ISC
