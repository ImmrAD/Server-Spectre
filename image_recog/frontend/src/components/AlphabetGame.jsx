import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const getRandomImageURL = (character) => {
  return `https://ui-avatars.com/api/?name=${character}&background=random&color=ffffff&size=128`;
};

const speakCharacter = (character) => {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(character);
  utterance.rate = 1.2;
  synth.cancel();
  synth.speak(utterance);
};

const AlphabetGame = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()".split("");
  const [currentCharacter, setCurrentCharacter] = useState(null);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [isPaused, setIsPaused] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameDuration, setGameDuration] = useState(300);
  const [totalTimeLeft, setTotalTimeLeft] = useState(300);
  const [selectedDuration, setSelectedDuration] = useState(null);

  useEffect(() => {
    if (!gameStarted || isPaused || isGameOver) return;
    generateOptions();
    const roundTimer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          setScore(score > 0 ? score - 1 : 0);
          nextRound();
          return 5;
        }
        return prev - 1;
      });
    }, 1000);

    const gameTimer = setInterval(() => {
      setTotalTimeLeft((prev) => {
        if (prev === 1) {
          setIsGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(roundTimer);
      clearInterval(gameTimer);
    };
  }, [currentCharacter, isPaused, isGameOver, gameStarted]);

  const startGame = () => {
    setGameStarted(true);
    setTotalTimeLeft(gameDuration);
    nextRound();
  };

  const selectDuration = (duration) => {
    setGameDuration(duration);
    setSelectedDuration(duration);
  };

  const generateOptions = () => {
    let choices = [currentCharacter];
    while (choices.length < 6) {
      let randomCharacter = characters[Math.floor(Math.random() * characters.length)];
      if (!choices.includes(randomCharacter)) {
        choices.push(randomCharacter);
      }
    }
    setOptions(shuffleArray(choices.map((character) => ({
      character,
      image: getRandomImageURL(character)
    }))));
  };

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  const nextRound = () => {
    const newCharacter = characters[Math.floor(Math.random() * characters.length)];
    setCurrentCharacter(newCharacter);
    setFeedback(null);
    setTimeLeft(5);
  };

  const checkAnswer = (selectedCharacter) => {
    if (selectedCharacter === currentCharacter) {
      setFeedback("Correct!");
      setScore(score + 1);
      setTimeout(nextRound, 500);
    } else {
      setFeedback("Try Again!");
      setScore(score > 0 ? score - 1 : 0);
    }
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const handleExit = () => {
    setIsGameOver(true);
  };

  const handlePlayAgain = () => {
    setScore(0);
    setGameStarted(false);
    setIsGameOver(false);
    setCurrentCharacter(null);
  };

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center p-4">
        <h1 className="text-2xl font-bold mb-4">Select Game Duration</h1>
        <div className="flex gap-4">
          {[300, 600, 900].map((duration, index) => (
            <button 
              key={index} 
              className={`px-4 py-2 rounded-lg ${selectedDuration === duration ? "bg-blue-700" : "bg-blue-500"} text-white`} 
              onClick={() => selectDuration(duration)}
            >
              {duration / 60} Minutes
            </button>
          ))}
        </div>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg mt-4" onClick={startGame}>Start Game</button>
      </div>
    );
  }

  if (isGameOver) {
    return (
      <div className="flex flex-col items-center p-4">
        <h1 className="text-2xl font-bold mb-4">Thank you for playing!</h1>
        <p className="text-lg font-semibold">Your Final Score: {score}</p>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md mt-4" onClick={handlePlayAgain}>Play Again</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Select the correct image for: {currentCharacter}</h1>
      <p className="text-lg font-semibold">Score: {score}</p>
      <p className="text-red-500 font-semibold">Time Left: {timeLeft}s</p>
      <p className="text-red-500 font-semibold">Game Time Left: {totalTimeLeft}s</p>
      <div className="p-4 border rounded-lg shadow-md">
        <div className="grid grid-cols-3 gap-4 mt-4">
          {options.map(({ character, image }) => (
            <button
              key={character}
              className="p-2 border rounded-lg shadow-md"
              onClick={() => checkAnswer(character)}
              onMouseEnter={() => speakCharacter(character)}
            >
              <motion.img
                src={image}
                alt={character}
                className="w-32 h-32"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            </button>
          ))}
        </div>
        {feedback && <p className="mt-2 text-lg font-semibold">{feedback}</p>}
      </div>
      <div className="mt-4 flex gap-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md" onClick={togglePause}>{isPaused ? "Resume" : "Pause"}</button>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md" onClick={handleExit}>Exit</button>
      </div>
    </div>
  );
};

export default AlphabetGame;
