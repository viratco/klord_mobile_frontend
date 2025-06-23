'use client';

import Image from "next/image";
import Link from "next/link";

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top brown strip */}
      <div style={{ background: '#4C0604' }} className="w-full h-6"></div>
      
      {/* Navigation */}
      <nav className="w-full flex items-center px-8 py-0.01 shadow-sm" style={{ backgroundColor: '#F0ECE0' }}>
        <Link href="/">
          <Image src="/kmclogo.png" alt="Logo" width={130} height={100} className="mr-4" />
        </Link>
        <div className="flex flex-col items-center mr-auto">
          <Image src="/kmctext.png" alt="Text Logo" width={330} height={90} className="object-contain mt-3 ml-2" />
          <div className="flex flex-col items-center mt-2 w-full">
            <div className="w-32 h-0.5 bg-[#4C0604] mb-1"></div>
            <span className="mt-1 text-s text-[#4C0604] tracking-widest">USER DASHBOARD</span>
          </div>
        </div>
        <div className="flex gap-4 items-center text-[#4C0604]">
          <Link href="/user/events" className="hover:underline">MY EVENTS</Link>
          <span>|</span>
          <Link href="/user/profile" className="hover:underline font-medium hover:text-[#5C0A0A]">PROFILE</Link>
          <span>|</span>
          <Link href="/user/settings" className="hover:underline">SETTINGS</Link>
          <span className="ml-4">|</span>
          <button className="hover:underline text-red-600">LOGOUT</button>
        </div>
      </nav>
      
      {/* Brown strip below navbar */}
      <div className="w-full h-9 bg-[#4C0604] shadow-sm"></div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#4C0604] mb-8">Welcome Back, User</h1>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Upcoming Events */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-[#4C0604] mb-2">Upcoming Events</h3>
            <p className="text-3xl font-bold">3</p>
            <p className="text-sm text-gray-500 mt-2">Next event in 2 days</p>
          </div>
          
          {/* Network */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-[#4C0604] mb-2">Your Network</h3>
            <p className="text-3xl font-bold">42</p>
            <p className="text-sm text-gray-500 mt-2">Alumni connected</p>
          </div>
          
          {/* Messages */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-[#4C0604] mb-2">Messages</h3>
            <p className="text-3xl font-bold">5</p>
            <p className="text-sm text-gray-500 mt-2">Unread messages</p>
          </div>
        </div>
        
        {/* Upcoming Events */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-[#4C0604]">Your Upcoming Events</h2>
            <Link href="/user/events" className="text-sm text-[#4C0604] hover:underline">View All</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((event) => (
              <div key={event} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-40 bg-gray-200 relative">
                  <Image 
                    src={`/event-${event}.jpg`} 
                    alt={`Event ${event}`} 
                    fill 
                    className="object-cover"
                    onError={(e) => {
                      // Fallback to a placeholder if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/placeholder-event.jpg';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg text-gray-900 mb-1">Alumni Meetup {event}</h3>
                  <p className="text-sm text-gray-500 mb-3">June {15 + event}, 2024 • 6:00 PM</p>
                  <p className="text-sm text-gray-600 mb-4">Join us for our monthly alumni gathering and networking event.</p>
                  <div className="flex justify-between items-center">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-[#F0ECE0] text-[#4C0604] rounded">Networking</span>
                    <button className="text-sm text-[#4C0604] hover:underline">View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-[#4C0604] mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link 
              href="/events" 
              className="p-4 border border-gray-200 rounded-lg text-center hover:bg-gray-50 transition-colors"
            >
              <div className="w-12 h-12 bg-[#4C0604] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#4C0604]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="font-medium">Browse Events</span>
            </Link>
            
            <Link 
              href="/alumni" 
              className="p-4 border border-gray-200 rounded-lg text-center hover:bg-gray-50 transition-colors"
            >
              <div className="w-12 h-12 bg-[#4C0604] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#4C0604]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="font-medium">Find Alumni</span>
            </Link>
            
            <Link 
              href="/jobs" 
              className="p-4 border border-gray-200 rounded-lg text-center hover:bg-gray-50 transition-colors"
            >
              <div className="w-12 h-12 bg-[#4C0604] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#4C0604]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="font-medium">Job Board</span>
            </Link>
            
            <Link 
              href="/mentorship" 
              className="p-4 border border-gray-200 rounded-lg text-center hover:bg-gray-50 transition-colors"
            >
              <div className="w-12 h-12 bg-[#4C0604] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#4C0604]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <span className="font-medium">Mentorship</span>
            </Link>
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-[#4C0604]">Recent Activity</h2>
            <Link href="/user/activity" className="text-sm text-[#4C0604] hover:underline">View All</Link>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3].map((activity) => (
              <div key={activity} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="w-10 h-10 rounded-full bg-[#4C0604] bg-opacity-10 flex items-center justify-center mr-4 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#4C0604]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium text-gray-900">You</span> registered for <span className="font-medium text-[#4C0604]">Alumni Meetup {activity}</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{activity} day{activity > 1 ? 's' : ''} ago</p>
                </div>
                <button className="text-sm text-[#4C0604] hover:underline">View</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
