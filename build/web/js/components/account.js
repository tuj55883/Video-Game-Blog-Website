var account = {};
(function ( ) {//IIFE
    //This returns the log on dive which allows the user
    //to enter an email and password to login
    account.logon = function ( ) {

        var logonDiv = document.createElement("div");
        logonDiv.classList.add("logon");

        //Entry for email
        var userEmailSpan = document.createElement('span');
        userEmailSpan.innerHTML = "Email Adress: ";
        logonDiv.appendChild(userEmailSpan);
        var userEmailInput = document.createElement("input");
        logonDiv.appendChild(userEmailInput);
        //Entry for password
        var userPasswordSpan = document.createElement('span');
        userPasswordSpan.innerHTML = "      Password: ";
        logonDiv.appendChild(userPasswordSpan);
        var userPasswordInput = document.createElement("input");
        //Censors password
        userPasswordInput.type = 'password';
        logonDiv.appendChild(userPasswordInput);
        
        //The button that will trigger the search
        var logonButton = document.createElement("button");
        logonButton.innerHTML = "Log on";
        logonDiv.appendChild(logonButton);

        var msgDiv = document.createElement("div");
        logonDiv.appendChild(msgDiv);
        //What happens when you click log on
        logonButton.onclick = function () {

            //Set up the url so our api will be triggered
            var url = "webAPIs/logonAPI.jsp?userEmail=" + escape(userEmailInput.value) +
                    "&userPw=" + escape(userPasswordInput.value);

            console.log("onclick function will make AJAX call with url: " + url);
            //Ajax call to process the log on
            ajax(url, processLogon, msgDiv);

            function processLogon(obj) {
                //Then just build the profile
                msgDiv.innerHTML = buildProfile(obj);
            }
        };  // onclick function

        return logonDiv;
    };
    //Reusable function the build the profile
    function buildProfile(userObj) { // NOW PRIVATE, can be called by any of the account functions…
        var msg = "";
        console.log("Successfully called the find API. Next line shows the returned object.");
        console.log(userObj);
        if (userObj.errorMsg.length > 0) {
            msg += "<strong>Error: " + obj.errorMsg + "</strong>";
        } else {
            msg += "<strong>Welcome Web User " + userObj.webUserId + "</strong>";
            msg += "<br/> Birthday: " + userObj.birthday;
            msg += "<br/> MembershipFee: " + userObj.membershipFee;
            msg += "<br/> User Role: " + userObj.userRoleId + " " + userObj.userRoleType;
            msg += "<p> <img src ='" + userObj.image + "'></p>";
        }
        //Returns the profile
        return msg;
    }
    ;
    //Just returns the user profile into a div
    account.getProfile = function () {
        var profileDiv = document.createElement("div");
        profileDiv.classList.add("logon");
        //Set it to our api
        var url = "webAPIs/getProfileAPI.jsp";

        console.log("onclick function will make AJAX call with url: " + url);
        //Ajax call to make profile
        ajax(url, processProfile, msgDiv);

        var msgDiv = document.createElement("div");
        profileDiv.appendChild(msgDiv);
        function processProfile(obj) {
            if (obj.userEmail === "") {//If there is not a user inform them
                msgDiv.innerHTML = "No user currently logged in";
            } else { //Otherwise build the profile
                msgDiv.innerHTML = buildProfile(obj);
            }
        }


        return profileDiv;
    };
    //Log off just invalidates the session
    account.logoff = function () {
        var logoffDiv = document.createElement("div");
        logoffDiv.classList.add("logon");
        //Call our api
        var url = "webAPIs/logoffAPI.jsp";

        console.log("onclick function will make AJAX call with url: " + url);
        ajax(url, logoffProfile, msgDiv);

        var msgDiv = document.createElement("div");
        logoffDiv.appendChild(msgDiv);
        function logoffProfile(obj) {
            msgDiv.innerHTML = obj.errorMsg;
        }


        return logoffDiv;

    };
}( )); 