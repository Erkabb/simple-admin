'use client';

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {BookOpen, Plus, Users, Video} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    const stats = [
        {
            title: "Total Courses",
            value: "12",
            description: "Active courses",
            icon: BookOpen,
        },
        {
            title: "Total Videos",
            value: "89",
            description: "Uploaded videos",
            icon: Video,
        },
        {
            title: "Total Users",
            value: "1,234",
            description: "Registered users",
            icon: Users,
        }
    ];

    return (
        <div className="space-y-6 container mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                    Welcome to Simple Code Academy administration panel.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat) => (
                    <Card key={stat.title} className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="text-sm font-medium">
                                {stat.title}
                            </h3>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {stat.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <h3 className="text-lg font-semibold">Recent Activity</h3>
                        <p className="text-sm text-muted-foreground">
                            Latest activities in Simple Code Academy
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">New course added</p>
                                    <p className="text-xs text-muted-foreground">React Fundamentals</p>
                                </div>
                                <span className="text-xs text-muted-foreground">2 hours ago</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <h3 className="text-lg font-semibold">Quick Actions</h3>
                        <p className="text-sm text-muted-foreground">
                            Common administrative tasks
                        </p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted cursor-pointer">
                                <Video className="h-4 w-4" />
                                <Link href="/youtube-upload" className="text-base hover:font-semibold underline-offset-2">Upload Video</Link>
                            </div>
                            <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted cursor-pointer text-base">
                                <Users className="h-4 w-4" />
                                <span className="">Account Settings</span>
                            </div>
                            <div className="flex text-base items-center space-x-2 p-2 rounded-md hover:bg-muted cursor-pointer">
                                <BookOpen className="h-4 w-4" />
                                <span>System Settings</span>
                            </div>
                            <div className="flex text-base items-center space-x-2 p-2 rounded-md hover:bg-muted cursor-pointer">
                                <Plus className="h-4 w-4" />
                                <span>Add Student</span>
                        </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}