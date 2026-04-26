import React from 'react';
import { useState } from 'react';
import hero from '../images/hero.jpg';
import jasmine from '../images/jasmine_mt.png';
import osmanthus from '../images/osmanthus_mt.png';
import champaca from '../images/champaca_mt.png';
import mango from '../images/mango.webp';
import storefront from '../images/storefront.jpg';

const images = [hero, jasmine, osmanthus, champaca, mango, storefront];

const GalleryPage: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(i => (i - 1 + images.length) % images.length);
  const next = () => setCurrent(i => (i + 1) % images.length);
  return (
    <main className="min-h-screen">
      <div className='page-heading'>
        Gallery
      </div>
      <div className='flex flex-1 items-center justify-center min-h-screen'>
        <div className="relative w-full max-w-2xl mx-auto">
          <img src={images[current]} className="w-full aspect-video object-cover" />

          <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded">‹</button>
          <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded">›</button>

          <div className="flex justify-center gap-2 mt-3">
            {images.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className={`w-3 h-3 rounded-full ${i === current ? 'bg-black' : 'bg-gray-300'}`}
              />
            ))}
          </div>

        </div>

      </div>

    </main>
  );
};

export default GalleryPage;