'use client';

import { YouTubeUpload } from '@/components/ui/youtube-upload';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function YouTubeUploadPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            YouTube Video Upload
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload videos from YouTube using GraphQL. Simply paste a YouTube URL 
            and the video will be processed and uploaded through your GraphQL backend.
          </p>
        </div>
        
        <YouTubeUpload />
      </div>
      
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
} 