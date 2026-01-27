"use client";
import { getFeedbacks, submitFeedback } from "@/actions/feedback";
import { useState } from "react";

export default function FeedbackSection() {
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const availableTags = [
    "Payment",
    "UI/Design",
    "Information",
    "Feature Request",
    "Bug",
    "Other",
  ];

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedTags.length === 0) {
      alert("দয়া করে অন্তত একটি বিষয় নির্বাচন করুন।");
      return;
    }
    setLoading(true);

    const data = {
      tags: selectedTags,
      message: e.target.message.value,
      name: e.target.userName?.value,
      contact: e.target.userContact?.value,
    };

    const result = await submitFeedback(data);

    if (result.success) {
      setLoading(false);
      setSubmitted(true);
    } else {
      setLoading(false);
      alert(result.error);
    }
  };
  if (submitted) {
    return (
      <div className="py-16 text-center max-w-3xl mx-auto px-4">
        <div className="bg-green-50 p-10 rounded-3xl border-2 border-dashed border-green-200">
          {/* Green Checkmark Icon */}
          <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-10 h-10"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>

          <h3 className="text-3xl font-extrabold text-green-800 mb-3 tracking-tight">
            ধন্যবাদ!
          </h3>
          <p className="text-gray-600 text-lg">
            আপনার গুরুত্বপূর্ণ মতামতটি আমরা পেয়েছি। শরীফের জীবন বাঁচাতে আমাদের
            এই ক্ষুদ্র প্রচেষ্টাকে আরও নিখুঁত করতে এটি সাহায্য করবে।
          </p>

          <button
            onClick={() => {
              setSubmitted(false);
              setSelectedTags([]);
            }}
            className="mt-8 px-6 py-2 bg-white text-green-600 border border-green-200 rounded-full font-bold hover:bg-green-600 hover:text-white transition-all duration-300"
          >
            আরেকটি মতামত পাঠান &rarr;
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
          আপনার মতামত দিন
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          সাইটটি আরও উন্নত করতে আপনার অভিজ্ঞতা বা পরামর্শ আমাদের জানান।
        </p>
      </div>

      <div className="bg-white rounded-4xl shadow-xl shadow-gray-100/50 border border-gray-200 p-6 md:p-10">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Tag Selection Loop */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">
              বিষয় নির্বাচন করুন (একাধিক হতে পারে):
            </label>
            <div className="flex flex-wrap gap-3">
              {availableTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`group flex items-center gap-2 text-gray-500 px-4 py-1 rounded-full text-sm font-semibold transition-all duration-200 border-2 ${
                      isSelected
                        ? "bg-green-100 border-green-400 shadow-lg shadow-green-200"
                        : "bg-white border-gray-200 hover:border-green-400 hover:text-green-600"
                    }`}
                  >
                    {tag}
                    {isSelected && (
                      <span className="bg-green-200 rounded-full p-0.5 group-hover:bg-green-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Message Input */}
          <div className="relative">
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
              আপনার বার্তা
            </label>
            <textarea
              name="message"
              required
              placeholder="এখানে আপনার বিস্তারিত মতামত লিখুন..."
              className="w-full p-5 border-2 border-gray-50 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none h-44 transition-all resize-none bg-gray-50/50 text-gray-800 placeholder:text-gray-400"
            />
          </div>

          {/* Info Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                আপনার নাম (ঐচ্ছিক)
              </label>
              <input
                type="text"
                placeholder="যেমন: আবরার আহমেদ"
                className="w-full p-4 border-2 border-gray-50 rounded-xl outline-none focus:border-green-500 bg-gray-50/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                ইমেইল বা ফোন (ঐচ্ছিক)
              </label>
              <input
                type="text"
                placeholder="যোগাযোগের জন্য"
                className="w-full p-4 border-2 border-gray-50 rounded-xl outline-none focus:border-green-500 bg-gray-50/50 transition-all"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-2 rounded-lg transition-all shadow-xl transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest"
          >
            {loading ? "প্রসেসিং হচ্ছে..." : "মতামত জমা দিন"}
          </button>
        </form>
      </div>
    </section>
  );
}
