# _Work in progress_

# SentenceCreation backend

## Description

SentenceCreation is a RESTful API that procedurally generates a near infinite number of sentences (currently in Polish) based on specified sentence formulas, and will test your ability to translate them into English.

## Instructions

<br/>
You can download this repository and run the project locally by following these steps:

1. Fork this repository by clicking the button labelled 'Fork' on the [project page](https://github.com/chicorycolumn/SentenceCreation).
   <br/>
   Copy the url of your forked copy of the repository, and run `git clone the_url_of_your_forked_copy` in a Terminal window on your computer, replacing the long underscored word with your url.
   <br/>
   If you are unsure, instructions on forking can be found [here](https://guides.github.com/activities/forking/) or [here](https://www.toolsqa.com/git/git-fork/), and cloning [here](https://www.wikihow.com/Clone-a-Repository-on-Github) or [here](https://www.howtogeek.com/451360/how-to-clone-a-github-repository/).

2. Open the project in a code editor, and run `npm install` to install necessary packages. You may also need to install [Node.js](https://nodejs.org/en/) by running `npm install node.js`.

3. Run `npm start` to run the project.

4. Use an API testing tool like Insomnia to test the endpoints of this project, by sending http requests to [http://localhost:9090](http://localhost:9090).

5. Run the battery of tests written specifically for this project with `npm test`.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Hosting

General instructions for taking a **project with a PSQL database** and hosting it on **Heroku** for **manual deployment** are as follows:

0. Ensure the project is initialised in a Git repository. If you are unsure what this means, instructions can be found [here](https://medium.com/@JinnaBalu/initialize-local-git-repository-push-to-the-remote-repository-787f83ff999) and [here](https://www.theserverside.com/video/How-to-create-a-local-repository-with-the-git-init-command).

1. Install the Heroku CLI with `npm install heroku` and login to your account with `heroku login`. Other ways to install it are `sudo snap install --classic heroku` on Ubuntu or `brew tap heroku/brew && brew install heroku` on MacOS.

2. Making sure you are in the project folder, create the app with `heroku create my-awesome-app`, then check it has succeeded with `git remote -v`, which should show you a Heroku url with that project name, then push the code to it with `git push heroku master`.

3. In a browser, go to the Heroku site, log in, select your app, then _Configure Add-ons_ then choose _Heroku Postgres free tier_.

4. Check that your database url has been added to the environment variables on Heroku with `heroku config:get DATABASE_URL`. If you are in your app's directory, and the database is correctly linked as an add-on to Heroku, it should display a DB URI string that is exactly the same as the one in your credentials on Heroku.

5. Run `git add .` then `git commit -m "Pushing to Heroku"` then `git push heroku main`.

6. Run `npm run seed:prod` then `npm start`, then repeat step 5.

7. The project should now be live and hosted, and can be viewed by running `heroku open`, and issues can be debugged with `heroku logs --tail`.

## Built with

- [JavaScript](https://www.javascript.com/) - The primary coding language
- [VisualStudioCode](https://code.visualstudio.com/) - The code editor

- [Mocha](https://mochajs.org/) - The testing framework
- [Chai](https://www.chaijs.com/) - The testing library

## Testing

To test the program with logs, run `npm t` (t stands for 'test').
To test the program without logs, run `npm t r` (r stands for 'refrain').
