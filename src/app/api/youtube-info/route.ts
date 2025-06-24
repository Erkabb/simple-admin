import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { youtubeUrl } = await request.json();

        if (!youtubeUrl) {
            return NextResponse.json({ error: 'YouTube URL is required' }, { status: 400 });
        }

        // Extract video ID from YouTube URL
        const videoIdMatch = youtubeUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
        if (!videoIdMatch) {
            return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
        }

        const videoId = videoIdMatch[1];

        // Check if YouTube API key is available
        const apiKey = process.env.YOUTUBE_API_KEY;
        
        if (apiKey) {
            // Fetch real video information from YouTube Data API
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails,statistics`
            );

            if (response.ok) {
                const data = await response.json();
                
                if (data.items && data.items.length > 0) {
                    const video = data.items[0];
                    const snippet = video.snippet;
                    const contentDetails = video.contentDetails;
                    const statistics = video.statistics;

                    return NextResponse.json({
                        success: true,
                        videoInfo: {
                            title: snippet.title,
                            description: snippet.description,
                            thumbnail: snippet.thumbnails?.maxres?.url || snippet.thumbnails?.high?.url,
                            channelTitle: snippet.channelTitle,
                            publishedAt: snippet.publishedAt,
                            duration: contentDetails?.duration,
                            viewCount: statistics?.viewCount,
                            likeCount: statistics?.likeCount,
                            videoId: videoId,
                            youtubeUrl: youtubeUrl
                        }
                    });
                }
            }
        }

        // Fallback to basic information if API key is not available or request fails
        const fallbackInfo = {
            title: `YouTube Video (${videoId})`,
            description: 'Video information not available',
            thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
            channelTitle: 'Unknown Channel',
            publishedAt: 'Unknown',
            duration: 'Unknown',
            viewCount: 'Unknown',
            likeCount: 'Unknown',
            videoId: videoId,
            youtubeUrl: youtubeUrl
        };

        return NextResponse.json({
            success: true,
            videoInfo: fallbackInfo,
            note: 'Using fallback information. Add YOUTUBE_API_KEY to environment variables for detailed info.'
        });

    } catch (error) {
        console.error('YouTube info error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch YouTube video information' }, 
            { status: 500 }
        );
    }
} 