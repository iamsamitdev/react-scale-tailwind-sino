export default function Contact() {
  return (
    <>
      {/* Hero section */}
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
          <div className="max-w-screen-lg mx-auto text-center mb-8">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Contact Us
            </h1>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              Get in touch with us for any questions about our courses or services
            </p>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section className="bg-gray-50 dark:bg-gray-800">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-xl">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            {/* Contact Form */}
            <div className="bg-white rounded-lg p-8 shadow-lg dark:bg-gray-700">
              <h2 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white">Send us a message</h2>
              <form action="#" className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your name</label>
                  <input 
                    type="text" 
                    id="name"
                    className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="John Doe" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                  <input 
                    type="email" 
                    id="email"
                    className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="name@company.com" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                  <input 
                    type="text" 
                    id="subject"
                    className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="Let us know how we can help you" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your message</label>
                  <textarea 
                    id="message" 
                    rows={6} 
                    className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="Leave a comment..."
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
                >
                  Send message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <div className="mb-8">
                <img 
                  className="w-full h-48 object-cover rounded-lg shadow-lg mb-6" 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" 
                  alt="Office" 
                />
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">Get in touch</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  We'd love to hear from you. Please fill out the form or contact us using the information below.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                  </svg>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Office</h3>
                    <p className="text-gray-500 dark:text-gray-400">123 Business Street, Bangkok 10400, Thailand</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                  </svg>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Phone</h3>
                    <p className="text-gray-500 dark:text-gray-400">+66 2 123 4567</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Email</h3>
                    <p className="text-gray-500 dark:text-gray-400">contact@itgenius.co.th</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </>
  )
}