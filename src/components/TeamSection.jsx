import { Github, Linkedin, MessageCircle } from "lucide-react"; // MessageCircle আইকনটি মেসেঞ্জারের জন্য
import Image from "next/image";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "আব্দুল বাসির",
      role: "লিড ব্যাকএন্ড ডেভেলপার",
      company: "PRDUA Research and Pvt Limited",
      image: "/images/basir.png",
      github: "https://github.com/basir5101",
      linkedin: "https://www.linkedin.com/in/abdul-basir-b087971b1/",
      messenger: "https://m.me/basir5101",
    },
    {
      name: "রুবায়েত বিল্লাহ",
      role: "লিড ফ্রন্টএন্ড ডেভেলপার",
      company: "PRDUA Research and Pvt Limited",
      image: "/images/rubayet.png",
      github: "https://github.com/Rubayet-billah",
      linkedin: "https://www.linkedin.com/in/rubayet-billah/",
      messenger: "https://m.me/md.rubayetbillah",
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-5 text-center mb-12">
        <h2 className="text-3xl font-bold text-green-500 mb-2">
          পেছনে কাজ করছে যারা
        </h2>
        <p className="text-slate-500">
          ওমর শরীফের জন্য এই প্ল্যাটফর্মটি তৈরিতে নিয়োজিত কারিগরি টিম
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto px-5">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-[40px] p-6 shadow-lg border border-slate-100 transition-all hover:shadow-xl"
          >
            {/* ইমেজ সেকশন */}
            <div className="relative w-full h-72 rounded-[30px] overflow-hidden mb-6 bg-slate-200">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* কন্টেন্ট সেকশন */}
            <div className="px-2">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
                  {member.name}
                </h3>
                <div className="bg-green-500 rounded-full p-1">
                  <svg
                    className="w-3 h-3 text-white fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                  </svg>
                </div>
              </div>

              <p className="text-slate-600 text-lg mb-1 font-medium">
                {member.role}
              </p>
              <p className="text-slate-400 text-sm mb-8">{member.company}</p>

              {/* সোশ্যাল লিঙ্কস এবং মেসেঞ্জার বাটন */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex gap-3">
                  {/* GitHub - Dark Gray Background */}
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-[#24292e] rounded-full text-white hover:bg-black transition-colors"
                    title="GitHub"
                  >
                    <Github size={20} />
                  </a>

                  {/* LinkedIn - Signature Blue Background */}
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-[#0077b5] rounded-full text-white hover:bg-[#005582] transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>

                {/* Messenger Button */}
                <a
                  href={member.messenger}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 px-5 py-3 rounded-2xl flex items-center gap-2 font-semibold hover:bg-gray-200 transition-colors text-sm border border-blue-400"
                >
                  <MessageCircle size={18} /> যোগাযোগ
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
