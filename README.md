# typerFaker
Fake your wpm in typing races
___

###Current status:
Basic program, does not work with any args yet, inefficient, made quickly when I should have been working on my team's hackathon project.

###Usage:
	> git clone https://github.com/CyrusRoshan/typerFaker.git
	> cd typerFaker/files
* then if using browser based typing challenge
	* ``` > node typerFaker.js -browser -wpm [desired wpm] ```
	* e.g. ``` > node typerFaker.js -browser -wpm 125 ```

* or if already supplying text to be typed (e.g. in another program or in a VM)
	* ``` > node typerFaker.js -nobrowser -t [ms to wait until starting] -wpm [desired wpm] -text [text, encapsulated in \`] ```
	* e.g. ``` > node typerFaker.js -nobrowser -t 5000 -wpm 125 -text `string to type quickly` ```

###Additional Options (not yet implemented)
* ```-lazyBrowser```, attempts to isolate the text needed to be typed, in addition to finding the correct time to begin typing
* ```-maximumRealism```, makes the typing as humanlike as possible. Adds simple typos and corrects them, types out each word letter by letter, with faster speeds on sequential letters, slower speeds on characters requiring shift, and in effect makes longer words take longer to type on average than shorter ones.




___
##License:
ISC
