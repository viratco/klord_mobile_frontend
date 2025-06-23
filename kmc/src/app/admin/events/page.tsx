
'use client';

import { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Speaker {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
}

interface Event {
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

export default function ManageEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState<Omit<Event, 'id'>>({ 
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    location: '',
    description: '',
    content: '',
    category: 'Workshop',
    image: '',
    registrationLink: '',
    organizer: '',
    contactEmail: '',
    requirements: [],
    speakers: [],
    gallery: []
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newRequirement, setNewRequirement] = useState('');
  const [newSpeaker, setNewSpeaker] = useState<Omit<Speaker, 'id'>>({ 
    name: '', 
    role: '', 
    bio: '', 
    image: '' 
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [speakerImageFile, setSpeakerImageFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setNewEvent(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewEvent(prev => ({
          ...prev,
          image: event.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSpeakerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setSpeakerImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewSpeaker(prev => ({
          ...prev,
          image: event.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const files = Array.from(e.target.files);
      setGalleryFiles(prev => [...prev, ...files]);
      
      const readers = files.map(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          setNewEvent(prev => ({
            ...prev,
            gallery: [...prev.gallery, event.target?.result as string]
          }));
        };
        reader.readAsDataURL(file);
        return reader;
      });
    }
  };
  
  const handleAddRequirement = () => {
    if (newRequirement.trim()) {
      setNewEvent(prev => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()]
      }));
      setNewRequirement('');
    }
  };
  
  const handleRemoveRequirement = (index: number) => {
    setNewEvent(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };
  
  const handleAddSpeaker = () => {
    if (newSpeaker.name.trim() && newSpeaker.role.trim()) {
      setNewEvent(prev => ({
        ...prev,
        speakers: [...prev.speakers, { ...newSpeaker, id: Date.now().toString() }]
      }));
      setNewSpeaker({ name: '', role: '', bio: '', image: '' });
      setSpeakerImageFile(null);
    }
  };
  
  const handleRemoveSpeaker = (id: string) => {
    setNewEvent(prev => ({
      ...prev,
      speakers: prev.speakers.filter(speaker => speaker.id !== id)
    }));
  };
  
  const handleRemoveGalleryImage = (index: number) => {
    setNewEvent(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index)
    }));
    setGalleryFiles(prev => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setNewEvent({
      title: '',
      date: new Date().toISOString().split('T')[0],
      time: '10:00',
      location: '',
      description: '',
      content: '',
      category: 'Workshop',
      image: '',
      registrationLink: '',
      organizer: '',
      contactEmail: '',
      requirements: [],
      speakers: [],
      gallery: []
    });
    setNewRequirement('');
    setNewSpeaker({ name: '', role: '', bio: '', image: '' });
    setImageFile(null);
    setSpeakerImageFile(null);
    setGalleryFiles([]);
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing event
      setEvents(events.map(event => 
        event.id === editingId 
          ? { ...newEvent, id: editingId } 
          : event
      ));
    } else {
      // Add new event
      setEvents([...events, { ...newEvent, id: Date.now().toString() }]);
    }
    
    resetForm();
  };

  const handleEdit = (event: Event) => {
    setNewEvent({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description,
      content: event.content,
      category: event.category,
      image: event.image,
      registrationLink: event.registrationLink,
      organizer: event.organizer,
      contactEmail: event.contactEmail,
      requirements: [...event.requirements],
      speakers: [...event.speakers],
      gallery: [...event.gallery]
    });
    setEditingId(event.id);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== id));
      if (editingId === id) {
        resetForm();
        setEditingId(null);
      }
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
            <span className="mt-1 text-s text-[#4C0604] tracking-widest">MANAGE EVENTS</span>
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#4C0604]">Manage Events</h1>
          <Link href="/admin" className="text-[#4C0604] hover:underline">
            &larr; Back to Dashboard
          </Link>
        </div>

        {/* Add/Edit Event Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-[#4C0604] mb-6">
            {editingId ? 'Edit Event' : 'Add New Event'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Event Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Event Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newEvent.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#4C0604] focus:border-[#4C0604]"
                  placeholder="Enter event title"
                  required
                />
              </div>

              {/* Event Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  id="category"
                  name="category"
                  value={newEvent.category}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#4C0604] focus:border-[#4C0604]"
                  required
                >
                  <option value="Workshop">Workshop</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Conference">Conference</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Sports">Sports</option>
                  <option value="Other">Other</option>
                </select>
            </div>
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
              <input
                type="time"
                id="time"
                name="time"
                value={newEvent.time}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#4C0604] focus:border-[#4C0604]"
                required
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={newEvent.location}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#4C0604] focus:border-[#4C0604]"
                placeholder="Enter event location"
                required
              />
            </div>
            <div>
              <label htmlFor="registrationLink" className="block text-sm font-medium text-gray-700">Registration Link</label>
              <input
                type="url"
                id="registrationLink"
                name="registrationLink"
                value={newEvent.registrationLink}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#4C0604] focus:border-[#4C0604]"
                placeholder="https://example.com/register"
              />
            </div>
            <div>
              <label htmlFor="organizer" className="block text-sm font-medium text-gray-700">Organizer</label>
              <input
                type="text"
                id="organizer"
                name="organizer"
                value={newEvent.organizer}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#4C0604] focus:border-[#4C0604]"
                placeholder="Event organizer name or department"
                required
              />
            </div>
            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">Contact Email</label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                value={newEvent.contactEmail}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#4C0604] focus:border-[#4C0604]"
                placeholder="contact@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <select
                id="category"
                name="category"
                value={newEvent.category}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#4C0604] focus:border-[#4C0604] bg-white"
                required
              >
                <option value="Workshop">Workshop</option>
                <option value="Seminar">Seminar</option>
                <option value="Conference">Conference</option>
                <option value="Cultural">Cultural</option>
                <option value="Sports">Sports</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Form Buttons */}
            <div className="flex justify-end space-x-4 pt-6">
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    resetForm();
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
                {editingId ? 'Update Event' : 'Add Event'}
              </button>
            </div>
          </form>
        </div>

        {/* Events List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-[#4C0604]">All Events</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {events.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No events found. Add your first event above.</p>
              </div>
            ) : (
              events.map(event => (
                <div key={event.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                      <div className="mt-1 text-sm text-gray-500">
                        <span>{new Date(event.date).toLocaleString()}</span>
                        <span className="mx-2">•</span>
                        <span>{event.location}</span>
                        <span className="mx-2">•</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F0ECE0] text-[#4C0604]">
                          {event.category}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {event.description}
                      </p>
                    </div>
                    <div className="mt-4 flex space-x-3 md:mt-0">
                      <button
                        onClick={() => handleEdit(event)}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4C0604]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
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
