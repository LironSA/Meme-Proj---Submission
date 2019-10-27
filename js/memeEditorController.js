'use strict'

// var gIsPenDown = false;
var gCanvas;
var gCtx;



function init() {

    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');

    resizeCanvas();
    renderCanvas();
    // drawImg();
    document.querySelector('.editOptions input').value = getCurrTxt();
}


//***********************************************/
function resizeCanvas() {
    gCanvas.width = window.innerWidth * 0.4
    gCanvas.height = window.innerHeight * 0.5
}
//***********************************************/

function renderCanvas() {

    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);  //(x,y,W,H)
    var img = new Image();
    img.src = gMeme.imgUrl;

    setTimeout(() => {
        renderCanvas();
    }, 0)


    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    
    // gCtx.strokeStyle = gMeme.color;
    // gCtx.strokeStyle = gMeme.stroke;
    gCtx.shadowColor = "blue";


    // img.onload = () => {
    //     gCtx.drawImage(img, 0, 0);
    //     // gCtx.strokeText(gMeme.lines[0],100,100);
    // }

    // gCtx.strokeStyle = gMeme.color;
    // gCtx.strokeStyle = gMeme.stroke;
    gCtx.shadowColor = "blue";


    gMeme.lines.forEach(function (line, idx) {
        gCtx.fillStyle = line.color;
        gCtx.shadowBlur = 0;
        if (idx === gMeme.currLineIdx) {
            gCtx.shadowBlur = 7;
        }

        var offsetRight = line.txt.length * line.fontSize / 1.73
        var x = (line.align === 'left') ? 10 : (line.align === 'center') ? (gCanvas.width * 0.5) - 100 : (gCanvas.width - offsetRight);
        gCtx.font = `${line.fontSize}px Arial`;
        // console.log("font:", gCtx.font)
        // line.font = "500px Arial";
        // gCtx.font = "30px Arial";

        var y = (idx === 0) ? 50 : (idx === 1) ? gCanvas.height - 50 : gCanvas.height / 2
        gCtx.fillText(line.txt, x, y);
        gCtx.strokeText(line.txt, x, y);
    })
}

function drawImg() {
    const img = document.querySelector('img');
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

// Will be used for text areas:
function onNextTxt() {
    nextTxt();
    document.querySelector('.editOptions input').value = getCurrTxt();
    renderCanvas();
}

/* ---- EDIT-OPTIONS FUNCTIONS ---- */
/* ---- Type txt ---- */
function onTxtChanged(txt) {
    txtChanged(txt);
    renderCanvas();
}

function onGetCurrTxt() {
    getCurrTxt();
    renderCanvas();
}

/* ---- Option #1 ---- */
function onMoveText(dir) {
    moveText(dir);
    renderCanvas();
}

function onAddLine(elBtnAdd) {
    addLine();
    renderCanvas();
    document.querySelector('.editOptions input').value = getCurrTxt();
    if (!canAddLine()) elBtnAdd.disabled = true;
    var elBtnDel = document.querySelector('.btn-del');
    elBtnDel.disabled = false;
}

function onDeleteLine(elBtnDel) {
    deleteCurrLine();
    renderCanvas();
    document.querySelector('.editOptions input').value = getCurrTxt();
    var elBtnAdd = document.querySelector(".btn-add");
    if (!canDelLine()) elBtnDel.disabled = true;
    elBtnAdd.disabled = false;
}

/* ---- Option #2 ---- */
function onSetAlign(dir) {
    setAlign(dir);
    renderCanvas();
}
function onSetFontSize(diff) {
    setFontSize(diff);
    renderCanvas();
}

/* ---- Option #3 ---- */
function onSetFont(e) {
    console.log(e.options[e.selectedIndex].value);

    // document.querySelector(e.options[e.selectedIndex].value) = getCurrTxt();
    
    setFont(event.value);
    renderCanvas();
}

function onSetPenColor(color) {
    setPenColor(color);
    renderCanvas();
}

function onSetStroke(stroke) {
    setStroke(stroke);
    renderCanvas();
}

/* ---- Option #4 ---- */


/* ---- Gallery ---- */
function onSelectImage(elImg) {
    selectImage(elImg.src);
    renderCanvas();
}


/* ---- Download ---- */
function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-img.jpg'
}


function downloadImg(elLink) {
    var imgContent = canvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}