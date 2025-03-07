import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                VR Learning for Children with ASD and ID
              </h1>
              <p className="text-xl mb-8">
                Immersive virtual reality experiences designed to develop social and cognitive skills through interactive, safe, and engaging scenarios.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition">
                  Get Started
                </button>
                <button className="px-6 py-3 bg-transparent border border-white text-white rounded-lg font-medium hover:bg-blue-700 transition">
                  Learn More
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <img src="/api/placeholder/500/400" alt="Child using VR headset" className="rounded-lg shadow-lg max-w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Our Platform Helps</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our VR learning platform is specially designed to support children with Autism Spectrum Disorder and Intellectual Disabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Immersive Learning</h3>
              <p className="text-gray-600">
                Interactive VR scenarios provide a safe environment for children to practice real-world skills without the anxiety of real-world consequences.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Customizable Difficulty</h3>
              <p className="text-gray-600">
                Adjust scenario complexity to match each child's individual needs, abilities, and learning pace.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Daily Rewards</h3>
              <p className="text-gray-600">
                Collect daily rewards for consistent practice and engagement.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scenarios Preview */}
      <div className="bg-gray-100 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Learning Scenarios</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our most popular virtual reality learning scenarios
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <img src="/api/placeholder/400/250" alt="Classroom scenario" className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">Classroom Introduction</h3>
                  <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">Easy</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">Learn how to introduce yourself and interact with classmates.</p>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                  View Scenario
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <img src="/api/placeholder/400/250" alt="Shopping scenario" className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">Shopping Trip</h3>
                  <span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-800">Medium</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">Practice selecting items, paying, and handling money.</p>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                  View Scenario
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <img src="/api/placeholder/400/250" alt="Playground scenario" className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">Playground Interaction</h3>
                  <span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-800">Medium</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">Learn to approach peers and join games at the playground.</p>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                  View Scenario
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
              Browse All Scenarios
            </button>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Parents & Educators Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from those who have seen real progress using our VR learning tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">JD</span>
                </div>
                <div>
                  <h4 className="font-semibold">Jane Doe</h4>
                  <p className="text-gray-600 text-sm">Parent of a child with ASD</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The VR scenarios have helped my son practice social interactions in a way that feels safe for him. He's been able to transfer what he's learned to real-life situations, which has been amazing to witness."
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 font-bold">MS</span>
                </div>
                <div>
                  <h4 className="font-semibold">Michael Smith</h4>
                  <p className="text-gray-600 text-sm">Special Education Teacher</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "This platform has become an essential tool in my classroom. The progress tracking helps me tailor instruction to each student's needs, and the children are excited to practice skills in the VR environment."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gamified Rewards Section */}
      <div className="bg-gray-100 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Gamified Rewards System</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Keep children motivated with our engaging reward system
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Achievement Badges</h3>
              <p className="text-gray-600">
                Earn special badges for completing scenarios and mastering new skills.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Progress Milestones</h3>
              <p className="text-gray-600">
                Track achievements and celebrate progress with visual rewards.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
              <p className="text-gray-600">
                Detailed analytics help parents and educators monitor development and identify areas needing additional support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;