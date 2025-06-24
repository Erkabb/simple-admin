'use client';

import Link from "next/link";
import {CircleUser} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useAuth} from "@/components/providers/AuthProvider";

export function Header (){
    const {logout} = useAuth();
    return(
        <div className="bg-indigo-600 text-white py-3">
            <div className="container flex justify-between items-center mx-auto">
                <h4 className="uppercase font-semibold">Simple code academy</h4>
                <div className="flex lg:gap-4 gap-2 items-center">
                    <Link href="/" className="font-semibold text-sm uppercase">Хичээлүүд</Link>
                    <Link href="/login">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center flex-nowrap gap-2">
                                <CircleUser className="size-6"/>
                                <span className="truncate">Account</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link href="/account/profile">
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>Add user</DropdownMenuItem>
                                <DropdownMenuItem>Billing</DropdownMenuItem>
                                <DropdownMenuItem>
                                    <button onClick={()=> logout()}>
                                        Log Out
                                    </button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </Link>

                </div>
            </div>

        </div>
    )
}