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

    document.querySelector('.info').addEventListener('click', function() {
        window.location.replace("/recipe");
    });

    document.querySelector('.image-box').addEventListener('click', function() {
        window.location.replace("/recipe");
    })

    document.getElementById('search-btn').addEventListener('click', function() {
        window.location.replace('/mainPageUser');
    })

    window.addEventListener("load", function(e) {
        e.preventDefault();
        let currentUser = String(this.localStorage.getItem("currentUserID"));
        console.log(currentUser);

    });

    window.addEventListener("load", function(e) {
        e.preventDefault();
        ajaxGET("/api/restaurant", function(data) {
            console.log(JSON.parse(data));
            let dataParsed = JSON.parse(data);
            console.log(dataParsed);
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