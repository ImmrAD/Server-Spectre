import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const emotions = [
  { name: "Happy", emoji: "😊", image: "/images/happy.jpg" },
  { name: "Sad", emoji: "😢", image: "/images/sad.jpg" },
  { name: "Angry", emoji: "😠", image: "/images/angry.jpg" },
  { name: "Surprised", emoji: "😲", image: "/images/surprised.jpg" },
  { name: "Scared", emoji: "😨", image: "/images/scared.jpg" },
  { name: "Neutral", emoji: "😐", image: "/images/neutral.jpg" }
];

const EmotionMatchingGame = ({ goToMenu }) => {
  const [currentEmotion, setCurrentEmotion] = useState(null);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    if (gameStarted && questionCount < 10) {
      generateOptions();
      setTimer(5);
    } else if (questionCount >= 10) {
      setGameStarted(false);
      setGameOver(true);
    }
  }, [currentEmotion, gameStarted, questionCount]);

  useEffect(() => {
    if (gameStarted && timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0) {
      nextRound();
    }
  }, [timer, gameStarted]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setQuestionCount(0);
    nextRound();
  };

  const exitGame = () => {
    setGameStarted(false);
    setGameOver(true);
  };

  const generateOptions = () => {
    let choices = [currentEmotion];
    while (choices.length < 4) {
      let randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      if (!choices.includes(randomEmotion)) {
        choices.push(randomEmotion);
      }
    }
    setOptions(shuffleArray(choices));
  };

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  const nextRound = () => {
    if (questionCount < 10) {
      const newEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      setCurrentEmotion(newEmotion);
      setFeedback(null);
      setQuestionCount(questionCount + 1);
      setTimer(5);
    }
  };

  const checkAnswer = (selectedEmotion) => {
    if (selectedEmotion.name === currentEmotion.name) {
      setFeedback("Correct!");
      setScore(score + 1);
      setTimeout(nextRound, 500);
    } else {
      setFeedback("Try Again!");
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      {!gameStarted && !gameOver ? (
        <button className="p-2 bg-blue-500 text-white rounded-lg" onClick={startGame}>Start Game</button>
      ) : gameOver ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Thank you for playing!</h1>
          <p className="text-lg font-semibold">Your final score: {score} / 10</p>
          <button className="p-2 bg-green-500 text-white rounded-lg mt-4" onClick={startGame}>Play Again</button>
          <button className="p-2 bg-gray-500 text-white rounded-lg mt-4 ml-2" onClick={goToMenu}>Back to Menu</button>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Match the correct emoji to the face expression</h1>
          <p className="text-lg font-semibold">Score: {score}</p>
          <p className="text-lg font-semibold">Question: {questionCount} / 10</p>
          <p className="text-lg font-semibold text-red-500">Time Left: {timer}s</p>
          <div className="mt-4 flex justify-center">
            {currentEmotion && (
              <motion.img
                src={currentEmotion.image}
                alt="Emotion Expression"
                className="w-48 h-48 border rounded-lg shadow-md object-contain"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {options.map((emotion) => (
              <button
                key={emotion.name}
                className="p-4 text-3xl border rounded-lg shadow-md"
                onClick={() => checkAnswer(emotion)}
              >
                {emotion.emoji}
              </button>
            ))}
          </div>
          {feedback && <p className="mt-2 text-lg font-semibold">{feedback}</p>}
          <button className="p-2 bg-red-500 text-white rounded-lg mt-4" onClick={exitGame}>Exit</button>
          <button className="p-2 bg-gray-500 text-white rounded-lg mt-4 ml-2" onClick={goToMenu}>Back to Menu</button>
        </>
      )}
    </div>
  );
};

export default EmotionMatchingGame;
