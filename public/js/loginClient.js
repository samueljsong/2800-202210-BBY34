ready(function () {
    function ajaxGET(path, callback) {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                callback(this.responseText);
            }
        }
        xhr.open("GET", path);
        xhr.send();
    }

    function ajaxPOST(url, callback, data) {

        let params = typeof data == 'string' ? data : Object.keys(data).map(
            function (k) {
                return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
            }
        ).join('&');
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                callback(this.responseText);

            } else {
                function popUpEmptyMsg() {
                    ajaxGET("/loginErrorNoUserFound", function (data) {
                        document.getElementById("errorMsg").innerHTML = data;
                    });
                }
                popUpEmptyMsg();
                setTimeout(function () {
                    window.location.replace("/");
                }, 2000);
            }
        }
        xhr.open("POST", url);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(params);
    }

    document.querySelector("#submitLogin").addEventListener("click", function (e) {
        e.preventDefault();
        let email = document.getElementById("typeEmailX");
        let password = document.getElementById("typePasswordX");
        let queryString = "email=" + email.value + "&password=" + password.value;

        ajaxPOST("/api/login", function (data) {

            if (data) {
                let dataParsed = JSON.parse(data);
                if (dataParsed.status == "fail") {
                    document.getElementById("errorMsg").innerHTML = dataParsed.msg;
                } else {
                    localStorage.setItem("currentUserID", dataParsed.userId);
                    if(dataParsed.msg.toUpperCase() === "USER") {
                        window.location.replace("/mainPageUser");
                    } else if (dataParsed.msg.toUpperCase() === "ADMIN") {
                        window.location.replace("/adminMain");
                    }
                }
            }
        }, queryString);
    });

    document.querySelector("#signUp").addEventListener("click", function (e) {
        e.preventDefault();
        ajaxGET("/signUp", function (data) {
          window.location.replace("/signUp");
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