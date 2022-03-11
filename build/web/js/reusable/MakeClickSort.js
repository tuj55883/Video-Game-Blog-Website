


//This function handles the making, sorting, and filtering of the table
function MakeClickSort(myParams) {

    var tracker = 0;
    var direc = {};
    function filterFunc(max) {
        //Sets all the variables we will need to filter
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("filter");
        filter = input.value.toUpperCase();
        table = document.getElementById(myParams.tableId);
        tr = table.getElementsByTagName("tr");

        // Loop through the rows and the columns and sets
        //the display to none if it does not belong
        for (i = 1; i < tr.length; i++) {
            var yes = 0;
            for (j = 0; j <= tr.length; j++) {
                td = tr[i].getElementsByTagName("td")[j];
                if (td) {
                    txtValue = td.textContent || td.innerText;

                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        yes++;
                    }
                }
            }
            if (yes > 0) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
    //This sorts the table according to which button is clicked
    function sortTable(num, dir, name) {
        //Sets the vars we need
        var table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById(myParams.tableId);
        switching = true;



        //It will keep looping until everything is sorted
        while (switching) {
            // Start by saying: no switching is done:
            switching = false;
            rows = table.rows;
            
            //Loop through all rows except the first
            for (i = 1; i < (rows.length - 1); i++) {
 
                shouldSwitch = false;
                
                //We will compare the two elements
                x = rows[i].getElementsByTagName("TD")[num];
                y = rows[i + 1].getElementsByTagName("TD")[num];
                //We check if its a date value and if its not, it will sort by
                //aphebetical order
                if (x.style.textAlign === "left") {
                    
                    //If we are good we check which direction we are sorting in
                    //Either forward(0) or reverse(1)
                    if (dir === 0) {
                        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                            //If it should switch we set to true and end the loop
                            shouldSwitch = true;

                            break;
                        }
                        //Other direction
                    } else {
                        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                            
                            shouldSwitch = true;

                            break;
                        }

                    }
                    //This is the date sorting
                } else if (x.style.textAlign === "center") {
                   
                    //The way I did it was I split it by the /
                    //and I put it into an array and compare each
                    //year, then month, then day
                    var p = x.innerHTML.split("/");
                    var a = [p[1], p[0], p[2]];
                    p = y.innerHTML.split("/");
                    var b = [p[1], p[0], p[2]];
                    
                    //Check direction
                    if (dir === 0) {
                        //Check if the year is greater
                        if (a[2] > b[2]) {
                            // If so, mark as a switch and break the loop:
                            shouldSwitch = true;
                            break;
                            //if the year is the same we move to months
                        } else if (a[1] > b[1] && (a[2] === b[2])) {
                            shouldSwitch = true;
                            break;
                        //if the year and month are the same we move to days
                        } else if (a[0] > b[0] && (a[2] === b[2]) && (a[1] === b[1])) {
                            shouldSwitch = true;
                            break;
                        //then one final case to see if there is even a date to begin with
                        } else if(a[0] === "" && b[0] !== "") {
                            shouldSwitch = true;
                            break;
                        } 
                        //Then just the flipped direction
                    } else {
                        if (a[2] < b[2]) {
                           
                            shouldSwitch = true;

                            break;
                        } else if (a[1] < b[1] && (a[2] === b[2])) {
                            shouldSwitch = true;
                            break;
                        } else if (a[0] < b[0] && (a[2] === b[2]) && (a[1] === b[1])) {
                            shouldSwitch = true;
                            break;
                        } else if(b[0] === "" && a[0] !== "") {
                            shouldSwitch = true;
                            break;
                        } 
                    }
                } else if (x.style.textAlign === "right"){ 
                   console.log("here");
                    //If we are good we check which direction we are sorting in
                    //Either forward(0) or reverse(1)
                 
                    if (dir === 0) {
                         if (parseInt(x.innerHTML.replace(/[^0-9.-]+/g,"")) > parseInt(y.innerHTML.replace(/[^0-9.-]+/g,""))) {
                            //If it should switch we set to true and end the loop
                            shouldSwitch = true;

                            break;
                        } else if (x.innerHTML === "" && y.innerHTML !== ""){
                            shouldSwitch = true;

                            break;
                        }
                        //Other direction
                    } else {
                       if (parseInt(x.innerHTML.replace(/[^0-9.-]+/g,"")) < parseInt(y.innerHTML.replace(/[^0-9.-]+/g,""))) {
                            shouldSwitch = true;
                            break;
                        } else if (y.innerHTML === "" && x.innerHTML !== ""){
                            shouldSwitch = true;

                            break;
                        }

                    }
                    
                
                } else{
                    console.log("here");
                    if (dir === 0) {
                         if(y.innerHTML === null) {
                            shouldSwitch = true;
                            break;
                        }
                        //Other direction
                    } else {
                        if(x.innerHTML === null) {
                            shouldSwitch = true;
                            break;
                        }

                    }
                    
                }
            }
            //This just handles the switching of position in the table
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;


            }
        }
        //This flips the direction after it gets sorted
        //reversing it if sorted again
        if (dir === 0) {
            direc[name] = 1;
        } else {
            direc[name] = 0;
        }
    }


    //This creates all the visual stuff on the page
    var container = document.createElement("div");
    container.classList.add("clickSort");
    var ele = document.createElement("div");
    var userInput = document.createElement("input");
    userInput.setAttribute("id", "filter");
    var theMax = myParams.table.length;
    //We set the filter serch bar
    userInput.onchange = function () {
        filterFunc(theMax);
    };
    var content = `Filter:`;

    ele.innerHTML = content;

    ele.appendChild(userInput);
    container.appendChild(ele);

    //Add some instructions
    var content2 = `Filter by typing in the space and pressing enter`;
    var ele2 = document.createElement("div");
    ele2.innerHTML = content2;
    container.appendChild(ele2);
    
    //Make the title for the table
    var heading = document.createElement("h1");
    heading.innerHTML = myParams.tableTitle;
    container.appendChild(heading);

    //Empty table case
    if (myParams.table.length === 0) {
        heading.innerHTML += " - ObjList is Empty";
    } else {

         //Make the table
        var newTable = document.createElement("table");
        newTable.setAttribute("id", myParams.tableId);
        newTable.classList.add("clickSort");
        container.appendChild(newTable);


        // Make a tr element to hold the headings of the tabel
        var headerRow = document.createElement("tr");
        newTable.appendChild(headerRow);

        

        //Go through the names of the elements and make a header for each
        var obj = myParams.table[0];
        for (var propName in obj) {
            var headingCell = document.createElement("th");
            //We are also going to make the headings buttons unless their an image
            if (propName.localeCompare("Image") === 0||propName.localeCompare("img")=== 0 || propName.localeCompare("Update") == 0) {

                headingCell.innerHTML = propName;
                headerRow.appendChild(headingCell);
            } else {
                let b = document.createElement("button");
                b.innerHTML = propName;
                b.id = propName;
                b.name = tracker;
                //Set up the button so it sorts when clicked
                direc[propName] = 0;
                b.onclick = function () {
                    sortTable(b.name, direc[b.innerHTML], b.innerHTML);


                };
                //Then just add it
                headingCell.appendChild(b);
                headerRow.appendChild(headingCell);
            }
            tracker++;
        }

        // This will be the part filled with info
        var tableBody = document.createElement("tbody");
        newTable.appendChild(tableBody);

        //We are going to loop through the rows and columns and set each value
        for (var i in myParams.table) {
            var tableRow = document.createElement("tr");
            tableBody.appendChild(tableRow);

            //Create one table data <td> content matching the property name
            var obj = myParams.table[i];
            for (var prop in obj) {

                tableRow.appendChild(obj[prop]);

            }
        }
    }




    return container;


}