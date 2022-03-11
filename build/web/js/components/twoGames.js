/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function twoGames() {




    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = ` 
    
      
            <p>
                With this page you can directly change properties of the listed games using the empty
            boxes and buttons. You can change the name, release date, genre and developer by just entering the
            new text that you want it to be. Though for the price, you can discount it by a certain percentage
            and it will display the new discounted price. Also for the percent, just type a num between 1-100,
            no % sign needed.
                
            </p>

    `;

    var ele = document.createElement("div");
    ele.innerHTML = content; // the HTML code specified just above...
    var games = document.createElement("div");
    ele.appendChild(games);
    //theName, theImg, theReleaseDate, thePrice, theGenre, theDeveloper, style
    var game1 = {theName: "Shovel Knight", theImg: "pics/shovelKnight.jpg", theReleaseDate: "09/21/22",
        thePrice: 30.00, theGenre: "Adventure", theDeveloper: "Yacht Club", style: "gameStyle"}
    var game2 = {theName: "Amoung Us", theImg: "pics/amongUs.jpg", theReleaseDate: "1/13/23",
        thePrice: 30.00, theGenre: "Multiplayer", theDeveloper: "Inner Sloth", style: "gameStyle"}
    games.appendChild(MakeGame(game1));
    games.appendChild(MakeGame(game2));

    return ele;
}
