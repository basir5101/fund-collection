import { getGalleryItems } from "@/actions/gallery";
// import GalleryForm from "@/components/GalleryForm";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import GalleryForm from "./GalleryForm";

export default async function GalleryPage({ searchParams }) {
  const params = await searchParams;
  const page = parseInt(params.page) || 1;
  const { items, totalPages, currentPage } = await getGalleryItems(page, 6);

  return (
    <div className="min-h-screen bg-[#F7FCFA] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-emerald-950 mb-3">
            ফটো গ্যালারি
          </h1>
          <p className="text-emerald-600 font-medium">
            আমাদের ক্যাম্পেইনের বিশেষ মুহূর্তগুলো
          </p>
        </div>

        {/* Form to Add Image */}
        <div className="max-w-3xl mx-auto">
          <GalleryForm />
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item._id}
              className="group relative bg-white rounded-[2rem] overflow-hidden border border-emerald-50 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Delete Button - এটি ছবির ওপর দেখাবে */}
              <DeleteButton id={item._id} />

              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.event}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Gradient এবং Date Overlay আগের মতোই থাকবে */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white font-medium text-sm">
                    {new Date(item.date).toLocaleDateString("bn-BD")}
                  </p>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-emerald-900 truncate">
                  {item.event || "ক্যাম্পেইন মুহূর্ত"}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 mt-16">
            <Link
              href={`?page=${Math.max(1, currentPage - 1)}`}
              className={`p-4 rounded-full bg-white border border-emerald-100 ${
                currentPage === 1
                  ? "opacity-30 pointer-events-none"
                  : "hover:bg-emerald-50 text-emerald-600"
              }`}
            >
              <ChevronLeft size={24} />
            </Link>

            <div className="bg-emerald-100 text-emerald-800 px-6 py-2 rounded-full font-bold">
              {currentPage} / {totalPages}
            </div>

            <Link
              href={`?page=${Math.min(totalPages, currentPage + 1)}`}
              className={`p-4 rounded-full bg-white border border-emerald-100 ${
                currentPage === totalPages
                  ? "opacity-30 pointer-events-none"
                  : "hover:bg-emerald-50 text-emerald-600"
              }`}
            >
              <ChevronRight size={24} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
