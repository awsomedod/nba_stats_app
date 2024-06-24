import React from 'react';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

const WelcomeMessage = () => {
  return (
    <div className="flex flex-col items-center justify-start text-center h-auto pt-20">
      <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
        Welcome to SwishStats
      </h1>
      <p className="mt-4 text-xl text-gray-700">
        Your go-to platform for comprehensive NBA player statistics.
      </p>
      <div className="mt-8 flex space-x-4">
        <button className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition duration-300 flex items-center">
          <GitHubLogoIcon className="w-6 h-6 mr-2" />
          GitHub
        </button>
      </div>
    </div>
  );
};

export default WelcomeMessage;