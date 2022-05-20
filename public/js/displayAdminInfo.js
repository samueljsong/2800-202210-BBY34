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

  window.addEventListener("load", function (e) {
    e.preventDefault();
    let currentUser = String(this.localStorage.getItem("currentUserID"));
    console.log(currentUser);
    ajaxGET("/api/user/" + currentUser, function (data) {
      console.log(JSON.parse(data));
      let dataParsed = JSON.parse(data);
      document.getElementById("profileName").textContent = dataParsed.username;
      document.getElementById("email").textContent = dataParsed.email;
      let picData = "/img/";
      let imgSrc = picData.concat(dataParsed.picture);
      let photoId = "userProfilePhoto";

      displayUserProfilePic(imgSrc, photoId);
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