/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//theName, theImg, theReleaseDate, thePrice, theGenre, theDeveloper, style

function MakeGame(game){
    
    
    var gameObj = document.createElement("div");
    gameObj.classList.add(game.style);
    if(game.style != null){
        gameObj.classList.add(game.style);
    } else{
        gameObj.classList.add("gameStyle");
    }

    
    gameObj.name = "N/A";
    
    if(game.theName != null){
        gameObj.name = game.theName;
    }
    
    var gameImg = document.createElement("img");
    gameImg.src = "pics/noImage.png";
    if(game.theImg != null){
        gameImg.src = game.theImg;
    }
    gameObj.appendChild(gameImg);
    gameObj.appendChild(document.createElement("br"));
    
    var releaseDate = "N/A";
    if(game.theReleaseDate != null){
        releaseDate = game.theReleaseDate;
    }
    
    var price = 0;
    if(game.thePrice != null){
        price = game.thePrice;
    }
    
    
    var genre = "N/A";
    if(game.theGenre != null){
        genre = game.theGenre;
    }
    
    var developer = "N/A";
    if(game.theDeveloper != null){
        developer = game.theDeveloper;
    }
    
    var gameInfo = document.createElement("div");
    gameObj.appendChild(gameInfo);
    
     function display( ) {           // create custom method “display”

        // make the current properties visible on the page
        gameInfo.innerHTML = "Game: " + gameObj.name + "<br/> Release Date: " +
                releaseDate + "<br/> Price: "+ formatCurrency(price)
                + "<br/> Genre: " + genre + "<br/> Developer: " + developer;
    };
    
    gameObj.setName = function (newName) {
        gameObj.name = newName;
        display(); // show updated property on the page
    };
    
    var nameButton = document.createElement("button");
    nameButton.innerHTML = "Change Name to: ";
    gameObj.appendChild(nameButton);

    var newNameInput = document.createElement("input");
    gameObj.appendChild(newNameInput);

    nameButton.onclick = function () {
        gameObj.setName(newNameInput.value);
    };
    gameObj.appendChild(document.createElement("br"));
    


    gameObj.setReleaseDate = function (newReleaseDate) {
        releaseDate = newReleaseDate;
        display(); // show updated property on the page
    };
    
    var releaseDateButton = document.createElement("button");
    releaseDateButton.innerHTML = "Change Release Date to: ";
    gameObj.appendChild(releaseDateButton);

    var newReleaseDateInput = document.createElement("input");
    gameObj.appendChild(newReleaseDateInput);

    releaseDateButton.onclick = function () {
        gameObj.setReleaseDate(newReleaseDateInput.value);
    };
    
    gameObj.appendChild(document.createElement("br"));
   
    gameObj.discountPrice = function (discountPercent){
        var n = Number(discountPercent);
        price = price- ((price * n)/100);
        console.log(price);
        display();
    };
    
    var priceButton = document.createElement("button");
    priceButton.innerHTML = "Discount Price by: %";
    gameObj.appendChild(priceButton);

    var newPriceInput = document.createElement("input");
    gameObj.appendChild(newPriceInput);

    priceButton.onclick = function () {
        gameObj.discountPrice(newPriceInput.value);
    };
    gameObj.appendChild(document.createElement("br"));
    
    
    gameObj.setGenre = function (newGenre) {
        genre = newGenre;
        display(); // show updated property on the page
    };
    
    var genreButton = document.createElement("button");
    genreButton.innerHTML = "Change Genre: ";
    gameObj.appendChild(genreButton);

    var newGenreInput = document.createElement("input");
    gameObj.appendChild(newGenreInput);

    genreButton.onclick = function () {
        gameObj.setGenre(newGenreInput.value);
    };
    gameObj.appendChild(document.createElement("br"));
    
    gameObj.setDeveloper = function (newDeveloper) {
        developer = newDeveloper;
        display(); // show updated property on the page
    };
    
    var developerButton = document.createElement("button");
    developerButton.innerHTML = "Change Developer: ";
    gameObj.appendChild(developerButton);

    var newDeveloperInput = document.createElement("input");
    gameObj.appendChild(newDeveloperInput);

    developerButton.onclick = function () {
        gameObj.setDeveloper(newDeveloperInput.value);
    };
    gameObj.appendChild(document.createElement("br"));

    
    function formatCurrency(num) {
        return num.toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2});
    }
    
    display(); // show initial properties on the page 
    return gameObj;
}