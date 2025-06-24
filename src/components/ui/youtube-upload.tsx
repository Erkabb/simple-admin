'use client';

import React, { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Card, CardContent, CardHeader } from './card';
import { toast } from 'react-toastify';
import { Loader2, Youtube, Download, Copy } from 'lucide-react';
import {useUploadVideoMutation} from "@/gql/youtube/youtube.generated";

export function YouTubeUpload() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const [uploadVideoMutation] = useUploadVideoMutation();

  // Function to extract YouTube video ID from URL (optional, for validation)
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

  // Function to process YouTube video using GraphQL
  const processYouTubeVideo = async () => {
    if (!youtubeUrl.trim()) {
      toast.error('Please enter a YouTube URL');
      return;
    }
    const videoId = extractYouTubeId(youtubeUrl);
    if (!videoId) {
      toast.error('Invalid YouTube URL');
      return;
    }
    setIsProcessing(true);
    try {
      const { data } = await uploadVideoMutation({
        variables: {
          input: {
            youtubeUrl: youtubeUrl,
            title: 'Uploaded via UI', // You can allow user to enter a title if needed
          }
        }
      });
      if (data?.uploadVideo?.success && data.uploadVideo.video) {
        setUploadedVideoUrl(data.uploadVideo.video.youtubeUrl);
        toast.success('Video processed and uploaded successfully!');
      } else {
        toast.error(data?.uploadVideo?.message || 'Failed to process video');
      }
    } catch (error) {
      toast.error('Failed to process YouTube video');
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('URL copied to clipboard!');
    } catch {
      toast.error('Failed to copy URL');
    }
  };

  const resetForm = () => {
    setYoutubeUrl('');
    setUploadedVideoUrl('');
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
            Enter a YouTube video URL to upload via GraphQL
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
              onClick={processYouTubeVideo}
              disabled={isProcessing || !youtubeUrl.trim()}
              className="min-w-[160px]"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Upload Video
                </>
              )}
            </Button>
            {uploadedVideoUrl && (
              <Button
                onClick={resetForm}
                variant="outline"
                className="min-w-[100px]"
              >
                Reset
              </Button>
            )}
          </div>

          {uploadedVideoUrl && (
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <h3 className="text-xl font-semibold text-blue-800">Uploaded Video</h3>
                <p className="text-sm text-blue-600">
                  Your video has been successfully uploaded via GraphQL
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <video
                    src={uploadedVideoUrl}
                    controls
                    className="w-full h-96 rounded-lg"
                    preload="metadata"
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