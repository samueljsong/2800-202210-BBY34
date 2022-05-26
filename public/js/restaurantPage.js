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
    ajaxGET("/api/restaurant", function(data) {
      console.log(JSON.parse(data));
    });
  });

  let restaurant = JSON.parse(window.localStorage.getItem('restaurantID'));
  console.log(restaurant);

  document.getElementById('description').innerHTML = restaurant.description;

  document.getElementById('address').innerHTML = restaurant.address;

  let hourString = "";
  hourString += "<ul>";
  hourString += "<li>" + restaurant.openingHours.sunday + "</li>";
  hourString += "<li>" + restaurant.openingHours.monday + "</li>";
  hourString += "<li>" + restaurant.openingHours.tuesday + "</li>";
  hourString += "<li>" + restaurant.openingHours.wednesday + "</li>";
  hourString += "<li>" + restaurant.openingHours.thursday + "</li>";
  hourString += "<li>" + restaurant.openingHours.friday + "</li>";
  hourString += "<li>" + restaurant.openingHours.saturday + "</li>";
  hourString += "</ul>";

  document.getElementById('hours').innerHTML = hourString;

  document.getElementById('title').innerHTML = restaurant.restaurantName;

  document.getElementById('number').innerHTML = restaurant.phone;

});

function ready(callback) {
  if (document.readyState != "loading") {
    callback();
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
}