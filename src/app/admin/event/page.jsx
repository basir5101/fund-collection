import { getEvent, updateEvent } from "@/actions/event";
import { Settings } from "lucide-react";

export default async function EventPage() {
  const event = await getEvent();

  // তারিখটিকে input type="date" এর ফরম্যাটে (YYYY-MM-DD) রূপান্তর
  const formattedDate = event?.date
    ? new Date(event.date).toISOString().split("T")[0]
    : "";

  return (
    <div className="min-h-screen bg-[#F7FCFA] py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-emerald-950 flex items-center justify-center">
            <Settings className="mr-3 text-emerald-500" /> ইভেন্ট কনফিগারেশন
          </h1>
          <p className="text-emerald-600 mt-2">
            ওয়েবসাইটের মূল লক্ষ্যমাত্রা ও তারিখ সেট করুন
          </p>
        </div>

        <form
          action={updateEvent}
          className="bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-emerald-50 space-y-6"
        >
          {/* ইভেন্টের নাম */}
          <div>
            <label className="block text-sm font-bold text-emerald-900 mb-2 ml-1">
              ইভেন্টের নাম
            </label>
            <input
              name="name"
              defaultValue={event?.name}
              placeholder="যেমন: ক্যান্সার আক্রান্ত রহিমের চিকিৎসা"
              className="w-full p-4 rounded-2xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 outline-none bg-emerald-50/20"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* লক্ষ্যমাত্রা */}
            <div>
              <label className="block text-sm font-bold text-emerald-900 mb-2 ml-1">
                লক্ষ্যমাত্রা (৳)
              </label>
              <input
                name="totalAmount"
                type="number"
                defaultValue={event?.totalAmount}
                required
                placeholder="200000"
                className="w-full p-4 rounded-2xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 outline-none bg-emerald-50/20"
              />
            </div>

            {/* তারিখ */}
            <div>
              <label className="block text-sm font-bold text-emerald-900 mb-2 ml-1">
                শেষ তারিখ
              </label>
              <input
                name="date"
                type="date"
                defaultValue={formattedDate}
                required
                className="w-full p-4 rounded-2xl border border-emerald-100 focus:ring-2 focus:ring-emerald-500 outline-none bg-emerald-50/20"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 rounded-3xl transition-all shadow-lg shadow-emerald-100 flex items-center justify-center space-x-2"
          >
            <span>আপডেট করুন</span>
          </button>

          {/* Current Status Preview */}
          {event && (
            <div className="mt-8 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <p className="text-xs font-bold text-emerald-700 uppercase mb-2">
                বর্তমানে সেভ করা আছে:
              </p>
              <div className="text-sm text-emerald-900">
                <strong>নাম:</strong> {event.name || "N/A"} <br />
                <strong>লক্ষ্যমাত্রা:</strong> ৳
                {event.totalAmount.toLocaleString()} <br />
                <strong>তারিখ:</strong>{" "}
                {new Date(event.date).toLocaleDateString("bn-BD")}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
