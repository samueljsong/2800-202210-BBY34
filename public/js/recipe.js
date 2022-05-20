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

  window.addEventListener("load", function(e) {
    e.preventDefault();
    let currentUser = String(this.localStorage.getItem("currentUserID"));
    console.log(currentUser);

  });

  window.addEventListener("load", function(e) {
    e.preventDefault();
    ajaxGET("/api/recipe", function(data) {
      console.log(JSON.parse(data));
      let dataParsed = JSON.parse(data);
      console.log(dataParsed);
      console.log(dataParsed.recipeName);
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