import React from 'react';
import background from "../images/background.webp";
import hero from "../images/hero.jpg";
import { Link } from 'react-router-dom';
const HomePage: React.FC = () => {
    return (
        <main className="min-h-screen">
            <div className="relative text-center text-black font-['DM_Serif_Display']">
                <img className="w-full" src={background} alt="Molly Tea Background" />
                <div className='absolute inset-0 flex flex-col items-start pl-10 justify-center'>
                    <h1 className='md:text-5xl text-2xl'>Welcome to Molly Tea</h1>
                    <h3 className='md:text-2xl font-normal pt-4'>Crafted with <em>jasmine</em>, brewed with <em>love</em></h3>
                </div>
            </div>
            <div className='text-center p-20 bg-cream py-16 md:py-24 lg:py-32'>
                <div className='font-semibold text-3xl font-["DM_Serif_Display"] tracking-wider'>Our Story</div>
                <p className='p-5 text-center max-w-2xl mx-auto'>
                    At Molly Tea, we blend traditional Chinese tea culture with modern flavors to create drinks
                    that are as beautiful as they are delicious. Each cup is carefully crafted using premium
                    tea leaves, fresh milk, and seasonal ingredients sourced with care.
                </p>

                <Link to="/about" className="btn btn-dark rounded-full">Learn More</Link>
            </div>

            <div className='flex justify-center p-5'>
                <img className="w-2xs"src={hero}/>
            </div>

            <div className="p-5 text-center">
                <div className='font-semibold text-3xl font-["DM_Serif_Display"] tracking-wider'>Menu</div>
                <div className='p-5'>
                    <h2>Ready to order <em>something delicious?</em></h2>
                <p>Explore our full menu of teas, lattes, and seasonal specials.</p>
                </div>
                
                <Link to="/menu" className="btn btn-dark rounded-full">Learn More</Link>
            </div>
        </main>
    );
};

export default HomePage;