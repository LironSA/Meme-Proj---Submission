'use strict'

const STORAGE_KEY = 'meme';

var gKeywords = { 'happy': 12, 'funny puk': 1, 'hilarious': 3 };
var gMeme = createMeme();
function createMeme() {
    var meme = loadMemeFromStorage();
    if (meme) {
        console.log('Inside: ', gMeme)
        return meme;
    }
    else {
        meme = {
            imgUrl:'',
            lines: [
                createLine('Type line 1'),                  
                createLine('Type line 2'),                  
            ],
            currLineIdx: 0,
        };
        console.log('Inside: ', gMeme)
        return meme;
    }
}

// -- LOCAL STORAGE --
function saveMemeToLocalStorage() {
    saveToStorage(STORAGE_KEY, gMeme);
}

function loadMemeFromStorage() {
    return loadFromStorage(STORAGE_KEY);
}




function createLine(txt) {
    var line =  {
        txt,
        color: 'white',
        stroke: 'black',
        fontSize: 30,
        font: 'Impact',
        align: 'left',
    }
    return line;
}

function getCurrTxt() {
    if (gMeme.currLineIdx < 0) return '';
    var line = gMeme.lines[gMeme.currLineIdx];
    return line.txt;
}


function getCurrImg() {
    
    var line = gMeme.lines[gMeme.currLineIdx];
    return line.imgUrl;
}


function nextTxt() {
    console.log('length:', gMeme.lines.length - 1)

    if (gMeme.currLineIdx >= gMeme.lines.length - 1) {
        gMeme.currLineIdx = 0;
    } else {
        gMeme.currLineIdx++;
    }
}

function canAddLine () {
    return gMeme.lines.length < 3;
}


function canDelLine () {
    return gMeme.lines.length > 0;
}

/* --- Type txt ---- */
function txtChanged(txt) {
    var line = gMeme.lines[gMeme.currLineIdx];
    line.txt = txt;
}

function addLine() {
    var line = createLine('new line');
    gMeme.lines.push(line);
    gMeme.currLineIdx = gMeme.lines.length-1;
}

function deleteCurrLine() {
    if (gMeme.currLineIdx < 0) return;
    gMeme.lines.splice(gMeme.currLineIdx, 1);
    if (!(gMeme.currLineIdx === 0 && gMeme.lines.length > 0)) gMeme.currLineIdx--;
}


/* WORKS---- Option #2 ---- */
function setAlign(dir) {
    var line = gMeme.lines[gMeme.currLineIdx];
    line.align = dir;
}
function setFontSize(diff) {
    console.log('font size: ', diff);
    var line = gMeme.lines[gMeme.currLineIdx];
    line.fontSize += diff;
}

/* ---- Option #3 ---- */
function setFont(font) {
    var line = gMeme.lines[gMeme.currLineIdx];
    line.font = font;
}
function setPenColor(color) {
    var line = gMeme.lines[gMeme.currLineIdx];
    line.color = color;
}
function setStroke(stroke) {
    var line = gMeme.lines[gMeme.currLineIdx];
    line.stroke = stroke;
}

/* ---- Option #4 ---- */


/* ---- Gallery ---- */
function selectImage(imgUrl) {
    console.log('gMeme', gMeme);
    gMeme.imgUrl = imgUrl;
    saveMemeToLocalStorage();
    window.location.href='memeEditor.html'
}

// ADD AFTER CANVAS WORKS!!!!!
// function clearCanvas() {
//     gCtx.fillStyle = 'blue'
//     gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height)
//     gCtx.clearRect(50, 50, 100, 100)
// }
