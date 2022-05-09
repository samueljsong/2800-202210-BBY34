"use strict";
ready(function () {
  function ajaxGET(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        callback(this.responseText);
      } else {
        console.log(this.status);
      }
    };
    xhr.open("GET", url);
    xhr.send();
  }

  let homeArr = document.getElementsByClassName("homeUser");

  Array.from(homeArr).forEach(element => {
    element.addEventListener("click", function (e) {
      e.preventDefault();
      ajaxGET("/mainPageUser", function (data) {
        window.location.replace("/mainPageUser");
      });
    });
  });

  document.querySelector("#homeUser2").addEventListener("click", function (e) {
    e.preventDefault();
    ajaxGET("/mainPageUser", function (data) {
      window.location.replace("/mainPageUser");
    });
  });

  let dropUpDownArr = document.getElementsByClassName("picProfile");

  Array.from(dropUpDownArr).forEach(element => {
    element.addEventListener("click", function (e) {
      e.preventDefault();
      ajaxGET("/profileUser", function (data) {
        window.location.replace("/profileUser");
      });
    });
  });

  document
    .querySelector("#restaurants")
    .addEventListener("click", function (e) {
      e.preventDefault();
      ajaxGET("/viewRestaurants", function (data) {
        window.location.replace("/viewRestaurants");
      });
    });

  document
    .querySelector("#restaurants2")
    .addEventListener("click", function (e) {
      e.preventDefault();
      ajaxGET("/viewRestaurants", function (data) {
        window.location.replace("/viewRestaurants");
      });
    });

  document.querySelector("#recipes").addEventListener("click", function (e) {
    e.preventDefault();
    ajaxGET("/recipe", function (data) {
      window.location.replace("/recipe");
    });
  });

  document.querySelector("#recipes2").addEventListener("click", function (e) {
    e.preventDefault();
    ajaxGET("/recipe", function (data) {
      window.location.replace("/recipe");
    });
  });

  document.querySelector("#favourites").addEventListener("click", function (e) {
    e.preventDefault();
    ajaxGET("/fav", function (data) {
      window.location.replace("/fav");
    });
  });

  document
    .querySelector("#favourites2")
    .addEventListener("click", function (e) {
      e.preventDefault();
      ajaxGET("/fav", function (data) {
        window.location.replace("/fav");
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