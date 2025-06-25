'use client';

import { YouTubeUpload } from '@/components/ui/youtube-upload';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useGetVideosQuery} from "@/gql/youtube/get-video.generated";
import Link from "next/link";

export default function YouTubeUploadPage() {
    const { data, loading } = useGetVideosQuery();
    const videos = data?.getVideos;

  return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              YouTube Video Upload
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Upload videos from YouTube. Simply paste a YouTube URL
              and the video will be processed and uploaded.
            </p>
          </div>

          <YouTubeUpload />
            <div className="container mx-auto p-5 flex gap-5 overflow-x-auto shrink-0">
                {videos?.map((v)=> {
                const videoId = getYoutubeId(v.youtubeUrl);
                if(!videoId) return null;
                return(
                    <Link href={`/course/${v._id}`} key={v._id} className="border rounded-md p-5 shadow-sm shadow-gray/50">
                            {loading && (<div className="skeleton w-72 h-10"/>)}
                            <iframe
                                src={`https://www.youtube.com/embed/${videoId}`}
                                key={v._id}
                                width="460"
                                height="400"
                                allowFullScreen
                                frameBorder="0"/>
                        <h5 className="text-lg font-semibold">{v.title}</h5>
                    </Link>
                )})}
            </div>
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

function getYoutubeId(url: string): string | null {
    const match = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
}