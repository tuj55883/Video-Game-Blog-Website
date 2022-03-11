
//This function sets up the parameters that will be passed through the MakeClickSort
//function
function clickSortGameContent() {


    var ele3 = document.createElement("div");
    var myDiv9 = document.createElement("div");

    ele3.appendChild(myDiv9);

    //This is the ajax call which I just made a function below
    ajax("json/games.json", processGameData, myDiv9);
    //The ajax search func
    
    //This is the callback function for the ajax
    function processGameData(gameList){
        //Set up new list
        var newGameList = [];
        //Then we set values for the list
        for (var i = 0; i < gameList.length; i++) {
            newGameList[i] = {};

            //Creat the table
            var tableData = document.createElement('td');

            newGameList[i].Game_Name = newGameList[i].img = TableUtils.makeNumber(gameList[i].gameId);


            //Creat the data that will be filled
            var tableData = document.createElement('td');
            //If no email set it to nothing
            if (!gameList[i].gameName) {
                gameList[i].gameName = "";
            }
            //Set the email value
            
            newGameList[i].Game_Name  = TableUtils.makeText(gameList[i].gameName);

            //Set up the images
            
            newGameList[i].img = TableUtils.makeImage(gameList[i].img,"4rem");
            
            tableData = document.createElement('td');
            //Set up release date
            if (!gameList[i].releaseDate) {
                gameList[i].releaseDate = "";
            }
            
            newGameList[i].releaseDate = TableUtils.makeDate(gameList[i].releaseDate);
            

            newGameList[i].webUserEmail = TableUtils.makeText(gameList[i].webUserEmail);
            

            newGameList[i].webUserId = TableUtils.makeNumber(gameList[i].webUserId);

        };

        //Then we will make the table in the make click sort function
        //Param object? maybe
        var myParams = {tableTitle: "Game Table", table: newGameList, tableId: "gameTable"};
        var myReport1 = MakeClickSort(myParams);

        myReport1.classList.add("clickSort");
        myDiv9.appendChild(myReport1);

    } 

    return myDiv9;
}
