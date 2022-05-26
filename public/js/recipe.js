"use strict";
//HTTPS request
ready(function() {
  function ajaxGET(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        callback(this.responseText);
      } else {
        console.log(this.status);
      }
    };
    xhr.open("GET", url);
    xhr.send();
  }

  window.addEventListener("load", function(e) {
    e.preventDefault();
    let currentUser = String(this.localStorage.getItem("currentUserID"));
    console.log(currentUser);

  });

  window.addEventListener("load", function(e) {
    e.preventDefault();
    ajaxGET("/api/recipe", function(data) {
      console.log(JSON.parse(data));
    });
  });

  let recipe = JSON.parse(window.localStorage.getItem('recipeID'));
  console.log(recipe);

  const title = document.getElementById('recipe-title');
  title.innerHTML = recipe.recipeName;

  document.getElementById('list').innerHTML = recipe.ingredients;

  document.getElementById('text').innerHTML = recipe.instructions;


  document.getElementById('back').addEventListener('click', function() {
    window.location.replace('/mainPageUser');
  })


});

function ready(callback) {
  if (document.readyState != "loading") {
    callback();
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
}