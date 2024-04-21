# Checkminder
The motivation behind building this project was to have an application that could keep track of the items I needed to pack, primarily for my gym bag. Before I used a basic checklist editor but found it tedious having to uncheck all the items before following the list and checking them all again! Hence, the idea of simplifying this daily task was born.

**Check it out**: <https://francisquinn.github.io/checkminder/>

## How it works
I wanted to keep the project as simple as possible. The landing page contains all the checklists. There are some basic functions like edit, delete or create a new list. Within each list are the items which are structured in the same manner. 

Within each list there is a play icon that starts the checker function which begins to check each item one-by-one. There are 2 main actions on this page:
- Check
- Skip

At the end of the checker the 2 lists (Checked and skipped) are displayed with an option to return back to the list.

That’s it!

## How to use
There are two ways to use Checkminder:
- Directly from the browser
- As a Progressive Web Application (PWA)

Find out more on how to install a PWA on your device here

⚠️ LocalStorage is used to store the list details so data is not shared between browsers

## Technology
React, Vite and a touch of CSS

## Installation
To install Checkminder simply fork this repo then run the command
```
npm install
```
Then to start the development server run:
```
npm run dev
```
Any contributions are much appreciated :)

## Future development
- Adding settings to customise the interface
- iOS application
- Database storage
- Move list items

## Collaboration
If you would like to collaborate with me on this project get it touch!

## Licence
MIT licence


