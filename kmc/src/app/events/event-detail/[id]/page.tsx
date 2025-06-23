'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  FiArrowLeft, 
  FiCalendar, 
  FiClock, 
  FiMapPin, 
  FiMail, 
  FiUser, 
  FiAlertCircle, 
  FiExternalLink,
  FiChevronDown,
  FiChevronUp,
  FiShare2,
  FiHeart,
  FiBookmark,
  FiImage
} from 'react-icons/fi';

interface Speaker {
  name: string;
  role: string;
  bio: string;
  image?: string;
}

interface EventData {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  content: string;
  category: string;
  image: string;
  registrationLink: string;
  organizer: string;
  contactEmail: string;
  requirements: string[];
  speakers: Speaker[];
  gallery: string[];
}

// Sample event data - in a real app, this would come from an API
const sampleEvents: EventData[] = [
  {
    id: '1',
    title: 'Annual Cultural Fest',
    date: '2025-03-15',
    time: '10:00 AM - 6:00 PM',
    location: 'College Ground',
    description: 'Join us for a day of cultural celebrations, performances, and food!',
    content: `**Welcome to our Annual Cultural Fest!** This year's event promises to be bigger and better than ever before.\n\n**Highlights include:**\n- Live music and dance performances\n- Food stalls featuring cuisines from around the world\n- Art and craft exhibitions\n- Cultural competitions\n- Fun games and activities for all ages\n\n**Schedule:**\n- 10:00 AM: Inauguration\n- 11:00 AM - 1:00 PM: Cultural Performances\n- 1:00 PM - 2:00 PM: Lunch Break\n- 2:00 PM - 5:00 PM: Competitions and Games\n- 5:00 PM - 6:00 PM: Prize Distribution and Closing Ceremony`,
    category: 'cultural',
    image: '/images/events/cultural-fest.jpg',
    registrationLink: 'https://example.com/register/cultural-fest',
    organizer: 'Cultural Committee',
    contactEmail: 'cultural@kmc.edu',
    requirements: ['College ID', 'Water bottle', 'Comfortable clothing'],
    speakers: [
      {
        name: 'Dr. Rajesh Kumar',
        role: 'Chief Guest',
        bio: 'Renowned cultural historian and author',
        image: '/images/speakers/rajesh-kumar.jpg'
      },
      {
        name: 'Priya Sharma',
        role: 'Event Coordinator',
        bio: 'Cultural Secretary, KMC',
        image: '/images/speakers/priya-sharma.jpg'
      }
    ],
    gallery: [
      '/images/gallery/cultural-1.jpg',
      '/images/gallery/cultural-2.jpg',
      '/images/gallery/cultural-3.jpg'
    ]
  },
  {
    id: '2',
    title: 'Tech Symposium 2025',
    date: '2025-04-20',
    time: '9:00 AM - 5:00 PM',
    location: 'Main Auditorium',
    description: 'A day-long event exploring the latest in technology and innovation',
    content: '**Tech Symposium 2025** brings together industry leaders, researchers, and students to discuss the future of technology.\n\n**Keynote Speakers:**\n- Dr. Ananya Patel: AI and Machine Learning\n- Prof. Ramesh Iyer: Blockchain Technology\n- Dr. Sneha Kapoor: Cybersecurity in 2025\n\n**Workshops:**\n- Introduction to Quantum Computing\n- Building AI Applications\n- Cybersecurity Best Practices\n\n**Networking Session:**\nMeet and interact with industry professionals and fellow tech enthusiasts.',
    category: 'technical',
    image: '/images/events/tech-symposium.jpg',
    registrationLink: 'https://example.com/register/tech-symposium',
    organizer: 'Computer Science Department',
    contactEmail: 'csdept@kmc.edu',
    requirements: ['Laptop (for workshops)', 'Notebook', 'College ID'],
    speakers: [
      {
        name: 'Dr. Ananya Patel',
        role: 'Senior AI Researcher',
        bio: 'Leading expert in Machine Learning and AI',
        image: '/images/speakers/ananya-patel.jpg'
      },
      {
        name: 'Prof. Ramesh Iyer',
        role: 'Blockchain Specialist',
        bio: 'Professor of Computer Science',
        image: '/images/speakers/ramesh-iyer.jpg'
      },
      {
        name: 'Dr. Sneha Kapoor',
        role: 'Cybersecurity Expert',
        bio: 'Head of Security at TechSecure',
        image: '/images/speakers/sneha-kapoor.jpg'
      }
    ],
    gallery: [
      '/images/gallery/tech-1.jpg',
      '/images/gallery/tech-2.jpg',
      '/images/gallery/tech-3.jpg'
    ]
  }
];

// Format date to display in a more readable format
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    weekday: 'long'
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

interface PageProps {
  params: {
    id: string;
  };
}

const EventDetailPage = ({ params }: PageProps) => {
  const router = useRouter();
  const eventId = params?.id;
  
  // State for UI interactions
  const [activeTab, setActiveTab] = useState('details');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  // Find the event by ID
  const event = sampleEvents.find(event => event.id === eventId);
  
  // If event is not found, show 404
  if (!event) {
    return (
      <div className="min-h-screen bg-[#F5F0E6] flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F8F5F0] mb-4">
            <FiAlertCircle className="w-8 h-8 text-[#5C0A0A]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h2>
          <p className="text-gray-600 mb-6">The event you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => router.back()} 
            className="px-6 py-2.5 text-sm font-medium text-[#5C0A0A] hover:text-white bg-white hover:bg-[#5C0A0A] border border-[#5C0A0A] rounded-md transition-all duration-200 hover:shadow-sm"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0E6]">
      {/* Top brown strip */}
      <div style={{ background: '#5C0A0A' }} className="w-full h-1.5"></div>

      {/* Hero Section */}
      <div className="relative bg-gray-900 overflow-hidden">
        {/* Background Image */}
        {event.image && (
          <div className="absolute inset-0">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover opacity-70"
              priority
            />
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.button
              onClick={() => router.back()}
              whileHover={{ x: -4 }}
              className="flex items-center text-white hover:text-gray-200 transition-colors mb-6 group"
            >
              <FiArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-0.5" />
              Back to Events
            </motion.button>
            
            {/* Category and Date */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#5C0A0A] text-white border border-white/20">
                {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
              </span>
              <span className="text-white/80 text-sm">
                {formatDate(event.date)}
              </span>
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {event.title}
            </h1>
            
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-white/90 mt-6">
              <div className="flex items-center">
                <FiClock className="w-5 h-5 mr-2" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center">
                <FiMapPin className="w-5 h-5 mr-2" />
                <span>{event.location}</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <motion.a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-[#5C0A0A] hover:bg-[#4A0808] rounded-full shadow-lg transition-all"
              >
                Register Now
                <FiExternalLink className="ml-2 w-4 h-4" />
              </motion.a>
              
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label={isBookmarked ? 'Remove from bookmarks' : 'Bookmark event'}
                >
                  <FiBookmark className={`w-5 h-5 ${isBookmarked ? 'text-yellow-400 fill-current' : 'text-white'}`} />
                </motion.button>
                
                <motion.button
                  onClick={() => setIsLiked(!isLiked)}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label={isLiked ? 'Unlike event' : 'Like event'}
                >
                  <FiHeart className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-current' : 'text-white'}`} />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Share event"
                >
                  <FiShare2 className="w-5 h-5 text-white" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-8">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'details'
                      ? 'border-[#5C0A0A] text-[#5C0A0A]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Event Details
                </button>
                {event.speakers?.length > 0 && (
                  <button
                    onClick={() => setActiveTab('speakers')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'speakers'
                        ? 'border-[#5C0A0A] text-[#5C0A0A]'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Speakers
                  </button>
                )}
                {event.gallery?.length > 0 && (
                  <button
                    onClick={() => setActiveTab('gallery')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'gallery'
                        ? 'border-[#5C0A0A] text-[#5C0A0A]'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Gallery
                  </button>
                )}
              </nav>
            </div>
            
            {/* Tab Content */}
            <div className="mt-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'details' && (
                    <div className="prose max-w-none text-gray-700">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">About the Event</h2>
                      {event.content.split('\n').map((paragraph, i) => (
                        <p key={i} className="mb-4 leading-relaxed">
                          {paragraph.startsWith('**') && paragraph.endsWith('**')
                            ? <strong className="text-[#5C0A0A]">{paragraph.slice(2, -2)}</strong>
                            : paragraph.startsWith('**')
                              ? <strong className="text-[#5C0A0A]">{paragraph.slice(2)}</strong>
                              : paragraph.endsWith('**')
                                ? <strong className="text-[#5C0A0A]">{paragraph.slice(0, -2)}</strong>
                                : paragraph.startsWith('- ')
                                  ? <li className="ml-5 mb-2 flex items-start">
                                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#5C0A0A] mt-2.5 mr-2"></span>
                                      {paragraph.slice(2)}
                                    </li>
                                  : paragraph
                          }
                        </p>
                      ))}
                    </div>
                  )}

                  {activeTab === 'speakers' && event.speakers && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {event.speakers.map((speaker, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                              {speaker.image ? (
                                <Image
                                  src={speaker.image}
                                  alt={speaker.name}
                                  width={64}
                                  height={64}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500">
                                  <FiUser className="w-8 h-8" />
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{speaker.name}</h3>
                            <p className="text-sm text-[#5C0A0A] font-medium">{speaker.role}</p>
                            <p className="mt-1 text-sm text-gray-600">{speaker.bio}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'gallery' && event.gallery && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {event.gallery.map((image, index) => (
                        <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={image}
                            alt={`Event gallery ${index + 1}`}
                            width={300}
                            height={300}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 sticky top-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                Event Information
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 flex items-center mb-2">
                    <FiCalendar className="mr-2 w-4 h-4" /> Date & Time
                  </h4>
                  <div className="ml-6">
                    <p className="text-gray-900 font-medium">{formatDate(event.date)}</p>
                    <p className="text-gray-600">{event.time}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 flex items-center mb-2">
                    <FiMapPin className="mr-2 w-4 h-4" /> Location
                  </h4>
                  <p className="text-gray-900 ml-6">{event.location}</p>
                </div>

                {event.organizer && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 flex items-center mb-2">
                      <FiUser className="mr-2 w-4 h-4" /> Organizer
                    </h4>
                    <p className="text-gray-900 ml-6">{event.organizer}</p>
                  </div>
                )}

                {event.contactEmail && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 flex items-center mb-2">
                      <FiMail className="mr-2 w-4 h-4" /> Contact
                    </h4>
                    <a 
                      href={`mailto:${event.contactEmail}`}
                      className="text-[#5C0A0A] hover:underline ml-6 block"
                    >
                      {event.contactEmail}
                    </a>
                  </div>
                )}

                {event.requirements?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      What to Bring
                    </h4>
                    <ul className="space-y-2 ml-6">
                      {event.requirements.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 mr-2 bg-[#5C0A0A] rounded-full"></span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-100">
                  <a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#5C0A0A] hover:bg-[#4A0808] shadow-sm"
                  >
                    Register Now
                    <FiExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
