let BOARD = [
    [[[1,1],'-'], [[1,2],'-'], [[1,3],'-']],
    [[[2,1],'-'], [[2,2],'-'], [[2,3],'-']],
    [[[3,1],'-'], [[3,2],'-'], [[3,3],'-']]
];
let player = 'X';

let inputElement = document.getElementById("play-input");
let outputElement = document.getElementById("output").innerHTML;
let statusElement = document.getElementById("status").innerHTML;
let playButtonElement = document.getElementById("play-button").innerHTML;

const check_win = () => {
    for(const row of BOARD) if(row[0][1] === row[1][1] && row[1][1] === row[2][1] && row[0][1] !== "-") return true;
    for(let i = 0; i < 3; i++) if(BOARD[0][i][1] === BOARD[1][i][1] && BOARD[1][i][1] === BOARD[2][i][1] && BOARD[0][i][1] !== '-') return true;

    if(BOARD[0][0][1] === BOARD[1][1][1] && BOARD[1][1][1] === BOARD[2][2][1] && BOARD[0][0][1] !== '-') return true;
    if(BOARD[0][2][1] === BOARD[1][1][1] && BOARD[1][1][1] === BOARD[2][0][1] && BOARD[0][2][1] !== '-') return true;

    return false;
};

const check_tie = () => {
    const actual_state = [];

    for(const row of BOARD) for(const cell of row) actual_state.push(cell[1]);

    if(!actual_state.includes('-')) return true;

    return false;
};

const play = () => {
    input = inputElement.value;
    input = input.split(',');

    if(input[0] < 1 || input[0] > 3 || input[1] < 1 || input[1] > 3) {
        outputElement = "Invalid input. Try again.";
        return;
    };
    if(BOARD[input[0]-1][input[1]-1][1] !== '-') {
        outputElement = "That space is already taken. Try again.";
        return;
    };

    BOARD[input[0]-1][input[1]-1][1] = player;

    if(check_win()) {
        refresh_board();
        statusElement = `Player ${player} wins! Press the reset button to play again.`;
        outputElement = "Thanks for playing!";
        return;
    };
    if(check_tie()) {
        refresh_board();
        statusElement = "It's a tie! Press the reset button to play again.";
        outputElement = "Thanks for playing!";
        return;
    };

    player === "X" ? player = "O" : player = "X";

    refresh_board();

    statusElement = "Player " + player + ", enter your move:";
    document.getElementById("play-button").className = `player-${player.toLowerCase()}`;
    outputElement = "";
    inputElement.value = "";
};


const refresh_board = () => {
    let table = "<table>";

    for(const row of BOARD) {
        table += "<tr>";

        for(const cell of row) {
            switch(cell[1]) {
                case "X": table += "<td class='player-x'>" + cell[1] + "</td>"; break;
                case "O": table += "<td class='player-o'>" + cell[1] + "</td>"; break;
                default: table += "<td>" + cell[1] + "</td>"; break;
            };
        };

        table += "</tr>";
    };
    table += "</table>";
    document.getElementById("board").innerHTML = table;
};

function reset() {
    player = 'X';

    statusElement = `Player ${player} enter your move:`;
    outputElement = "";
    playButtonElement = `player- ${player.toLowerCase()}`;
    inputElement.value = "";
    BOARD = [
        [[[1,1],'-'], [[1,2],'-'], [[1,3],'-']],
        [[[2,1],'-'], [[2,2],'-'], [[2,3],'-']],
        [[[3,1],'-'], [[3,2],'-'], [[3,3],'-']]
    ];
    refresh_board();
};

document.getElementById("play-input").addEventListener("keyup", function(event) {
    if (event.key === 'Enter'){
        event.preventDefault();
        document.getElementById("play-button").click();
        play();
    }
});