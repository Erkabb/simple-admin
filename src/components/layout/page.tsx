'use client';

import {ReactNode} from "react";
import { Header } from "@/components/header/page";

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <div className="flex h-[calc(100vh-4rem)]">
                <main className="flex-1 overflow-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
} 