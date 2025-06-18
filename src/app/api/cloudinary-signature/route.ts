// /app/api/cloudinary-signature/route.ts
import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST() {
    try {
        const timestamp = Math.round(Date.now() / 1000);
        const signature = cloudinary.utils.api_sign_request(
            { timestamp, folder: 'videos', resource_type: 'video' },
            process.env.CLOUDINARY_API_SECRET!
        );

        return NextResponse.json({
            timestamp,
            signature,
            apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
            cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        });
    } catch (error) {
        console.error('Cloudinary sign error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

