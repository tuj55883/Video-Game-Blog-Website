/* 
 This function makes a visual element list of objects
 The parameters contain the name and then a subset of list parameters
 This is what makes up the the content on the page
 The list parameters contains
 -Title of the element
 -Image of the element
 -Then a array of string that will make up the content
 -The keys being the header and the values being the conent
TODO:
index.html
blog
go over rubric
-2: did not invoke public method on the two components. 
 */
function MakeInfoWindowList(myParams) {
    //Create the main div we will be putting our element into and ultimatley returning
    var infoWindowList = document.createElement("div");
    infoWindowList.classList.add("InfoWindowStyle");
    infoWindowList.classList.add("InfoWindowListStyleWidget");
    //This will be the name of the list the user passes
    var nameDiv = document.createElement("h1");
    //Sets it to user input
    nameDiv.innerHTML = myParams.name;
    infoWindowList.appendChild(nameDiv);

    //This function will make an individual element for each item in the list of items passed
    function MakeInfoWindow(listParams) {

        //Initilize the input vars to actual ones
        var title = listParams.title;
        var imgURL = listParams.img;
        //I made the button text optional because its not neccary but its cool to have the option
        var btnText = listParams.buttonText || "Learn More";
        var info = listParams.info;

        //This will be the main div for this element
        var infoWindow = document.createElement("div");
        infoWindow.classList.add("InfoWindowListStyleModalHolder");

        //Make the title of the element
        var titleDiv = document.createElement("h2");
        titleDiv.innerHTML = title ;
        infoWindow.appendChild(titleDiv);

        //Make a button that will launch our modal menu thing
        var btn = document.createElement("button");
        btn.classList.add("InfoWindowListStyleButton");
        btn.innerHTML = btnText;
        infoWindow.appendChild(btn);

        //This is just a break to give the image some room
        var brk = document.createElement("p");
        brk.innerHTML = "<br>";
        infoWindow.appendChild(brk);

        //Sets the image of the element
        var img = document.createElement("img");
        img.classList.add("InfoWindowListStyleImg")
        img.src = imgURL;
        infoWindow.appendChild(img);

        //Now everything below here will be our in our modal window
        //This is the main modal
        var myModal = document.createElement("div");
        myModal.classList.add('InfoWindowListStyleModal');
        infoWindow.appendChild(myModal);

        //We will be putting all the content like the accordion into here
        var modalContent = document.createElement("div");
        modalContent.classList.add('InfoWindowListStyleModal-Content');
        myModal.appendChild(modalContent);

        //A box that the user can enter text into so they can search through the acccordion
        var userInput = document.createElement("input");
        modalContent.appendChild(userInput);

        //A button to actually search through the accordion
        var userButton = document.createElement("button");
        userButton.innerHTML = "search";
        modalContent.appendChild(userButton);

        //The function that will launch the search function
        userButton.onclick = function () {
            //Check to make sure that their is acual content in the input box
            if ((userInput.value).replace(/\s/g, "") !== "") {
                //If there is we launch the function
                searchForWord((userInput.value).toUpperCase());
            }
        };

        //This is a button the user can click to close out the modal
        var closer = document.createElement("span");
        closer.innerHTML = "×";
        closer.classList.add('InfoWindowListStyleClose');
        modalContent.appendChild(closer);

        //Now here we make the actual accordion
        for (var key in info) {//Loop through the items
            //Set up a button to the key/index of the info which will act as our title
            var accBtn = document.createElement("button");
            accBtn.classList.add("InfoWindowListStyleAccordion");
            accBtn.innerHTML = key;
            modalContent.appendChild(accBtn);
            //This is the actual content of the accordion being made
            var accContent = document.createElement("div");
            accContent.classList.add("InfoWindowListStylePanel");
            var para = document.createElement("p");
            para.innerHTML = info[key];
            accContent.appendChild(para);
            modalContent.appendChild(accContent);


        }
        //Here we set up the click function for each accorion element
        var acc = modalContent.getElementsByClassName("InfoWindowListStyleAccordion");
        var i;
        //So we loop through each button
        for (i = 0; i < acc.length; i++) {
            //Adding a function for each button
            acc[i].addEventListener("click", function () {
                //Set the accordion to active which I use for the search function next
                this.classList.toggle("active");
                //This is the content
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            });
        }

        //This is what makes the modal visable
        btn.onclick = function () {
            myModal.style.display = "block";
        };

        //This makes it so the exite button makes the modal invisable
        closer.onclick = function () {
            myModal.style.display = "none";
        };

        //Here if the user clicks out of the modal but still on the element it will exit
        myModal.onclick = function (event) {
            if (event.target === myModal) {
                myModal.style.display = "none";
            }
        };

        //This is the function our search button uses
        function searchForWord(word) {//Passes the word entered
            //Get an array of the accordion buttons
            var acc = modalContent.getElementsByClassName("InfoWindowListStyleAccordion");
            var i;
            //Loop through accordion button array
            for (i = 0; i < acc.length; i++) {
                //First we check if either the button contains the word or if the contents contains the word
                if (((acc[i].innerHTML).toUpperCase()).includes(word) || (((acc[i].nextElementSibling).innerHTML).toUpperCase()).includes(word)) {
                    //If it does then we check if the accordion is active
                    if (acc[i].className === "InfoWindowListStyleAccordion") {
                        //If not activate the accordion button
                        acc[i].click();
                    }
                } else {
                    //If nothing contains the word we check if its active
                    if (acc[i].className !== "InfoWindowListStyleAccordion") {
                        //if it is we click it and this closes it
                        acc[i].click();
                    }
                }
            }
        }
        ;
        //Then we return the div we just made
        return infoWindow;

    }
    ;

    //Then we do this for each element passed through the list
    for (var i in myParams.list) {
        //Running our make info window function for each item
        infoWindowList.appendChild(MakeInfoWindow(myParams.list[i]));
    }

    //Adds a new accordion fold with the items passed based on the title
    infoWindowList.addAccordionFold = function (title, newFoldName, content) {
        var modalList = infoWindowList.getElementsByClassName("InfoWindowListStyleModalHolder");
        var i;
        console.log("here");
        for (i = 0; i < modalList.length; i++) {
            console.log((modalList[i].firstChild).innerHTML);
            if (((modalList[i].firstChild).innerHTML).toUpperCase() === title.toUpperCase()) {
                var temp = modalList[i].getElementsByClassName("InfoWindowListStyleModal");
                console.log(modalList[i]);
                var temp2 = temp[0].firstChild;

                var accBtn = document.createElement("button");
                accBtn.classList.add("InfoWindowListStyleAccordion");
                accBtn.innerHTML = newFoldName;
                temp2.appendChild(accBtn);
                //This is the actual content of the accordion being made
                var accContent = document.createElement("div");
                accContent.classList.add("InfoWindowListStylePanel");
                var para = document.createElement("p");
                para.innerHTML = content;
                accContent.appendChild(para);
                temp2.appendChild(accContent);

                accBtn.addEventListener("click", function () {
                    //Set the accordion to active which I use for the search function next
                    this.classList.toggle("active");
                    //This is the content
                    var panel = this.nextElementSibling;
                    if (panel.style.maxHeight) {
                        panel.style.maxHeight = null;
                    } else {
                        panel.style.maxHeight = panel.scrollHeight + "px";
                    }
                });
                
            }
        }
    };

    //Then utimatley returning the fully formed list
    return infoWindowList;

}