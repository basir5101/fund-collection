import { Facebook, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">
              ওমর শরীফের জন্য দোয়া ও সহায়তা
            </h3>
            <p className="text-sm leading-relaxed mb-6">
              গোবিপ্রবির মেধাবী ছাত্র ওমর শরীফের ক্যান্সার (অস্টিওসারকোমা)
              চিকিৎসায় সহায়তা করার জন্য এটি একটি ব্যক্তিগত উদ্যোগ। আপনার প্রতিটি
              অনুদান সরাসরি ওমর শরীফের চিকিৎসার কাজে ব্যয় করা হচ্ছে।
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/donateforsharif"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-500 cursor-pointer transition"
              >
                <Facebook />
              </a>
              {/* <Instagram className="hover:text-green-500 cursor-pointer transition" />
              <Globe className="hover:text-green-500 cursor-pointer transition" /> */}
            </div>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              যোগাযোগ ও অবস্থান
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 shrink-0 text-green-500" />
                <span>চকরামপুর, ত্রিশাল, ময়মনসিংহ, বাংলাদেশ</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-green-500" /> +880 01517966762
                (বিকাশ/নগদ/রকেট(personal))
              </li>
              {/* link for victim sharif */}
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-green-500" />
                <a
                  href="/victim/sharif"
                  className="hover:underline text-blue-500"
                >
                  ওমর শরীফের বিস্তারিত তথ্য দেখুন
                </a>
              </li>
              {/* <li className="flex items-center gap-2">
                <Mail size={16} className="text-green-500" />{" "}
                support@saveomar.com
              </li> */}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              স্বচ্ছতা ও চিকিৎসা আপডেট
            </h3>
            <p className="text-xs leading-relaxed italic border-l-2 border-green-500 pl-4">
              {` "ওমর শরীফের উন্নত চিকিৎসার জন্য ২৫-৩০ লক্ষ টাকা প্রয়োজন। সংগৃহীত অর্থের হিসাব এবং চিকিৎসার বর্তমান অবস্থা নিয়মিত এই ওয়েবসাইটে আপডেট করা হয়। যেকোনো জিজ্ঞাসায় সরাসরি ওমর শরীফের পরিবারের সাথে যোগাযোগ করুন।" `}
            </p>
            <div className="mt-6 flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              নিরাপদ অনুদান পদ্ধতি
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          © ২০২৬ ডোনেট ফর শরীফ ক্যাম্পেইন কর্তৃক সর্বস্বত্ব সংরক্ষিত।
        </div>
      </div>
    </footer>
  );
};

export default Footer;
