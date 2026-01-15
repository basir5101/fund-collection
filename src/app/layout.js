import Footer from "@/components/Footer";
import NavbarWrapper from "@/components/NavbarWrapper";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Helping Hands",
  description: "ক্যাম্পেইনের সাহায্যের হাত বাড়িয়ে দিয়েছেন",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavbarWrapper />
        {children}
        <Footer />
      </body>
    </html>
  );
}
