import { useEffect, useState } from "react";
import Box from "../Box";
import words from "../../words";
import { getSavedTheme } from "../../helper";

const getRandomWord = (category) => {
  const categoryWords = words[category] || [];
  const randomIndex = Math.floor(Math.random() * categoryWords.length);
  return categoryWords[randomIndex]?.toLowerCase() || "";
};

const defaultLetters = "abcdefghijklmnopqrstuvwxyz".split("").reduce((acc, char) => {
  acc[char] = "";
  return acc;
}, {});

const defaultBoard = Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => ["", ""]));

function Board(props) {
  const [letters, setLetters] = useState(defaultLetters);
  const [board, setBoard] = useState(defaultBoard);
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [win, setWin] = useState(false);
  const [lost, setLost] = useState(false);
  const [message, setMessage] = useState("");
  const [theme, setTheme] = useState('Select Mode');
  const [correctWord, setCorrectWord] = useState(""); // Word to guess

  useEffect(() => {
    const savedTheme = getSavedTheme();
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    if (theme !== 'Select Mode') {
      setCorrectWord(getRandomWord(theme));
    }
  }, [theme]);

  useEffect(() => {
    if (props.clicks > 0 && !win && !lost) {
      setBoard(prevBoard => {
        // Create a new board to avoid mutating state directly
        const newBoard = prevBoard.map(row => row.map(cell => [...cell]));

        if (props.letter === "DEL") {
          // Handle delete
          const newCol = Math.max(col - 1, 0);
          newBoard[row][newCol][0] = "";
          setCol(newCol);
        } else if (props.letter === "ENTER") {
          // Handle submit
          const guess = newBoard[row].map(cell => cell[0]).join("");
          const correctWordUpper = correctWord.toUpperCase();
          if (words[theme]?.includes(guess.toUpperCase())) {
            let correctLetters = 0;
            // Update the board with status (C, E, N)
            for (let i = 0; i < 5; i++) {
              if (correctWordUpper[i] === guess[i].toUpperCase()) {
                newBoard[row][i][1] = "C";
                correctLetters++;
              } else if (correctWordUpper.includes(guess[i].toUpperCase())) {
                newBoard[row][i][1] = "E";
              } else {
                newBoard[row][i][1] = "N";
              }
            }

            // Check win or loss condition
            if (correctLetters === 5) {
              setWin(true);
              setMessage("You WIN");
            } else {
              if (row === 5) {
                setLost(true);
                setMessage(`It was ${correctWord.toUpperCase()}`);
              } else {
                setRow(prevRow => prevRow + 1);
              }
            }

            setCol(0);

            // Update letters state
            setLetters(prevLetters => {
              const updatedLetters = { ...prevLetters };
              newBoard[row].forEach(([letter, status]) => {
                if (letter) updatedLetters[letter] = status;
              });
              return updatedLetters;
            });
          } else {
            props.error("Word not in dictionary");
            setTimeout(() => props.error(""), 1000);
          }
        } else {
          // Handle letter input
          if (col < 5) {
            newBoard[row][col][0] = props.letter;
            setCol(col + 1);
          } else {
            props.error("Words are 5 letters long!");
            setTimeout(() => props.error(""), 1000);
          }
        }

        return newBoard;
      });
    }
  }, [props.clicks]);

  useEffect(() => {
    props.letters(letters);
  }, [letters]);

  return (
    <div className="px-10 py-5 grid gap-y-1 items-center w-100 justify-center">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1 w-fit">
          {row.map((cell, cellIndex) => (
            <Box key={cellIndex} value={cell[0]} state={cell[1]} pos={cellIndex} />
          ))}
        </div>
      ))}
      <div className="grid place-items-center h-8 font-bold dark:text-white">
        {lost || win ? message : ""}
      </div>
    </div>
  );
}

export default Board;


