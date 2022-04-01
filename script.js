//==================== CONSTANTS ====================//
const STATUS_DISPLAY= document.querySelector ('.game-notification'),
GAME_STATE=["","","","","","","","",""],
WINNINGS = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[6,4,2],
[0,4,8],
],

WIN_MESSAGE = () => `El jugador ${currentPlayer} ha ganado`,
DRAW_MESSAGE = () => `¡El juego ha terminado en empate!`,
CURRENT_PLAYER_TURN = () => `Turno del jugador ${currentPlayer}`

//==================== VARIABLES ====================//
let gameActive = true,
  currentPlayer = "O"

//==================== FUNCTIONS ====================//

function main () {
    handleStatusDisplay(CURRENT_PLAYER_TURN())
    listeners()
}

function listeners() {
    document.querySelector('.game-container').addEventListener('click', handleCellClick)
    document.querySelector('.game-restart').addEventListener('click', handleRestartGame)
}

function handleStatusDisplay(message) {
    STATUS_DISPLAY.innerHTML = message
}

function handleRestartGame() {
    gameActive = true
    currentPlayer = "X"
    restartGameState()
    handleStatusDisplay(CURRENT_PLAYER_TURN())
    document.querySelectorAll('.game-cell').forEach(cell => cell.innerHTML="")
}

function handleCellClick(clickedCellEvent /*Type event*/) {
    const clickedCell = clickedCellEvent.target
    if (clickedCell.classList.contains('game-cell')) {
        const clickedCellIndex = Array.from(clickedCell.parentNode.children).indexOf(clickedCell)
        if (GAME_STATE[clickedCellIndex] !== ''|| !gameActive) {
            return false 
        }

        handleCellPlayer(clickedCell,clickedCellIndex)
        handResultValidation()
    }
}

function handleCellPlayer(clickedCell /*object HTML*/, clickedCellIndex) {
    GAME_STATE[clickedCellIndex] = currentPlayer // Agrega en la posición correspondiente el valor ya sea "X" u "O" en el estado actual del juego
    clickedCell.innerHTML = currentPlayer // Agrega en el HTML el valor del jugador
}

function handResultValidation() {
    let roundWon = false
    for (let i =0; i <WINNINGS.length; i++) { // Itera cada uno de las posibles combinaciones gananadores
    const winCondition = WINNINGS[i] // Guarda la combinación por ejemplo: [0,1,2]
    let position1 = GAME_STATE[winCondition[0]],
    position2 = GAME_STATE[winCondition[1]],
    position3 = GAME_STATE[winCondition[2]] // Almacena el valor del estado actual del juego segun las posiciones de winCondition

    if(position1 === '' || position2 === '' || position3 === '') {
        continue; // Si hay algun valor vacio nadie ha ganado aun
    }
    if (position1 === position2 && position2 === position3){
        roundWon = true // Si todas las posiciones coinciden entonces, dicho jugador ha ganado la partida
        break
    }
}
 
if  (roundWon) {
handleStatusDisplay(WIN_MESSAGE())
gameActive = false
return
}

let roundDraw = !GAME_STATE.includes("") // Si todas las celdas tienen valor y la sentencia anterior fue falsa entonces es empate
if (roundDraw) {
    handleStatusDisplay(DRAW_MESSAGE())
    gameActive = false
    return
}

handlePlayerChange()
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X"
    handleStatusDisplay(CURRENT_PLAYER_TURN())
}

function restartGameState() {
    let i = GAME_STATE.length
    while (i--) {
        GAME_STATE[i] = '' 
    }
}

main()