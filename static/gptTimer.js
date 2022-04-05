let timerState = 60.0;
let newTextRequested = false;

function resetTimer() {
    timerState = 60.0;
    gptTimer(false);
}

function requestText() {
    if (newTextRequested) return;
    newTextRequested = true;
    let text = getFullText();
    let httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
      alert('Unable to create an XMLHTTP instance.');
      return false;
    }
    httpRequest.onreadystatechange = function() {
        try {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    resetTimer();
                    let data = JSON.parse(httpRequest.responseText);
                    if('newText' in data) {
                        console.log(data['newText']);
                        addAutomaticText(data['newText']);
                        newTextRequested = false;
                    } else {
                        console.log('ERROR: No newText in the response.', data)
                    }
                } else {
                    console.log('ERROR: The response hat a status other than 200.', httpRequest);
                }
            }
        } catch(e) {
            console.log('Caught Exception: ', e.description);
        }
    };
    httpRequest.open('POST', 'api/askGptForText');
    httpRequest.setRequestHeader("Content-Type", "application/json")
    httpRequest.setRequestHeader("Cache-Control", "no-cache")
    httpRequest.send(JSON.stringify({"context": text}));
}

function gptTimer(countdown=true) {
    document.getElementById("remainingTime").innerText = timerState.toFixed(1);
    document.getElementById("remainingTimeBar").style.width = (
        timerState / 60 * 100).toFixed(2) + "%";
    if (timerState <= 0.0) requestText();
    if(countdown) timerState -= 0.1;
}