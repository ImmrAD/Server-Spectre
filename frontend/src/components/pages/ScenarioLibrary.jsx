import React, { useState, useEffect } from 'react';

// Mock data for demonstration purposes
const mockScenarios = [
  {
    id: '1',
    title: 'Classroom Introduction',
    description: 'Learn how to introduce yourself and interact with classmates in a school setting.',
    category: 'social',
    difficulty: 'easy',
    duration: 10,
    skillsFocus: ['communication', 'social interaction', 'listening'],
    image: '/api/placeholder/300/200'
  },
  {
    id: '2',
    title: 'Shopping Trip',
    description: 'Practice shopping skills including selecting items, paying at checkout, and handling money.',
    category: 'life-skills',
    difficulty: 'medium',
    duration: 15,
    skillsFocus: ['money management', 'decision making', 'communication'],
    image: '/api/placeholder/300/200'
  },
  {
    id: '3',
    title: 'Playground Interaction',
    description: 'Learn how to approach peers, ask to join games, and handle social situations at the playground.',
    category: 'social',
    difficulty: 'medium',
    duration: 12,
    skillsFocus: ['social cues', 'turn-taking', 'conflict resolution'],
    image: '/api/placeholder/300/200'
  },
  {
    id: '4',
    title: 'Following Instructions',
    description: 'Practice following multi-step instructions in various environments.',
    category: 'cognitive',
    difficulty: 'hard',
    duration: 20,
    skillsFocus: ['attention', 'sequential processing', 'memory'],
    image: '/api/placeholder/300/200'
  },
  {
    id: '5',
    title: 'Crossing the Street',
    description: 'Learn road safety and how to cross streets safely with traffic signals.',
    category: 'life-skills',
    difficulty: 'medium',
    duration: 10,
    skillsFocus: ['safety awareness', 'decision making', 'attention'],
    image: '/api/placeholder/300/200'
  }
];

const ScenarioLibrary = () => {
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'all',
    difficulty: 'all',
    search: ''
  });

  useEffect(() => {
    // Simulate fetching data
    const fetchScenarios = async () => {
      try {
        // In a real app, this would fetch from Firebase
        setScenarios(mockScenarios);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching scenarios:", error);
        setLoading(false);
      }
    };

    fetchScenarios();
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleSearchChange = (e) => {
    setFilters(prev => ({
      ...prev,
      search: e.target.value
    }));
  };

  const filteredScenarios = scenarios.filter(scenario => {
    // Apply category filter
    if (filters.category !== 'all' && scenario.category !== filters.category) {
      return false;
    }
    
    // Apply difficulty filter
    if (filters.difficulty !== 'all' && scenario.difficulty !== filters.difficulty) {
      return false;
    }
    
    // Apply search filter
    if (filters.search && !scenario.title.toLowerCase().includes(filters.search.toLowerCase()) && 
        !scenario.description.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-lg">Loading scenarios...</span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Learning Scenarios</h1>
        <p className="text-gray-600">Browse and select interactive VR scenarios for skill development</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="w-full md:w-1/4">
            <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category-filter"
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="bg-white border border-gray-300 rounded-md px-3 py-2 w-full"
            >
              <option value="all">All Categories</option>
              <option value="social">Social Skills</option>
              <option value="life-skills">Life Skills</option>
              <option value="cognitive">Cognitive Skills</option>
            </select>
          </div>
          
          <div className="w-full md:w-1/4">
            <label htmlFor="difficulty-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Difficulty
            </label>
            <select
              id="difficulty-filter"
              value={filters.difficulty}
              onChange={(e) => handleFilterChange('difficulty', e.target.value)}
              className="bg-white border border-gray-300 rounded-md px-3 py-2 w-full"
            >
              <option value="all">All Levels</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          
          <div className="w-full md:w-2/4">
            <label htmlFor="search-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              id="search-filter"
              type="text"
              value={filters.search}
              onChange={handleSearchChange}
              placeholder="Search scenarios..."
              className="bg-white border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredScenarios.length > 0 ? (
          filteredScenarios.map(scenario => (
            <div key={scenario.id} className="bg-white rounded-lg shadow overflow-hidden">
              <img src={scenario.image} alt={scenario.title} className="w-full h-40 object-cover" />
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold">{scenario.title}</h2>
                  <span className={`px-2 py-1 rounded text-xs ${
                    scenario.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                    scenario.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {scenario.difficulty}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{scenario.description}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">
                    <span className="font-medium">{scenario.duration}</span> mins
                  </span>
                  <span className="text-sm text-gray-500">
                    Category: <span className="font-medium capitalize">{scenario.category}</span>
                  </span>
                </div>
                
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {scenario.skillsFocus.map((skill, index) => (
                      <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                    Start Scenario
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No scenarios match your filters. Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScenarioLibrary;