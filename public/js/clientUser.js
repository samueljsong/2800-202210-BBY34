ready(function() {

    console.log("Client script loaded.");

    function ajaxGET(url, callback) {

        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                callback(this.responseText);
            } else {
                console.log(this.status);
            }
        }
        xhr.open("GET", url);
        xhr.send();
    }

    document.querySelector("#homeUser").addEventListener("click", function(e) {
        e.preventDefault();
        ajaxGET("/profileUser", function(data) {
            window.location.replace("/profileUser");

        });
    });

    document.querySelector("#homeUser2").addEventListener("click", function(e) {
        e.preventDefault();
        ajaxGET("/profileUser", function(data) {
            window.location.replace("/profileUser");

        });
    });

    document.querySelector("#restaurants").addEventListener("click", function(e) {
        e.preventDefault();
        ajaxGET("/viewRestaurants", function(data) {
            window.location.replace("/viewRestaurants");

        });
    });

    document.querySelector("#restaurants2").addEventListener("click", function(e) {
        e.preventDefault();
        ajaxGET("/viewRestaurants", function(data) {
            window.location.replace("/viewRestaurants");

        });
    });

    document.querySelector("#recipes").addEventListener("click", function(e) {
        e.preventDefault();
        ajaxGET("/recipe", function(data) {
            window.location.replace("/recipe");

        });
    });

    document.querySelector("#recipes2").addEventListener("click", function(e) {
        e.preventDefault();
        ajaxGET("/recipe", function(data) {
            window.location.replace("/recipe");

        });
    });

    document.querySelector("#favourites").addEventListener("click", function(e) {
        e.preventDefault();
        ajaxGET("/fav", function(data) {
            window.location.replace("/fav");

        });
    });

    document.querySelector("#favourites2").addEventListener("click", function(e) {
        e.preventDefault();
        ajaxGET("/fav", function(data) {
            window.location.replace("/fav");

        });
    });

    document.querySelector("#logoutProfilePic").addEventListener("click", function(e) {
        e.preventDefault();
        ajaxGET("/", function(data) {
            window.location.replace("/");

        });
    });

    document.querySelector("#logoutProfilePic2").addEventListener("click", function(e) {
        e.preventDefault();
        ajaxGET("/", function(data) {
            window.location.replace("/");

        });
    });
});


function ready(callback) {
    if (document.readyState != "loading") {
        callback();
        console.log("ready state is 'complete'");
    } else {
        document.addEventListener("DOMContentLoaded", callback);
        console.log("Listener was invoked");
    }
}