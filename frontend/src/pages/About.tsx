import React from 'react';
import about from '../images/about_us.jpg';

const AboutPage: React.FC = () => {
  return (
    <main className="min-h-screen">
      <div className='page-heading'>
        About us
      </div>
      <div
        className="flex-1 grid place-items-center"
        style={{
          minHeight: "100vh",
          backgroundImage: `url(${about})`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
        }}
      >
        <div className="w-full min-h-screen grid place-items-center"
          style={{ backgroundColor: "#02110591" }}>
          <div className='w-2/3 text-white text-center'>
            <div>
              <div className='md:text-5xl text-2xl pt-20 p-5 font-bold dm-serif-display-regular'>Our Story</div>
              <div className='text-1xl font-semibold pb-20'>Molly Tea was founded in Shenzhen, China. Taking jasmine as its inspiration, the brand explores
                locally-sourced floral and fruity tea aromas from around the world, with a focus on floral-scented
                Chinese teas. Recognized by CIC (China Insights Consultancy) as the first freshly made tea brand dedicated to
                floral aromas, Molly Tea combines relaxed tea drinking with a creative scent experience, aiming to bring
                moments of joy to consumers—one cup at a time.

                Rooted in Eastern cultural heritage, Molly Tea introduces a distinctive “Eastern Modern” aesthetic from a
                contemporary perspective. Unlike the visual style of traditional new-Chinese tea brands, it expresses
                refined aesthetics through every cup of tea, becoming a trendsetting favorite among young consumers.
              </div>
            </div>
            <hr/>
            <div>
              <div className='md:text-5xl text-2xl pt-20 p-5 font-bold dm-serif-display-regular'>Our Mission</div>
              <div className='text-1xl font-semibold pb-20'>Create a happy moment for every consumer, one cup at a time. We are committed to providing high-quality
                tea products and a unique tea experience that brings joy and satisfaction to our customers. We strive to be
                a leading brand in the tea industry, known for our dedication to quality, innovation, and customer satisfaction.
              </div>
            </div>
          </div>


        </div>

      </div>
    </main>
  );
};

export default AboutPage;