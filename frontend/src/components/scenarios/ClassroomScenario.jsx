import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScenarioControls from './ScenarioControls';

const ClassroomScenario = () => {
  const [difficulty, setDifficulty] = useState('easy');
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [currentTask, setCurrentTask] = useState(null);
  const navigate = useNavigate();

  const tasks = {
    easy: [
      { id: 1, description: 'Find your desk', points: 10 },
      { id: 2, description: 'Sit down quietly', points: 10 },
      { id: 3, description: 'Look at the teacher', points: 10 }
    ],
    medium: [
      { id: 4, description: 'Raise your hand to answer', points: 15 },
      { id: 5, description: 'Take out your notebook', points: 15 },
      { id: 6, description: 'Write your name', points: 15 }
    ],
    hard: [
      { id: 7, description: 'Work with a partner', points: 20 },
      { id: 8, description: 'Share materials with classmates', points: 20 },
      { id: 9, description: 'Present to the class', points: 20 }
    ]
  };

  useEffect(() => {
    // Initialize first task
    setCurrentTask(tasks[difficulty][0]);
  }, [difficulty]);

  const handleTaskComplete = (taskId) => {
    const currentTasks = tasks[difficulty];
    const completedTaskIndex = currentTasks.findIndex(task => task.id === taskId);
    
    if (completedTaskIndex >= 0) {
      // Add points
      setScore(prev => prev + currentTasks[completedTaskIndex].points);
      
      // Move to next task or increase difficulty
      if (completedTaskIndex < currentTasks.length - 1) {
        setCurrentTask(currentTasks[completedTaskIndex + 1]);
      } else if (difficulty === 'easy') {
        setDifficulty('medium');
      } else if (difficulty === 'medium') {
        setDifficulty('hard');
      }
    }
  };

  const handlePause = () => setIsPaused(true);
  const handleResume = () => setIsPaused(false);
  const handleReset = () => {
    setDifficulty('easy');
    setScore(0);
    setCurrentTask(tasks.easy[0]);
  };
  const handleExit = () => navigate('/dashboard');

  return (
    <div className="h-screen relative bg-gray-100">
      {/* Score Display */}
      <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-md">
        <p className="text-xl font-bold">Score: {score}</p>
        <p className="text-sm text-gray-600">Level: {difficulty}</p>
      </div>

      {/* Current Task Display */}
      {currentTask && (
        <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-md max-w-md">
          <h3 className="text-lg font-semibold">Current Task:</h3>
          <p className="text-gray-700">{currentTask.description}</p>
        </div>
      )}

      {/* Visual Schedule */}
      <div className="absolute left-4 top-32 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Schedule</h3>
        <div className="space-y-2">
          {tasks[difficulty].map((task, index) => (
            <div
              key={task.id}
              className={`flex items-center space-x-2 ${currentTask?.id === task.id ? 'text-blue-600 font-bold' : 'text-gray-600'}`}
            >
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200">
                {index + 1}
              </span>
              <span>{task.description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Calming Corner */}
      <div className="absolute bottom-24 right-4 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Calming Corner</h3>
        <button
          className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 transition-colors"
          onClick={() => setIsPaused(true)}
        >
          Take a Break
        </button>
      </div>

      {/* Scenario Controls */}
      <ScenarioControls
        onPause={handlePause}
        onResume={handleResume}
        onReset={handleReset}
        onExit={handleExit}
        isPaused={isPaused}
      />
    </div>
  );
};

export default ClassroomScenario;