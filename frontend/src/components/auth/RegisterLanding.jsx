import React from 'react';
import { Link } from 'react-router-dom';

const RegisterLanding = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Choose Registration Type
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Select the type of account you want to create
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <Link
            to="/register/parent"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register as Parent
            <p className="mt-1 text-xs opacity-80">For parents seeking therapy services for their children</p>
          </Link>

          <Link
            to="/register/therapist"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Register as Therapist
            <p className="mt-1 text-xs opacity-80">For professional therapists providing services</p>
          </Link>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLanding;