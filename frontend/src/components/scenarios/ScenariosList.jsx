import React from 'react';
import ScenarioCard from './ScenarioCard';

const ScenariosList = () => {
  const scenarios = [
    {
      id: 1,
      title: 'Classroom Introduction',
      description: 'Practice introducing yourself to classmates and teachers in a safe, virtual classroom environment.',
      difficulty: 'Easy',
      imageUrl: '/images/scenarios/classroom.jpg',
      duration: 15,
      skills: ['Social Interaction', 'Communication', 'Self-Expression'],
      onStart: () => console.log('Starting Classroom scenario')
    },
    {
      id: 2,
      title: 'Shopping Adventure',
      description: 'Learn to navigate a store, select items, and handle money in a virtual shopping environment.',
      difficulty: 'Medium',
      imageUrl: '/images/scenarios/shopping.jpg',
      duration: 20,
      skills: ['Money Management', 'Decision Making', 'Social Skills'],
      onStart: () => console.log('Starting Shopping scenario')
    },
    {
      id: 3,
      title: 'Playground Friends',
      description: 'Practice social interactions and turn-taking with virtual peers in a playground setting.',
      difficulty: 'Easy',
      imageUrl: '/images/scenarios/playground.jpg',
      duration: 15,
      skills: ['Social Skills', 'Turn-Taking', 'Emotional Recognition'],
      onStart: () => console.log('Starting Playground scenario')
    },
    {
      id: 4,
      title: 'Restaurant Visit',
      description: 'Learn to order food, practice table manners, and interact with restaurant staff.',
      difficulty: 'Medium',
      imageUrl: '/images/scenarios/restaurant.jpg',
      duration: 25,
      skills: ['Social Etiquette', 'Communication', 'Money Management'],
      onStart: () => console.log('Starting Restaurant scenario')
    },
    {
      id: 5,
      title: 'Public Transportation',
      description: 'Practice using buses and trains safely while following social norms and schedules.',
      difficulty: 'Hard',
      imageUrl: '/images/scenarios/transport.jpg',
      duration: 30,
      skills: ['Navigation', 'Time Management', 'Safety Awareness'],
      onStart: () => console.log('Starting Transportation scenario')
    },
    {
      id: 6,
      title: 'Doctor Visit',
      description: 'Reduce anxiety about medical visits by practicing common procedures in a virtual clinic.',
      difficulty: 'Medium',
      imageUrl: '/images/scenarios/doctor.jpg',
      duration: 20,
      skills: ['Healthcare Understanding', 'Anxiety Management', 'Communication'],
      onStart: () => console.log('Starting Doctor Visit scenario')
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Available Learning Scenarios</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Choose from our collection of interactive VR scenarios designed to develop essential life skills
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {scenarios.map((scenario) => (
          <ScenarioCard
            key={scenario.id}
            {...scenario}
          />
        ))}
      </div>
    </div>
  );
};

export default ScenariosList;