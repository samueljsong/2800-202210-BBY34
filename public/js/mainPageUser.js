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
        ajaxGET("/api/restaurant", function(data) {
            console.log(JSON.parse(data));
            let dataParsed = JSON.parse(data);
            let i = 0;
            let j = 0;
            let total = "";

            const id = dataParsed[i]._id;
            console.log(id);

            for (i = 0; i < dataParsed.length; i++) {
                let temp = i + '<div class="image-box"></div>'
                temp += '<h1 id="title">' + dataParsed[i].restaurantName;
                temp += '<div id = "description"></div>'
                temp += '<div id = "ad"></div>'
                temp += '<div id = "phoneNum"></div>'
                temp += '<div id = "opening"></div>'

                total += temp;
                console.log(temp);
            }


            const populate = document.getElementById("card");
            populate.innerHTML = total;

            for (j = 0; j < dataParsed.length; j++) {
                let card = "card-template" + j;
                document.getElementById(card).addEventListener('click', function() {
                    let length = card.length;
                    let num = card.substring(length - 1);
                    console.log(num);
                    window.localStorage.setItem('restaurantID', JSON.stringify(dataParsed[num]))
                    console.log(JSON.parse(window.localStorage.getItem('restaurantID')));
                    window.location.replace('/viewRestNew');
                })
            }

            document.getElementById('search-btn').addEventListener('click', function() {
                window.location.replace('/mainPageUser');
            })

            document.getElementById('post').addEventListener('click', function() {
                window.location.replace('/recipeInput');
            })




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