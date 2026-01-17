"use client";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
// import ProgressBar from '../components/ProgressBar';

export default function GalleryGrid({ images }) {
  images;
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2 mb-8">
        <Camera className="text-green-500" />
        <h2 className="text-3xl font-bold text-slate-900">
          গ্যালারি ও তথ্যচিত্র
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-md"
          >
            <img
              src={item.image}
              alt={`Gallery ${i}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
