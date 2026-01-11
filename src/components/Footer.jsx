import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">ক্যান্সার জয়ী</h3>
            <p className="text-sm leading-relaxed mb-6">
              আমরা একটি মানবিক উদ্যোগ। স্বচ্ছতা এবং সহমর্মিতার মাধ্যমে অসুস্থ
              ব্যক্তিদের সহায়তায় কাজ করছি। প্রতিটি টাকা রোগীর সরাসরি সেবায় ব্যয়
              করা হয়।
            </p>
            <div className="flex space-x-4">
              <Facebook className="hover:text-rose-500 cursor-pointer transition" />
              <Instagram className="hover:text-rose-500 cursor-pointer transition" />
            </div>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4">যোগাযোগ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <MapPin size={16} /> ধানমন্ডি, ঢাকা, বাংলাদেশ
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} /> +৮৮০ ১৭০০-০০০০০০
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} /> help@cancerjoyee.com
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              সতর্কতা ও স্বচ্ছতা
            </h3>
            <p className="text-xs leading-relaxed italic border-l-2 border-rose-500 pl-4">
              {` "এই প্রচারণায় সংগৃহীত অর্থের হিসাব প্রতি রবিবার হালনাগাদ করা হয়।
              কোনো প্রকার অসামঞ্জস্য মনে হলে তাৎক্ষণিক যোগাযোগ করার অনুরোধ রইল।"`}
            </p>
            <div className="mt-6 flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              নিরাপদ পেমেন্ট গেটওয়ে
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          © ২০২৪ ক্যান্সার জয়ী. সর্বস্বত্ব সংরক্ষিত।
        </div>
      </div>
    </footer>
  );
};

export default Footer;
