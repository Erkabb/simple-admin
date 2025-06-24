# YouTube Video Upload Component

A React component that allows users to upload videos from YouTube using GraphQL by simply providing a YouTube URL.

## Features

- 📹 Extract video information from YouTube URLs
- 🖼️ Display video thumbnails and metadata
- 🔄 Upload videos via GraphQL mutations
- 📋 Copy URLs to clipboard
- 🎥 Play uploaded videos with HTML5 video player
- 📱 Responsive design with modern UI

## Components

### YouTubeUpload Component
Located at: `src/components/ui/youtube-upload.tsx`

A comprehensive component that handles:
- YouTube URL validation
- Video information fetching via GraphQL
- Video upload via GraphQL mutations
- Video playback

### GraphQL Operations

#### `GetYouTubeVideoInfo` Query
Fetches detailed video information from YouTube.

**Variables:**
```graphql
{
  "youtubeUrl": "https://www.youtube.com/watch?v=VIDEO_ID"
}
```

**Response:**
```graphql
{
  "data": {
    "getYouTubeVideoInfo": {
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
      },
      "message": "Success"
    }
  }
}
```

#### `UploadYouTubeVideo` Mutation
Uploads YouTube videos via GraphQL.

**Variables:**
```graphql
{
  "input": {
    "youtubeUrl": "https://www.youtube.com/watch?v=VIDEO_ID",
    "videoId": "VIDEO_ID",
    "title": "Video Title",
    "description": "Video description",
    "thumbnail": "https://...",
    "channelTitle": "Channel Name"
  }
}
```

**Response:**
```graphql
{
  "data": {
    "uploadYouTubeVideo": {
      "success": true,
      "message": "Video uploaded successfully",
      "videoUrl": "https://your-server.com/videos/VIDEO_ID.mp4",
      "videoId": "VIDEO_ID"
    }
  }
}
```

## Setup

### 1. Environment Variables

Add the following environment variables to your `.env.local` file:

```env
# YouTube Data API (Optional - for detailed video info)
YOUTUBE_API_KEY=your_youtube_api_key

# GraphQL Backend
BACKEND_URI=https://your-graphql-server.com/graphql
```

### 2. Dependencies

The component uses these dependencies:
- `@apollo/client` - GraphQL client
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
3. **Info Fetching**: Fetches video metadata via GraphQL query
4. **Display**: Shows video thumbnail and information
5. **Upload**: Processes video via GraphQL mutation
6. **Playback**: Displays uploaded video with HTML5 video player

## Supported YouTube URL Formats

- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`
- `https://www.youtube.com/v/VIDEO_ID`

## GraphQL Schema Requirements

Your GraphQL backend should implement these types and operations:

```graphql
type YouTubeVideoInfo {
  title: String!
  description: String!
  thumbnail: String!
  channelTitle: String!
  publishedAt: String!
  duration: String!
  viewCount: String!
  likeCount: String!
  videoId: String!
  youtubeUrl: String!
}

type YouTubeVideoResponse {
  success: Boolean!
  videoInfo: YouTubeVideoInfo
  message: String!
}

type UploadResponse {
  success: Boolean!
  message: String!
  videoUrl: String!
  videoId: String!
}

input YouTubeVideoInput {
  youtubeUrl: String!
  videoId: String!
  title: String!
  description: String!
  thumbnail: String!
  channelTitle: String!
}

type Query {
  getYouTubeVideoInfo(youtubeUrl: String!): YouTubeVideoResponse!
}

type Mutation {
  uploadYouTubeVideo(input: YouTubeVideoInput!): UploadResponse!
}
```

## Error Handling

The component includes comprehensive error handling for:
- Invalid YouTube URLs
- GraphQL errors
- Network errors
- Upload failures

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
- GraphQL backend must implement the required mutations and queries
- Some videos may be restricted or unavailable
- Processing time depends on video size and network conditions

## Troubleshooting

### Common Issues

1. **"Invalid YouTube URL" error**
   - Ensure the URL is in a supported format
   - Check for extra spaces or characters

2. **"Failed to fetch video information"**
   - Verify your YouTube API key is set correctly
   - Check GraphQL backend connectivity
   - Ensure the video is publicly accessible

3. **"Upload failed" error**
   - Verify GraphQL backend is running
   - Check mutation implementation
   - Ensure proper authentication

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