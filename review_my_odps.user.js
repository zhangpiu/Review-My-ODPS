// ==UserScript==
// @name        Review My ODPS
// @description Adds live example button, with styling.
// @match       https://ide.shuju.aliyun.com/
// @grant       GM_addStyle
// @require     https://raw.githubusercontent.com/eligrey/FileSaver.js/master/FileSaver.js
// @author      qingzhi
// ==/UserScript==

/** 
 *  Create a button in a container div.  It will be styled and
 *  positioned with CSS.
 */
var zNode       = document.createElement ('div');
zNode.innerHTML = '<button id="myButton" type="button">'
                + 'Review</button>'
                ;
zNode.setAttribute ('id', 'myContainer');
document.body.appendChild (zNode);

//--- Activate the newly added button.
document.getElementById ("myButton").addEventListener (
    "click", ButtonClickAction, false
);

function ButtonClickAction (zEvent) {
    /*--- For our dummy action, we'll just add a line of text to the top
        of the screen.
    */
    
    var editor = $('.CodeMirror')[0].CodeMirror;
    var code = editor.getValue();
    
    // 1. An easy but not elegant way to save the code.
    //var a = document.createElement("a");
    //a.href = "data:text," + code;   //content
    //a.download = "odps.sql";            //file name
    //a.click();
    
    // Save the code to a local file.
    var blob = new Blob([code], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "odps.sql");
    
    /* Show more information once success. */
    //var zNode       = document.createElement ('p');
    //zNode.innerHTML = 'The button was clicked.';
    //document.getElementById ("myContainer").appendChild (zNode);
}

//--- Style our newly added elements using CSS.
GM_addStyle ( multilineStr ( function () {/*!
    #myContainer {
        position:               absolute;
        top:                    30;
        left:                   60;
        font-size:              13px;
        background:             red;
        border:                 1px outset white;
        margin:                 2px 40px;
        opacity:                0.9;
        z-index:                888;
        padding:                0px 0px;
    }
    #myButton {
        cursor:                 pointer;
        background:             rgb(0, 153, 204);
    }
    #myContainer p {
        color:                  red;
        background:             white;
    }
*/} ) );

function multilineStr (dummyFunc) {
    var str = dummyFunc.toString ();
    str     = str.replace (/^[^\/]+\/\*!?/, '') // Strip function () { /*!
            .replace (/\s*\*\/\s*\}\s*$/, '')   // Strip */ }
            .replace (/\/\/.+$/gm, '') // Double-slash comments wreck CSS. Strip them.
            ;
    return str;
}



