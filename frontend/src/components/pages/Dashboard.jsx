import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for demonstration purposes
const mockStudents = [
  { id: '1', name: 'Alex Chen', age: 8, difficulty: 'medium' },
  { id: '2', name: 'Jamie Smith', age: 10, difficulty: 'easy' },
  { id: '3', name: 'Taylor Johnson', age: 6, difficulty: 'hard' },
];

const mockScenarios = [
  { id: '1', title: 'Classroom Introduction', category: 'social', difficulty: 'easy' },
  { id: '2', title: 'Shopping Trip', category: 'life-skills', difficulty: 'medium' },
  { id: '3', title: 'Playground Interaction', category: 'social', difficulty: 'medium' },
  { id: '4', title: 'Following Instructions', category: 'cognitive', difficulty: 'hard' },
];

const mockProgressData = [
  { date: '2025-03-01', scenarioId: '1', completionPercentage: 75 },
  { date: '2025-03-02', scenarioId: '1', completionPercentage: 90 },
  { date: '2025-03-03', scenarioId: '2', completionPercentage: 45 },
  { date: '2025-03-04', scenarioId: '2', completionPercentage: 60 },
  { date: '2025-03-05', scenarioId: '3', completionPercentage: 30 },
  { date: '2025-03-06', scenarioId: '3', completionPercentage: 65 },
  { date: '2025-03-07', scenarioId: '4', completionPercentage: 25 },
];

const Dashboard = () => {
  const [progressData, setProgressData] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statsTimeframe, setStatsTimeframe] = useState('week');
  const [currentUser, setCurrentUser] = useState({ role: 'educator', uid: '123' });

  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      try {
        // Load scenarios
        setScenarios(mockScenarios);
        
        // If educator/parent, load students
        if (currentUser.role === 'educator' || currentUser.role === 'parent') {
          setStudents(mockStudents);
          
          if (mockStudents.length > 0) {
            setSelectedStudent(mockStudents[0].id);
            loadStudentProgress(mockStudents[0].id);
          }
        } else {
          // Load own progress if student
          loadStudentProgress(currentUser.uid);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [currentUser]);
  
  const loadStudentProgress = async (studentId) => {
    // In a real app, this would fetch from Firebase
    // For now, we'll use our mock data
    setProgressData(transformProgressData(mockProgressData, mockScenarios));
  };
  
  const transformProgressData = (progressData, scenariosData) => {
    // Group by date for time-series chart
    const chartData = progressData.map(item => {
      const scenario = scenariosData.find(s => s.id === item.scenarioId);
      return {
        date: item.date,
        completionPercentage: item.completionPercentage,
        scenarioName: scenario ? scenario.title : 'Unknown Scenario'
      };
    });
    
    return chartData;
  };
  
  const handleStudentChange = (e) => {
    const studentId = e.target.value;
    setSelectedStudent(studentId);
    loadStudentProgress(studentId);
  };
  
  const handleTimeframeChange = (timeframe) => {
    setStatsTimeframe(timeframe);
    // In a real app, this would re-fetch data with the new timeframe
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-lg">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Progress Dashboard</h1>
          <p className="text-gray-600">Track learning progress and achievements</p>
        </div>
        
        {currentUser.role === 'educator' || currentUser.role === 'parent' ? (
          <div className="mt-4 md:mt-0">
            <label htmlFor="student-select" className="block text-sm font-medium text-gray-700 mb-1">
              Select Student
            </label>
            <select
              id="student-select"
              value={selectedStudent || ''}
              onChange={handleStudentChange}
              className="bg-white border border-gray-300 rounded-md px-3 py-2 w-full md:w-64"
            >
              {students.map(student => (
                <option key={student.id} value={student.id}>
                  {student.name} (Age: {student.age})
                </option>
              ))}
            </select>
          </div>
        ) : null}
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Progress Over Time</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => handleTimeframeChange('week')}
              className={`px-3 py-1 rounded ${statsTimeframe === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Week
            </button>
            <button
              onClick={() => handleTimeframeChange('month')}
              className={`px-3 py-1 rounded ${statsTimeframe === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Month
            </button>
            <button
              onClick={() => handleTimeframeChange('year')}
              className={`px-3 py-1 rounded ${statsTimeframe === 'year' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Year
            </button>
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={progressData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="completionPercentage"
                name="Completion %"
                stroke="#3b82f6"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Scenarios</h2>
          <div className="space-y-4">
            {scenarios.slice(0, 3).map(scenario => (
              <div key={scenario.id} className="border-b pb-3">
                <div className="flex justify-between">
                  <h3 className="font-medium">{scenario.title}</h3>
                  <span className={`px-2 py-1 rounded text-xs ${
                    scenario.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                    scenario.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {scenario.difficulty}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{scenario.category}</p>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${progressData.find(p => p.scenarioName === scenario.title)?.completionPercentage || 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Skill Development</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Social Skills</span>
                <span className="text-sm text-gray-600">70%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Cognitive Skills</span>
                <span className="text-sm text-gray-600">55%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '55%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Life Skills</span>
                <span className="text-sm text-gray-600">42%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Communication</span>
                <span className="text-sm text-gray-600">63%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-600 h-2 rounded-full" style={{ width: '63%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Focus on Social Cues</h3>
            <p className="text-sm text-gray-600">Practice recognizing facial expressions and body language in the "Playground Interaction" scenario.</p>
            <button className="mt-3 bg-blue-600 text-white px-3 py-1 rounded text-sm">Start Activity</button>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Practice Following Instructions</h3>
            <p className="text-sm text-gray-600">Complete the "Following Instructions" scenario to improve sequential processing skills.</p>
            <button className="mt-3 bg-blue-600 text-white px-3 py-1 rounded text-sm">Start Activity</button>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Review Shopping Skills</h3>
            <p className="text-sm text-gray-600">Return to the "Shopping Trip" scenario to practice paying and making change.</p>
            <button className="mt-3 bg-blue-600 text-white px-3 py-1 rounded text-sm">Start Activity</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;