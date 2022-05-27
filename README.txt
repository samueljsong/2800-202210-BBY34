Project Title: MooVE

Project Description: Our Team BBY-34 is developing “MooVE” to help those who want to make a difference in our world to improve Climate Change by providing a no compromise, smooth transition into trying plant-based alternatives.

Technologies used:
    Frontend: HTML, CSS, Bootstrap, Javascript
    Backend: Javascript, Node.js, Express, Express.json, cors, body-parser, session
    Database: MongoDB, Mongoose

Listing of File Contents of folder:
    html: contains all the html files
    public: contains css, favicon, img and js folders
        css: contains all the css files
        favicon: containg our logo
        img: contains all the images for the application
        js: contains all the front-end javascript files
    server: contains db, models, node_moules folders & .gitignore, package-lock.json, package.json, server.js
        db: contains mongoose.js file to connect mongoose
        models: contains recipe.js, restaurant.js and user.js
        node_moules: all the node modules
    xml: contains loginErrorNoUserFound.xml to prompt the user
    .env
    README.txt

    ===============================

    List of all files:

│   .env
│   README.txt
│
├───html
│   │   fav.html
│   │   login.html
│   │   recipe.html
│   │   recipeInput.html
│   │   restaurantPage.html
│   │   signUp.html
│   │   terms.html
│   │   viewRecipes.html
│   │   viewRestNew.html
│   │
│   ├───admin
│   │       adminMain.html
│   │       dashboardAdmin.html
│   │       profileAdmin.html
│   │
│   └───user
│           mainPageUser.html
│           profileUser.html
│
├───public
│   ├───css
│   │       adminMain.css
│   │       dashboardAdmin.css
│   │       inputRecipe.css
│   │       login.css
│   │       mainPage.css
│   │       navbar.css
│   │       profile.css
│   │       recipe.css
│   │       restaurant.css
│   │       restaurantPage.css
│   │       restNew.css
│   │       signup.css
│   │       terms.css
│   │       viewRecipes.css
│   │       viewRestaurants.css
│   │
│   ├───favicon
│   │       favicon.ico
│   │       moo.ico
│   │
│   ├───img
│   │       admin.png
│   │       apple.png
│   │       ava1.png
│   │       ava10.png
│   │       ava11.png
│   │       ava12.png
│   │       ava2.png
│   │       ava3.png
│   │       ava4.jpg
│   │       ava5.jpg
│   │       ava6.jpg
│   │       ava7.png
│   │       ava8.jpg
│   │       ava9.png
│   │       bg.jpg
│   │       bruncheria.png
│   │       chili.png
│   │       ear.png
│   │       earls.png
│   │       food.jpg
│   │       lime.png
│   │       meat.png
│   │       meeT.png
│   │       MooVElogo.png
│   │       naam.png
│   │       pburger.jpg
│   │       pie.png
│   │       planet.png
│   │       planetburh.png
│   │       plants.jpg
│   │       profilePic.png
│   │       recipe-pic.png
│   │       restaurant_vegen.jpg
│   │       romers.png
│   │       signUpFormbg.jpg
│   │       sorry.jpg
│   │       taco.jpg
│   │       testback.jpg
│   │       tree.png
│   │       vegfood.jpg
│   │       walls.png
│   │       wrap.png
│   │
│   └───js
│           cleanUp.js
│           clearForm.js
│           clearFormAdmin.js
│           clientAdmin.js
│           clientUser.js
│           dashboardAdmin.js
│           displayAdminInfo.js
│           displayUserInfo.js
│           easterEgg.js
│           editUser.js
│           loginClient.js
│           mainPageUser.js
│           modal.js
│           navbar.js
│           navbarGoBack.js
│           popover.js
│           posting.js
│           recipe.js
│           recipeInput.js
│           restaurantPage.js
│           signUpClient.js
│           viewRecipe.js
│           viewRestaurant.js
│
├───server
│   │   .gitignore
│   │   package-lock.json
│   │   package.json
│   │   server.js
│   │
│   ├───db
│   │       mongoose.js
│   │
│   ├───models
│   │       recipe.js
│   │       restaurant.js
│   │       user.js
│
└───xml
        loginErrorNoUserFound.xml

How to install or run the project:
    1. Clone the repo to your local machine
    2. Open the local repo with VSCode
    3. Install any extensions that help you read html, css and js files
    Database:
    1. Install MongoDB Community Server from MongoDB website (choose platform accordingly to your OS)
    2. Install MongoDB Shell from MongoDB website (choose platform accordingly to your OS)
    3. Run "mongod --version" in cmd to make sure MongoDB Community Server is installed 
    4. Run "mongo --version" in cmd to make sure MongoDB Shell is installed


How to use the product:
    In the local repo that you open with VSCode:
        1. Run "npm install" in terminal 
        2. cd in to server folder and run "nodemon server.js"
        3. Check it on localhost:8000

        User login info :
        email: ifeagboola@gmail.com
        password: ifeagboola

        Admin login info : 
        email: bby34moove@gmail.com
        password: bby34moove

    Database: 
        1. You can check our database by running this command in cmd: 

        mongosh "mongodb+srv://2800-bby34.to1kn.mongodb.net/myFirstDatabase" --apiVersion 1 --username PhuongNg12
        Password: WnZoeFeLbTRXEo6D
    
        2. Run these commands to see our collections: 

        show dbs 
        use 2800-BBY34
        show collections
        db.users.find()
        db.recipes.find()
        db.restaurants.find()
    


Include Credits, References, and Licenses:
"Confetti Effect using html css and javascript" from Coding Fire for our Easter Egg
Coding Fire: 
    Youtube :- https://bit.ly/38yRrXd​​​​
    Github:- https://bit.ly/30HgqTP​​​​


Contact Information:
Leerang(Naomi) Byun - lbyun1@my.bcit.ca
Phuong Nguyen - znguyen3@my.bcit.ca
Joo-hun (Samuel) Song - jsong113@my.bcit.ca
Dinuja Gunawardana - dgunawardana@my.bcit.ca



Team Members:

[Samuel (Joo-Hun) Song], [A01308345], [Set 1D],[2022-05-27]
[Phuong Nguyen], [A01275205], [Set 2D], [2022-05-27]
[Dinuja Gunawardana], [A01295467], [Set 1D], [2022-05-27]
[Leerang (Naomi) Byun], [A01199376], [Set 2D], [2022-05-27]


4th(Last) milestone: This assignment is [92]% complete. 
(-8%) For timeline component, we don't have upload image and delete items.
