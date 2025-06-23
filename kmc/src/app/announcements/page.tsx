'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiTag, FiArrowRight, FiSearch, FiAlertCircle, FiX } from 'react-icons/fi';

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

interface Announcement {
  id: string;
  title: string;
  date: string;
  description: string;
  content: string;
  category: 'event' | 'opportunity' | 'update';
  image?: string;
}

const announcementsData: Announcement[] = [
  {
    id: '1',
    title: 'Alumni Meet 2024',
    date: 'June 15, 2024',
    description: 'Join us for the annual alumni meet and reconnect with your batchmates and faculty members.',
    content: `We are thrilled to announce the Annual Alumni Meet 2024, a grand event where past meets present.`,
    category: 'event',
    image: '/cultural-fest.jpg'
  },
  {
    id: '2',
    title: 'Campus Recruitment Drive',
    date: 'June 25, 2024',
    description: 'Leading companies will be visiting the campus for recruitment. Final year students are encouraged to participate.',
    content: `The annual campus recruitment drive is scheduled for June 25, 2024.`,
    category: 'opportunity',
    image: '/recruitment-drive.jpg'
  },
  {
    id: '3',
    title: 'Infrastructure Upgrades',
    date: 'Ongoing',
    description: 'The college is undergoing major infrastructure upgrades to provide better facilities for students and faculty.',
    content: `Kirori Mal College is committed to providing world-class facilities to its students and faculty.`,
    category: 'update',
    image: '/infrastructure.jpg'
  },
  {
    id: '4',
    title: 'New Research Center Inauguration',
    date: 'July 10, 2024',
    description: 'State-of-the-art research facility opening next month with advanced equipment and resources.',
    content: `We are proud to announce the inauguration of our new Research and Innovation Center.`,
    category: 'update',
    image: '/research-center.jpg'
  },
  {
    id: '5',
    title: 'Alumni Scholarship Program',
    date: 'Applications Open',
    description: 'Applications are now open for the annual alumni-sponsored scholarship program.',
    content: `The Alumni Association is pleased to announce the launch of the annual Alumni Scholarship Program.`,
    category: 'opportunity',
    image: '/scholarship.jpg'
  },
  {
    id: '6',
    title: 'Annual Cultural Fest',
    date: 'August 20-22, 2024',
    description: 'Three days of cultural extravaganza featuring performances, competitions, and more.',
    content: `Get ready for the most awaited event of the year - the Annual Cultural Fest 2024!`,
    category: 'event',
    image: '/cultural-fest.jpg'
  }
];

const categories = [
  { id: 'all', name: 'All Announcements' },
  { id: 'event', name: 'Events' },
  { id: 'opportunity', name: 'Opportunities' },
  { id: 'update', name: 'Updates' },
];

const categoryStyles = {
  event: { bg: 'bg-blue-100', text: 'text-blue-800' },
  opportunity: { bg: 'bg-green-100', text: 'text-green-800' },
  update: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
};

export default function AnnouncementsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAnnouncements = useMemo(() => {
    let filtered = announcementsData;

    if (activeCategory !== 'all') {
      filtered = filtered.filter(announcement => announcement.category === activeCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(announcement =>
        announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        announcement.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
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
              Announcements
            </h1>
            <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
              Stay updated with the latest news, events, and opportunities from the Kirori Mal College alumni community.
            </p>
          </motion.div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/4 lg:sticky top-24 self-start">
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-semibold text-[#5C0A0A] mb-4">Search</h2>
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search announcements..."
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
                          <motion.span layoutId="active-announcement-indicator">
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
                {filteredAnnouncements.length > 0 ? (
                  filteredAnnouncements.map((announcement) => (
                    <motion.div key={announcement.id} variants={item} layout>
                      <Link href={`/announcements/${announcement.id}`} className="block h-full group">
                        <div className="h-full flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200/80 hover:border-[#5C0A0A]/30">
                          <div className="relative h-48 bg-gray-100 overflow-hidden">
                            {announcement.image ? (
                              <Image
                                src={announcement.image}
                                alt={announcement.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                <FiTag className="w-12 h-12 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="p-5 flex flex-col flex-grow">
                            <div className="flex-grow">
                              <div className="flex items-center justify-between mb-3">
                                <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${categoryStyles[announcement.category].bg} ${categoryStyles[announcement.category].text}`}>
                                  <FiTag className="mr-1.5" />
                                  {announcement.category.charAt(0).toUpperCase() + announcement.category.slice(1)}
                                </div>
                                <div className="flex items-center text-xs text-gray-500">
                                  <FiCalendar className="mr-1.5" />
                                  {announcement.date}
                                </div>
                              </div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#5C0A0A] transition-colors">
                                {announcement.title}
                              </h3>
                              <p className="text-gray-600 line-clamp-3 text-sm">
                                {announcement.description}
                              </p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-end text-sm font-medium text-[#5C0A0A] group-hover:underline">
                              Read more
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
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No announcements found</h3>
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
