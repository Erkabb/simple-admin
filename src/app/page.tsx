'use client';
import React, { useState } from 'react';
import { CldVideoPlayer } from 'next-cloudinary';

export default function Home() {
  const [videoUrl, setVideoUrl] = useState('');

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fileInput = e.currentTarget.video as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (!file) return;

    // 1. Get signature from your API
    const sigRes = await fetch('/api/cloudinary-signature', { method: 'POST' });
    const { timestamp, signature, apiKey, cloudName } = await sigRes.json();

    // 2. Create FormData
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', apiKey);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);
    formData.append('folder', 'videos');
    formData.append('resource_type', 'video');

    // 3. Upload to Cloudinary
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/video/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    console.log('✅ Video uploaded:', data);
    setVideoUrl(data.secure_url);
  }

  return (
      <div className="p-4 h-screen">
        <form onSubmit={handleUpload}>
          <input type="file" name="video" accept="video/*" required />
          <button type="submit">Upload Large Video</button>
        </form>

        {videoUrl && (
            <div className="mt-6">
              <CldVideoPlayer
                  src={videoUrl.split('/').pop()?.split('.')[0] ?? ''}
                  width="800"
                  height="450"
              />
            </div>
        )}
      </div>
  );
}
