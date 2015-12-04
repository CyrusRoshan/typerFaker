# typerFaker
Fake your wpm in typing races
___

###Current status:
Basic program, does not work with any args yet, inefficient, made quickly when I should have been working on my team's hackathon project.

###Usage:
	> git clone https://github.com/CyrusRoshan/typerFaker.git
	> cd typerFaker/files
* if using browser based typing challenge
	* ``` > node typerFaker.js -browser -wpm [desired wpm] ```
	* e.g. ``` > node typerFaker.js -browser -wpm 125 ```

* or if already supplying text to be typed (e.g. in another program or in a VM)
	* ``` > node typerFaker.js -nobrowser -wait [ms to wait until starting] -wpm [desired wpm] -text [text, encapsulated in quotes] ```
	* e.g. ``` > node typerFaker.js -nobrowser -wait 5000 -wpm 125 -text "string to type quickly" ```
* else, ```node typerFaker.js``` is equivalent to ```node typerFaker.js -wpm 125```

###Options (not yet implemented)
* ```--browser``` or ```-b```, uses settings for browser, such as keypress activated auto script injection into current tab and keybindings for start, restart, pause, previous/next word navigation, and early exit
* ```--wpm``` or ```-w```, sets desired wpm average
* ```--wait``` or ```-p```, used in addition to ```-text```, sets time in ms to wait before automatically typing
* ```--text``` or ```-t```, used in addition to ```-wait```, supplies text to be inputted. Text should have double quotes around it, with interior double quotes prefixed with a backslash, e.g. ```-text "\"like this\", I say"```
* ```--lazybrowser``` or ```-l```, attempts to isolate the text needed to be typed, in addition to finding the correct time to begin typing
* ```--maximumrealism``` or ```-m```, makes the typing as humanlike as possible. Adds simple typos and corrects them, types out each word letter by letter, with faster speeds on sequential letters, slower speeds on characters requiring shift, and in effect makes longer words take longer to type on average than shorter ones.




___
##License:
ISC
