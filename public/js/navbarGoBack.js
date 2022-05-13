"use strict";

function windowSize() {
  const maxWidth = 415;
  var w = document.documentElement.clientWidth;
  var h = document.documentElement.clientHeight;
  if (w <= maxWidth) {
    document.getElementById("navbarContainer").style.display = "none";
    document.getElementById("navbarContainerBottom").style.display = "flex";
    document.getElementById("navbarGoBackButton").style.display = "flex";
  } else {
    document.getElementById("navbarContainer").style.display = "flex";
    document.getElementById("navbarContainerBottom").style.display = "none";
    document.getElementById("navbarGoBackButton").style.display = "none";
  }
}

window.addEventListener("resize", windowSize);

windowSize();