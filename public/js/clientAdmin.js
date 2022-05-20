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

  let homeArr = document.getElementsByClassName("homeAdmin");

  Array.from(homeArr).forEach(element => {
    element.addEventListener("click", function (e) {
      e.preventDefault();
      ajaxGET("/adminMain", function (data) {
        window.location.replace("/adminMain");
      });
    });
  });

  document.querySelector("#homeAdmin2").addEventListener("click", function (e) {
    e.preventDefault();
    ajaxGET("/adminMain", function (data) {
      window.location.replace("/adminMain");
    });
  });

  document
  .querySelector("#userProfilePhotoNavBarTop")
  .addEventListener("click", function (e) {
    e.preventDefault();
    ajaxGET("/profileAdmin", function (data) {
      window.location.replace("/profileAdmin");
    });
  });

document
  .querySelector("#userProfilePhotoNavBarBot")
  .addEventListener("click", function (e) {
    e.preventDefault();
    ajaxGET("/profileAdmin", function (data) {
      window.location.replace("/profileAdmin");
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

  let dashboardArr = document.getElementsByClassName("dashboardAdmin");

  Array.from(dashboardArr).forEach(element => {
    element.addEventListener("click", function (e) {
      e.preventDefault();
      ajaxGET("/dashboardAdmin", function (data) {
        window.location.replace("/dashboardAdmin");
      });
    });
  });

  window.addEventListener("load", function (e) {
    e.preventDefault();
    let currentUser = String(this.localStorage.getItem("currentUserID"));
    
    ajaxGET("/api/user/" + currentUser, function (data) {
      
      let dataParsed = JSON.parse(data);
      document.getElementById("fullName").textContent = dataParsed.username;
      let picData = "/img/";
      let imgSrc = picData.concat(dataParsed.picture);
      let photoIdNavBarBot = "userProfilePhotoNavBarBot";
      let photoIdNavBarTop = "userProfilePhotoNavBarTop";

      displayUserProfilePic(imgSrc, photoIdNavBarBot);
      displayUserProfilePic(imgSrc, photoIdNavBarTop);
    });
  });

  function displayUserProfilePic(photo, photoId){
    var img = document.createElement("img");
    img.src = photo;
    var div = document.getElementById(photoId);
    div.appendChild(img);
  }

});

function ready(callback) {
  if (document.readyState != "loading") {
    callback();
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
}