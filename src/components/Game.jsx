import React from 'react';
import Board from './Board';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            currentMove: [null, null]
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length -1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : "O"
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            currentMove: '(' + (Math.floor((i)/3)+1) + ', ' + (i%3+1) +'), '
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ? 
                'Go to move #' + move:
                'Got to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            ); 
        });

        let status;
        if (winner == "Draw") {
            status = "It is a draw";
        }
        else if (winner) {
            status = 'Winner: ' + winner[0];
        } else {
            status = 'Next player: ' +  (this.state.xIsNext ? 'X' : 'O');
        }
        console.log(status);
        return (
            <div className="game">
            <div className="game-board">
                <Board 
                    squares={current.squares} winnerSquares = {winner ? winner[1]: null}
                    onClick={(i) => this.handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <div>Move: {this.state.currentMove}</div>
                <ol>{moves}</ol>
            </div>
            </div>
        );
    }
}

export default Game;


function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [squares[a], [a,b,c]];
        }
    }
    for (let i=0; i<squares.length; i++) {
        if (!squares[i]) {
            return null;
        }
    }
    return "Draw";
}