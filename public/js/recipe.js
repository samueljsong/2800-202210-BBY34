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

  document.querySelector("#back").addEventListener("click", function(e) {
    e.preventDefault();
    ajaxGET("/mainPageUser", function(data) {
      window.location.replace("/mainPageUser");
    });
  });



});