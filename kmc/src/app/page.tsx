'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface SuccessStory {
  name: string;
  role: string;
  company?: string;
  gradYear: string;
  quote: string;
  image: string;
  featuredImage: string;
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentStory, setCurrentStory] = useState(0);
  
  const successStories: SuccessStory[] = [
    {
      name: 'Sarah Johnson',
      role: 'Senior Product Manager',
      company: 'Tech Innovations Inc.',
      gradYear: '2015',
      quote: 'Being part of this alumni network opened doors I never imagined. The connections and opportunities I\'ve found here have been invaluable to my career growth.',
      image: '/alumni-testimonial.jpg',
      featuredImage: '/alumni-meeting.jpg'
    },
    {
      name: 'Raj Patel',
      role: 'Lead Software Engineer',
      company: 'Digital Solutions',
      gradYear: '2018',
      quote: 'The education and network I gained at Kirori Mal College have been instrumental in shaping my career in technology.',
      image: '/alumni2.jpg',
      featuredImage: '/alumni-meeting2.jpg'
    },
    {
      name: 'Priya Sharma',
      role: 'Marketing Director',
      company: 'Global Brands',
      gradYear: '2013',
      quote: 'The alumni community has been a constant source of inspiration and support throughout my professional journey.',
      image: '/alumni3.jpg',
      featuredImage: '/alumni-meeting3.jpg'
    }
  ];
  const slides = [
    {
      image: '/alumnislide1.png',
      title: 'Alumni Meetup 2023',
      description: 'Join us for the annual alumni gathering and networking event.'
    },
    {
      image: '/alumnislide2.png',
      title: 'Career Fair',
      description: 'Connect with top employers and explore new opportunities.'
    },
    {
      image: '/alumnislide1.png', // Replace with actual image path
      title: 'Workshop Series',
      description: 'Enhance your skills with our professional development workshops.'
    },
    {
      image: '/alumnislide2.png', // Replace with actual image path
      title: 'Mentorship Program',
      description: 'Guide the next generation of professionals in your field.'
    }
  ];
  
  // Card slides state
  const [currentCardSet, setCurrentCardSet] = useState(0);
  const cardsPerView = 3;
  const cardSlides = [
    [
      {
        id: 1,
        title: 'Alumni Meetup 2023',
        description: 'Join us for the annual alumni gathering and networking event.',
        image: '/alumnislide1.png'
      },
      {
        id: 2,
        title: 'Career Fair',
        description: 'Connect with top employers and explore new opportunities.',
        image: '/alumnislide2.png'
      },
      {
        id: 3,
        title: 'Workshop Series',
        description: 'Enhance your skills with our professional development workshops.',
        image: '/alumnislide1.png'
      }
    ],
    [
      {
        id: 4,
        title: 'Mentorship Program',
        description: 'Guide the next generation of professionals in your field.',
        image: '/alumnislide2.png'
      },
      {
        id: 5,
        title: 'Alumni Awards',
        description: 'Celebrating outstanding achievements of our alumni community.',
        image: '/alumnislide1.png'
      },
      {
        id: 6,
        title: 'Networking Mixer',
        description: 'Connect with fellow alumni and expand your professional network.',
        image: '/alumnislide2.png'
      }
    ]
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Auto-advance success stories
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStory(prev => (prev + 1) % successStories.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [successStories.length]);
  
  // Auto-advance card slides
  useEffect(() => {
    const cardTimer = setInterval(() => {
      setCurrentCardSet(prev => (prev + 1) % cardSlides.length);
    }, 7000);
    return () => clearInterval(cardTimer);
  }, [cardSlides.length]);
  
  // Manual slide navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };
  
  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
  
  // Card slides navigation
  const goToNextCardSet = () => {
    setCurrentCardSet(prev => (prev + 1) % cardSlides.length);
  };
  
  const goToPrevCardSet = () => {
    setCurrentCardSet(prev => (prev - 1 + cardSlides.length) % cardSlides.length);
  };
  
  const goToCardSet = (index: number) => {
    setCurrentCardSet(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Top brown strip */}
      <div style={{ background: '#4C0604' }} className="w-full h-10"></div>
      
      {/* Navigation */}
      <nav className="w-full flex items-center px-8 py-0.01 shadow-sm">
        <Image src="/kmclogo.png" alt="Logo" width={130} height={100} className="mr-4" />
        <div className="flex flex-col items-center mr-auto">
          <Image src="/kmctext.png" alt="Text Logo" width={330} height={90} className="object-contain mt-3 ml-2" />
          <div className="flex flex-col items-center mt-2 w-full">
            <div className="w-32 h-0.5 bg-[#4C0604] mb-1"></div>
            <span className="mt-1 text-s text-[#4C0604] tracking-widest">ALUMNI</span>
          </div>
        </div>
        <div className="flex gap-4 items-center text-[#4C0604]">
          <Link href="/events" className="hover:underline font-medium hover:text-[#5C0A0A]">EVENTS</Link>
          <span>|</span>
          <a href="/register" className="hover:underline">REGISTER</a>
          <span>|</span>
          <a href="/login" className="hover:underline">LOGIN</a>
        </div>
      </nav>

      {/* Main content with brown background */}
      <div className="relative">
        {/* Extended brown strip */}
        <div className="absolute w-full h-[140%] bg-[#4C0604] -z-10"></div>
        
        {/* Slideshow and banner */}
        <div className="relative w-full flex px-4 pt-12 pb-6 gap-6 z-0">
          {/* Left side - Slideshow (2/3 width) */}
          <div className="w-2/3 bg-gray-100 rounded-lg overflow-hidden relative group">
            {/* Navigation Arrows */}
            <button 
              onClick={goToPrevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              {slides.map((slide, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority={index < 2} // Only preload first 2 images
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{slide.title}</h3>
                      <p className="text-white/90">{slide.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={goToNextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Right side - Banner (1/3 width) */}
          <div className="w-1/3 bg-white rounded-lg shadow-md p-6 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-xl font-bold text-[#4C0604] mb-3">Upcoming Events</h3>
              <p className="text-gray-600">Stay tuned for our next alumni gathering!</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Cards section */}
      <div className="relative w-full">
        {/* Brown strip extension */}
        <div className="h-32 bg-[#4C0604] relative z-0"></div>
        
        {/* Cards container - overlaps the brown strip */}
        <div className="relative z-10 px-4 -mt-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-[#4C0604] mb-8 text-center">Upcoming Events</h2>
            
            <div className="relative group">
              {/* Navigation Arrows */}
              <button 
                onClick={goToPrevCardSet}
                className="absolute -left-12 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#4C0604] p-2 rounded-full z-10 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                aria-label="Previous set of cards"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-transform duration-500 ease-in-out">
                {cardSlides[currentCardSet]?.map((card, index) => (
                  <div 
                    key={card.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <div className="h-48 bg-gray-200 relative">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover"
                      />
                      {index === 2 && cardSlides.length > 1 && (
                        <div className="absolute inset-0 bg-[#4C0604] bg-opacity-80 flex items-center justify-center">
                          <span className="text-white text-lg font-semibold">More Events Coming Soon</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-[#4C0604]">{card.title}</h3>
                      <p className="text-gray-600 text-sm mt-2">{card.description}</p>
                      <button className="mt-3 text-sm text-[#4C0604] hover:underline">
                        {index === 2 && cardSlides.length > 1 ? 'View All Events →' : 'Learn More →'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={goToNextCardSet}
                className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#4C0604] p-2 rounded-full z-10 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                aria-label="Next set of cards"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Card set indicators */}
            {cardSlides.length > 1 && (
              <div className="flex justify-center mt-6 gap-2">
                {cardSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToCardSet(index)}
                    className={`w-3 h-3 rounded-full transition-all ${index === currentCardSet ? 'bg-[#4C0604] w-8' : 'bg-gray-300'}`}
                    aria-label={`Go to card set ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Two column section */}
      <div className="w-full py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left column */}
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#4C0604] leading-tight">
              Where Alumni Empower Students & Students Drive the Future
            </h2>
            <div className="mt-8">
              <a 
                href="/register" 
                className="inline-block px-8 py-3 text-lg font-semibold text-white bg-[#4C0604] hover:bg-[#3a0503] rounded-md shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Join Now
              </a>
            </div>
          </div>
          
          {/* Right column - Image */}
          <div className="flex items-center justify-center">
            <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/alumni-group.jpg"  // Replace with your actual image path
                alt="Alumni together"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Alumni Success Stories Carousel */}
      <div className="w-full py-16 px-4 relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto relative">
          <div className="mt-24 max-w-4xl mx-auto relative group">
            <div className="relative overflow-hidden rounded-2xl shadow-xl bg-white">
              {/* Success Stories */}
              <div className="relative h-full transition-transform duration-500 ease-in-out">
                {successStories.map((story, index) => (
                  <div 
                    key={index}
                    className={`w-full transition-opacity duration-500 ${index === currentStory ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'}`}
                  >
                    <div className="md:flex">
                      <div className="p-8 md:p-12">
                        <div className="uppercase tracking-wide text-sm text-[#4C0604] font-semibold">Alumni Success Story</div>
                        <p className="mt-4 text-gray-600 italic">"{story.quote}"</p>
                        <div className="mt-6">
                          <div className="flex items-center">
                            <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
                              <Image 
                                src={story.image} 
                                alt={story.name}
                                width={48}
                                height={48}
                                className="object-cover h-full w-full"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{story.name}</div>
                              <div className="text-[#4C0604]">Class of {story.gradYear}, {story.role}</div>
                              {story.company && <div className="text-sm text-gray-500">{story.company}</div>}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:block md:flex-shrink-0 md:w-1/3 bg-gray-100 relative">
                        <Image 
                          src={story.featuredImage} 
                          alt={story.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Dots Navigation */}
            <div className="flex justify-center mt-6 gap-2">
              {successStories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStory(index)}
                  className={`w-3 h-3 rounded-full transition-all ${index === currentStory ? 'bg-[#4C0604] w-8' : 'bg-gray-300'}`}
                  aria-label={`Go to story ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Announcements Section */}
      <div className="w-full py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Announcements</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#4C0604] to-[#8B0000] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">Stay updated with the latest news and announcements from Kirori Mal College Alumni Association.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                id: "1",
                title: "Alumni Meet 2024",
                date: "June 15, 2024",
                description: "Join us for the annual alumni meet and reconnect with your batchmates and faculty members.",
                category: "event"
              },
              {
                id: "2",
                title: "Campus Recruitment Drive",
                date: "June 25, 2024",
                description: "Leading companies will be visiting the campus for recruitment. Final year students are encouraged to participate.",
                category: "opportunity"
              },
              {
                id: "3",
                title: "Infrastructure Upgrades",
                date: "Ongoing",
                description: "The college is undergoing major infrastructure upgrades to provide better facilities for students and faculty.",
                category: "update"
              }
            ].map((announcement, index) => (
              <Link 
                href={`/announcements/${announcement.id}`}
                key={index} 
                className="group block h-full"
              >
                <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full hover:ring-2 hover:ring-[#4C0604] hover:ring-opacity-30">
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-3">
                      <span className="px-3 py-1 bg-[#FEE2E2] text-[#4C0604] text-xs font-semibold rounded-full">
                        {announcement.category.charAt(0).toUpperCase() + announcement.category.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500">{announcement.date}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#4C0604] transition-colors">
                      {announcement.title}
                    </h3>
                    <p className="text-gray-600 mb-4 flex-1">{announcement.description}</p>
                    <div className="mt-auto inline-flex items-center text-[#4C0604] font-medium text-sm group-hover:underline">
                      Read more
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <a 
              href="/announcements" 
              className="inline-flex items-center px-6 py-3 border border-[#4C0604] text-[#4C0604] font-medium rounded-md hover:bg-[#4C0604] hover:text-white transition-colors duration-200"
            >
              View All Announcements
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      {/* Alumni Circle Section */}
      <div className="w-full py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-16">Featured Alumni</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-12 justify-items-center">
            {[
              { name: 'Alex Johnson', role: 'Developer', company: 'TechCorp', gradYear: '2015', image: '/alumni1.jpg' },
              { name: 'Sarah Williams', role: 'Marketing', company: 'BrandWorks', gradYear: '2012', image: '/alumni2.jpg' },
              { name: 'Michael Chen', role: 'Data Science', company: 'DataInsights', gradYear: '2018', image: '/alumni3.jpg' },
              { name: 'Emily Rodriguez', role: 'UX Design', company: 'DesignHub', gradYear: '2017', image: '/alumni4.jpg' },
              { name: 'David Kim', role: 'Product', company: 'InnoTech', gradYear: '2016', image: '/alumni5.jpg' },
            ].map((alum, index) => (
              <div key={index} className="group relative text-center">
                <div className="w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg hover:border-[#4C0604] transition-all duration-300 transform hover:scale-105">
                  <Image
                    src={alum.image}
                    alt={alum.name}
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 bg-white p-3 rounded-lg shadow-xl z-10">
                  <h4 className="font-bold text-gray-900">{alum.name}</h4>
                  <p className="text-sm text-[#4C0604]">{alum.role}</p>
                  <p className="text-xs text-gray-600">{alum.company}</p>
                  <p className="text-xs text-gray-500 mt-1">Class of {alum.gradYear}</p>
                </div>
              </div>
            ))}
            
            {/* Join Network Circle */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full border-2 border-dashed border-[#4C0604] flex items-center justify-center flex-col p-6 text-center cursor-pointer hover:bg-[#4C0604] hover:bg-opacity-5 transition-colors duration-300">
                <div className="bg-[#4C0604] rounded-full p-3 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-[#4C0604]">Join Our Network</span>
              </div>
            </div>
          </div>
          
          {/* View More Button */}
          <div className="text-center mt-16">
            <button className="px-8 py-3 border-2 border-[#4C0604] text-[#4C0604] font-semibold rounded-full hover:bg-[#4C0604] hover:text-white transition-colors duration-300">
              View All Alumni
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
