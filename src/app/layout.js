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
  title: "ওমর শরীফের জীবন বাঁচাতে এগিয়ে আসুন | Donate For Sharif",
  description:
    "ওমর শরীফ সরকার অস্টিওসার্কোমা (বোন ক্যান্সার) আক্রান্ত। তার উন্নত চিকিৎসার জন্য 25 লক্ষ টাকা প্রয়োজন। আপনার সামান্য দানে বাঁচতে পারে একটি প্রাণ।",

  // Open Graph (Messenger, WhatsApp, Facebook এর জন্য)
  openGraph: {
    title: "ওমর শরীফের জীবন বাঁচাতে এগিয়ে আসুন | Donate For Sharif",
    description:
      "ওমর শরীফ অস্টিওসার্কোমা (বোন ক্যান্সার) আক্রান্ত। তার উন্নত চিকিৎসার জন্য 25 লক্ষ টাকা প্রয়োজন। আপনার সামান্য দান তার জীবনের আশা হতে পারে।",
    url: "https://donateforsharif.help", // আপনার ডোমেইন নাম দিন
    siteName: "Donate For Sharif",
    images: [
      {
        url: "https://donateforsharif.help/sharif_banner.jpg", // ছবির অ্যাবসলিউট ইউআরএল
        width: 1200,
        height: 630,
        alt: "ওমর শরীফ সরকার চিকিৎসা সহায়তা",
      },
    ],
    locale: "bn_BD",
    type: "website",
  },

  // Twitter/X এর জন্য
  twitter: {
    card: "summary_large_image",
    title: "ওমর শরীফের জীবন বাঁচাতে এগিয়ে আসুন | Donate For Sharif",
    description:
      "ওমর শরীফ বোন ক্যান্সারে আক্রান্ত। তার চিকিৎসার জন্য আর্থিক সহায়তা প্রয়োজন।",
    images: ["https://donateforsharif.help/sharif_banner.jpg"],
  },
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
