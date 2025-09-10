import type { Metadata } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Button } from "@/components/ui/button";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clerk Next.js Quickstart",
  description: "Next.js application with Clerk authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" className="dark">
        <body
          className={`${poppins.variable} ${jetBrainsMono.variable} antialiased`}
        >
          <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex-shrink-0">
                  <h1 className="text-xl font-semibold text-white">
                    My Next.js App
                  </h1>
                </div>
                <div className="flex items-center space-x-4">
                  <SignedOut>
                    <SignInButton mode="modal">
                      <Button variant="default" size="default">
                        Sign In
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button variant="outline" size="default">
                        Sign Up
                      </Button>
                    </SignUpButton>
                  </SignedOut>
                  <SignedIn>
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: "w-8 h-8",
                        },
                      }}
                    />
                  </SignedIn>
                </div>
              </div>
            </div>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
