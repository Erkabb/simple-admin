'use client';

import { usePathname } from "next/navigation";
import { 
    BookOpen, 
    Settings, 
    Home, 
    Video, 
    Users
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "@/components/ui/sidebar";
import { useAuth } from "@/components/providers/AuthProvider";
import Image from "next/image";
import Link from "next/link";

export function SidebarComponent({ isOpen }: {isOpen: boolean}) {
    const pathname = usePathname();
    const { isAuth } = useAuth();

    const navigationItems = [
        {
            title: "Dashboard",
            href: "/",
            icon: Home,
        },
        {
            title: "Courses",
            href: "/course",
            icon: BookOpen,
        },
        {
            title: "YouTube Upload",
            href: "/youtube-upload",
            icon: Video,
        },
    ];

    const adminItems = [
        {
            title: "Account",
            href: "/account",
            icon: Users,
        },
        {
            title: "Settings",
            href: "/settings",
            icon: Settings,
        },
        {
            title: "Add User",
            href: '/add-user',
            icon: Users,
        }
    ];

    return (
        <SidebarProvider open={isOpen} className="absolute z-10">
            <Sidebar>
                <SidebarHeader>
                    <div className="flex items-center gap-2 px-2 py-2 border-b border-primary/50">
                        <Image alt="logo" src="/simple.png" className="w-8 h-8 rounded" width={32} height={32}/>
                        <span className="text-sm font-semibold">Simple Code</span>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Main</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {navigationItems.map((item) => (
                                    <SidebarMenuItem key={item.href}>
                                        <SidebarMenuButton asChild isActive={pathname === item.href}>
                                            <Link href='/'>
                                                <item.icon className="size-4" />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    {isAuth && (
                        <SidebarGroup>
                            <SidebarGroupLabel>Administration</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {adminItems.map((item) => (
                                        <SidebarMenuItem key={item.href}>
                                            <SidebarMenuButton asChild isActive={pathname === item.href}>
                                                <Link href='/'>
                                                    <item.icon className="size-4" />
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    )}
                </SidebarContent>
                <SidebarFooter>
                    <div className="px-4 py-2">
                        <div className="text-xs text-muted-foreground">
                            © 2024 Simple Code Academy
                        </div>
                    </div>
                </SidebarFooter>
            </Sidebar>
        </SidebarProvider>
    );
} 