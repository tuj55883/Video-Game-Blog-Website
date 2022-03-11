var gameMods = {};

(function () {  // This is an IIFE, an immediately executing function.
    // It is an anonymous function that runs once (and only once) at page load time.
    // It is a way to create private functions that can be shared. 

    //alert("I am an IIFE!"); // runs only at page load time...


// Properties that are "global" to this IIFE: 

    // validateObjList is an associative array that has one object per field in the web_user 
    // StringData object. (The key of each object will be the webUser StringData property name.) 
    // Each object shall hold two important properties: (1) the input box (so we can get user's input)
    // and (2) the field level error message associated with that input. 
    // So, for example, validateObjList["userEmail"].inputBox will hold the input for "userEmail"
    // and validateObjList["userEmail"].errorTd will hold the error message associated 
    // with that same field. 

    var validateObjList = [];

    // in addition to the "normal fields" (that each need an input box and error message0, 
    // we have these items (in the HTML table) that are a little different: 

    var selectTag;   // a select tag (dom element) that holds user role options

    var roleInputTd;  // the Td that holds the selectTag.

    var saveButton;  // the save button that will actually try to insert a record

    var recordError; // the record level error message for messages like "Duplicate email"


    // Create and return the three column HTML table (col 1 is prompt, col 2 is input box, col 3 is 
    // field level error message). Side effect is saving references to the input boxes and 
    // field level error messages into the validateObjList (defined just above). Also, creating 
    // the saveButton and recordError (also defined just above). 
    function createValidationArea() {

        var validateTable = document.createElement("table");

        // call makeInputRow for each field. This will add a new row into the validateTable 
        // (a HTML table DOM element) and it will add two references per field in the 
        // associative array validateObjList (one will be inputBox and the other will be errorTd).

        /* Web API property names:  this.gameId + this.gameName + this.releaseDate + this.price + this.genre
                + this.developer + this.img + this.webUserId + this.userEmail;  */

        makeInputRow("gameId", "Game Id", validateTable);
        validateObjList["gameId"].inputBox.setAttribute("disabled", true);

        makeInputRow("gameName", "Game Name", validateTable);

        makeInputRow("releaseDate", "Release Date", validateTable);
        makeInputRow("price", "Price", validateTable);

        makeInputRow("genre", "Genre", validateTable);
        makeInputRow("developer", "Developer", validateTable);
        makeInputRow("img", "Image URL", validateTable);
        

        // initially, the user role is an input box like the other fields, but it will get 
        // changed to a select tag...
        makeInputRow("webUserId", "User ID", validateTable);

        // Add non-standard last row to validatTable. The first cell will hold a Save button. 
        // The 2nd cell will hold the record error. The 3rd cell will be just a filler.
        var row = Utils.make({
            htmlTag: "tr",
            parent: validateTable
        });
        var saveCell = Utils.make({
            htmlTag: "td",
            parent: row
        });

        // saveButton declared before this function
        saveButton = Utils.make({
            htmlTag: "button",
            innerHTML: "Save",
            parent: saveCell
        });

        // recordError declared before this function
        recordError = Utils.make({
            htmlTag: "td",
            parent: row,
            class: "error"
        });
        Utils.make({// third empty cell (filler) -- dont need a reference to this.
            htmlTag: "td",
            parent: row
        });

        // Fall 2021 Modification to work with NavRouter. The line below used to be in the 
        // getRoleAPI callback function, but it had to be moved up here (out of the call back function). 
        // With NavRouter, the getRoleAPI callback function (when refreshing Account - Register) 
        // is invoked twice which made roleInputTd be null the second time. 
        roleInputTd = validateObjList["webUserId"].inputBox.parentElement;

        return validateTable;

    } // createValidationArea


    // ***** makeInputRow *****
    // This function creates then adds a tr (table row) into validationTable (a HTML table tag, input param). 
    // Into this tr, this function (makeInputRow):
    //   *  adds a 1st td filling that innerHTML with promptText. 
    //   *  adds a 2nd td, placing a textbox inside, and stores a reference to the textbox. 
    //   *  adds a 3rd td (classed "error") to hold validation error message (and stores a reference to it).
    //   
    // Finally, it creates an object that references the two things we need to access programatically: 
    // the input textbox (where user's input will be found) and the error td (where we will write any 
    // possible error messages). This object is stored into validationObjList using associative array 
    // notation (using fieldName as the key.)
    function makeInputRow(fieldName, promptText, validationTable) {

        var obj = {}; // this will hold references to the input box and the error td for the 
        // given field name.

        var row = Utils.make({// Inject a row into the table 
            htmlTag: "tr",
            parent: validationTable
        });
        Utils.make({// first td of row will hold promptText
            htmlTag: "td",
            innerHTML: promptText, // use fieldName as prompt for now, later promptText,
            parent: row
        });
        var inputTd = Utils.make({// second td of row will hold user input
            htmlTag: "td",
            parent: row
        });
        // store reference to this input box. we need to access it programatically 
        // (to find user's input).
        obj.inputBox = Utils.make({// place textbox in second td
            htmlTag: "input",
            parent: inputTd
        });
        // store reference to the 3rd td that is for holding error messages, 
        // so we can access it programmatically.
        obj.errorTd = Utils.make({
            htmlTag: "td",
            parent: row,
            class: "error"
        });
        // obj has a reference to the inputBox and the errorTd (the two things 
        // we need to access programatically to do validation). Store this 
        // object into an associative array (using fieldName as key). 
        validateObjList[fieldName] = obj;
    } // makeInputRow


    // create an object from the values typed into the page, URL encode it and return it.
    function getDataFromUI() {     // a private function within the IIFE 

         /* Web API property names:  this.gameId + this.gameName + this.releaseDate + this.price + this.genre
                + this.developer + this.img + this.webUserId + this.userEmail;  */

        var userInputObj = {

            "gameId": validateObjList["gameId"].inputBox.value,
            "gameName": validateObjList["gameName"].inputBox.value,
            "releaseDate": validateObjList["releaseDate"].inputBox.value,
            "price": validateObjList["price"].inputBox.value,
            "genre": validateObjList["genre"].inputBox.value,
            "developer": validateObjList["developer"].inputBox.value,
            "img": validateObjList["img"].inputBox.value,

            // Modification here for role pick list
            //"userRoleId": validateObjList["userRoleId"].inputBox.value,
            "webUserId": selectTag.options[selectTag.selectedIndex].value,

            // These two fields of the web user string data object will not affect
            // the record that's inserted into the database, but we provide them 
            // so that we are passing a 'well formed' web user string data object
            // to the server side API.
            "userEmail": "",
            "errorMsg": ""
        };
        console.log("getDataFromUI - userInputObj on next line");
        console.log(userInputObj);

        // JSON.stringify converts the javaScript object into JSON format 
        // (the reverse operation of what gson does on the server side).
        // Then, you have to encode the user's data (encodes special characters 
        // like space to %20 so the server will accept it with no security error). 
        return encodeURIComponent(JSON.stringify(userInputObj));
    }

    // write the jsonObj (full of error message) to the Validation UI. 
    function writeErrorObjToUI(jsonObj) {

          /* Web API property names:  this.gameId + this.gameName + this.releaseDate + this.price + this.genre
                + this.developer + this.img + this.webUserId + this.userEmail;  */
        
        console.log("here is JSON object (holds error messages.");
        console.log(jsonObj);
        validateObjList["gameName"].errorTd.innerHTML = jsonObj.gameName;
        validateObjList["releaseDate"].errorTd.innerHTML = jsonObj.releaseDate;
        validateObjList["price"].errorTd.innerHTML = jsonObj.price;
        validateObjList["genre"].errorTd.innerHTML = jsonObj.genre;
        validateObjList["developer"].errorTd.innerHTML = jsonObj.developer;
        validateObjList["img"].errorTd.innerHTML = jsonObj.img;
        validateObjList["webUserId"].errorTd.innerHTML = jsonObj.webUserId;
        recordError.innerHTML = jsonObj.errorMsg;

    } // writeErrorObjToUI


    // NOTE: this is the first content generating component that takes an input 
    // parameter. We accomplish this by upgrading the NavRouter so that 
    // it parses the new link, extracts the parameter from the link, and passes 
    // that parameter to the function. Example: 
    // Say we have a URL (in the browser's address bar) like this: userUpdate/4. 
    // The upgraded router extracts the 4 from the URL and passes that 4 to the 
    // function that is associated with link "#/userUpdate".


    // the purpose of this function is just to build the update UI...
    gameMods.update = function (gameId) {

        console.log("game.update called with gameId " + gameId);

        var updateDiv = document.createElement("div");
        updateDiv.classList.add("insertArea");

        Utils.make({// don't need a reference to this created DOM element, 
            // so not capturing the return value.
            htmlTag: "h2",
            innerHTML: "Update Game",
            parent: updateDiv
        });

        validateObjList = [];
        updateDiv.appendChild(createValidationArea());

        // createValidationArea also creates a saveButton (button) and a recordError (td)
        // (both declared outside of createValidationArea).

        saveButton.onclick = function () {

            // like an "in progress" message while waiting for AJAX call.
            recordError.innerHTML = " &nbsp; &nbsp; ...";
            updateSave();
        };

        ajax("webAPIs/getOtherByIdAPI.jsp?gameId=" + gameId, gotRecordById, updateDiv);

        function gotRecordById(gameObj) { // obj is what got JSON.parsed from Web API's output

            console.log("gotRecordById, webUserObj is next");
            console.log(gameObj);
            console.log(validateObjList);

             /* Web API property names:  this.gameId + this.gameName + this.releaseDate + this.price + this.genre
                + this.developer + this.img + this.webUserId + this.userEmail;  */

            validateObjList["gameId"].inputBox.value = gameObj.gameId;
            validateObjList["gameName"].inputBox.value = gameObj.gameName;
            validateObjList["releaseDate"].inputBox.value = gameObj.releaseDate;
            validateObjList["price"].inputBox.value = gameObj.price;
            validateObjList["genre"].inputBox.value = gameObj.genre;
            validateObjList["developer"].inputBox.value = gameObj.developer;
            validateObjList["img"].inputBox.value = gameObj.img;

            // replace role id inputBox with select tag populated from the roles in the database.
            // NOTE: since roles do not change that much, it would be OK to not be so careful 
            // to get the latest roles from the db to populate the role pick list. I am showing this 
            // to you so that you WOULD KNOW how to get the latest pick list from the DB.
            ajax("webAPIs/getUserIdAPI.jsp", processIds, updateDiv);

            function processIds(obj) {

                if (obj.dbError.length > 0) {
                    validateObjList["webUserId"].errorTd.innerHTML += "Programmer Error: Cannot Create Role Pick List";
                } else {

                    console.log("webUserId is " + gameObj.webUserId);
                    selectTag = Utils.makePickList({
                        list: obj.userIdList,

                        // property names for newer version of makePickList
                        idProp: "webUserId",
                        displayProp: "userEmail",

                        // property names for older version of makePickList
                        // would also work (backward compatibility built in).
                        // keyProp: "userRoleId",
                        // valueProp: "userRoleType"

                        selectedKey: gameObj.userRoleId  // key that is to be pre-selected (optional)
                    });

                    // replace text box (for user role) with select tag
                    roleInputTd.innerHTML = "";
                    roleInputTd.appendChild(selectTag);
                }
            } // processRoles
        } // gotRecordById

        return updateDiv;

    }; // end of webUsers.update

    function updateSave() {

        var myData = getDataFromUI();
        ajax("webAPIs/updateOtherAPI.jsp?jsonData=" + myData, reportUpdate, recordError);
        function reportUpdate(jsErrorObj) {

            // the server prints out a JSON string of an object that holds field level error 
            // messages. The error message object (conveniently) has its fiels named exactly 
            // the same as the input data was named. 

            if (jsErrorObj.errorMsg.length === 0) { // success
                jsErrorObj.errorMsg = "Record successfully updated. ";
            }

            writeErrorObjToUI(jsErrorObj);
        }
    } //updateSave




}());  // end of the IIFE