import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

        // Get video information
        const videoInfo = {
            title: `YouTube Video (${videoId})`,
            thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
            videoId: videoId,
            youtubeUrl: youtubeUrl
        };

        // Upload YouTube URL directly to Cloudinary
        // Cloudinary can fetch and process YouTube URLs
        const uploadResult = await cloudinary.uploader.upload(youtubeUrl, {
            resource_type: 'video',
            folder: 'youtube-videos',
            public_id: `youtube_${videoId}`,
            transformation: [
                { quality: 'auto' },
                { fetch_format: 'mp4' }
            ]
        });

        return NextResponse.json({
            success: true,
            videoInfo,
            cloudinaryUrl: uploadResult.secure_url,
            publicId: uploadResult.public_id
        });

    } catch (error) {
        console.error('YouTube download error:', error);
        return NextResponse.json(
            { error: 'Failed to process YouTube video' }, 
            { status: 500 }
        );
    }
} 