# WanderVilla

Discover, list, and book villa rentals effortlessly with WanderVilla.
Our platform offers secure booking, user reviews, and interactive maps for seamless travel experiences.
Whether you're a traveler seeking unique accommodations or a villa owner looking to showcase your property, 
WanderVilla is your ultimate destination for unforgettable villa stays.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)


## Installation

git clone https://github.com/barsaiyan99/WanderVilla.git
cd WanderVilla
node install   /   node install --force
node app.js    /   nodemon app.js

## Usage
before everything use mongodb_url of your localhost in app.js & index.js file inside init folder
first of all type cd init & comment out line number 22 initData.data=initData.data.map((obj)=>({...obj,owner:"6639f778022e2ccb491ee948"}));
then type node index.js
then signup & login
then open cmd & type mongosh after it type db.users.find({});
then go on to cd init & type node index.js and add the commented line to the code at line number 22 initData.data=initData.data.map((obj)=>({...obj,owner:"PASTE THE USER_ID"}));
then You are ready to go with the project 
