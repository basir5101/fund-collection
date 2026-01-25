import { Github, Linkedin, MessageCircle } from "lucide-react";
import Image from "next/image";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "আব্দুল বাসির",
      role: "লিড ব্যাকএন্ড ডেভেলপার",
      company: "PRDUA Research and Pvt Ltd",
      image: "/images/basir.png",
      github: "https://github.com/basir5101",
      linkedin: "https://www.linkedin.com/in/abdul-basir-b087971b1/",
      messenger: "https://m.me/basir5101",
    },
    {
      name: "রুবায়েত বিল্লাহ",
      role: "লিড ফ্রন্টএন্ড ডেভেলপার",
      company: "PRDUA Research and Pvt Ltd",
      image: "/images/rubayet.png",
      github: "https://github.com/Rubayet-billah",
      linkedin: "https://www.linkedin.com/in/rubayet-billah/",
      messenger: "https://m.me/md.rubayetbillah",
    },
    {
      name: "মুসলিম উদ্দিন",
      role: "ইউআই/ইউএক্স ডিজাইনার",
      company: "Freelance Designer",
      image: "/images/muslim.png",
      github: "",
      linkedin: "",
      messenger: "https://m.me/ripon0100",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-left mb-12 border-l-4 border-green-500 pl-4">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
            কারিগরি সহযোগিতায়
          </h2>
          <p className="text-slate-500 text-sm">
            ওমরের দ্রুত আরোগ্য কামনায় এই ডিজিটাল প্ল্যাটফর্মটি তৈরিতে যারা
            স্বেচ্ছায় কাজ করেছেন।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group bg-slate-50 rounded-2xl p-5 flex items-start gap-5 transition-all hover:bg-white hover:shadow-md border border-transparent hover:border-slate-100"
            >
              {/* বাম পাশে ছোট গোল ছবি */}
              <div className="relative w-20 h-20 shrink-0">
                <div className="w-full h-full rounded-2xl overflow-hidden ring-2 ring-white shadow-sm">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>

              {/* ডান পাশে কন্টেন্ট */}
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 leading-none mb-1">
                    {member.name}
                  </h3>
                  <p className="text-green-600 text-xs font-bold uppercase tracking-wide">
                    {member.role}
                  </p>
                  <p className="text-slate-400 text-[11px] mt-1 italic">
                    {member.company}
                  </p>
                </div>

                {/* সোশ্যাল লিঙ্কস - ছোট এবং ক্লিন */}
                <div className="flex items-center gap-3 pt-1">
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      className="text-slate-400 hover:text-slate-900 transition-colors"
                      title="GitHub"
                    >
                      <Github size={16} />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      className="text-slate-400 hover:text-blue-600 transition-colors"
                      title="LinkedIn"
                    >
                      <Linkedin size={16} />
                    </a>
                  )}
                  <a
                    href={member.messenger}
                    target="_blank"
                    className="flex items-center gap-1 text-[10px] font-bold text-blue-500 hover:text-blue-700 bg-blue-50 px-2 py-1 rounded-md transition-all"
                  >
                    <MessageCircle size={12} /> চ্যাট করুন
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
