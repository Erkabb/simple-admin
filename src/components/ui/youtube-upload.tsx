'use client';

import React, { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Card, CardContent, CardHeader } from './card';
import { toast } from 'react-toastify';
import { Loader2, Youtube, Download, Copy, RefreshCw, AlertCircle } from 'lucide-react';
import { useUploadVideoMutation } from "@/gql/youtube/youtube.generated";

interface FormData {
  youtubeUrl: string;
  title: string;
  description: string;
  author: string;
}

interface FormErrors {
  youtubeUrl?: string;
  title?: string;
  description?: string;
  author?: string;
}

export function YouTubeUpload() {
  const [formData, setFormData] = useState<FormData>({
    youtubeUrl: '',
    title: '',
    description: '',
    author: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadVideoMutation] = useUploadVideoMutation();

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

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.youtubeUrl.trim()) {
      newErrors.youtubeUrl = 'YouTube URL is required';
    } else if (!extractYouTubeId(formData.youtubeUrl)) {
      newErrors.youtubeUrl = 'Please enter a valid YouTube URL';
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    }

    // Description and author are optional but provide helpful validation if provided
    if (formData.description.trim() && formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Process YouTube video using GraphQL
  const processYouTubeVideo = async () => {
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsProcessing(true);
    try {
      const { data } = await uploadVideoMutation({
        variables: {
          input: {
            youtubeUrl: formData.youtubeUrl,
            title: formData.description,
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
      console.error('Upload error:', error);
      toast.error('Failed to process YouTube video. Please try again.');
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
    setFormData({
      youtubeUrl: '',
      title: '',
      description: '',
      author: ''
    });
    setErrors({});
    setUploadedVideoUrl('');
  };

  const isFormValid = formData.youtubeUrl.trim() && 
                     formData.title.trim() && 
                     extractYouTubeId(formData.youtubeUrl);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Youtube className="h-6 w-6 text-red-600" />
            YouTube Video Upload
          </h2>
          <p className="text-sm text-muted-foreground">
            Enter a YouTube video URL and provide details to upload
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">YouTube URL *</label>
              <Input
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={formData.youtubeUrl}
                onChange={(e) => handleInputChange('youtubeUrl', e.target.value)}
                className={errors.youtubeUrl ? 'border-red-500' : ''}
              />
              {errors.youtubeUrl && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.youtubeUrl}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Title *</label>
              <Input
                type="text"
                placeholder="Enter video title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className={errors.title ? 'border-red-500' : ''}
              />
              {errors.title && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.title}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Author</label>
              <Input
                type="text"
                placeholder="Enter author name (optional)"
                value={formData.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                className={errors.author ? 'border-red-500' : ''}
              />
              {errors.author && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.author}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                placeholder="Write a description about your video (optional)"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md resize-none ${
                  errors.description ? 'border-red-500' : 'border-input'
                } focus:outline-none focus:ring-2 focus:ring-ring`}
                rows={3}
              />
              {errors.description && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.description}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={processYouTubeVideo}
              disabled={isProcessing || !isFormValid}
              className="flex-1 sm:flex-none min-w-[160px]"
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
                className="flex-1 sm:flex-none min-w-[100px]"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            )}
          </div>

          {/* Uploaded Video Display */}
          {uploadedVideoUrl && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <h3 className="text-xl font-semibold text-green-800">Upload Successful!</h3>
                <p className="text-sm text-green-600">
                  Your video has been successfully uploaded and processed
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="aspect-video bg-black rounded-lg overflow-hidden">
                    <video
                      src={uploadedVideoUrl}
                      controls
                      className="w-full h-full object-contain"
                      preload="metadata"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      value={uploadedVideoUrl}
                      readOnly
                      className="flex-1"
                    />
                    <Button
                      onClick={() => copyToClipboard(uploadedVideoUrl)}
                      variant="outline"
                      className="sm:w-auto"
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