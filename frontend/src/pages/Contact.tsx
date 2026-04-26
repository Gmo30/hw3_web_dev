import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <main className="min-h-screen ">
      <div className='page-heading'>
        Contact
      </div>
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <iframe
          className='w-1/2 h-[60vh]'
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3027.7353308101337!2d-74.01149482331927!3d40.63571847140513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c245c3d0b44f93%3A0x14a06049f0e43a02!2sMolly%20Tea!5e0!3m2!1sen!2sus!4v1773024291640!5m2!1sen!2sus"
          loading="lazy"></iframe>
      </div>
      <div className="flex flex-col items-center py-16 bg-cream">
        <div className='text-4xl dm-serif-display-regular p-5'>Contact us</div>
        <form className="flex flex-col gap-4 w-full max-w-md">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="john.doe@example.com"
              className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              placeholder="I love Molly Tea!"
              rows={4}
              className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300 resize-y"
            />
          </div>

          <button
            type="submit"
            className="btn btn-dark rounded-full"
          >
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
};

export default ContactPage;