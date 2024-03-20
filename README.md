# Kanon Gaming Test - Backend

In this folder, you can find the backend for solving the test assignment

## Stack

- TypeScript
- Node.js
- Express
- eslint and prettier

## Setup

This backend application was deployed on 'Vercel' cloud service and is accessible via this link: https://casino-test-back.vercel.app/ , so there is no need to set up anything to work with this application. The 'Vercel' deployment config is located in 'vercel.json' file. This app is designed so that it is possible to access the endpoints both from the deployed version and from the local version of the frontend. But there is a possibility to also run this backend application locally. In order to do so, there are two steps that you have to take:

- run these commands in root folder of the app:

```
npm install
tsc
npm run start
```
- In files 'GameListSlice.ts' and 'SlotSlice.ts' on the frontend, remove the url in the 'GAMEDATA_ENDPOINT_URL' and 'SPIN_ENDPOINT_URL' constants located on top of the files and leave it empty ('').

### Explanation

In general, it is not the greatest way to resolve the functionality to fetch from either cloud or local API, but, in my case, I turn off the deployment of API on cloud to work on changes to the app locally before deployment, so API from cloud becomes unaccessible and I do not have to resolve any additional functionality. But, since you have no access to turning off my backend deployment on cloud, leaving the url for cloud endpoints empty would provide similar functionality

## Description

This application holds all needed endpoints for solving this assignment. As required, exceptions were used.

## Endpoints

There are three endpoints in this app:

- /spin
- /gamelist
- / that shows the available routes

## /spin

The spin endpoint is responsible for the logic of the slot machine spinning. Its' logic works this way:

- Randomizing the result of each of three reels
- Unite them in an array
- Taking first letter of each result
- Map it to reward patterns
- In case of a match, updating the amount of coins won by user
- Sending to frontend the spin result and the amount of coins won on this spin

On the frontend, the spin result is being displayed by a picture of a corresponding fruit, and the amount of coins won are displayed, as well as added to user's current amount of coins

## /gamelist

The gamelist endpoint is very straightforward. It sends all the data from the 'game-data.json' file to frontend. Since it was not specified whether I should store this file on frontend or backend, I have decided to send it from the backend, since it sounds as a more optimal approach.

On the frontend, data of each game is being demonstrated in a separate game card ('GameCard' component). Also it is possible to do the search through the search bar, and the game list is being updated accordingly.