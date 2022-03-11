//This function sets up the parameters that will be passed through the MakeClickSort
//function
function liveGames() {
    
    function deleteGame(gameId, td) {
        console.log("to delete game " + gameId);

        if (confirm("Do you really want to delete game number " + gameId + "? ")) {

            // HERE YOU HAVE TO CALL THE DELETE API and the success function should run the 
            // following (delete the row that was clicked from the User Interface).
            var recordError;
            ajax("webAPIs/deleteGameAPI.jsp?deleteId=" + gameId, reportDelete, recordError);
            function reportDelete(jsErrorObj) {
                if (jsErrorObj.errorMsg.length === 0) { // success
                    alert("Game Successfully Deleted");
                    var dataRow = td.parentNode;
                    var rowIndex = dataRow.rowIndex - 1; // adjust for oolumn header row?
                    var dataTable = dataRow.parentNode;
                    dataTable.deleteRow(rowIndex);
                } else {
                    alert(jsErrorObj.errorMsg);
                }


            }
            // get the row of the cell that was clicked 

        }
    }


    var ele3 = document.createElement("div");
    var myDiv9 = document.createElement("div");

    ele3.appendChild(myDiv9);

    //This is the ajax call which I just made a function below
    ajax("webAPIs/listOtherAPI.jsp", processGameData, myDiv9);
    //The ajax search func

    //This is the callback function for the ajax
    function processGameData(gameList) {
        if (gameList.dbError.length > 0) {
            myDiv9.innerHTML = gameList.dbError;
            return;
        }
        //Set up new list
        var newGameList = [];
        //Then we set values for the list
        for (var i = 0; i < gameList.gameTableList.length; i++) {
            newGameList[i] = {};
           
            //Create the table

            newGameList[i].gameId = TableUtils.makeNumber(gameList.gameTableList[i].gameId);


            //Creat the data that will be filled
            var tableData = document.createElement('td');
            //If no email set it to nothing
            if (!gameList.gameTableList[i].gameName) {
                gameList.gameTableList[i].gameName = "";
            }
            //Set the email value
            tableData.innerHTML = gameList.gameTableList[i].gameName;
            tableData.style.textAlign = "left";
            newGameList[i].gameName = TableUtils.makeText(gameList.gameTableList[i].gameName);
             

            //Set up the images

            
            newGameList[i].Image = TableUtils.makeImage(gameList.gameTableList[i].img, "4rem");

            tableData = document.createElement('td');
            //Set up release date
            if (!gameList.gameTableList[i].releaseDate) {
                gameList.gameTableList[i].releaseDate = "";
            }
            
            newGameList[i].releaseDate = TableUtils.makeDate(gameList.gameTableList[i].releaseDate);
            
            
            if (!gameList.gameTableList[i].price) {
                gameList.gameTableList[i].price = "";
            }
            
            newGameList[i].price = TableUtils.makeNumber(gameList.gameTableList[i].price);
            
            
            if (!gameList.gameTableList[i].genre) {
                gameList.gameTableList[i].genre = "";
            }
            
            TableUtils.makeText(gameList.gameTableList[i].genre);
            
            
            
            if (!gameList.gameTableList[i].developer) {
                gameList.gameTableList[i].developer = "";
            }
            
            newGameList[i].developer = TableUtils.makeText(gameList.gameTableList[i].developer);

            
            newGameList[i].userEmail = TableUtils.makeText(gameList.gameTableList[i].userEmail);;

           
            newGameList[i].webUserId = TableUtils.makeNumber(gameList.gameTableList[i].webUserId);
            
            newGameList[i].Update = SortableTableUtils.makeLink(
                    "<img src='" + CRUD_icons.update + "'  style='width:1rem' />", // innerHTML of link
                    '#/gameUpdate/' + gameList.gameTableList[i].gameId             // href of link
                    );
            
            newGameList[i].delete = SortableTableUtils.makeImage(CRUD_icons.delete, '1rem');

            // freeze the webUserId
            const gameId = gameList.gameTableList[i].gameId;
            newGameList[i].delete.onclick = function () {
                deleteGame(gameId, this);
            };

        }
        ;
        

        //Then we will make the table in the make click sort function
        //Param object? maybe
        var myParams = {tableTitle: "Game Table", table: newGameList, tableId: "gameTable"};
       
        var myReport1 = MakeClickSort(myParams);

        myReport1.classList.add("clickSort");
        myDiv9.appendChild(myReport1);

    }

    return myDiv9;
}
