'use client';

import Link from "next/link";
import {AlignJustify} from "lucide-react";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {SidebarComponent} from "@/components/sidebar/page";

export function Header (){
    const [ isOpen, setIsOpen ]=useState(false);

    return(
        <div className="bg-primary text-white py-3">
            <div className="container flex justify-between items-center mx-auto">
                <Button className="btn-sm bg-primary" onClick={() => {
                    setIsOpen(true)
                    if(isOpen){
                        setIsOpen(false);
                    }
                }}>
                    <AlignJustify className="size-6" />
                    {isOpen && <SidebarComponent isOpen />}
                </Button>
                <h4 className="uppercase font-semibold">Simple code academy</h4>
                <div className="flex lg:gap-4 gap-2 items-center">
                    <Link href="/" className="font-semibold text-sm uppercase">Хичээлүүд</Link>
                </div>
            </div>
        </div>
    )
}