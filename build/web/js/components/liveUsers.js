function liveUsers() {
    
    function deleteUser(userId, td) {
        console.log("to delete user " + userId);

        if (confirm("Do you really want to delete user " + userId + "? ")) {

            // HERE YOU HAVE TO CALL THE DELETE API and the success function should run the 
            // following (delete the row that was clicked from the User Interface).
            var recordError;
            ajax("webAPIs/deleteUserAPI.jsp?deleteId=" + userId, reportDelete, recordError);
            function reportDelete(jsErrorObj) {
                if (jsErrorObj.errorMsg.length === 0) { // success
                    alert("User Successfully Deleted");
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


    var ele = document.createElement("div");
    var myDiv1 = document.createElement("div");

    ele.appendChild(myDiv1);

    //This is the ajax call which I just made a function below
    ajax("webAPIs/listUsersAPI.jsp", processUserData, myDiv1);

    //This is the callback function for the ajax
    function processUserData(userList) {
        if (userList.dbError.length > 0) {
            myDiv1.innerHTML = userList.dbError;
            return;
        }


        //Set up new list
        var newUserList = [];
        //Then we set values for the list
        for (var i = 0; i < userList.webUserList.length; i++) {
            newUserList[i] = {};

            //Creat the table

            newUserList[i].webUserId = TableUtils.makeNumber(userList.webUserList[i].webUserId);




            //If no email set it to nothing
            if (!userList.webUserList[i].userEmail) {
                userList.webUserList[i].userEmail = "";
            }

            newUserList[i].User_Email = TableUtils.makeText(userList.webUserList[i].userEmail);

            //Set up the images

            newUserList[i].Image = TableUtils.makeImage(userList.webUserList[i].image, "4rem");


            if (!userList.webUserList[i].birthday) {
                userList.webUserList[i].birthday = "";
            }

            newUserList[i].Birthday = TableUtils.makeDate(userList.webUserList[i].birthday);


            if (!userList.webUserList[i].membershipFee) {
                userList.webUserList[i].membershipFee = "";
            }

            newUserList[i].membershipFee = TableUtils.makeNumber(userList.webUserList[i].membershipFee);


            newUserList[i].userRoleId = TableUtils.makeNumber(userList.webUserList[i].userRoleId);

            newUserList[i].userRoleType = TableUtils.makeText(userList.webUserList[i].userRoleType);


            newUserList[i].Update = SortableTableUtils.makeLink(
                    "<img src='" + CRUD_icons.update + "'  style='width:1rem' />", // innerHTML of link
                    '#/userUpdate/' + userList.webUserList[i].webUserId             // href of link
                    );

            newUserList[i].delete = SortableTableUtils.makeImage(CRUD_icons.delete, '1rem');

            // freeze the webUserId
            const userId = userList.webUserList[i].webUserId;
            newUserList[i].delete.onclick = function () {
                deleteUser(userId, this);
            };




        }
        console.log(newUserList);
        //Then we will make the table in the make click sort function
        //Param object? maybe
        var myParams = {tableTitle: "User Table", table: newUserList, tableId: "userTable"};
        var myReport1 = MakeClickSort(myParams);

        myReport1.classList.add("clickSort");
        myDiv1.appendChild(myReport1);

    }

    return myDiv1;
}
        