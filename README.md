# FT Tech Test

## Test Instructions

Build a server-rendered site that displays an article from The Financial Times. You may use our Developer APIs to achieve this.
Provide a search box for users to search for headlines containing specific words (i.e. searching for "brexit" should return a list of brexit-related headlines).

## Running the app

- Visit: http://intense-shore-82818.herokuapp.com/

*OR* 

- Run `git clone` this repo
- Run `cd ft-tech-test` to change into the correct directory
- Run `npm install` to install all packages
- Run `npm start` to change into this project
- On a browser enter `localhost:50000`


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
### Deploued on Heroku
After configuring the MongoDB, I was able to have an active version of the app on Heroku.

# Other points to make

I normally would test but to get this tech test out to you quicker (and it being optional), I chose to forsake the few tests I'd write. Can update the repo with tests if you'd like to see how I test too.

There is a bug whereby if you search once and press back then try another search, the previous search results remain. A work-around is to refresh the page. I would have liked to fix this bug with more time.

I also couldn't figure out why not all the documents I found were being saved and would have liked to spend more time figuring out how to show most, if not all the articles being found by the API call. If I figured this out, I could have implemented pagination.
