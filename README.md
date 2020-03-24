# FT Tech Test

## Test Instructions

Build a server-rendered site that displays an article from The Financial Times. You may use our Developer APIs to achieve this.
Provide a search box for users to search for headlines containing specific words (i.e. searching for "brexit" should return a list of brexit-related headlines).

## Setting up the project

- Run `git clone` this repo
- Run `cd ft-tech-test` to change into the correct directory
- Run `npm install` to install all packages

## Running the app

- Run `npm start` to change into this project
- On a browser enter `localhost:3000`


## To test
- N/A yet

# Points I addressed


### Be responsive
I included the `<meta>` viewport element and set the width to device-width and initial scale to 1 so that the size of the page adjusts well depending on whichever device is using the app.

### Be accessible 
The links in the searches are underlined, hyperlinks which are easier to see and interact with.
If you press tab, there is a focus indicator on the searches in the form of a box.
There is a placeholder field in the search box in `index.pug` AND a label so that a user with a screenreader can be told what to search for.


### Built using Javascript and Node.JS
### Not be reliant of client-side frameworks like Angular or React 
### Uses Origami Components
Included Origami components from the CSS and JS scripts links in my HTML
### Have a similar look and feel as ft.com - https://www.ft.com/
Should use similar Origami components and so have same colour scheme and typography

# Other points to make

I normally wouldn't leave my .env file in git commits but for the purpose of ease and the fact that repo is private, I left the .env file with the API key in it.

There is a bug whereby if you search once and press back then try another search, the previous search results remain. A work-around is to go back and search again or refresh the page. I would have liked to fix this bug,

I also couldn't figure out why not all the documents I found were being saved and would have liked to spend more time figuring out how to show most, if not all the articles being found by the API call. If I figured this out, I could have implemented pagination.
