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
        ajaxGET("/api/users", function (data) {
            console.log(JSON.parse(data))
            let dataParsed = JSON.parse(data)
            dataParsed.forEach(element => display(element))
            attachEventListener();
        });
    });

    function display(userInfo) {
        let listContainer = document.getElementById("container");
        let postParent = document.getElementById("postParent");
        let postTemplate = listContainer.content.cloneNode(true);
        postTemplate.querySelector('.userID').textContent = userInfo._id;
        postTemplate.querySelector('.userName').textContent = userInfo.username;
        postTemplate.querySelector('.email').textContent = userInfo.email;
        postTemplate.querySelector('.userListForAdmin').id = userInfo._id;
        postParent.appendChild(postTemplate);
    }

    function attachEventListener() {
        let editInfo = document.querySelectorAll('#editInfo');
        let deleteInfo = document.querySelectorAll('#deleteInfo');
        for (let x = 0; x < editInfo.length; x++) {
            editInfo[x].addEventListener('click', function () {
                let parentIdEdit = this.parentNode.parentNode.id;
                console.log("id " + parentIdEdit);
                let IDupdate = document.getElementById(parentIdEdit).firstElementChild.firstElementChild.textContent;
                localStorage.setItem('adminUpdate', IDupdate);
                updateUser(parentIdEdit);
            })
            deleteInfo[x].addEventListener('click', function(){
               // console.log(this.parentNode.parentNode.id);
                let parentIdDelete = this.parentNode.parentNode.id;
                let IDdelete = document.getElementById(parentIdDelete).firstElementChild.firstElementChild.textContent;
                localStorage.setItem('adminDelete', IDdelete);
                console.log(localStorage.getItem('adminDelete'));
                deleteUser(parentIdDelete);
                
                //localStorage.removeItem('adminDelete')
            })
        }
    }

    function updateUser(parentIdEdit) {
        let idString =  String(localStorage.getItem('adminUpdate'));
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
                    window.location.replace("/dashboardAdmin");

                },queryString)
            }
            
        })

        localStorage.removeItem('adminUpdate')

    }

    function deleteUser(parentIdDelete) {      
        let queryString =  String(localStorage.getItem('adminDelete'));
        console.log("id:" + queryString);
        document.getElementById('deleteUser').addEventListener('click', function(e){
            e.preventDefault();
            document.getElementById(parentIdDelete).classList.remove("list-group-item");
            document.getElementById(parentIdDelete).style.display = "none";
            ajaxDelete("/api/user/" + queryString, function (data){
                console.log(data)  
            },queryString)
        })
        localStorage.removeItem('adminDelete')
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


    function ajaxDelete(url, callback, data) {
        let params = typeof data == 'string' ? data : Object.keys(data).map(
            function (k) {
                return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
            }
        ).join('&');
        console.log("params in ajaxDelete", params);

        const xhr = new XMLHttpRequest();

        xhr.onload = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
                callback(this.responseText);

            } else {
                console.log(this.status);
            }
        }
        xhr.open("DELETE", url);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(params);
        console.log(params);
    }

    function ajaxPOST(url, callback, data) {
        let params = typeof data == 'string' ? data : Object.keys(data).map(
            function (k) {
                return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
            }
        ).join('&');
        console.log("params in ajaxPOST", params);

        const xhr = new XMLHttpRequest();

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
    }

    document.querySelector("#saveNewUser").addEventListener("click", function (e) {
        e.preventDefault();
        let userName = document.getElementById("nameAddedByAdmin");
        let userType = document.getElementById("userTypeAddedByAdmin");
        let email = document.getElementById("emailAddedByAdmin");
        let password = document.getElementById("passwordAddedByAdmin");

        let queryString = "email=" + email.value + "&username=" + userName.value + "&password=" + password.value + "&userType=" + userType.value;

        ajaxPOST("/api/admin/signup", function (data) {
            if (data) {
                console.log(data);
                let dataParsed = JSON.parse(data);
                if (dataParsed.status == "fail") {
                    console.log(dataParsed.msg);
                } else {
                    console.log(dataParsed.msg);
                    window.location.replace("/dashboardAdmin");
                }
            }
        }, queryString);
    });
})

function ready(callback) {
    if (document.readyState != "loading") {
        callback();
    } else {
        document.addEventListener("DOMContentLoaded", callback);
    }
}