import React from 'react';

function Square(props) {
    if (props.winnerClass) {
        return (<button className="square red" onClick={props.onClick}>
                    {props.value}
                </button>);
    } else {
        return (
            <button className="square" onClick={props.onClick}>
                {props.value}
            </button>
        );
    }
}

export default Square;