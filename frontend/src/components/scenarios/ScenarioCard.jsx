import React from 'react';
import { useNavigate } from 'react-router-dom';

const ScenarioCard = ({ scenario }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/scenario/${scenario.id}`);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-shadow hover:shadow-lg"
      onClick={handleClick}
    >
      {scenario.image && (
        <img
          src={scenario.image}
          alt={scenario.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{scenario.title}</h3>
          <span
            className={`px-2 py-1 rounded text-xs ${getDifficultyColor(
              scenario.difficulty
            )}`}
          >
            {scenario.difficulty}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{scenario.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {scenario.skillsFocus?.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs"
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Duration: {scenario.duration} min</span>
          <span>Category: {scenario.category}</span>
        </div>
      </div>
    </div>
  );
};

export default ScenarioCard;