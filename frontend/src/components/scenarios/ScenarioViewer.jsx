import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ScenarioViewer = ({ scenarioId, onComplete }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  // Simulated scenario data - in a real app, this would come from an API or database
  const scenarioSteps = [
    {
      id: 1,
      instruction: 'Enter the classroom and find your assigned seat',
      duration: 30,
      completion: 'Student found their seat successfully'
    },
    {
      id: 2,
      instruction: 'Take out your notebook and pencil from your backpack',
      duration: 45,
      completion: 'Student prepared learning materials'
    },
    {
      id: 3,
      instruction: 'Raise your hand when the teacher asks a question',
      duration: 30,
      completion: 'Student practiced appropriate classroom participation'
    },
    {
      id: 4,
      instruction: 'Work with a classmate to solve a simple math problem',
      duration: 60,
      completion: 'Student engaged in peer collaboration'
    },
    {
      id: 5,
      instruction: 'Pack up your materials when the teacher signals the end of class',
      duration: 45,
      completion: 'Student completed end-of-class routine'
    }
  ];

  useEffect(() => {
    // Simulate loading VR environment
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleStepComplete = () => {
    if (currentStep < scenarioSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setProgress((currentStep + 1) / scenarioSteps.length * 100);
    } else {
      onComplete({
        scenarioId,
        completionTime: new Date(),
        success: true
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading VR Environment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen bg-gray-900">
      {/* VR Scene Container */}
      <div className="w-full h-full">
        {/* This would be replaced with actual VR scene renderer */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center">
            <h2 className="text-2xl font-bold mb-4">
              Step {currentStep + 1}: {scenarioSteps[currentStep].instruction}
            </h2>
            <div className="w-64 h-2 bg-gray-700 rounded-full mx-auto mb-4">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <button
              onClick={handleStepComplete}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Complete Step
            </button>
          </div>
        </div>
      </div>

      {/* Controls Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <button className="px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20 transition">
            Reset View
          </button>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20 transition">
              Toggle Audio
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
              Exit VR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ScenarioViewer.propTypes = {
  scenarioId: PropTypes.number.isRequired,
  onComplete: PropTypes.func.isRequired
};

export default ScenarioViewer;