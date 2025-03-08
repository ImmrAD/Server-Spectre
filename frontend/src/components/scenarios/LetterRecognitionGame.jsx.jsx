import React, { useState, useEffect } from "react";
import "aframe";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function LetterRecognitionGame() {
  const [currentLetter, setCurrentLetter] = useState("");
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState("Select the correct letter");

  useEffect(() => {
    generateNewQuestion();
  }, []);

  function generateNewQuestion() {
    const correctLetter = letters[Math.floor(Math.random() * letters.length)];
    let choices = [correctLetter];
    while (choices.length < 4) {
      const randomLetter = letters[Math.floor(Math.random() * letters.length)];
      if (!choices.includes(randomLetter)) choices.push(randomLetter);
    }
    setOptions(choices.sort(() => Math.random() - 0.5));
    setCurrentLetter(correctLetter);
    setMessage("Select the correct letter");
  }

  function checkAnswer(selected) {
    if (selected === currentLetter) {
      setMessage("Correct! 🎉");
    } else {
      setMessage("Try again! ❌");
    }
    setTimeout(generateNewQuestion, 1000);
  }

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-xl font-bold">Letter Recognition Game</h1>
      <a-scene embedded>
        <a-entity position="0 1.5 -3">
          <a-text
            value={currentLetter}
            color="black"
            align="center"
            position="0 1 0"
            scale="2 2 2"
          ></a-text>
        </a-entity>
      </a-scene>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {options.map((letter, index) => (
          <button
            key={index}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            onClick={() => checkAnswer(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
      <p className="mt-4 text-lg">{message}</p>
    </div>
  );
}
