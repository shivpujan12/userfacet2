import React from 'react';
import '../styles/Board.scoped.css';
import WordBlock from "./WordBlock";

function Board(props) {
    // Define the dimensions of the Tetris board
    const numRows = props.rows;
    const numCols = props.cols;
    const board = props.board;

    // Create an empty game board
    const emptyBoard = Array.from({length: numRows}, () =>
        Array(numCols).fill(null)
    );

    return (
        <div className="container">
            <div className="board">
                {board.map((row,rowNo) =>
                    <div key={rowNo} className="row">
                        {row.map(((cell,colNo) => (
                            <WordBlock key={colNo} board = {props.board} rowNo={rowNo} colNo={colNo} text = {cell}/>
                        )))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Board;