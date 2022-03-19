let board = document.querySelector('.game_board');
let block;

let shapes  =
    {
        I: {
            blocks: {
                b1: {left:0, top:0 , right:0 , bottom: 0},
                b2: {left:20, top:0 , right:0 , bottom: 0},
                b3: {left:40, top:0 , right:0 , bottom: 0},
                b4: {left:60, top:0 , right:0 , bottom: 0},
            },
            width: 80
        },
        J: {
            blocks:{
                b1: {left: 0, top:18 , right:0 , bottom: 0},
                b2: {left: 20, top:18 , right:0 , bottom: 0},
                b3: {left: 40, top:18 , right:0 , bottom: 0},
                b4: {left: 0, top:0 , right:0 , bottom: 0}
            },
            width: 60
        },
        L: {
            blocks:{
                b1: {left: 0, top:18 , right:0 , bottom: 0},
                b2: {left: 20, top:18 , right:0 , bottom: 0},
                b3: {left: 40, top:18 , right:0 , bottom: 0},
                b4: {left: 40, top:0 , right:0 , bottom: 0}
            },
            width: 60
        
        },
        O: {
            blocks: {
                b1: {left: 0, top:0 , right:0 , bottom: 0},
                b2: {left: 20, top:0 , right:0 , bottom: 0},
                b3: {left: 20, top:18 , right:0 , bottom: 0},
                b4: {left: 0, top:18, right:0 , bottom: 0}
            },
            width:40
        },
        S: {
            blocks:{
                b1: {left: 40, top:0 , right:0 , bottom: 0},
                b2: {left: 20, top:0 , right:0 , bottom: 0},
                b3: {left: 20, top:18 , right:0 , bottom: 0},
                b4: {left: 0, top:18 , right:0 , bottom: 0}
            },
            width: 60
        },
        T: {
            blocks: {
                b1: {left: 0, top:0 , right:0 , bottom: 0},
                b2: {left: 20, top:0 , right:0 , bottom: 0},
                b3: {left: 20, top:18 , right:0 , bottom: 0},
                b4: {left: 40, top:0 , right:0 , bottom: 0}
            },
            width: 60
        },
        Z: {
            blocks: {
                b1: {left: 0, top:0 , right:0 , bottom: 0},
                b2: {left: 20, top:0 , right:0 , bottom: 0},
                b3: {left: 20, top:18 , right:0 , bottom: 0},
                b4: {left: 40, top:18 , right:0 , bottom: 0}
            } ,
            width: 60
        }
    }


function getShape(shapes){
    let boundingBoxWidth = 0;
    let outputShape;
    let letter = Object.values(shapes);

    outputShape = letter[Math.floor(Math.random() * 6)];
    let outPutArr = Object.values(outputShape.blocks);
    let html = '';

    outPutArr.forEach((block , index) => {
        boundingBoxWidth += block.left;
        html += `<div class="twenty_block" style="left:${block.left ? block.left : '0'}px;right:${block.right ? block.right : '0'}px;top:${block.top ? block.top : '0'}px;bottom:${block.bottom ? block.bottom : '0'}px"></div>`
    });
    
    block = outputShape.width;
    board.innerHTML += `<div class="tetris_block line" style="width:${outputShape.width}px">${html}</div>  `;
}
getShape(shapes);

document.addEventListener('keydown' , rotateBlock);

let rotateState = 0;
let horizontalPosition = 0;

function rotateBlock(e){
    let tetrisBlock = document.querySelector('.tetris_block');
    if(e.keyCode == 38){
        rotateState += 90;
        tetrisBlock.style.transform = `rotate(${rotateState}deg)`;
    } else if(e.keyCode == 40){
        rotateState -= 90;
        tetrisBlock.style.transform = `rotate(${rotateState}deg)`;
    } else if(e.keyCode == 39){
        if(horizontalPosition < 300 - block){
            horizontalPosition += 20
            tetrisBlock.style.left = `${horizontalPosition}px`;
        }
    } else if(e.keyCode == 37){
        if(horizontalPosition > 0){
            horizontalPosition -= 20;
            tetrisBlock.style.left = `${horizontalPosition}px`;
        }
    }
}

let verticalPosition = 0;

setInterval(function () {
    let tetrisBlock = document.querySelector('.tetris_block');
    if(verticalPosition < 460){
        verticalPosition += 46;
        tetrisBlock.style.top = `${verticalPosition}px`;
    }
}, 1000);
