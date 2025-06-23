'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Announcement = {
  id: string;
  title: string;
  date: string;
  description: string;
  content: string;
  category: 'event' | 'opportunity' | 'update' | 'other';
  isImportant: boolean;
  image?: string;
  author?: string;
  authorRole?: string;
  authorImage?: string;
  relatedAnnouncements?: Array<{
    id: string;
    title: string;
    date: string;
    description: string;
    category: string;
    image?: string;
  }>;
};

export default function ManageAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [newAnnouncement, setNewAnnouncement] = useState<Omit<Announcement, 'id' | 'relatedAnnouncements'>>({ 
    title: '', 
    date: new Date().toISOString().slice(0, 16),
    description: '',
    content: '',
    category: 'event',
    isImportant: false,
    author: '',
    authorRole: '',
    authorImage: '',
    image: ''
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [authorImageFile, setAuthorImageFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setNewAnnouncement(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onload = (event) => {
        // Set a temporary preview URL
        // In a real app, you would upload this to a server
        setNewAnnouncement(prev => ({
          ...prev,
          image: event.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleAuthorImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAuthorImageFile(file);
      // Create a preview URL for the author image
      const reader = new FileReader();
      reader.onload = (event) => {
        // Set a temporary preview URL
        // In a real app, you would upload this to a server
        setNewAnnouncement(prev => ({
          ...prev,
          authorImage: event.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing announcement
      setAnnouncements(announcements.map(announcement => 
        announcement.id === editingId 
          ? { ...newAnnouncement, id: editingId, relatedAnnouncements: [] } 
          : announcement
      ));
    } else {
      // Add new announcement
      setAnnouncements([...announcements, { 
        ...newAnnouncement, 
        id: Date.now().toString(),
        relatedAnnouncements: [] 
      }]);
    }
    
    const resetForm = () => {
      setNewAnnouncement({
        title: '',
        description: '',
        category: 'event',
        date: new Date().toISOString().slice(0, 16),
        content: '',
        isImportant: false,
        author: '',
        authorRole: '',
        authorImage: '',
        image: ''
      });
      setEditingId(null);
      setImageFile(null);
      setAuthorImageFile(null);
    };

    resetForm();
  };

  const handleEdit = (announcement: Announcement) => {
    setNewAnnouncement({
      title: announcement.title,
      description: announcement.description || '',
      category: announcement.category || 'event',
      date: announcement.date,
      content: announcement.content,
      isImportant: announcement.isImportant || false,
      author: announcement.author || '',
      authorRole: announcement.authorRole || '',
      authorImage: announcement.authorImage || '',
      image: announcement.image || ''
    });
    setEditingId(announcement.id);
  };

  const handleDelete = (id: string) => {
    setAnnouncements(announcements.filter(announcement => announcement.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setNewAnnouncement({
        title: '',
        date: new Date().toISOString().slice(0, 16),
        description: '',
        content: '',
        category: 'event',
        isImportant: false,
        author: '',
        authorRole: '',
        authorImage: ''
      });
      setImageFile(null);
      setAuthorImageFile(null);
    }
  };

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
            <span className="mt-1 text-s text-[#4C0604] tracking-widest">MANAGE ANNOUNCEMENTS</span>
          </div>
        </div>
        <div className="flex gap-4 items-center text-[#4C0604]">
          <Link href="/admin/events" className="hover:underline">MANAGE EVENTS</Link>
          <span>|</span>
          <Link href="/admin/announcements" className="hover:underline font-medium hover:text-[#5C0A0A]">ANNOUNCEMENTS</Link>
          <span>|</span>
          <Link href="/admin/users" className="hover:underline">USERS</Link>
          <span className="ml-4">|</span>
          <button className="hover:underline text-red-600">LOGOUT</button>
        </div>
      </nav>
      
      {/* Brown strip below navbar */}
      <div className="w-full h-9 bg-[#4C0604] shadow-sm"></div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#4C0604]">Manage Announcements</h1>
          <Link href="/admin" className="text-[#4C0604] hover:underline">
            &larr; Back to Dashboard
          </Link>
        </div>
        
        {/* Add/Edit Announcement Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-[#4C0604] mb-6">
            {editingId ? 'Edit Announcement' : 'Create New Announcement'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newAnnouncement.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#4C0604] focus:border-[#4C0604]"
                  placeholder="Enter announcement title"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Short Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={newAnnouncement.description}
                  onChange={handleInputChange}
                  rows={2}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#4C0604] focus:border-[#4C0604]"
                  placeholder="Enter a brief description (shown in the announcements list)"
                  required
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  id="category"
                  name="category"
                  value={newAnnouncement.category}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#4C0604] focus:border-[#4C0604]"
                  required
                >
                  <option value="event">Event</option>
                  <option value="opportunity">Opportunity</option>
                  <option value="update">Update</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date & Time</label>
                  <input
                    type="datetime-local"
                    id="date"
                    name="date"
                    value={newAnnouncement.date}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#4C0604] focus:border-[#4C0604]"
                    required
                  />
                </div>
                <div className="flex items-end">
                  <div className="flex items-center h-5">
                    <input
                      id="isImportant"
                      name="isImportant"
                      type="checkbox"
                      checked={newAnnouncement.isImportant || false}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-[#4C0604] focus:ring-[#4C0604] border-gray-300 rounded"
                    />
                  </div>
                  <label htmlFor="isImportant" className="ml-2 block text-sm font-medium text-gray-700">
                    Mark as Important
                  </label>
                </div>
              </div>
              
              {/* Featured Image Upload */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {newAnnouncement.image ? (
                      <div className="relative">
                        <img src={newAnnouncement.image} alt="Preview" className="mx-auto h-32 object-cover rounded" />
                        <button
                          type="button"
                          onClick={() => {
                            setNewAnnouncement(prev => ({ ...prev, image: undefined }));
                            setImageFile(null);
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <>
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
                            htmlFor="image-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-[#4C0604] hover:text-[#5C0A0A] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#4C0604]"
                          >
                            <span>Upload an image</span>
                            <input
                              id="image-upload"
                              name="image-upload"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Author Information */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Author Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author Name</label>
                    <input
                      type="text"
                      id="author"
                      name="author"
                      value={newAnnouncement.author}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#4C0604] focus:border-[#4C0604]"
                      placeholder="Author's name"
                    />
                  </div>
                  <div>
                    <label htmlFor="authorRole" className="block text-sm font-medium text-gray-700">Author Role</label>
                    <input
                      type="text"
                      id="authorRole"
                      name="authorRole"
                      value={newAnnouncement.authorRole}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#4C0604] focus:border-[#4C0604]"
                      placeholder="Author's role/position"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Author Photo</label>
                    <div className="mt-1 flex items-center">
                      {newAnnouncement.authorImage ? (
                        <div className="relative">
                          <img 
                            src={newAnnouncement.authorImage} 
                            alt="Author" 
                            className="h-16 w-16 rounded-full object-cover" 
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setNewAnnouncement(prev => ({ ...prev, authorImage: undefined }));
                              setAuthorImageFile(null);
                            }}
                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                          >
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <div className="relative">
                          <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                            <svg className="h-8 w-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <label
                            htmlFor="author-image-upload"
                            className="absolute bottom-0 right-0 bg-white rounded-full p-1 border border-gray-300 cursor-pointer hover:bg-gray-50"
                          >
                            <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <input
                              id="author-image-upload"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleAuthorImageChange}
                            />
                          </label>
                        </div>
                      )}
                      <div className="ml-4 flex-1">
                        <label
                          htmlFor="author-image-upload"
                          className="text-sm font-medium text-[#4C0604] hover:text-[#5C0A0A] cursor-pointer"
                        >
                          {newAnnouncement.authorImage ? 'Change' : 'Upload'} photo
                        </label>
                        <p className="text-xs text-gray-500">Recommended: 200x200px</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Content Editor */}
              <div className="md:col-span-2">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <div className="rounded-md border border-gray-300 bg-white">
                  {/* Toolbar */}
                  <div className="border-b border-gray-200 bg-gray-50 px-3 py-2 flex flex-wrap gap-1">
                    <button type="button" className="p-1 rounded hover:bg-gray-200" title="Bold">
                      <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </button>
                    <button type="button" className="p-1 rounded hover:bg-gray-200" title="Italic">
                      <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <div className="border-l border-gray-300 h-6 mx-1"></div>
                    <button type="button" className="p-1 rounded hover:bg-gray-200" title="Heading 1">
                      <span className="font-bold">H1</span>
                    </button>
                    <button type="button" className="p-1 rounded hover:bg-gray-200" title="Heading 2">
                      <span className="font-bold">H2</span>
                    </button>
                    <div className="border-l border-gray-300 h-6 mx-1"></div>
                    <button type="button" className="p-1 rounded hover:bg-gray-200" title="Bulleted List">
                      <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                      </svg>
                    </button>
                    <button type="button" className="p-1 rounded hover:bg-gray-200" title="Numbered List">
                      <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                    <div className="border-l border-gray-300 h-6 mx-1"></div>
                    <button type="button" className="p-1 rounded hover:bg-gray-200" title="Link">
                      <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </button>
                    <button type="button" className="p-1 rounded hover:bg-gray-200" title="Image">
                      <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Content Textarea */}
                  <div className="p-4">
                    <textarea
                      id="content"
                      name="content"
                      value={newAnnouncement.content}
                      onChange={handleInputChange}
                      rows={12}
                      className="block w-full border-0 focus:ring-0 focus:outline-none resize-none"
                      placeholder="Write your announcement content here..."
                      required
                    ></textarea>
                  </div>
                  
                  {/* Preview Button */}
                  <div className="border-t border-gray-200 px-4 py-2 text-right">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4C0604]"
                    >
                      <svg className="-ml-0.5 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Preview
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Use markdown or the toolbar above to format your content. You can add headings, lists, links, and more.
                </p>
              </div>
              
              {/* Related Announcements (would be a more complex component in a real app) */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Related Announcements</h3>
                <div className="bg-gray-50 p-4 rounded-md border border-dashed border-gray-300">
                  <p className="text-sm text-gray-500 mb-2">
                    In a full implementation, you would be able to select related announcements here.
                  </p>
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-[#4C0604] hover:bg-[#5C0A0A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4C0604]"
                  >
                    <svg className="-ml-0.5 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Related Announcement
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setNewAnnouncement({
                      title: '',
                      date: new Date().toISOString().slice(0, 16),
                      content: '',
                      isImportant: false
                    });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-[#4C0604] hover:bg-[#5C0A0A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4C0604]"
              >
                {editingId ? 'Update Announcement' : 'Create Announcement'}
              </button>
            </div>
          </form>
        </div>
        
        {/* Announcements List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-[#4C0604]">All Announcements</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {announcements.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No announcements found. Create your first announcement above.</p>
              </div>
            ) : (
              announcements.map(announcement => (
                <div 
                  key={announcement.id} 
                  className={`p-6 hover:bg-gray-50 transition-colors ${announcement.isImportant ? 'border-l-4 border-[#4C0604]' : ''}`}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-lg font-medium text-gray-900">{announcement.title}</h3>
                        {announcement.isImportant && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Important
                          </span>
                        )}
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        {new Date(announcement.date).toLocaleString()}
                      </div>
                      <p className="mt-2 text-sm text-gray-600 whitespace-pre-line">
                        {announcement.content}
                      </p>
                    </div>
                    <div className="mt-4 flex space-x-3 md:mt-0">
                      <button
                        onClick={() => handleEdit(announcement)}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4C0604]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(announcement.id)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
