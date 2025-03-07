import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { getScenario } from '../services/firebase';
import VRScene from '../vr/VRScene';
import ScenarioControls from './ScenarioControls';

const ScenarioView = () => {
  const { scenarioId } = useParams();
  const { user } = useAuth();
  const [scenario, setScenario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const loadScenario = async () => {
      try {
        const scenarioData = await getScenario(scenarioId);
        setScenario(scenarioData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadScenario();
  }, [scenarioId]);

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleReset = () => {
    // Reset scenario state
    setIsPaused(false);
    // Additional reset logic here
  };

  const handleExit = () => {
    setIsPaused(true);
    // Additional cleanup logic here
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading scenario...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="relative h-screen">
      <VRScene
        scenarioId={scenarioId}
        difficulty={scenario?.difficulty}
        userId={user?.uid}
        isPaused={isPaused}
      />
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

export default ScenarioView;