import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Navbar } from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "AI Application Generator",
  description: "Generate professional applications in seconds using AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Navbar />
          {children}
          <ToastContainer position="bottom-right" />
        </SessionProvider>
      </body>
    </html>
  );
}
