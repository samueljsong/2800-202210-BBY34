"use strict";

//HTTPS request
const Http = new XMLHttpRequest();
const url = 'http://localhost:8000/api/recipe';
Http.open("GET", url);
Http.send();

Http.onreadystatechange = (e) => {
  console.log(Http.responseText)
}


// this is for the image
const img = document.getElementById('taco');
const ingredient = document.getElementById("list");
const instruction = document.getElementById("instructions");
const title = document.getElementById('recipe-title');

//title
let header = "<h1>"
header += "MONGODB"
header += "</h1>"

//ingredients
let ing = "<text>";
ing += "test run of the ingredients from MONGO";
ing += "</text>";

//instructions
let ins = "<text>";
ins += "test run of the instructions from MONGO";
ins += "</text>";

//changing the HTML for that element
ingredient.innerHTML = ing;
instruction.innerHTML = ins;
title.innerHTML = header;

img.style.backgroundImage = "url('MONGO')";