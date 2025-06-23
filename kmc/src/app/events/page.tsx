'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiClock, FiMapPin, FiTag, FiArrowRight, FiSearch, FiAlertCircle, FiX, FiUsers } from 'react-icons/fi';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  content: string;
  category: 'cultural' | 'technical' | 'sports' | 'career' | 'alumni';
  image?: string;
  registrationLink?: string;
}

const eventsData: Event[] = [
  {
    id: '1',
    title: 'Annual Cultural Fest',
    date: 'August 20-22, 2024',
    time: '10:00 AM - 10:00 PM',
    location: 'College Ground',
    description: 'Three days of cultural extravaganza featuring performances, competitions, and more.',
    content: `Get ready for the most awaited event of the year - the Annual Cultural Fest 2024! This three-day extravaganza will feature a variety of cultural performances, competitions, and workshops.`,
    category: 'cultural',
    image: '/cultural-fest.jpg',
    registrationLink: '#'
  },
  {
    id: '2',
    title: 'Tech Symposium',
    date: 'September 5, 2024',
    time: '9:00 AM - 5:00 PM',
    location: 'Auditorium',
    description: 'Annual technical symposium showcasing innovative projects and research papers.',
    content: `The Department of Computer Science is proud to present the Annual Tech Symposium 2024. This event brings together students, researchers, and industry professionals.`,
    category: 'technical',
    image: '/tech-symposium.jpg',
    registrationLink: '#'
  },
  {
    id: '3',
    title: 'Alumni Meet',
    date: 'June 15, 2024',
    time: '6:00 PM - 10:00 PM',
    location: 'College Lawn',
    description: 'Annual alumni meet and networking event with batch reunions and cultural programs.',
    content: `We are thrilled to announce the Annual Alumni Meet 2024, a grand event where past meets present. Reconnect with your batchmates and faculty members.`,
    category: 'alumni',
    image: '/alumni-meet.jpg',
    registrationLink: '#'
  },
  {
    id: '4',
    title: 'Sports Day',
    date: 'November 10, 2024',
    time: '8:00 AM - 6:00 PM',
    location: 'Sports Complex',
    description: 'Annual sports day featuring various competitions and team events.',
    content: `The Annual Sports Day is back with more excitement and energy! Participate in various athletic events, team sports, and fun activities.`,
    category: 'sports',
    image: '/sports-day.jpg',
    registrationLink: '#'
  },
  {
    id: '5',
    title: 'Career Fair',
    date: 'October 5, 2024',
    time: '10:00 AM - 4:00 PM',
    location: 'Main Building',
    description: 'Connect with top employers and explore career opportunities.',
    content: `The Annual Career Fair provides an excellent opportunity for students to interact with potential employers and explore internship opportunities.`,
    category: 'career',
    image: '/career-fair.jpg',
    registrationLink: '#'
  },
  {
    id: '6',
    title: 'Literary Fest',
    date: 'July 20-21, 2024',
    time: '9:00 AM - 6:00 PM',
    location: 'Library & Seminar Halls',
    description: 'Celebration of literature, debates, and creative writing competitions.',
    content: `The Literary Fest is a celebration of the written and spoken word. Participate in debates, poetry slams, and creative writing competitions.`,
    category: 'cultural',
    image: '/literary-fest.jpg',
    registrationLink: '#'
  }
];

const categories = [
  { id: 'all', name: 'All Events' },
  { id: 'cultural', name: 'Cultural' },
  { id: 'technical', name: 'Technical' },
  { id: 'sports', name: 'Sports' },
  { id: 'career', name: 'Career' },
  { id: 'alumni', name: 'Alumni' },
];

const categoryStyles = {
  cultural: { bg: 'bg-purple-100', text: 'text-purple-800' },
  technical: { bg: 'bg-blue-100', text: 'text-blue-800' },
  sports: { bg: 'bg-orange-100', text: 'text-orange-800' },
  career: { bg: 'bg-green-100', text: 'text-green-800' },
  alumni: { bg: 'bg-pink-100', text: 'text-pink-800' },
};

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = useMemo(() => {
    let filtered = eventsData;

    if (activeCategory !== 'all') {
      filtered = filtered.filter(event => event.category === activeCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort events by date (you might want to implement proper date parsing in a real app)
    return [...filtered].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  }, [activeCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-[#F5F0E6] text-gray-800">
      <div style={{ background: '#5C0A0A' }} className="w-full h-1.5"></div>

      <header className="relative bg-[#5C0A0A] text-white pt-16 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/pat.svg')] bg-repeat"></div>
        <div className="max-w-7xl mx-auto relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">
              College Events
            </h1>
            <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
              Explore a vibrant calendar of cultural, technical, and community events at Kirori Mal College.
            </p>
          </motion.div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/4 lg:sticky top-24 self-start">
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-semibold text-[#5C0A0A] mb-4">Search Events</h2>
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name or keyword..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C0A0A] focus:border-[#5C0A0A] transition-colors bg-white"
                  />
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#5C0A0A] mb-4">Categories</h2>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <button
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-between text-sm font-medium ${
                          activeCategory === category.id
                            ? 'bg-[#5C0A0A] text-white shadow-md'
                            : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-[#5C0A0A]'
                        }`}
                      >
                        <span>{category.name}</span>
                        {activeCategory === category.id && (
                          <motion.span layoutId="active-event-category-indicator">
                            <FiArrowRight />
                          </motion.span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          <div className="lg:w-3/4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + searchTerm}
                variants={container}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="grid gap-8 md:grid-cols-2"
              >
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <motion.div key={event.id} variants={item} layout>
                      <Link href={`/events/event-detail/${event.id}`} className="block h-full group">
                        <div className="h-full flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200/80 hover:border-[#5C0A0A]/30">
                          <div className="relative h-48 bg-gray-100 overflow-hidden">
                            {event.image ? (
                              <Image
                                src={event.image}
                                alt={event.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                <FiUsers className="w-12 h-12 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="p-5 flex flex-col flex-grow">
                            <div className="flex-grow">
                               <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium mb-3 ${categoryStyles[event.category].bg} ${categoryStyles[event.category].text}`}>
                                <FiTag className="mr-1.5" />
                                {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                              </div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#5C0A0A] transition-colors">
                                {event.title}
                              </h3>
                              <div className="space-y-2 text-sm text-gray-600">
                                <p className="flex items-center"><FiCalendar className="mr-2 text-[#5C0A0A]"/> {event.date}</p>
                                <p className="flex items-center"><FiClock className="mr-2 text-[#5C0A0A]"/> {event.time}</p>
                                <p className="flex items-center"><FiMapPin className="mr-2 text-[#5C0A0A]"/> {event.location}</p>
                              </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-end text-sm font-medium text-[#5C0A0A] group-hover:underline">
                              View Details
                              <FiArrowRight className="ml-1.5 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    variants={item}
                    className="md:col-span-2 text-center py-16 px-4 bg-white rounded-xl border border-gray-200/80 shadow-sm"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F8F5F0] mb-4">
                      <FiAlertCircle className="w-8 h-8 text-[#5C0A0A]" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No events found</h3>
                    <p className="text-gray-600 max-w-md mx-auto mb-6">
                      Your search for "{searchTerm}" in {categories.find(c => c.id === activeCategory)?.name.toLowerCase()} did not return any results.
                    </p>
                    <button
                      onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}
                      className="px-5 py-2.5 text-sm font-medium text-white bg-[#5C0A0A] hover:bg-[#4a0808] rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center mx-auto"
                    >
                      <FiX className="mr-2"/>
                      Clear Search & Filters
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
