export default function About() {
  return (
    <>
      {/* Hero section */}
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
          <div className="max-w-screen-lg mx-auto text-center mb-8">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              About ITGenius
            </h1>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              We are a leading technology education platform, dedicated to transforming individuals and businesses through practical IT knowledge and skills.
            </p>
          </div>
        </div>
      </section>

      {/* Mission section */}
      <section className="bg-gray-50 dark:bg-gray-800">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Our Mission
            </h2>
            <p className="mb-4">
              We are strategically focused on empowering individuals and organizations with cutting-edge technology skills. Our comprehensive training programs are designed to bridge the gap between theoretical knowledge and practical application.
            </p>
            <p>
              We believe in hands-on learning experiences that prepare our students for real-world challenges in the ever-evolving tech industry.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <img 
              className="w-full rounded-lg shadow-lg" 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" 
              alt="Team collaboration" 
            />
            <img 
              className="mt-4 w-full lg:mt-10 rounded-lg shadow-lg" 
              src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80" 
              alt="Learning environment" 
            />
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
          <div className="grid grid-cols-2 gap-8 text-gray-500 sm:gap-12 md:grid-cols-3 lg:grid-cols-3 dark:text-gray-400">
            <div className="flex flex-col items-center justify-center">
              <div className="mb-2 text-3xl font-extrabold text-gray-900 dark:text-white">1,000+</div>
              <div>Students Trained</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="mb-2 text-3xl font-extrabold text-gray-900 dark:text-white">50+</div>
              <div>Professional Courses</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="mb-2 text-3xl font-extrabold text-gray-900 dark:text-white">15+</div>
              <div>Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team section */}
      <section className="bg-gray-50 dark:bg-gray-800">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Our Team
            </h2>
            <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
              Meet our team of experienced instructors and industry professionals
            </p>
          </div>
          <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
            <div className="items-center bg-gray-50 rounded-lg shadow-lg sm:flex dark:bg-gray-700 dark:border-gray-600">
              <a href="#" className="sm:w-2/5">
                <img 
                  className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg object-cover h-full" 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80" 
                  alt="Professional instructor" 
                />
              </a>
              <div className="p-5 sm:w-3/5">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <a href="#">John Doe</a>
                </h3>
                <span className="text-gray-500 dark:text-gray-400">Lead Instructor</span>
                <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                  10+ years experience in full-stack development and cloud technologies.
                </p>
              </div>
            </div>
            <div className="items-center bg-gray-50 rounded-lg shadow-lg sm:flex dark:bg-gray-700 dark:border-gray-600">
              <a href="#" className="sm:w-2/5">
                <img 
                  className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg object-cover h-full" 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80" 
                  alt="Professional instructor" 
                />
              </a>
              <div className="p-5 sm:w-3/5">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <a href="#">Jane Smith</a>
                </h3>
                <span className="text-gray-500 dark:text-gray-400">Senior Instructor</span>
                <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                  Expert in mobile development and UI/UX design principles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
  