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
    let params =
      typeof data == "string" ?
      data :
      Object.keys(data)
      .map(function(k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
      })
      .join("&");

    const xhr = new XMLHttpRequest();

    xhr.onload = function() {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
        callback(this.responseText);
      } else {
        console.log(this.status);
      }
    };
    xhr.open("POST", url);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(params);
  }

  document.getElementById('btn').addEventListener('click', function(e) {
    e.preventDefault();
    let title = document.getElementById('userRecipeTitle').value;
    let ing = document.getElementById('ingredientsInput').value;
    let ins = document.getElementById('recipeInput').value;


    let queryString =
      "recipeName=" +
      title +
      "&ingredients=" +
      ing +
      "&instructions=" +
      ins;
    console.log(queryString);
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
      queryString
    );
  });

});

function ready(callback) {
  if (document.readyState != "loading") {
    callback();
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
}