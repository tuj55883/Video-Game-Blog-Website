

//This function sets up the parameters that will be passed through the MakeClickSort
//function
function clickSortUserContent() {


    var ele = document.createElement("div");
    var myDiv1 = document.createElement("div");

    ele.appendChild(myDiv1);

    //This is the ajax call which I just made a function below
    ajax("json/users.json", processUserData, myDiv1);
    //The ajax search func

    //This is the callback function for the ajax
    function processUserData(userList){
        //Set up new list
        var newUserList = [];
        //Then we set values for the list
        for (var i = 0; i < userList.length; i++) {
            newUserList[i] = {};

            //Creat the table
            var tableData = document.createElement('td');


            newUserList[i].webUserId = TableUtils.makeNumber(userList[i].webUserId);


            //Creat the data that will be filled
            //If no email set it to nothing
            if (!userList[i].userEmail) {
                userList[i].userEmail = "";
            }
            //Set the email value
            
            newUserList[i].User_Email = TableUtils.makeText(userList[i].userEmail);;

            //Set up the images

            newUserList[i].Image = TableUtils.makeImage(userList[i].image);;
            

            //Set up birthday
            
            newUserList[i].Birthday = TableUtils.makeDate(userList[i].birthday);
            
            
        }

        //Then we will make the table in the make click sort function
        //Param object? maybe
        var myParams = {tableTitle: "User Table", table: newUserList, tableId: "userTable"};
        var myReport1 = MakeClickSort(myParams);

        myReport1.classList.add("clickSort");
        myDiv1.appendChild(myReport1);

    } 

    return myDiv1;
}
        