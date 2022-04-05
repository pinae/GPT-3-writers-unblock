var et, automaticText = [];

function moveCursorToEndOfEditableText() {
    let range = document.createRange();
    let sel = window.getSelection();
    range.setStart(et.lastChild, et.lastChild.innerText.length);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
}

function initEt() {
    document.execCommand("defaultParagraphSeparator", false, "p");
    et = document.getElementById("editableText");
    for(let i in et.children) if(typeof et.children[i] === "object" &&
                                 et.children[i].classList.contains("automatic")) {
        automaticText.push(et.children[i].innerText);
    }
    et.addEventListener("input", formatText);
    et.focus();
    setTimeout(function () {
        let range = document.createRange();
        let sel = window.getSelection();
        range.setStart(et.firstChild, 0);
        range.setEnd(et.lastChild, et.lastChild.innerText.length)
        sel.removeAllRanges();
        sel.addRange(range);
    }, 1000);
}

function getFullText() {
    let text = "";
    for(let i in et.children) if(typeof et.children[i] === "object") {
        text += et.children[i].innerText + "\n";
    }
    return text;
}

function getAllParagraphs() {
    let paragraphList = [];
    for(let i in et.children) if(typeof et.children[i] === "object") {
        paragraphList.push(et.children[i]);
    }
    return paragraphList
}

function findEndOfContext() {
    let pl = getAllParagraphs();
    let newAutomaticText = [];
    let automaticEnd = -1;
    for(let i = pl.length - 1; i >= 0; i--) {
        let p = et.children[i];
        if(p.classList.contains("automatic")) {
            let lastAutomatic = automaticText.pop();
            if(p.innerText === lastAutomatic) newAutomaticText.splice(0, 0, lastAutomatic);
            else {
                automaticEnd = i;
            }
        }
    }
    automaticText = newAutomaticText;
    return automaticEnd;
}

function getParagraphCount(el) {
    let count = 0;
    for(let i in el.children) if(typeof el.children[i] === "object" && el.children[i].tagName === 'P') count++;
    return count
}

function moveBaseTextToP() {
    let newParagraph = document.createElement('p');
    newParagraph.classList.add('context');
    newParagraph.innerText = et.innerText;
    while(et.firstChild) et.removeChild(et.firstChild);
    et.appendChild(newParagraph);
    moveCursorToEndOfEditableText();
}

function formatText() {
    if(getParagraphCount(et) === 0) moveBaseTextToP();
    let endOfContext = findEndOfContext();
    if(endOfContext > 0) {
        for(let i = 0; i <= endOfContext; i++) {
            et.children[i].classList.remove("automatic");
            et.children[i].classList.add("context");
        }
    }
    resetTimer();
}

function addAutomaticText(newText) {
    let newParagraph = document.createElement('p');
    newParagraph.classList.add('automatic');
    newParagraph.innerText = newText;
    et.appendChild(newParagraph);
    automaticText.push(newText);
}