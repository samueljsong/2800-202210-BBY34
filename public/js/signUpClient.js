ready(function () {

    function ajaxPOST(url, callback, data, flag) {
        let params = typeof data == 'string' ? data : Object.keys(data).map(
            function (k) {
                return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
            }
        ).join('&');
        console.log("params in ajaxPOST", params);

        const xhr = new XMLHttpRequest();
        if (flag === "signup") {


            xhr.onload = function () {
                if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
                    callback(this.responseText);

                } else {
                    console.log(this.status);
                }
            }
            xhr.open("POST", url);
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(params);
            console.log(params);
        } else if (flag === "login") {
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
    }

    document.querySelector("#signUpUser").addEventListener("click", function (e) {
        e.preventDefault();
        let userName = document.getElementById("userSignUpName");
        let email = document.getElementById("userSignUpEmail");
        let password = document.getElementById("userSignUpPassword");
        let queryString = "email=" + email.value + "&username=" + userName.value + "&password=" + password.value + "&userType=User";

        ajaxPOST("/api/signup", function (data) {
            if (data) {
                console.log(data);
                let dataParsed = JSON.parse(data);
                if (dataParsed.status == "fail") {
                    console.log(dataParsed.msg);
                } else {
                    console.log(dataParsed.msg);
                    let signUpString = "email=" + email.value + "&password=" + password.value;
                    ajaxPOST("/api/login", function (data) {
                        if (data) {
                            let dataParsed = JSON.parse(data);
                            if (dataParsed.status == "fail") {
                                document.getElementById("errorMsg").innerHTML = dataParsed.msg;
                            } else {
                                if (dataParsed.msg.toUpperCase() === "USER") {
                                    window.location.replace("/mainPageUser");
                                } else if (dataParsed.msg.toUpperCase() === "ADMIN") {
                                    window.location.replace("/adminMain");
                                }
                            }
                        }
                    }, signUpString, "login");
                }
            }
        }, queryString, "signup");
    });

});


function ready(callback) {
    if (document.readyState != "loading") {
        callback();
    } else {
        document.addEventListener("DOMContentLoaded", callback);
    }
}