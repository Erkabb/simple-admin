import {YouTubeUpload} from "@/components/ui/youtube-upload";
import {useAuth} from "@/components/providers/AuthProvider";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

export default function Page(){
    const { isAuth } =useAuth();
    const router = useRouter();

    if(!isAuth){
        toast.error("You must be logged in");
        router.push("/login");
    }

    return (
        <div className="container mx-auto">
            <YouTubeUpload/>
        </div>
    )
}