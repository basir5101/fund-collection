import { auth } from "@/auth";
import DonationChart from "@/components/DonationChart";
import { ChevronRight, Clock, GalleryHorizontal, Heart } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function NavigationPage() {
  const session = await auth();
  if (!session) return redirect("/login");
  const routes = [
    {
      href: "/admin/donors",
      label: "ডোনার লিস্ট",
      description: "সবাই যারা সাহায্যের হাত বাড়িয়ে দিয়েছেন",
      icon: <Heart size={28} fill="currentColor" />,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      href: "/admin/gallery",
      label: "ফটো গ্যালারি",
      description: "ক্যাম্পেইনের বিভিন্ন মুহূর্তের ছবি",
      icon: <GalleryHorizontal size={28} />,
      color: "text-teal-600",
      bg: "bg-teal-50",
    },
    {
      href: "/admin/event",
      label: "ইভেন্ট",
      description: "ক্যাম্পেইনের বিভিন্ন ইভেন্ট",
      icon: <Clock size={28} />,
      color: "text-teal-600",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7FCFA] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {routes.map((route, index) => (
            <Link
              key={index}
              href={route.href}
              className="group relative flex items-center p-2 bg-white rounded-md border border-emerald-100 shadow-[0_8px_30px_rgb(16,185,129,0.04)] transition-all hover:shadow-xl hover:shadow-emerald-100/50 hover:-translate-y-1"
            >
              {/* Icon Container */}
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-2xl ${route.bg} ${route.color} transition-transform group-hover:scale-110`}
              >
                {route.icon}
              </div>

              {/* Text Content */}
              <div className="ml-6 flex-grow">
                <h2 className="text-xl font-bold text-emerald-900 group-hover:text-emerald-600 transition-colors">
                  {route.label}
                </h2>
              </div>

              {/* Arrow Icon */}
              <div className="text-emerald-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all">
                <ChevronRight size={24} />
              </div>
            </Link>
          ))}
        </div>
        <DonationChart />
      </div>
    </div>
  );
}
