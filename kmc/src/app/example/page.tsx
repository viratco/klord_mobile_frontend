// src/app/example/page.tsx
'use client';

import { useState, useEffect } from 'react';

export default function ExamplePage() {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('World');

  useEffect(() => {
    // Ensure the name is not empty before fetching
    if (name.trim() === '') {
      setMessage('Please enter a name.');
      return;
    }
    fetch(`/api/greet?name=${encodeURIComponent(name)}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.message) {
          setMessage(data.message);
        } else if (data.error) {
          setMessage(`Error: ${data.error}`);
        } else {
          setMessage('Unexpected response format from API.');
        }
      })
      .catch(error => {
        console.error("Fetch error:", error);
        setMessage(`Failed to fetch greeting: ${error.message}`)
      });
  }, [name]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold mb-8 text-cyan-400">Next.js Frontend Example</h1>
      
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md mb-6">
        <label htmlFor="nameInput" className="block text-sm font-medium text-gray-300 mb-2">Enter your name:</label>
        <input 
          id="nameInput"
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition duration-150 ease-in-out mb-4"
          placeholder="Enter a name"
        />
      </div>

      {message ? (
        <div className={`${message.startsWith('Error:') || message.startsWith('Failed to fetch') || message === 'Please enter a name.' ? 'bg-red-700' : 'bg-green-700'} p-6 rounded-lg shadow-xl w-full max-w-md`}>
          <p className="text-xl font-semibold text-center">API Response: <span className="text-yellow-300">{message}</span></p>
        </div>
      ) : (
        <div className="bg-gray-700 p-6 rounded-lg shadow-xl w-full max-w-md">
          <p className="text-xl text-center">Loading message from <code className='text-sm bg-gray-600 px-1 rounded'>/api/greet</code>...</p>
        </div>
      )}

      <p className="mt-10 text-sm text-gray-500">
        This page fetches data from a backend API route. You can find this page at <code className="bg-gray-700 px-1 rounded">src/app/example/page.tsx</code> and the API route at <code className="bg-gray-700 px-1 rounded">src/app/api/greet/route.ts</code>.
      </p>
    </div>
  );
}
