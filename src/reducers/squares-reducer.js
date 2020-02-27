import c from './../constants';

export default (state={history: [{squares: Array(9).fill(null)}], stepNumber: 0}, action) => {
    let newState;
    const {position, xIsNext} = action;
    switch (action.type) {
        case c.MAKE_MOVE:
            const history = state.history.slice(0, state.stepNumber + 1);
            const current = history[history.length -1];
            const squares = current.squares.slice();
            squares[position] = xIsNext ? 'X' : "O"
            newState ={
                history: history.concat([{
                    squares: squares,
                }]),
                stepNumber: history.length
            }
            return newState
        default:
            return state;

    }
}