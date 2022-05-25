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
        ajaxGET("/api/restaurant", function(data) {
            let dataParsed = JSON.parse(data);
            let i = 0;
            let total = "";
            dataParsed(function(e) {
                const name = document.getElementById('title');
                const info = document.getElementById('description');
                const pic = document.getElementsByClassName('image-box');
                const addr = document.getElementById('ad');
                const num = document.getElementById('phoneNum');
                const open = document.getElementById('opening');
                name.textContent = dataParsed[i].restaurantName;
                info.textContent = dataParsed[i].description;
                pic.textContent = dataParsed[i].picture;
                addr.textContent = dataParsed[i].address;
                num.textContent = dataParsed[i].phone;
                open.textContent = dataParsed[i].openingHours;
                i++;
            });
        });
    });

    document.querySelector('.info').addEventListener('click', function() {
        window.location.replace("/recipe");
    });

    document.querySelector('.image-box').addEventListener('click', function() {
        window.location.replace("/recipe");
    })

    document.getElementById('search-btn').addEventListener('click', function() {
        window.location.replace('/mainPageUser');
    })

    document.getElementById('post').addEventListener('click', function() {
        window.location.replace('/recipeInput');
    })

});

function ready(callback) {
    if (document.readyState != "loading") {
        callback();
    } else {
        document.addEventListener("DOMContentLoaded", callback);
    }
}