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

  document.querySelector("#viewAllRestaurants").addEventListener("click", function (e) {
    e.preventDefault();
    ajaxGET("/viewRestNew", function (data) {
      window.location.replace("/viewRestNew");
    });
  });

  document.querySelector("#viewAllRecipes").addEventListener("click", function (e) {
    e.preventDefault();
    ajaxGET("/viewRecipes", function (data) {
      window.location.replace("/viewRecipes");
    });
  });
 
});

function ready(callback) {
  if (document.readyState != "loading") {
    callback();
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
}