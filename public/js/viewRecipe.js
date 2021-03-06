"use strict";
//HTTPS request
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

  document.querySelector("#post").addEventListener("click", function (e) {
    e.preventDefault();
    ajaxGET("/recipeInput", function (data) {
      window.location.replace("/recipeInput");
    });
  });


  window.addEventListener("load", function (e) {
    e.preventDefault();
    let currentUser = String(this.localStorage.getItem("currentUserID"));
    ajaxGET("/api/recipe", function (data) {
      let dataParsed = JSON.parse(data);
      let i = 0;
      let j = 0;
      let total = "";

      const id = dataParsed[i]._id;

      for (i = 0; i < dataParsed.length; i++) {
        let temp = '<div id="card-template' + i + '"><div class="image-box"></div><div class="info">'
        temp += '<h1 id="title">' + dataParsed[i].recipeName;
        temp += '</h1><p id="description"> Easy to make plant based alternatives!</p></div>'
        temp += '<div class="others"><svg id="dot" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">'
        temp += '<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg>'
        temp += '<svg id="heart" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">'
        temp += '<path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>'
        temp += '</svg></div></div>'

        total += temp;
      }


      const populate = document.getElementById("card");
      populate.innerHTML = total;

      for (j = 0; j < dataParsed.length; j++) {
        let card = "card-template" + j;
        document.getElementById(card).addEventListener('click', function () {
          let length = card.length;
          let num = card.substring(length - 1);
          window.localStorage.setItem('recipeID', JSON.stringify(dataParsed[num]))
          window.location.replace('/recipe');
        })
      }

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