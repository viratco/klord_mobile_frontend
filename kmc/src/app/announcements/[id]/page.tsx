'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Announcement {
  id: string;
  title: string;
  date: string;
  description: string;
  content: string;
  category: string;
  image?: string;
  author?: string;
  authorRole?: string;
  authorImage?: string;
  relatedAnnouncements?: Omit<Announcement, 'content' | 'relatedAnnouncements'>[];
}

// In a real app, this would be an API call
const getAnnouncementById = (id: string): Announcement | undefined => {
  const announcements: Announcement[] = [
    {
      id: '1',
      title: 'Alumni Meet 2024',
      date: 'June 15, 2024',
      description: 'Join us for the annual alumni meet and reconnect with your batchmates and faculty members.',
      content: `We are thrilled to announce the Annual Alumni Meet 2024, a grand event where past meets present. This year's event promises to be bigger and better with exciting activities, networking sessions, and an opportunity to revisit your alma mater.

## Event Highlights
- **Campus Tours**: Revisit your favorite spots and see what's new
- **Keynote Speeches**: Hear from distinguished alumni and faculty
- **Networking Sessions**: Reconnect with your batchmates and make new connections
- **Cultural Performances**: Enjoy performances by current students
- **Awards Ceremony**: Recognizing outstanding alumni achievements

### Event Details
- **Date**: June 15, 2024
- **Time**: 10:00 AM - 8:00 PM
- **Venue**: College Auditorium & Campus Grounds
- **Dress Code**: Smart Casual

We look forward to welcoming you back to Kirori Mal College for this memorable event. Please RSVP by June 1, 2024, to confirm your attendance.`,
      category: 'event',
      image: '/alumni-meet.jpg',
      author: 'Dr. Ramesh Kumar',
      authorRole: 'Alumni Relations Director',
      authorImage: '/faculty/dr-ramesh.jpg',
      relatedAnnouncements: [
        {
          id: '6',
          title: 'Annual Cultural Fest',
          date: 'August 20-22, 2024',
          description: 'Three days of cultural extravaganza featuring performances, competitions, and more.',
          category: 'event',
          image: '/cultural-fest.jpg'
        },
        {
          id: '4',
          title: 'New Research Center Inauguration',
          date: 'July 10, 2024',
          description: 'State-of-the-art research facility opening next month with advanced equipment and resources.',
          category: 'update',
          image: '/research-center.jpg'
        }
      ]
    },
    {
      id: '2',
      title: 'Campus Recruitment Drive',
      date: 'June 25, 2024',
      description: 'Leading companies will be visiting the campus for recruitment. Final year students are encouraged to participate.',
      content: `The annual campus recruitment drive is scheduled for June 25, 2024. This is a golden opportunity for final year students to kickstart their careers with some of the most prestigious companies in the industry.

## Participating Companies
- **Tech Giants**: Microsoft, Google, Amazon
- **Finance**: Deloitte, EY, KPMG, PwC
- **Consulting**: McKinsey, BCG, Bain & Company
- **Startups**: Multiple high-growth startups from various sectors

### Recruitment Process
1. **Registration**: Register through the college placement portal by June 15
2. **Pre-Placement Talk**: June 20, 2024
3. **Written Test**: June 22, 2024
4. **Interviews**: June 24-26, 2024

### Preparation Resources
- Resume building workshop on June 10
- Mock interviews from June 12-14
- Technical and HR interview preparation sessions

For more information, please contact the Placement Cell.`,
      category: 'opportunity',
      image: '/recruitment-drive.jpg',
      author: 'Prof. Sunita Sharma',
      authorRole: 'Head of Placement Cell',
      authorImage: '/faculty/prof-sunita.jpg',
      relatedAnnouncements: [
        {
          id: '5',
          title: 'Alumni Scholarship Program',
          date: 'Applications Open',
          description: 'Applications are now open for the annual alumni-sponsored scholarship program.',
          category: 'opportunity',
          image: '/scholarship.jpg'
        }
      ]
    },
    {
      id: '3',
      title: 'Infrastructure Upgrades',
      date: 'Ongoing',
      description: 'The college is undergoing major infrastructure upgrades to provide better facilities for students and faculty.',
      content: `Kirori Mal College is proud to announce a comprehensive infrastructure upgrade project that will enhance the learning and working environment for our entire community.

## Key Upgrades

### Academic Block Renovation
- Modern, tech-enabled smart classrooms
- Upgraded laboratories with latest equipment
- New faculty offices and workspaces
- Enhanced library with digital resources

### Sports Facilities
- New synthetic basketball and tennis courts
- Upgraded gymnasium with modern equipment
- Renovated swimming pool
- Indoor sports complex

### Student Amenities
- New cafeteria with healthy food options
- Student lounge areas
- Green spaces and outdoor seating
- Improved Wi-Fi connectivity across campus

### Sustainability Initiatives
- Solar panel installation
- Rainwater harvesting system
- Energy-efficient lighting
- Waste management and recycling program

We appreciate your patience during this transformation period. The project is scheduled to be completed by December 2024.`,
      category: 'update',
      image: '/infrastructure.jpg',
      author: 'Dr. Amit Patel',
      authorRole: 'Principal',
      authorImage: '/faculty/dr-amit.jpg',
      relatedAnnouncements: [
        {
          id: '4',
          title: 'New Research Center Inauguration',
          date: 'July 10, 2024',
          description: 'State-of-the-art research facility opening next month with advanced equipment and resources.',
          category: 'update',
          image: '/research-center.jpg'
        }
      ]
    },
    {
      id: '4',
      title: 'New Research Center Inauguration',
      date: 'July 10, 2024',
      description: 'State-of-the-art research facility opening next month with advanced equipment and resources.',
      content: `We are proud to announce the inauguration of our new Research and Innovation Center on July 10, 2024. This state-of-the-art facility represents our commitment to fostering innovation and cutting-edge research across disciplines.

## Center Highlights

### Research Areas
- **Artificial Intelligence & Machine Learning**
- **Biotechnology & Life Sciences**
- **Sustainable Technologies**
- **Data Science & Analytics**
- **Renewable Energy Solutions**

### Facilities
- Advanced research laboratories
- High-performance computing cluster
- 3D printing and prototyping lab
- Collaborative workspaces
- Conference and seminar rooms

### Inauguration Ceremony
- **Date**: July 10, 2024
- **Time**: 11:00 AM
- **Chief Guest**: Dr. Rameshwar Singh, Director, CSIR
- **Venue**: New Research Center Building

All faculty, students, and alumni are cordially invited to attend the inauguration ceremony and tour the new facilities.`,
      category: 'update',
      image: '/research-center.jpg',
      author: 'Dr. Neha Gupta',
      authorRole: 'Director of Research',
      authorImage: '/faculty/dr-neha.jpg',
      relatedAnnouncements: [
        {
          id: '3',
          title: 'Infrastructure Upgrades',
          date: 'Ongoing',
          description: 'The college is undergoing major infrastructure upgrades to provide better facilities for students and faculty.',
          category: 'update',
          image: '/infrastructure.jpg'
        }
      ]
    },
    {
      id: '5',
      title: 'Alumni Scholarship Program',
      date: 'Applications Open',
      description: 'Applications are now open for the annual alumni-sponsored scholarship program.',
      content: `The Alumni Association is pleased to announce the launch of the annual Alumni Scholarship Program for deserving students. These scholarships are made possible through the generous contributions of our alumni community.

## Scholarship Details

### Categories
1. **Merit Scholarships**
   - For students with outstanding academic performance
   - Covers up to 100% of tuition fees
   - Renewable annually based on academic performance

2. **Need-Based Scholarships**
   - For students with financial constraints
   - Covers tuition and other academic expenses
   - Requires submission of financial documents

3. **Sports and Cultural Scholarships**
   - For students excelling in sports or cultural activities
   - Includes training and competition support
   - Renewable based on performance

### Eligibility Criteria
- Currently enrolled students in any program
- Minimum CGPA of 7.5 for merit scholarships
- Demonstrated financial need for need-based scholarships
- Outstanding achievements in sports/cultural activities for respective scholarships

### Application Process
1. Fill out the online application form
2. Submit required documents
3. Appear for an interview (if shortlisted)
4. Scholarship award announcement

**Application Deadline**: August 15, 2024`,
      category: 'opportunity',
      image: '/scholarship.jpg',
      author: 'Alumni Association',
      authorRole: 'Scholarship Committee',
      authorImage: '/alumni-association-logo.jpg',
      relatedAnnouncements: [
        {
          id: '2',
          title: 'Campus Recruitment Drive',
          date: 'June 25, 2024',
          description: 'Leading companies will be visiting the campus for recruitment. Final year students are encouraged to participate.',
          category: 'opportunity',
          image: '/recruitment-drive.jpg'
        }
      ]
    },
    {
      id: '6',
      title: 'Annual Cultural Fest',
      date: 'August 20-22, 2024',
      description: 'Three days of cultural extravaganza featuring performances, competitions, and more.',
      content: `Get ready for the most awaited event of the year - the Annual Cultural Fest 2024! This three-day extravaganza will showcase the incredible talent of our students and bring together the entire college community.

## Event Schedule

### Day 1: August 20, 2024
- **Inauguration Ceremony** (10:00 AM)
- **Music Competition** (11:30 AM - 2:00 PM)
- **Dance Competition** (3:00 PM - 6:00 PM)
- **Open Mic Night** (7:00 PM Onwards)

### Day 2: August 21, 2024
- **Drama Competition** (10:00 AM - 1:00 PM)
- **Art & Photography Exhibition** (All Day)
- **Fashion Show** (4:00 PM - 6:00 PM)
- **DJ Night** (7:00 PM Onwards)

### Day 3: August 22, 2024
- **Literary Events** (10:00 AM - 1:00 PM)
- **Prize Distribution** (3:00 PM - 4:00 PM)
- **Closing Ceremony & Star Performance** (5:00 PM - 7:00 PM)

## Highlights
- Over 50+ events across various categories
- Cash prizes worth ₹5,00,000+
- Celebrity performances
- Food stalls and fun activities
- Special alumni meetup

## Registration
- **Early Bird** (Before August 1): ₹500
- **Regular**: ₹750
- **On Spot**: ₹1000

For more details and registration, visit the Cultural Fest website or contact the Cultural Committee.`,
      category: 'event',
      image: '/cultural-fest.jpg',
      author: 'Cultural Committee',
      authorRole: 'Organizing Team',
      authorImage: '/cultural-committee-logo.jpg',
      relatedAnnouncements: [
        {
          id: '1',
          title: 'Alumni Meet 2024',
          date: 'June 15, 2024',
          description: 'Join us for the annual alumni meet and reconnect with your batchmates and faculty members.',
          category: 'event',
          image: '/alumni-meet.jpg'
        }
      ]
    }
  ];

  return announcements.find(announcement => announcement.id === id);
};

export default function AnnouncementDetail() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const announcement = getAnnouncementById(Array.isArray(id) ? id[0] : id || '');

  if (!announcement) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0ECE0]">
        <div className="text-center p-8 max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-[#4C0604] mb-4">Announcement Not Found</h1>
          <p className="text-gray-700 mb-6">The requested announcement could not be found.</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-[#4C0604] text-white rounded-md hover:bg-[#3A0503] transition-colors font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0E6] py-8 px-4 sm:px-6 lg:px-8">
      {/* Top brown strip */}
      <div style={{ background: '#5C0A0A' }} className="w-full h-1.5"></div>
      
      <div className="max-w-5xl mx-auto">
        {/* Back button and category */}
        <div className="mb-8 px-2">
          <button
            onClick={() => router.back()}
            className="flex items-center text-[#5C0A0A] hover:text-[#4A0808] font-medium transition-all duration-200 mb-5 group"
          >
            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Announcements
          </button>
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-sm font-medium bg-[#5C0A0A] text-white shadow-sm border border-[#4A0808]/20">
            {announcement.category.charAt(0).toUpperCase() + announcement.category.slice(1)}
          </span>
        </div>

         <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          {/* Main content */}
          <div className="md:flex">
            <div className="md:w-2/3 p-6 md:p-8">
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-[#4C0604] mb-4 leading-tight">{announcement.title}</h1>
                <div className="flex flex-wrap items-center text-gray-600 text-sm md:text-base mb-6">
                  <div className="flex items-center mr-4 mb-2">
                    <svg className="w-4 h-4 mr-1.5 text-[#4C0604]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-700 font-medium">{announcement.date}</span>
                  </div>
                  {announcement.author && (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1.5 text-[#4C0604]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-gray-700 font-medium">{announcement.author}</span>
                      {announcement.authorRole && (
                        <span className="text-gray-500 ml-1.5 text-sm">({announcement.authorRole})</span>
                      )}
                    </div>
                  )}
                </div>
                
                {announcement.image && (
                  <div className="mb-8 rounded-lg overflow-hidden shadow-md border border-gray-200">
                    <Image
                      src={announcement.image}
                      alt={announcement.title}
                      width={800}
                      height={400}
                      className="w-full h-auto object-cover max-h-96"
                      priority
                    />
                  </div>
                )}
                
                <div className="prose max-w-none text-gray-700">
                  {announcement.content.split('\n\n').map((paragraph, index) => {
                    if (paragraph.startsWith('## ')) {
                      return <h2 key={index} className="text-2xl font-bold text-[#4C0604] mt-8 mb-4 pb-2 border-b border-gray-200">{paragraph.substring(3)}</h2>;
                    } else if (paragraph.startsWith('### ')) {
                      return <h3 key={index} className="text-xl font-semibold text-[#4C0604] mt-6 mb-3">{paragraph.substring(4)}</h3>;
                    } else if (paragraph.startsWith('#### ')) {
                      return <h4 key={index} className="text-lg font-semibold text-[#4C0604] mt-5 mb-2">{paragraph.substring(5)}</h4>;
                    } else if (paragraph.startsWith('- ')) {
                      const items = paragraph.split('\n').filter(Boolean);
                      return (
                        <ul key={index} className="list-disc pl-6 mb-6 space-y-2">
                          {items.map((item, i) => (
                            <li key={i} className="text-gray-700 leading-relaxed">{item.substring(2)}</li>
                          ))}
                        </ul>
                      );
                    } else if (paragraph.startsWith('1. ')) {
                      const items = paragraph.split('\n').filter(Boolean);
                      return (
                        <ol key={index} className="list-decimal pl-6 mb-6 space-y-2">
                          {items.map((item, i) => (
                            <li key={i} className="text-gray-700 leading-relaxed">{item.replace(/^\d+\.\s*/, '')}</li>
                          ))}
                        </ol>
                      );
                    } else if (paragraph.trim() === '') {
                      return <div key={index} className="h-4" />;
                    } else {
                      return <p key={index} className="text-gray-700 mb-6 leading-relaxed text-justify">{paragraph}</p>;
                    }
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="md:w-1/3 bg-[#F8F5ED] p-6 border-l border-gray-200">
              {announcement.author && announcement.authorImage && (
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-100">
                  <h3 className="text-lg font-semibold text-[#4C0604] mb-4 pb-2 border-b border-gray-200">About the Author</h3>
                  <div className="flex items-start">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#4C0604] p-0.5 flex-shrink-0">
                      <Image
                        src={announcement.authorImage}
                        alt={announcement.author}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900">{announcement.author}</h4>
                      {announcement.authorRole && (
                        <p className="text-sm text-gray-600 mt-1">{announcement.authorRole}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {announcement.relatedAnnouncements && announcement.relatedAnnouncements.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
                  <h3 className="text-lg font-semibold text-[#4C0604] mb-4 pb-2 border-b border-gray-200">Related Announcements</h3>
                  <div className="space-y-4">
                    {announcement.relatedAnnouncements.map((related) => (
                      <Link
                        key={related.id}
                        href={`/announcements/${related.id}`}
                        className="block group hover:bg-gray-50 p-3 rounded-lg transition-colors"
                      >
                        <div className="flex items-start">
                          {related.image && (
                            <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 mr-3 shadow-sm">
                              <Image
                                src={related.image}
                                alt={related.title}
                                width={80}
                                height={64}
                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 group-hover:text-[#4C0604] transition-colors line-clamp-2">
                              {related.title}
                            </h4>
                            <div className="flex items-center mt-1">
                              <span className="inline-block w-1.5 h-1.5 bg-[#4C0604] rounded-full mr-2"></span>
                              <p className="text-xs text-gray-500">{related.date}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Quick Links */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-[#4C0604] mb-4 pb-2 border-b border-gray-200">Quick Links</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="/announcements" className="flex items-center text-gray-700 hover:text-[#4C0604] transition-colors">
                      <svg className="w-4 h-4 mr-2 text-[#4C0604]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      View All Announcements
                    </a>
                  </li>
                  <li>
                    <a href="/events" className="flex items-center text-gray-700 hover:text-[#4C0604] transition-colors">
                      <svg className="w-4 h-4 mr-2 text-[#4C0604]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Upcoming Events
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="flex items-center text-gray-700 hover:text-[#4C0604] transition-colors">
                      <svg className="w-4 h-4 mr-2 text-[#4C0604]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Back to All Announcements */}
          <div className="mt-16 mb-8 text-center">
            <Link
              href="/announcements"
              className="inline-flex items-center px-8 py-3 border-2 border-[#5C0A0A] text-base font-medium rounded-md text-[#5C0A0A] bg-white hover:bg-[#F8F5F0] hover:border-[#4A0808] transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              View All Announcements
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
