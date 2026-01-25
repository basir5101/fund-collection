import { getDonors } from "@/actions/donors";
import { ArrowRight, Clock, Heart, User } from "lucide-react";
import moment from "moment";
import Link from "next/link";

export default async function LatestDonorsMarquee() {
  const donorResponse = await getDonors(1, 5, "", true);
  const donors = donorResponse.donors;
  return (
    <section className="bg-[#F7FCFA] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-emerald-950 mb-3">
            সর্বশেষ ডোনার লিস্ট
          </h2>
          <p className="text-emerald-600 font-medium text-sm lg:text-base">
            যারা এগিয়ে এসেছেন সাহায্যের হাত বাড়িয়ে
          </p>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto rounded-2xl border border-emerald-100 shadow-sm bg-white">
          <table className="min-w-full divide-y divide-emerald-100">
            <thead className="bg-emerald-50/70">
              <tr>
                <th
                  scope="col"
                  className="py-4 pl-6 pr-3 text-left text-sm font-semibold text-emerald-800 sm:pl-8"
                >
                  ডোনার
                </th>
                <th
                  scope="col"
                  className="hidden sm:table-cell px-3 py-4 text-left text-sm font-semibold text-emerald-800"
                >
                  সময়
                </th>
                <th
                  scope="col"
                  className="px-3 py-4 text-right text-sm font-semibold text-emerald-800 sm:pr-8"
                >
                  পরিমাণ
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-emerald-50 bg-white">
              {donors.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="py-12 text-center text-emerald-600/70"
                  >
                    খুজে পাওয়া যায় নি
                  </td>
                </tr>
              ) : (
                donors.map((donor, idx) => (
                  <tr
                    key={idx}
                    className={`
                      hover:bg-emerald-50/40 transition-colors
                      ${idx === 0 ? "bg-emerald-50/30 font-medium" : ""}
                    `}
                  >
                    {/* Donor Name + Icon */}
                    <td className="whitespace-nowrap py-3 pl-6 pr-3 sm:pl-8">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                            donor.name === "Anonymous"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-emerald-500 text-white"
                          }`}
                        >
                          {donor.name === "Anonymous" ? (
                            <User size={20} />
                          ) : (
                            <Heart size={20} fill="currentColor" />
                          )}
                        </div>
                        <div className="font-medium text-emerald-900">
                          {donor.name || "Anonymous donor"}
                          {idx === 0 && (
                            <span className="ml-2 inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                              সর্বশেষ
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Time - hidden on mobile, or show below name if you want */}
                    <td className="hidden whitespace-nowrap py-5 px-3 text-sm text-emerald-600 sm:table-cell">
                      <div className="flex items-center gap-1.5">
                        <Clock size={16} />
                        {
                          // যদি সময়ের পার্থক্য ২৪ ঘণ্টার বেশি হয়
                          moment().diff(moment(donor.date), "hours") > 24
                            ? moment(donor.date).format("DD MMM, YYYY") // শুধু ডেট দেখাবে (যেমন: 25 Jan, 2026)
                            : moment(donor.date).fromNow() // ২৪ ঘণ্টার কম হলে '2 hours ago' টাইপ দেখাবে
                        }
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="whitespace-nowrap py-5 pl-3 pr-6 text-right text-lg font-bold text-emerald-700 sm:pr-8">
                      ৳{donor.amount.toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* link to see all donors */}
        <div className="mt-8 text-center">
          <Link
            href="/donors"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
          >
            সব ডোনার দেখুন
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
