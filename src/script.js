function loadXMLDoc(passedURL, callbackFn) {

    /*
    return callbackFn(null, `{"buttons":[28,35,-12,-49],"bars":[26,83,76,82],"limit":120}`);
    */
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                return callbackFn(null, this.responseText);
            }
            else {
                var errorString = { status: this.status, statusText: this.statusText };
                console.log(" error:", errorString, this.status, this.readyState, this.statusText);
                return callbackFn(errorString, null);
            }
        }

    };

    xhttp.open("GET", passedURL, true);
    xhttp.send();

}

function btnClick(btnID, btnValue, maxLimit) {
    var dropDownOptionSelected = document.getElementById('barSelect').value;
    var readBtnValue = document.getElementById(btnID).getAttribute('value');
    var existingBarValue = document.getElementById(dropDownOptionSelected).children[1].getAttribute('value');
    var newValue = parseInt(readBtnValue) + parseInt(existingBarValue);
    var actualBar = document.getElementById(dropDownOptionSelected).children[1];

    if (newValue > 100) {
        actualBar.setAttribute('style', 'width:100%');
        if (actualBar.classList.contains('redClass')) { } else {
            actualBar.setAttribute('class', ' progressArea redClass');
        }

        if (newValue >= maxLimit) {
            document.getElementById(dropDownOptionSelected).children[0].innerHTML = maxLimit + '%';
            actualBar.setAttribute('value', maxLimit);

        } else {
            document.getElementById(dropDownOptionSelected).children[0].innerHTML = newValue + '%';
            actualBar.setAttribute('value', newValue);
        }

    } else if (newValue < 0) {
        actualBar.setAttribute('style', 'width:0%');
        document.getElementById(dropDownOptionSelected).children[0].innerHTML = '0%';
        actualBar.setAttribute('value', 0);
    } else {
        if (actualBar.classList.contains('redClass')) {
            actualBar.setAttribute('class', ' progressArea ');
        }
        actualBar.setAttribute('style', 'width:' + newValue + '%');
        document.getElementById(dropDownOptionSelected).children[0].innerHTML = newValue + '%';
        actualBar.setAttribute('value', newValue);
    }

}


loadXMLDoc("http://pb-api.herokuapp.com/bars", function (err, data) {
    if (err) { console.log('error from API:', err); }
    else {
        console.log("data from API:", data);
        var myObj = JSON.parse(data);


        // Create a <button>s
        for (var i = 0; i < myObj.buttons.length; i++) {
            var btn = document.createElement("BUTTON");
            var setID = i + 1;
            setID = "bar" + setID;
            btn.setAttribute("id", setID);
            btn.setAttribute("value", myObj.buttons[i]);
            btn.setAttribute("onclick", "btnClick('" + setID + "', '" + myObj.buttons[i] + "', " + myObj.limit + ")");
            btn.innerHTML = myObj.buttons[i];
            document.getElementById("progressButtonsArea").appendChild(btn);
        }


        // Create a <div>s for bars
        for (var i = 0; i < myObj.bars.length; i++) {

            var progressDiv = document.createElement("div");
            progressDiv.setAttribute("class", 'progressArea');
            progressDiv.setAttribute("style", 'width:' + myObj.bars[i] + '%');
            progressDiv.setAttribute("value", myObj.bars[i]);

            var barDiv = document.createElement("div");

            var setID = i + 1;
            setID = "progress" + setID;
            barDiv.setAttribute("id", setID);
            barDiv.setAttribute("class", 'progressBar');

            var spanValue = document.createElement("span");
            spanValue.innerHTML = myObj.bars[i] + '%';


            document.getElementById("progressBarsArea").appendChild(barDiv);
            document.getElementById(setID).appendChild(spanValue);
            document.getElementById(setID).appendChild(progressDiv);

            document.getElementById('barSelect').setAttribute('style', 'display:initial');
            var dropDownOption = document.createElement("option");
            dropDownOption.setAttribute("value", setID);
            dropDownOption.innerHTML = setID;
            document.getElementById('barSelect').appendChild(dropDownOption);
        }
    }
});