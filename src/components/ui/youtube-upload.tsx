'use client';

import React, { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Card, CardContent, CardHeader } from './card';
import { toast } from 'react-toastify';
import { CldVideoPlayer } from 'next-cloudinary';
import { Loader2, Youtube, Download, Upload, Play, Copy, Info } from 'lucide-react';

interface YouTubeVideoInfo {
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  duration: string;
  viewCount: string;
  likeCount: string;
  videoId: string;
  youtubeUrl: string;
}

export function YouTubeUpload() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState<YouTubeVideoInfo | null>(null);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFetchingInfo, setIsFetchingInfo] = useState(false);

  // Function to extract YouTube video ID from URL
  const extractYouTubeId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/,
      /youtube\.com\/watch\?.*&v=([^&\n?#]+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  // Function to fetch video information
  const fetchVideoInfo = async () => {
    if (!youtubeUrl.trim()) {
      toast.error('Please enter a YouTube URL');
      return;
    }

    const videoId = extractYouTubeId(youtubeUrl);
    if (!videoId) {
      toast.error('Invalid YouTube URL');
      return;
    }

    setIsFetchingInfo(true);
    try {
      const response = await fetch('/api/youtube-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ youtubeUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch video information');
      }

      const data = await response.json();
      
      if (data.success) {
        setVideoInfo(data.videoInfo);
        if (data.note) {
          toast.info(data.note);
        } else {
          toast.success('Video information fetched successfully!');
        }
      } else {
        throw new Error(data.error || 'Failed to fetch video information');
      }
    } catch (error) {
      console.error('Error fetching video info:', error);
      toast.error('Failed to fetch video information');
    } finally {
      setIsFetchingInfo(false);
    }
  };

  // Function to process YouTube video
  const processYouTubeVideo = async () => {
    if (!videoInfo) {
      toast.error('Please fetch video information first');
      return;
    }

    setIsProcessing(true);
    try {
      const response = await fetch('/api/youtube-download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ youtubeUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to process video');
      }

      const data = await response.json();
      
      if (data.success) {
        setUploadedVideoUrl(data.cloudinaryUrl);
        toast.success('Video processed and uploaded successfully!');
      } else {
        throw new Error(data.error || 'Failed to process video');
      }
    } catch (error) {
      console.error('Error processing video:', error);
      toast.error('Failed to process YouTube video');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('URL copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy URL');
    }
  };

  const resetForm = () => {
    setYoutubeUrl('');
    setVideoInfo(null);
    setUploadedVideoUrl('');
  };

  const formatDuration = (duration: string) => {
    if (duration === 'Unknown') return duration;
    
    // Parse ISO 8601 duration format (PT4M13S)
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (match) {
      const hours = match[1] || '0';
      const minutes = match[2] || '0';
      const seconds = match[3] || '0';
      return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    }
    return duration;
  };

  const formatNumber = (num: string) => {
    if (num === 'Unknown') return num;
    return parseInt(num).toLocaleString();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Youtube className="h-6 w-6 text-red-600" />
            YouTube Video Upload
          </h2>
          <p className="text-sm text-muted-foreground">
            Enter a YouTube video URL to fetch information and upload to Cloudinary
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="url"
              placeholder="Enter YouTube URL (e.g., https://www.youtube.com/watch?v=...)"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={fetchVideoInfo} 
              disabled={isFetchingInfo || !youtubeUrl.trim()}
              className="min-w-[120px]"
            >
              {isFetchingInfo ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Fetching...
                </>
              ) : (
                <>
                  <Info className="h-4 w-4 mr-2" />
                  Get Info
                </>
              )}
            </Button>
            {videoInfo && (
              <Button 
                onClick={resetForm} 
                variant="outline"
                className="min-w-[100px]"
              >
                Reset
              </Button>
            )}
          </div>

          {videoInfo && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <img 
                      src={videoInfo.thumbnail} 
                      alt={videoInfo.title}
                      className="w-full h-48 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/480x360?text=Video+Thumbnail';
                      }}
                    />
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg">{videoInfo.title}</h3>
                    <p className="text-sm text-gray-600">Channel: {videoInfo.channelTitle}</p>
                    <p className="text-sm text-gray-600">Duration: {formatDuration(videoInfo.duration)}</p>
                    <p className="text-sm text-gray-600">Views: {formatNumber(videoInfo.viewCount)}</p>
                    <p className="text-sm text-gray-600">Likes: {formatNumber(videoInfo.likeCount)}</p>
                    <p className="text-sm text-gray-600">Published: {new Date(videoInfo.publishedAt).toLocaleDateString()}</p>
                    
                    <div className="flex gap-2 mt-4">
                      <Button
                        onClick={() => window.open(videoInfo.youtubeUrl, '_blank')}
                        variant="outline"
                        size="sm"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Watch on YouTube
                      </Button>
                      <Button
                        onClick={() => copyToClipboard(videoInfo.youtubeUrl)}
                        variant="outline"
                        size="sm"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy URL
                      </Button>
                    </div>

                    <Button 
                      onClick={processYouTubeVideo} 
                      disabled={isProcessing}
                      className="w-full mt-4"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4 mr-2" />
                          Download & Upload
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {uploadedVideoUrl && (
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <h3 className="text-xl font-semibold text-blue-800">Uploaded Video</h3>
                <p className="text-sm text-blue-600">
                  Your video has been successfully uploaded to Cloudinary
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <CldVideoPlayer
                    src={uploadedVideoUrl.split('/').pop()?.split('.')[0] ?? ''}
                    width="100%"
                    height="400"
                    controls
                    className="rounded-lg"
                  />
                  <div className="flex gap-2">
                    <Input
                      value={uploadedVideoUrl}
                      readOnly
                      className="flex-1"
                    />
                    <Button
                      onClick={() => copyToClipboard(uploadedVideoUrl)}
                      variant="outline"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy URL
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 