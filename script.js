// todo - 1. stop blocks ad the bottom on the page depending on their orientation.

let board = document.querySelector('.game_board');
// when getShapes executes will be add the shape width data to this variable so we can use it in other functions
let block;
// when getShapes executes will be add the shape height data to this variable so we can use it in other functions
let blockHeight;
// id of current tetris block
let tetrisBlockId = 0;
// set a ranodm block colour
let blockColour = ['#00ffff' , '#ffff00' , '#800080' , '#00ff00' , '#ff0000' ,  '#0000ff' , '#ff7f00' , '#7f7f7f'];
// get title
let title = document.querySelector('.title');
let titleHtml = title.innerText.split('');
let str = '';
titleHtml.forEach((title) => {
    str += `<span style="color:${blockColour[Math.floor(Math.random() * 8)]}">${title}</span>`;
})

title.innerHTML = str;


// each letter contains position values for each block to make up that shape - this is passed into the getShapes function as an argument which will generate a shape
let shapes  =
    {
        I: {
            blocks: {
                b1: {left:0, top:0 , right:0 , bottom: 0},
                b2: {left:20, top:0 , right:0 , bottom: 0},
                b3: {left:40, top:0 , right:0 , bottom: 0},
                b4: {left:60, top:0 , right:0 , bottom: 0},
            },
            width: 80,
            height: 20
        },
        J: {
            blocks:{
                b1: {left: 0, top:18 , right:0 , bottom: 0},
                b2: {left: 20, top:18 , right:0 , bottom: 0},
                b3: {left: 40, top:18 , right:0 , bottom: 0},
                b4: {left: 0, top:0 , right:0 , bottom: 0}
            },
            width: 60,
            height: 40
        },
        L: {
            blocks:{
                b1: {left: 0, top:18 , right:0 , bottom: 0},
                b2: {left: 20, top:18 , right:0 , bottom: 0},
                b3: {left: 40, top:18 , right:0 , bottom: 0},
                b4: {left: 40, top:0 , right:0 , bottom: 0}
            },
            width: 60,
            height: 40
        
        },
        O: {
            blocks: {
                b1: {left: 0, top:0 , right:0 , bottom: 0},
                b2: {left: 20, top:0 , right:0 , bottom: 0},
                b3: {left: 20, top:18 , right:0 , bottom: 0},
                b4: {left: 0, top:18, right:0 , bottom: 0}
            },
            width:40,
            height: 40
        },
        S: {
            blocks:{
                b1: {left: 40, top:0 , right:0 , bottom: 0},
                b2: {left: 20, top:0 , right:0 , bottom: 0},
                b3: {left: 20, top:18 , right:0 , bottom: 0},
                b4: {left: 0, top:18 , right:0 , bottom: 0}
            },
            width: 60,
            height: 40
        },
        T: {
            blocks: {
                b1: {left: 0, top:0 , right:0 , bottom: 0},
                b2: {left: 20, top:0 , right:0 , bottom: 0},
                b3: {left: 20, top:18 , right:0 , bottom: 0},
                b4: {left: 40, top:0 , right:0 , bottom: 0}
            },
            width: 60,
            height: 40
        },
        Z: {
            blocks: {
                b1: {left: 0, top:0 , right:0 , bottom: 0},
                b2: {left: 20, top:0 , right:0 , bottom: 0},
                b3: {left: 20, top:18 , right:0 , bottom: 0},
                b4: {left: 40, top:18 , right:0 , bottom: 0}
            } ,
            width: 60,
            height: 40
        }
    }


function getShape(shapes){
    // the width of the tetris block
    let boundingBoxWidth = 0;
    // the shape css values
    let outputShape;
    // get the values of the shapes object
    let letter = Object.values(shapes);
    // generate random number between 0 - 5 which will determine which shape we pick out
    outputShape = letter[Math.floor(Math.random() * 6)];
    // get the values of the blocks object within the shapes object
    let outPutArr = Object.values(outputShape.blocks);
    // create a string of the html elements for each individual block that will make up the overall tetris shape
    let html = '';
    // set a ranodm block colour
    let colour = blockColour[Math.floor(Math.random() * 8)];
    // for each of the values from the outPutArr will will add inline styling to each div - which is appended to the html variable
    outPutArr.forEach((block , index) => {
        boundingBoxWidth += block.left;
        html += `<div class="twenty_block" style="background:${colour};left:${block.left ? block.left : '0'}px;right:${block.right ? block.right : '0'}px;top:${block.top ? block.top : '0'}px;bottom:${block.bottom ? block.bottom : '0'}px"></div>`
    });
    // get the width for each block
    block = outputShape.width;
    // get the height for each block
    blockHeight = outputShape.height;
    // append to the the ganme oard
    board.innerHTML += `<div class="tetris_block line" style="width:${outputShape.width}px;height:${outputShape.height}px"><div class="block-container">${html}<div></div>  `;
}

// listen to arrow keys and callback rotateBlock function
document.addEventListener('keydown' , rotateBlock);
// intial rotation will be 0
let rotateState = 0;
// intial horizontalPosition will be 0
let horizontalPosition = 0;
// intial varticalPosition will be 0
let verticalPosition = 0;

function rotateBlock(e){
    // get tetris block
    let blockContainter = document.querySelectorAll('.tetris_block .block-container');
    // get tetris block
    let tetrisBlock = document.querySelectorAll('.tetris_block');
    // if block is not yet at the bottom of the game board continue to listen to keys, else stop listening for that specific block
    // if(verticalPosition < 460){
        // listen to up arrow key and add 90deg
        if(e.keyCode == 38){
            rotateState += 90;
            blockContainter[tetrisBlockId].style.transform = `rotate(${rotateState}deg)`;
            tetrisBlock[tetrisBlockId].style.transform = `rotate(${rotateState}deg)`;
            updatingBoundingBox(tetrisBlock[tetrisBlockId].offsetHeight , tetrisBlock[tetrisBlockId].offsetWidth , tetrisBlock[tetrisBlockId] , blockContainter[tetrisBlockId]);
        // listen to down arrow key and remove 90deg
        } else if(e.keyCode == 40){
            rotateState -= 90;
            blockContainter[tetrisBlockId].style.transform = `rotate(${rotateState}deg)`;
            tetrisBlock[tetrisBlockId].style.transform = `rotate(${rotateState}deg)`;
            // blockContainter[tetrisBlockId].style.transform = `rotate(${rotateState}deg)`;
            updatingBoundingBox(tetrisBlock[tetrisBlockId].offsetHeight , tetrisBlock[tetrisBlockId].offsetWidth , tetrisBlock[tetrisBlockId] ,blockContainter[tetrisBlockId]);

        // listen to right arrow key and increment horizontal position by 20px
        } else if(e.keyCode == 39){
            if(horizontalPosition < 300 - tetrisBlock[tetrisBlockId].offsetWidth){
                horizontalPosition += 20
                tetrisBlock[tetrisBlockId].style.left = `${horizontalPosition}px`;
            }
        // listen to left arrow key and decrement by 20px
        } else if(e.keyCode == 37){
            if(horizontalPosition > 0){
                horizontalPosition -= 20;
                tetrisBlock[tetrisBlockId].style.left = `${horizontalPosition}px`;
            }
        }
    // }
}

// pass in the shapes object to get the first shape
getShape(shapes)
getShape(shapes)
getShape(shapes)
getShape(shapes)

setInterval(function () {
    let tetrisBlock = document.querySelectorAll('.tetris_block');
    tetrisBlock[tetrisBlockId].setAttribute('data-id' , tetrisBlockId);
    tetrisBlock[tetrisBlockId].classList.add('current');
    if(verticalPosition < 500 - tetrisBlock[tetrisBlockId].offsetHeight && tetrisBlockId < tetrisBlock.length){
        verticalPosition += 20;
        tetrisBlock[tetrisBlockId].style.top = `${verticalPosition}px`;
    } else {
        tetrisBlock[tetrisBlockId].classList.remove('current');
        verticalPosition = 0;
        tetrisBlockId++;
    }
}, 1000);


function updatingBoundingBox(height , width , boundingElement , rotationElement){
    boundingElement.style.height = `${width}px`;
    boundingElement.style.width = `${height}px`; 
    rotationElement.style.height = `${width}px`;
    rotationElement.style.width = `${height}px`; 
}

