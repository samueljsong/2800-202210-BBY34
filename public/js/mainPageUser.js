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

    document.getElementById('e').addEventListener('click', function() {
        window.location.replace("/viewRestNew");
    })

    document.getElementById('rec').addEventListener('click', function() {
        window.location.replace("/recipe");
    })

    document.getElementById('wallflower').addEventListener('click', function() {
        window.location.replace("/restaurant");
    })

    function display(restaurant) {
        const restName = document.getElementById("title");
        const desc = document.getElementById("description");
        restName.querySelector("title").textContent = restaurant.restaurantName;
        desc.querySelector("description").textContent = restaurant.description;
        postTemplate.querySelector(".email").textContent = restaurant.email;
        postTemplate.querySelector(".userListForAdmin").id = restaurant._id;
        postParent.appendChild(postTemplate);
    }

});

function ready(callback) {
    if (document.readyState != "loading") {
        callback();
    } else {
        document.addEventListener("DOMContentLoaded", callback);
    }
}