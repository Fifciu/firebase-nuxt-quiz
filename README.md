# Firebase Nuxt Quiz

> Nuxt.js + Firebase Database/Auth simple quiz project
> Created in order to learn something about Firebase

## How to install
Clone this repo
``` bash
git clone https://github.com/FilipJedrasik/firebase-nuxt-quiz.git
```
Create project on 
https://firebase.google.com/ <br>

Go to "Database" Tab and import fir-nuxt-quiz-export.json
It is good to disable restrinctions in rules subtab when you are testing App.
``` bash
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

Go to "Authentication" Tab and enable login by Email/password. Then get api keys and put them in firebase.js file in main directory (same as package.json, nuxt.config.js...). 
It should look like that:
``` bash
module.exports = {
  apiKey: "my-super-key",
  authDomain: "my-super-domain",
  databaseURL: "my-super-database",
  projectId: "fir-nuxt-quiz",
  storageBucket: "my-super-appspot",
  messagingSenderId: "xxxxxxxxxx"
}
```

Run <b>npm install</b>

Okay, now you can use <b>npm run dev</b> to locally test the App. If you want to deploy - read below.

## How to deploy
Open nuxt.config.js
In line 58. you have
``` bash
base: process.env.DEPLOY_ENV === 'GH_PAGES' ? '/firebase-nuxt-quiz/' : '/'
```
Where <b>/firebase-nuxt-quiz/</b> is your basic path to app while using npm run build/npm run generate.
I chose that one for my Github Pages. At the end you have to run npm run generate and upload <b>/dist</b> folder to your server. If you want to push it to gh-pages - use <b>npm run deploy</b>