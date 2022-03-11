/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function ajax(url, successCallBackFn, errorEle) {

        var httpReq;
        if (window.XMLHttpRequest) {
            httpReq = new XMLHttpRequest(); //For Firefox, Safari, Opera
        } else if (window.ActiveXObject) {
            httpReq = new ActiveXObject("Microsoft.XMLHTTP"); //For IE 5+
        } else {
            alert('ajax not supported');
        }

        httpReq.open("GET", url); 

        httpReq.onreadystatechange = function () {

            if (httpReq.readyState === 4) {
                if (httpReq.status === 200) {
                    var obj = JSON.parse(httpReq.responseText);
                    console.log(obj);

                    successCallBackFn(obj);

                } else { 
                    errorEle.innerHTML = "Error " + httpReq.status + "-" + httpReq.statusText +
                            " while attempting to read '" + url + "'. Must Run not View if AJAX being used.";
                }
            }
        }; 

        httpReq.send(null); // initiate ajax call
        console.log("call initiated");

        return;
    } 

