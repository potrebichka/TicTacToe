import squaresReducer from './../../src/reducers/squares-reducer';
import c from './../../src/constants';

describe ("squaresReducer", () => {
    let action;
    const sampleMovePosition = 5;
    const defaultState = 
    {
        history: [{squares: Array(9).fill(null)}],
        stepNumber: 0
    }
    test('Should return default state if no action type is recognized', () => { 
        expect(squaresReducer(defaultState, {type: null})).toEqual(defaultState);
    });
    test('Should successfully add new move to history', () => {
        action = {
            type: c.MAKE_MOVE,
            position: sampleMovePosition,
            xIsNext: true
        }
        expect(squaresReducer(defaultState, action)).toEqual({
            history: [{
                squares:
                [null,null,null,null,null,null,null,null,null]},
                {squares:
                [null,null,null,null,null,'X',null,null,null]
            }],
            stepNumber: 1
        })
    });
    const defaultState2 = 
    {
        history: [{
            squares:
            [null,null,null,null,null,null,null,null,null]},
            {squares:
            [null,null,null,null,null,'X',null,null,null]
        }],
        stepNumber: 1
    }
    test('Should successfully return to provided move in history', () => {
        action = {
            type: c.BACK_TO_MOVE,
            step: 0
        }
        expect(squaresReducer(defaultState2, action)).toEqual({
            history: defaultState2.history,
            stepNumber: action.step
        })
    })
})