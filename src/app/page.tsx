'use client';
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {useFormState} from "react-dom";
import {upload} from "@/lib/upload";
import {CldVideoPlayer} from "next-cloudinary";
// https://cloudinary.com/blog/upload-video-to-cloudinary-next-js-app-router
export default function Home() {
  const [url, formAction] = useFormState(upload, '')
  return (
    <div className="min-h-screen font-sans">
      {/* Main Content */}
      <main className="py-8 container mx-auto">
          <h2 className="uppercase font-semibold">Admin Dashboard</h2>
        {/* Search, Filter, Sort */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
          <h4 className="uppercase text-base font-semibold ">Upload a new video course</h4>
          <form action={formAction}>
            <input type="file" name="video" accept="video/*" />
            <Button className="btn btn-md btn-white border border-indigo-600 text-indigo-600">Upload</Button>
          </form>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-8">
          {url && <CldVideoPlayer src={url} width="869" height="470"/>}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Product Card 1 */}
          <div className="border rounded-lg p-4 shadow-md">
            <Image src="/app-design-course.png" alt="App Design Course" width={300} height={200} className="rounded-md mb-4" />
            <h2 className="font-bold text-lg mb-2">Learn App Design</h2>
            <p className="text-sm text-gray-600 mb-2">Understand Digital Design Fundamentals to Make Beautiful Apps</p>
            <p className="text-xs text-gray-500 mb-4">Course • By Angela Yu</p>
            <div className="text-right font-bold text-lg">$10</div>
          </div>

          {/* Product Card 2 */}
          <div className="border rounded-lg p-4 shadow-md">
            <Image src="/app-marketing-course.png" alt="App Marketing Course" width={300} height={200} className="rounded-md mb-4" />
            <h2 className="font-bold text-lg mb-2">Learn App Marketing</h2>
            <p className="text-sm text-gray-600 mb-2">Growth Hack Your Way to More Downloads on the App Stores.</p>
            <p className="text-xs text-gray-500 mb-4">Course • By Angela Yu</p>
            <div className="text-right font-bold text-lg">$10</div>
          </div>

          {/* Product Card 3 */}
          <div className="border rounded-lg p-4 shadow-md">
            <Image src="/12-rules-ebook.png" alt="12 Rules to Learn Code Ebook" width={300} height={200} className="rounded-md mb-4" />
            <h2 className="font-bold text-lg mb-2">12 Rules to Learn To Code eBook</h2>
            <p className="text-sm text-gray-600 mb-2">Top Tips and Tricks for Levelling Up as a Developer</p>
            <p className="text-xs text-gray-500 mb-4">eBook • By Angela Yu</p>
            <div className="text-right font-bold text-lg">$5</div>
          </div>

          {/* Product Card 4 */}
          <div className="border rounded-lg p-4 shadow-md">
            <Image src="/web-dev-bootcamp.png" alt="Web Development Bootcamp" width={300} height={200} className="rounded-md mb-4" />
            <h2 className="font-bold text-lg mb-2">The Complete Web Development Bootcamp</h2>
            <p className="text-sm text-gray-600 mb-2">Master front-end and back-end web development.</p>
            <p className="text-xs text-gray-500 mb-4">Bootcamp • By Angela Yu</p>
            <div className="text-right font-bold text-lg">$10</div>
          </div>

          {/* Product Card 5 */}
          <div className="border rounded-lg p-4 shadow-md">
            <Image src="/flutter-dev-bootcamp.png" alt="Flutter Development Bootcamp" width={300} height={200} className="rounded-md mb-4" />
            <h2 className="font-bold text-lg mb-2">The Complete Flutter Development Bootcamp</h2>
            <p className="text-sm text-gray-600 mb-2">Build beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.</p>
            <p className="text-xs text-gray-500 mb-4">Bootcamp • By Angela Yu</p>
            <div className="text-right font-bold text-lg">$10</div>
          </div>

          {/* Product Card 6 */}
          <div className="border rounded-lg p-4 shadow-md">
            <Image src="/ml-ds-bootcamp.png" alt="Machine Learning & Data Science Bootcamp" width={300} height={200} className="rounded-md mb-4" />
            <h2 className="font-bold text-lg mb-2">The Complete Machine Learning & Data Science Bootcamp</h2>
            <p className="text-sm text-gray-600 mb-2">Learn to build intelligent systems and analyze data.</p>
            <p className="text-xs text-gray-500 mb-4">Bootcamp • By Angela Yu</p>
            <div className="text-right font-bold text-lg">$10</div>
          </div>
        </div>
      </main>
    </div>
  );
}
