import React, { useState, useEffect } from 'react';
import { auth, getUserProgress, getScenarios } from '../services/firebase';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [progress, setProgress] = useState([]);
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          navigate('/login');
          return;
        }

        // Load user progress and available scenarios
        const [userProgress, availableScenarios] = await Promise.all([
          getUserProgress(user.uid),
          getScenarios()
        ]);

        setProgress(userProgress);
        setScenarios(availableScenarios);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [navigate]);

  const handleScenarioSelect = (scenarioId) => {
    navigate(`/scenario/${scenarioId}`);
  };

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-xl">Loading...</div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-red-500 text-xl">{error}</div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Learning Dashboard</h1>

      {/* Progress Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Your Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {progress.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2">{item.scenarioTitle}</h3>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                      {item.completionPercentage}% Complete
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                  <div
                    style={{ width: `${item.completionPercentage}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Available Scenarios */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Available Scenarios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((scenario) => (
            <div
              key={scenario.id}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleScenarioSelect(scenario.id)}
            >
              <h3 className="text-lg font-semibold mb-2">{scenario.title}</h3>
              <p className="text-gray-600 mb-4">{scenario.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-600">
                  Difficulty: {scenario.difficulty}
                </span>
                <span className="text-sm text-gray-500">
                  Duration: {scenario.estimatedDuration} min
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;