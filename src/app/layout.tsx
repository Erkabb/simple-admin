import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "@/components/providers";
import {AuthProvider} from "@/components/providers/AuthProvider";
import {Layout} from "@/components/layout/page";
import {Footer} from "@/components/footer/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Simple Code Academy",
  description: "Whether you're aiming for a tech career, freelancing, or just learning for fun — our structured paths and expert support help you move from zero to job-ready with clarity and confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <ApolloWrapper>
          <AuthProvider>
              <Layout>
                  {children}
              </Layout>
              <Footer/>
          </AuthProvider>
      </ApolloWrapper>
      </body>
    </html>
  );
}
