import { useState } from "react";
import "./App.css";
import EmotionMatchingGame from "./components/EmotionMatching";
import AlphabetGame from "./components/AlphabetGame";
import Quiz from "./components/Quiz";

function App() {
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <div className="flex flex-col items-center p-4">
      {!selectedGame ? (
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4">Select a Game</h1>
          <button
            className="p-2 bg-blue-500 text-white rounded-lg m-2"
            onClick={() => setSelectedGame("alphabet")}
          >
            Play Alphabet Game
          </button>
          <button
            className="p-2 bg-green-500 text-white rounded-lg m-2"
            onClick={() => setSelectedGame("emotion")}
          >
            Play Emotion Matching Game
          </button>
          <button
            className="p-2 bg-green-500 text-white rounded-lg m-2"
            onClick={() => setSelectedGame("quiz")}
          >
            Play Quiz
          </button>
        </div>
      ) : (
        <>
          {selectedGame === "alphabet" && <AlphabetGame />}
          {selectedGame === "emotion" && <EmotionMatchingGame />}
          {selectedGame === "quiz" && <Quiz/>}
          <button
            className="p-2 bg-red-500 text-white rounded-lg m-4"
            onClick={() => setSelectedGame(null)}
          >
            Back to Selection
          </button>

        </>
      )}
    </div>
  );
}

export default App;
