"use strict";
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

  let homeArr = document.getElementsByClassName("homeUser");

  Array.from(homeArr).forEach(element => {
    element.addEventListener("click", function(e) {
      e.preventDefault();
      ajaxGET("/mainPageUser", function(data) {
        window.location.replace("/mainPageUser");
      });
    });
  });

  document.querySelector("#homeUser2").addEventListener("click", function(e) {
    e.preventDefault();
    ajaxGET("/mainPageUser", function(data) {
      window.location.replace("/mainPageUser");
    });
  });

  document
  .querySelector("#userProfilePhotoNavBarTop")
  .addEventListener("click", function (e) {
    e.preventDefault();
    ajaxGET("/profileUser", function (data) {
      window.location.replace("/profileUser");
    });
  });

document
  .querySelector("#userProfilePhotoNavBarBot")
  .addEventListener("click", function (e) {
    e.preventDefault();
    ajaxGET("/profileUser", function (data) {
      window.location.replace("/profileUser");
    });
  });

  document
    .querySelector("#restaurants")
    .addEventListener("click", function(e) {
      e.preventDefault();
      ajaxGET("/viewRestNew", function(data) {
        window.location.replace("/viewRestNew");
      });
    });

  document
    .querySelector("#restaurants2")
    .addEventListener("click", function(e) {
      e.preventDefault();
      ajaxGET("/viewRestNew", function(data) {
        window.location.replace("/viewRestNew");
      });
    });

  document.querySelector("#recipes").addEventListener("click", function(e) {
    e.preventDefault();
    ajaxGET("/viewRecipes", function(data) {
      window.location.replace("/viewRecipes");
    });
  });

  document.querySelector("#recipes2").addEventListener("click", function(e) {
    e.preventDefault();
    ajaxGET("/viewRecipes", function(data) {
      window.location.replace("/viewRecipes");
    });
  });

  document.querySelector("#favourites").addEventListener("click", function(e) {
    e.preventDefault();
    ajaxGET("/fav", function(data) {
      window.location.replace("/fav");
    });
  });

  document
    .querySelector("#favourites2")
    .addEventListener("click", function(e) {
      e.preventDefault();
      ajaxGET("/fav", function(data) {
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