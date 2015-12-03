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
* else, ```node typerFaker.js``` is equivalent to ```node typerFaker.js -browser -wpm 125```

###Options (not yet implemented)
* ```-browser```, uses settings for browser, such as keypress activated auto script injection into current tab and keybindings for start, restart, pause, previous/next word navigation, and early exit
* ```-wpm```, sets desired wpm average
* ```-nobrowser```, uses settings for no browser (disables keybindings used for browser, and automatic script injection)
* ```-wait```, used in addition to ```-nobrowser``` and ```-text```, sets time in ms to wait before automatically typing
* ```-text```, used in addition to ```-nobrowser``` and ```-wait```, supplies text to be inputted
* ```-lazyBrowser```, attempts to isolate the text needed to be typed, in addition to finding the correct time to begin typing
* ```-maximumRealism```, makes the typing as humanlike as possible. Adds simple typos and corrects them, types out each word letter by letter, with faster speeds on sequential letters, slower speeds on characters requiring shift, and in effect makes longer words take longer to type on average than shorter ones.




___
##License:
ISC
