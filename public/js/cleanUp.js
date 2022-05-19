function cleanUp(){
    localStorage.removeItem("currentUserID");
    location.href='/api/logout';
}