// pseudo code
// int variable for player turn 0 or 1
// int varia
// variable array for all my boxes
// array variable for all the sides of the boxes
// add event listener for whenever a side gets clicked
// add event listener to reset button that calls restart game function that will start the game from scratch 
// when an uncolored side gets clicked check whether or not the side is the last side of a cooresponding box
// if so color box and side to player's color and add 1 to that player's score
// if not just change side's color to player's color
// when all boxes are colored end game and display message with info about who won
// call restart game function


// Idea for connecting boxes to edges
// make 2d array to represent center boxes initialize with zero
//   |_|  set vertical edges(pipes) with id v00 v01 foramt(v - vertocal, row number, col number)
// whenever you come across vertical edge you extract column number
// then add 1 to to center box before (if column number is not 0) and 1 to center box after(if column number is not n)
// similar thing for the horizontal edges e.g. h00 h01 format(h - horizontal, row number, column number)
// when 2d array pos for the center box == 4 then I color entire box
const startButton = document.querySelector('.startButton');
const sliders = document.querySelectorAll('.slider');
const firstLayer = document.querySelector('.firstLayer');
startButton.addEventListener('click', startGame);
let dots = document.querySelectorAll('.dots');
let horizontalEdges = document.querySelectorAll('.hEdge');
let verticalEdges = document.querySelectorAll('.vEdge');
const playerColors = ['red', 'blue'];
let playerColorIndex = 0;
const gameMatrix = [];
let redPlayerScore = 0;
let bluePlayerScore= 0;
const redScore = document.querySelector('#redScore');
const blueScore = document.querySelector('#blueScore');
const gameStatus = document.querySelector('#gameStatus');

// update slider text as slider is being dragged
sliders.forEach(slider => slider.oninput = function (){
    console.log(slider.id)
    const label = document.querySelector(`.${slider.id}`);
    console.log(label);
    if(slider.id == 'rowSlider')
        label.innerText = `Row: ${this.value}`;
    else
        label.innerText = `Column: ${this.value}`;  
} );
const gameBoard = document.querySelector('.gameboard');
function startGame(){
    firstLayer.classList.toggle('hide');
    const rowSize = sliders[0].value;
    const colSize = sliders[1].value;
    for(let i = 0; i < rowSize * 2 + 1; ++i){
        const currRow = document.createElement('div');
        currRow.classList.add('row' + (i % 2).toString());
        const row = [];
        for(let j = 0; j < colSize * 2 + 1; ++j){
            row.push(0);
            const currElement = document.createElement('div');
            if(i % 2 == 0){
                if(j % 2 == 0){
                    currElement.classList.add('dot');
                }
                else{
                    currElement.setAttribute('id', `h-${i}-${j}`)
                    currElement.classList.add('hEdge');
                }
            }
            else{
                if(j % 2 == 0){
                    currElement.setAttribute('id', `v-${i}-${j}`)
                    currElement.classList.add('vEdge');
                }
                else{
                    currElement.setAttribute('id', `b-${i}-${j}`)
                    currElement.classList.add('box');
                }
            }
            currRow.append(currElement);
            console.log(row);
        }
        gameMatrix.push(row);
        gameBoard.append(currRow);
    }
    console.table(gameMatrix);
    dots = document.querySelectorAll('.dots');
    horizontalEdges = document.querySelectorAll('.hEdge');
    verticalEdges = document.querySelectorAll('.vEdge');
    console.log(horizontalEdges);
    horizontalEdges.forEach((edge) => edge.addEventListener('click', () => changeEdgeColor(edge))); 
    verticalEdges.forEach((edge) => edge.addEventListener('click', () => changeEdgeColor(edge)));
}
// change edged to player color if not colored already
function changeEdgeColor(edge){
    let changePlayerTurn = true;
    if(edge.style.backgroundColor === ''){
        console.log('why')
        edge.style.backgroundColor = playerColors[playerColorIndex];
        // check if the edge is the last uncolored edge of a box
        // let edgeId = edge.id;
        let info = edge.id.split('-');
        console.log(info);
        let edgeRow = parseInt(info[1]), edgeCol = parseInt(info[2]);
        console.log(edge.id)
        //check horizontal edges
        if(edge.id[0] === 'h'){
            if(edgeRow + 1 < gameMatrix.length){
                ++gameMatrix[edgeRow + 1][edgeCol];
                if(gameMatrix[edgeRow + 1][edgeCol] === 4){
                    const el = document.querySelector(`#b-${edgeRow+1}-${edgeCol}`);
                    // console.log(el);
                    updateScore()
                    changePlayerTurn = false;
                    el.style.backgroundColor = playerColors[playerColorIndex];
                }
            }
            if(edgeRow - 1 >= 0){
                ++gameMatrix[edgeRow-1][edgeCol];
                if(gameMatrix[edgeRow - 1][edgeCol] === 4){
                    const el = document.querySelector(`#b-${edgeRow-1}-${edgeCol}`);
                    // console.log(el);
                    updateScore()
                    changePlayerTurn = false;
                    el.style.backgroundColor = playerColors[playerColorIndex];
                }
            }
        }
        // check vertical edges
        else{
            if(edgeCol + 1 < gameMatrix.length){
                ++gameMatrix[edgeRow][edgeCol + 1];
                if(gameMatrix[edgeRow][edgeCol + 1] === 4){
                    const el = document.querySelector(`#b-${edgeRow}-${edgeCol+1}`);
                    // console.log(el);
                    updateScore()
                    changePlayerTurn = false;
                    el.style.backgroundColor = playerColors[playerColorIndex];
                }
            }
            if(edgeCol - 1 >= 0){
                ++gameMatrix[edgeRow][edgeCol - 1];
                if(gameMatrix[edgeRow][edgeCol - 1] === 4){
                    const el = document.querySelector(`#b-${edgeRow}-${edgeCol - 1}`);
                    // console.log(el);
                    updateScore()
                    changePlayerTurn = false;
                    el.style.backgroundColor = playerColors[playerColorIndex];
                }
            }
        }
        if(changePlayerTurn){
            playerColorIndex ^= 1;
            gameStatus.innerText = `${playerColors[playerColorIndex]} player's turn`
        }
    }
}
function updateScore(){
    if(playerColorIndex == 0){
        redPlayerScore++;
        redScore.innerText = `Red Score: ${redPlayerScore}`;
    }
    else{
        bluePlayerScore++;
        blueScore.innerText = `Blue Score: ${bluePlayerScore}`;
    }
}