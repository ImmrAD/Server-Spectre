import React from 'react';
import { useNavigate } from 'react-router-dom';

const ScenarioControls = ({ onPause, onResume, onExit, onReset, isPaused }) => {
  const navigate = useNavigate();

  const handleExit = () => {
    onExit();
    navigate('/dashboard');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4 shadow-lg z-50">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          {isPaused ? (
            <button
              onClick={onResume}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
              </svg>
              Resume
            </button>
          ) : (
            <button
              onClick={onPause}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Pause
            </button>
          )}

          <button
            onClick={onReset}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Reset
          </button>
        </div>

        <button
          onClick={handleExit}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Exit Scenario
        </button>
      </div>
    </div>
  );
};

export default ScenarioControls;