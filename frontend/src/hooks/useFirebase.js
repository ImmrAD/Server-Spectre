import { useState, useEffect } from 'react';
import { getScenario, updateUserProgress } from '../components/services/firebase';

export const useScenarioData = (scenarioId) => {
  const [scenario, setScenario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

    if (scenarioId) {
      loadScenario();
    }
  }, [scenarioId]);

  return { scenario, loading, error };
};

export const useProgressTracking = (userId, scenarioId) => {
  const [progress, setProgress] = useState(0);
  const [interactions, setInteractions] = useState([]);

  const trackInteraction = async (objectLabel) => {
    try {
      const newInteractions = [...interactions, {
        objectLabel,
        timestamp: Date.now()
      }];
      setInteractions(newInteractions);
      
      // Calculate progress based on interactions
      const progressPercentage = Math.min(100, Math.floor((newInteractions.length / 10) * 100));
      setProgress(progressPercentage);

      // Update progress in Firebase
      await updateUserProgress(userId, scenarioId, newInteractions);
    } catch (error) {
      console.error('Error tracking interaction:', error);
    }
  };

  return { progress, interactions, trackInteraction };
};