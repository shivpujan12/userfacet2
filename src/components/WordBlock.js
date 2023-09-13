import React from 'react';

function WordBlock(props) {
    return (
        <div className="cell">
            {props.text ? <div className="block">{props.text}</div> : <div className="cell"></div>}
        </div>

    );
}

export default WordBlock;