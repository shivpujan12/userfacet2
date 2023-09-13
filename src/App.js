import './App.css';
import Board from "./components/Board";
import {useEffect, useState} from "react";
import image from "./assets/uf_logo.svg";

function App() {


    const numRows = 17;
    const numCols = 20;
    const [board, setBoard] = useState(Array.from({length: numRows}, () => Array(numCols).fill(null)));
    const sentence = [
        "We design and develop applications", "that run the world and", "showcase the future"
    ];

    const collectionOfWords = [];

    for (let i = 0; i < sentence.length; i++) {
        const words = sentence[i].split(" ");
        for (let j = 0; j < words.length; j++) {
            collectionOfWords.push(words[j]);
        }
    }

    const performOnce = () => {
        console.log("started the game");
        var randomCol = Math.floor(Math.random() * numCols);
        var randomWord;
        // var randomWord = Math.floor(Math.random() * numCols);
        try {
            randomWord = Math.floor(generateUniqueRandomNumber(collectionOfWords.length));
        } catch (e) {
            return;
        }
        const word = collectionOfWords[randomWord];
        const wordLength = word.length;

        while (randomCol + wordLength > numCols) {
            // randomCol = (randomCol + wordLength)%numCols;
            randomCol = Math.floor(Math.random() * numCols);
        }
        const newBoard = [...board];
        for (let i = 0; i < wordLength; i++) {
            newBoard[0][randomCol + i] = word[i];
        }
        setBoard(newBoard);
        startDescending(word, randomCol);
    }

    let flag = false;
    useEffect(() => {
        var interval = null;
        clearInterval(interval);
        if(!flag){
            performOnce();
            flag = true;
        }
        interval = setInterval(() => {
            performOnce();
        }, 1000 * numRows);


        return () => {
            clearInterval(interval);
        }

    }, [])

    const startDescending = (word, randomCol) => {
        var row = 0;
        var interval = null;
            clearInterval(interval);
             interval= setInterval(() => {
                const newBoard = [...board];

                    //descend the word
                    for (let i = 0; i < word.length; i++) {
                            if (row - 1 >= 0)
                                newBoard[row - 1][randomCol + i] = null;
                            newBoard[row][randomCol + i] = word[i];
                    }

                    console.log("row: ",row);
                    setBoard(newBoard);
                    row++;

                if (row === numRows) {
                    clearInterval(interval);
                    interval = null;
                }
            }, 1000);
    }



    // Initialize an array to keep track of used numbers
    const usedNumbers = [];

// Function to generate a unique random number
    function generateUniqueRandomNumber(length) {
        // Check if all numbers have been used
        if (usedNumbers.length === length) {
            throw new Error("All possible numbers have been used.");
        }

        let randomNumber;

        // Generate a random number until an unused one is found
        do {
            randomNumber = Math.floor(Math.random() * length);
        } while (usedNumbers.includes(randomNumber));

        // Add the generated number to the used numbers array
        usedNumbers.push(randomNumber);
        return randomNumber;
    }

    return (
        <div className="App">
            <img src={image} alt="logo"/>
            <div>WORD TETRIS</div>
            <Board rows={numRows} cols={numCols} board={board}/>
        </div>
  );
}

export default App;
