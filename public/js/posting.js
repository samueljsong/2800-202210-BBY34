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

  function ajaxPOST(url, callback, data) {
    console.log(data);

    const xhr = new XMLHttpRequest();

    xhr.onload = function() {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
        callback(this.responseText);
      } else {
        console.log(this.status);
        window.location.replace("/viewRecipes");
      }
    };
    xhr.open("POST", url);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
  }

  document.getElementById("btn").addEventListener("click", function(e) {
    e.preventDefault();
    const title = document.getElementById("userRecipeTitle").value;
    const ing = document.getElementById("ingredientsInput").value;
    const ins = document.getElementById("recipeInput").value;

    const recipeJSON = JSON.stringify({
      recipeName: title,
      ingredients: ing,
      instructions: ins,
    });

    ajaxPOST(
      "/api/recipe",
      function(data) {
        if (data) {
          let dataParsed = JSON.parse(data);
          if (dataParsed.status == "fail") {
            console.log(dataParsed.msg);
          } else {
            console.log(dataParsed.msg);
            window.location.replace("/recipe");
          }
        }
      },
      recipeJSON
    );
  });

  document.getElementById('goBackButton').addEventListener('click', function() {
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