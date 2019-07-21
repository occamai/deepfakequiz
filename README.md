# deepfakequiz

## local development

In general, I prototyped this project very quickly.  It could use some TLC...

### http post server

This is the lightweight server that receives the quiz results at the end of the app.  It writes the results to the file system.

Installation as follows:
* Ubuntu 18.04 ( likely other versions work, but that's what I used )
* Install a recent version of nodejs ( I used v11.6.0 )
* Clone this repository
* cd into deepfakequiz/react-tutorial
* Make sure there is a "data" directory in there.  If it does not exist, then mkdir it.  Don't worry, its in ".gitignore."
* Run the server as follows at the command line:  >> node dfsrv.js

### reactjs server

This is the reactjs server that runs the main quiz application.

Installation as follows:
* Ubuntu 18.04 ( likely other versions work, but that's what I used
* Install a recent version of ReactJS ( I think I used this https://www.techomoro.com/how-to-install-and-setup-a-react-app-on-ubuntu-18-04-1/ )
* Now, cd into deepfakequiz/react-tutorial
* Install the project dependencies at the command line: >> npm install
* Edit the src/global.js file and make the the local settings are uncommented (ie, googleAuth=false )
* Run the server as follows at the command line: >> npm start

## production deployment

TBD
