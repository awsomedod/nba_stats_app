import React from 'react';

const About = () => {
  return (
    <div className="bg-white bg-opacity-40 w-full h-fit mt-8 flex justify-between p-8">
        <div className="w-1/2 p-4 text-gray-700">
            <h2 className="text-2xl font-bold mb-4">About SwishStats</h2>
            <p>
                SwishStats is your ultimate platform for detailed and comprehensive statistics on NBA players.
                Stay updated with the latest stats, trends, and insights to enhance your basketball knowledge.
                Discover in-depth stats of your favorite players, explore team rosters, and personalize your experience by saving your top picks. 
                Whether you're a casual fan or a stats enthusiast, StatSwish provides a seamless way to 
                stay updated with the latest NBA action.
            </p>
        </div>
        <div className="w-1/2 flex flex-col space-y-4">
            <div className="w-full h-60 flex items-center justify-center">
                <img src="images/giannis2.jpg" alt="Image 1" className="w-full h-full object-cover rounded-md" />
            </div>
            <div className="w-full h-60 flex items-center justify-center">
                <img src="images/giannis.jpg" alt="Image 2" className="w-full h-full object-cover rounded-md" />
            </div>
        </div>
    </div>
  );
};

export default About;