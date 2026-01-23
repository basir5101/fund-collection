import { getDonors } from "@/actions/donors";
import SearchDonors from "@/app/donors/SearchDonors";
import bankLogo from "@/assets/icons/bank.png";
import bkashLogo from "@/assets/icons/bkash.png";
import helpLogo from "@/assets/icons/help.png";
import nagadLogo from "@/assets/icons/nagad.png";
import rocketLogo from "@/assets/icons/rocket.png";
import websiteLogo from "@/assets/icons/website.png";
import { auth } from "@/auth";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Globe,
  Landmark,
} from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import DeleteDonorButton from "./DeleteDonorButton";
import DonorForm from "./DonorForm";

export default async function DonorsPage({ searchParams }) {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }
  const role = session.user.role;
  const params = await searchParams;
  const page = parseInt(params.page) || 1;
  const search = params.search || "";

  const { donors, totalPages, currentPage } = await getDonors(page, 30, search);

  // Define payment mediums and their display info
  const paymentMethods = {
    bkash: {
      name: "বিকাশ",
      logo: bkashLogo,
      color: "bg-pink-100 text-pink-700 border-pink-200",
    },
    nagad: {
      name: "নগদ",
      logo: nagadLogo,
      color: "bg-orange-100 text-orange-700 border-orange-200",
    },
    rocket: {
      name: "রকেট",
      logo: rocketLogo,
      color: "bg-purple-100 text-purple-700 border-purple-200",
    },
    bank: {
      name: "ব্যাংক ট্রান্সফার",
      logo: bankLogo,
      color: "bg-blue-100 text-blue-700 border-blue-200",
    },
    website: {
      name: "ওয়েবসাইট",
      logo: websiteLogo,
      color: "bg-teal-100 text-teal-700 border-teal-200",
    },
    campaign: {
      name: "ক্যাম্পেইন",
      logo: helpLogo,
      color: "bg-yellow-100 text-yellow-700 border-yellow-200",
    },
  };

  // Helper to get method display info
  const getMethodInfo = (medium) => {
    return (
      paymentMethods[medium?.toLowerCase()] || {
        name: medium || "অজানা",
        logo: null,
        color: "bg-gray-100 text-gray-700 border-gray-200",
      }
    );
  };

  return (
    <div className="min-h-screen bg-[#F7FCFA] py-2 px-4">
      <div className="max-w-4xl mx-auto">
        <DonorForm />

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-green-800">ডোনার লিস্ট</h2>
        </div>
        <SearchDonors />

        <div className="space-y-1">
          {/* Donors List */}
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
                    className="sm:table-cell px-3 py-4 text-left text-sm font-semibold text-emerald-800"
                  >
                    Method
                  </th>
                  <th
                    scope="col"
                    className="sm:table-cell px-3 py-4 text-left text-sm font-semibold text-emerald-800"
                  >
                    TNX_ID
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-4 text-right text-sm font-semibold text-emerald-800 sm:pr-8"
                  >
                    পরিমাণ
                  </th>
                  <th
                    scope="col"
                    className="sm:table-cell px-3 py-4 text-left text-sm font-semibold text-emerald-800"
                  >
                    সময়
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-4 text-right text-sm font-semibold text-emerald-800 sm:pr-8"
                  >
                    অ্যাকশন
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
                      এখনো কোনো ডোনেশন আসেনি
                    </td>
                  </tr>
                ) : (
                  donors.map((donor, idx) => {
                    const methodInfo = getMethodInfo(donor.medium);
                    return (
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
                            <div className="font-medium text-emerald-900">
                              {donor.name || "বেনামী"}
                              {idx === 0 && (
                                <span className="ml-2 inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                                  সর্বশেষ
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="whitespace-nowrap py-3 px-3 text-sm text-emerald-600 sm:table-cell">
                          <div className="flex items-center gap-2">
                            {methodInfo.logo ? (
                              <div
                                className={`h-9 w-9 p-1 rounded-md border ${methodInfo.color}`}
                              >
                                <Image
                                  src={methodInfo.logo}
                                  width={28}
                                  height={28}
                                  alt={`${methodInfo.name} logo`}
                                  className="w-full h-full"
                                />
                              </div>
                            ) : (
                              <div
                                className={`flex h-9 w-9 items-center justify-center rounded-md border ${methodInfo.color}`}
                              >
                                {donor.medium === "bank" ? (
                                  <Landmark size={20} />
                                ) : donor.medium === "website" ? (
                                  <Globe size={20} />
                                ) : (
                                  <span className="text-xs font-bold">
                                    {methodInfo.name?.charAt(0)}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </td>
                        {/* Transaction ID */}
                        <td className="whitespace-nowrap py-3 px-3 text-sm text-emerald-600 sm:table-cell">
                          {donor.transactionId || "-"}
                        </td>

                        {/* Amount */}
                        <td className="whitespace-nowrap py-3 pl-3 pr-6 text-right font-bold text-emerald-700 sm:pr-8">
                          ৳{donor.amount.toLocaleString()}
                        </td>
                        {/* Time - hidden on mobile, or show below name if you want */}
                        <td className="whitespace-nowrap py-3 px-3 text-sm text-emerald-600 sm:table-cell">
                          <div className="flex items-center gap-1.5">
                            <Clock size={16} />
                            {moment(donor.date).fromNow()}
                          </div>
                        </td>
                        <td className="whitespace-nowrap py-4 pr-6 text-right text-sm font-medium">
                          {role === "admin" && (
                            <DeleteDonorButton id={donor._id} />
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center space-x-4 mt-12">
          <Link
            href={`?page=${Math.max(1, currentPage - 1)}`}
            className={`p-3 rounded-full bg-white border border-emerald-100 ${
              currentPage === 1
                ? "opacity-30 pointer-events-none"
                : "hover:bg-emerald-50"
            }`}
          >
            <ChevronLeft className="text-emerald-600" />
          </Link>

          <span className="font-bold text-emerald-900">
            পেজ {currentPage} / {totalPages}
          </span>

          <Link
            href={`?page=${Math.min(totalPages, currentPage + 1)}`}
            className={`p-3 rounded-full bg-white border border-emerald-100 ${
              currentPage === totalPages
                ? "opacity-30 pointer-events-none"
                : "hover:bg-emerald-50"
            }`}
          >
            <ChevronRight className="text-emerald-600" />
          </Link>
        </div>
      </div>
    </div>
  );
}
