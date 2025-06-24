# YouTube Video Upload Component

A React component that allows users to upload videos from YouTube to Cloudinary by simply providing a YouTube URL.

## Features

- 📹 Extract video information from YouTube URLs
- 🖼️ Display video thumbnails and metadata
- ☁️ Upload videos directly to Cloudinary
- 📋 Copy URLs to clipboard
- 🎥 Play uploaded videos with Cloudinary video player
- 📱 Responsive design with modern UI

## Components

### YouTubeUpload Component
Located at: `src/components/ui/youtube-upload.tsx`

A comprehensive component that handles:
- YouTube URL validation
- Video information fetching
- Cloudinary upload
- Video playback

### API Routes

#### `/api/youtube-info`
Fetches detailed video information from YouTube Data API.

**Request:**
```json
{
  "youtubeUrl": "https://www.youtube.com/watch?v=VIDEO_ID"
}
```

**Response:**
```json
{
  "success": true,
  "videoInfo": {
    "title": "Video Title",
    "description": "Video description",
    "thumbnail": "https://...",
    "channelTitle": "Channel Name",
    "publishedAt": "2023-01-01T00:00:00Z",
    "duration": "PT4M13S",
    "viewCount": "1000",
    "likeCount": "100",
    "videoId": "VIDEO_ID",
    "youtubeUrl": "https://www.youtube.com/watch?v=VIDEO_ID"
  }
}
```

#### `/api/youtube-download`
Downloads and uploads YouTube videos to Cloudinary.

**Request:**
```json
{
  "youtubeUrl": "https://www.youtube.com/watch?v=VIDEO_ID"
}
```

**Response:**
```json
{
  "success": true,
  "videoInfo": { ... },
  "cloudinaryUrl": "https://res.cloudinary.com/...",
  "publicId": "youtube_VIDEO_ID"
}
```

## Setup

### 1. Environment Variables

Add the following environment variables to your `.env.local` file:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# YouTube Data API (Optional - for detailed video info)
YOUTUBE_API_KEY=your_youtube_api_key
```

### 2. Dependencies

The component uses these dependencies (already included in the project):
- `next-cloudinary` - Cloudinary integration
- `react-toastify` - Toast notifications
- `lucide-react` - Icons
- `@radix-ui/react-*` - UI components

### 3. Usage

#### Basic Usage
```tsx
import { YouTubeUpload } from '@/components/ui/youtube-upload';

export default function MyPage() {
  return (
    <div>
      <h1>Upload YouTube Videos</h1>
      <YouTubeUpload />
    </div>
  );
}
```

#### With Custom Styling
```tsx
import { YouTubeUpload } from '@/components/ui/youtube-upload';

export default function MyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <YouTubeUpload />
      </div>
    </div>
  );
}
```

## Demo Page

A demo page is available at `/youtube-upload` that showcases the component with:
- Full-screen layout
- Toast notifications
- Responsive design

## How It Works

1. **URL Input**: User enters a YouTube URL
2. **Validation**: Component validates the URL format and extracts video ID
3. **Info Fetching**: Fetches video metadata from YouTube Data API (if available)
4. **Display**: Shows video thumbnail and information
5. **Upload**: Downloads video and uploads to Cloudinary
6. **Playback**: Displays uploaded video with Cloudinary video player

## Supported YouTube URL Formats

- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`
- `https://www.youtube.com/v/VIDEO_ID`

## Error Handling

The component includes comprehensive error handling for:
- Invalid YouTube URLs
- Network errors
- Upload failures
- API rate limits

## Customization

### Styling
The component uses Tailwind CSS classes and can be customized by:
- Modifying the component's className props
- Overriding Tailwind classes
- Using CSS modules or styled-components

### Functionality
You can extend the component by:
- Adding more video platforms
- Implementing video processing options
- Adding user authentication
- Implementing upload progress tracking

## Limitations

- YouTube Data API requires an API key for detailed information
- Cloudinary uploads are subject to file size limits
- Some videos may be restricted or unavailable
- Processing time depends on video size and network conditions

## Troubleshooting

### Common Issues

1. **"Invalid YouTube URL" error**
   - Ensure the URL is in a supported format
   - Check for extra spaces or characters

2. **"Failed to fetch video information"**
   - Verify your YouTube API key is set correctly
   - Check network connectivity
   - Ensure the video is publicly accessible

3. **"Upload failed" error**
   - Verify Cloudinary credentials
   - Check file size limits
   - Ensure sufficient Cloudinary credits

### Debug Mode

Enable debug logging by adding `console.log` statements in the component or checking browser developer tools for detailed error messages.

## Contributing

To contribute to this component:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This component is part of the project and follows the same license terms. 