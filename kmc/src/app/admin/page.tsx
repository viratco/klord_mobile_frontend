'use client';

import Image from "next/image";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top brown strip */}
      <div style={{ background: '#4C0604' }} className="w-full h-6"></div>
      
      {/* Navigation - Same as landing page */}
      <nav className="w-full flex items-center px-8 py-0.01 shadow-sm" style={{ backgroundColor: '#F0ECE0' }}>
        <Link href="/">
          <Image src="/kmclogo.png" alt="Logo" width={130} height={100} className="mr-4" />
        </Link>
        <div className="flex flex-col items-center mr-auto">
          <Image src="/kmctext.png" alt="Text Logo" width={330} height={90} className="object-contain mt-3 ml-2" />
          <div className="flex flex-col items-center mt-2 w-full">
            <div className="w-32 h-0.5 bg-[#4C0604] mb-1"></div>
            <span className="mt-1 text-s text-[#4C0604] tracking-widest">ADMIN DASHBOARD</span>
          </div>
        </div>
        <div className="flex gap-4 items-center text-[#4C0604]">
          <Link href="/admin/events" className="hover:underline font-medium hover:text-[#5C0A0A]">MANAGE EVENTS</Link>
          <span>|</span>
          <Link href="/admin/announcements" className="hover:underline">ANNOUNCEMENTS</Link>
          <span>|</span>
          <Link href="/admin/users" className="hover:underline">USERS</Link>
          <span className="ml-4">|</span>
          <button className="hover:underline text-red-600">LOGOUT</button>
        </div>
      </nav>
      
      {/* Brown strip below navbar */}
      <div className="w-full h-9 bg-[#4C0604] shadow-sm"></div>
      
      {/* Admin Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#4C0604] mb-8">Admin Dashboard</h1>
        
        {/* Banner Management Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Current Banner Preview */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-[#4C0604] mb-4">Current Banner</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center h-64 bg-gray-50">
              <p className="text-gray-500">Banner preview will appear here</p>
            </div>
          </div>
          
          {/* Update Banner */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-[#4C0604] mb-4">Update Banner</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload New Banner</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="banner-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-[#4C0604] hover:text-[#5C0A0A] focus-within:outline-none"
                      >
                        <span>Upload a file</span>
                        <input id="banner-upload" name="banner-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
              <div>
                <button className="w-full bg-[#4C0604] text-white py-2 px-4 rounded-md hover:bg-[#5C0A0A] transition-colors">
                  Update Banner
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Alumni Success Stories Management */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-[#4C0604] mb-6">Manage Alumni Success Stories</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alumni Photo</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.01"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="alumni-photo-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-[#4C0604] hover:text-[#5C0A0A] focus-within:outline-none"
                      >
                        <span>Upload photo</span>
                        <input id="alumni-photo-upload" name="alumni-photo-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#4C0604] focus:border-[#4C0604]"
                      placeholder="Enter alumni name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Role/Position</label>
                      <input
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#4C0604] focus:border-[#4C0604]"
                        placeholder="e.g., Senior Developer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Graduation Year</label>
                      <input
                        type="number"
                        min="1900"
                        max="2099"
                        step="1"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#4C0604] focus:border-[#4C0604]"
                        placeholder="e.g., 2015"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company (Optional)</label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#4C0604] focus:border-[#4C0604]"
                      placeholder="e.g., Google, Microsoft"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Success Story</label>
              <textarea
                rows={4}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#4C0604] focus:border-[#4C0604]"
                placeholder="Share the inspiring story of this alumnus"
              ></textarea>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  id="featured"
                  name="featured"
                  type="checkbox"
                  className="h-4 w-4 text-[#4C0604] focus:ring-[#4C0604] border-gray-300 rounded"
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                  Feature this story on the homepage
                </label>
              </div>
              
              <div className="space-x-3">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4C0604]"
                >
                  Preview
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#4C0604] hover:bg-[#5C0A0A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4C0604]"
                >
                  Publish Story
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
            <p className="text-3xl font-bold text-[#4C0604]">1,248</p>
            <p className="text-green-600 text-sm mt-2">+12% from last month</p>
          </div>
          
          {/* Active Events */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-medium">Active Events</h3>
            <p className="text-3xl font-bold text-[#4C0604]">24</p>
            <p className="text-green-600 text-sm mt-2">+3 this week</p>
          </div>
          
          {/* Pending Approvals */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-medium">Pending Approvals</h3>
            <p className="text-3xl font-bold text-[#4C0604]">8</p>
            <p className="text-yellow-600 text-sm mt-2">Needs attention</p>
          </div>
          
          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-medium">Recent Activity</h3>
            <p className="text-3xl font-bold text-[#4C0604]">42</p>
            <p className="text-blue-600 text-sm mt-2">Today's actions</p>
          </div>
        </div>
        
        {/* Recent Activity Table */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-[#4C0604]">Recent Activity</h2>
            <button className="text-sm text-[#4C0604] hover:underline">View All</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-600">JD</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">John Doe</div>
                        <div className="text-sm text-gray-500">Admin</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Created</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">New event "Annual Meetup 2023"</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2 hours ago</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-600">AS</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">Alice Smith</div>
                        <div className="text-sm text-gray-500">User</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Updated</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Profile information</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5 hours ago</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-600">RJ</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">Robert Johnson</div>
                        <div className="text-sm text-gray-500">User</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Deleted</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Event "Networking Workshop"</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1 day ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
