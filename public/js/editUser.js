ready(function () {
    function ajaxGET(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                callback(this.responseText);
            } else {
                console.log(this.status);
            }
        };
        xhr.open("GET", url);
        xhr.send();
    }

    window.addEventListener("load", function (e) {
        e.preventDefault();
        let currentUser = String(this.localStorage.getItem("currentUserID"));
        ajaxGET("/api/user/" + currentUser, function (data) {
            console.log(JSON.parse(data))
            let dataParsed = JSON.parse(data)
            document.getElementById("profileName").textContent = dataParsed.username;
            document.getElementById("fullName").textContent = dataParsed.username;
            document.getElementById("email").textContent = dataParsed.email;      
            attachEventListener();
        });
    });

    function attachEventListener() {
        document.getElementById('editInfo').addEventListener("click", function () {
            let userIdEdit = localStorage.getItem("currentUserID");
            updateUser(userIdEdit);
        })
    }



    function updateUser(userIdEdit) {
        let idString =  String(localStorage.getItem('currentUserID'));
        
        let emailVal;
        let passwordVal;
        let nameVal;
        let picVal;
        document.getElementById('saveEdit').addEventListener('click', function(e){
            e.preventDefault();
            let queryString = "";
            if (document.querySelectorAll("#nameFormControlInput")[0].value != 0) {
                if(queryString.length == 0) {
                    nameVal = document.querySelectorAll("#nameFormControlInput")[0].value;
                    queryString = "username=" + nameVal;
                }
                
            }
            if (document.querySelectorAll("#emailFormControlInput")[0].value != 0) {
                emailVal = document.querySelectorAll("#emailFormControlInput")[0].value;
                if(queryString.length == 0) { 
                    queryString = "email=" + emailVal;
                } else {
                    queryString = queryString + "&email=" + emailVal;
                }
            }
    
            if (document.querySelectorAll("#passwordFormControlInput")[0].value.length != 0) {
                passwordVal = document.querySelectorAll("#passwordFormControlInput")[0].value;
                if(queryString.length == 0) {
                    
                    queryString = "password=" + passwordVal;
                } else {
                    queryString = queryString + "&password=" + passwordVal;
                }
            }
            if (document.querySelectorAll("#userProfilePic")[0].value != 0) {
                picVal = String(document.querySelectorAll("#userProfilePic")[0].value);
                picVal = picVal.substring(12, picVal.length);
                if(queryString.length == 0) {
                    queryString = "picture=" + picVal;
                } else {
                    queryString = queryString + "&picture=" + picVal;
                }
                
            }
            
            if(queryString.length != 0) {
                ajaxPATCH("/api/user/" + idString, function (data){
                    console.log(data)
                    window.location.replace("/profileUser");

                },queryString)
            }
            
        })

    }

    function ajaxPATCH(url, callback, data) {
        let params = typeof data == 'string' ? data : Object.keys(data).map(
            function (k) {
                return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
            }
        ).join('&');
        console.log("params in ajaxPATCH", params);

        const xhr = new XMLHttpRequest();

        xhr.onload = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                callback(this.responseText);
            } else {
                console.log(this.status);
            }
        }
        xhr.open("PATCH", url);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(params);
        console.log(params);
    }
})

function ready(callback) {
    if (document.readyState != "loading") {
        callback();
    } else {
        document.addEventListener("DOMContentLoaded", callback);
    }
}