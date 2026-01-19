// app/profile/page.tsx
import { auth } from "@/auth";
import ChangePasswordForm from "@/components/ChangePasswordForm";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/login");
  }

  await dbConnect();

  const user = await User.findOne({ email: session.user.email })
    .select("name email role createdAt")
    .lean();

  if (!user) {
    // Edge case: user deleted or session invalid
    redirect("/logout");
  }

  // Format join date nicely (you can use date-fns later if you want)
  const joinDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown";

  return (
    <div className="min-h-screen bg-gray-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            আপনার প্রোফাইল
          </h1>
          <p className="mt-3 text-gray-600">
            আপনার অ্যাকাউন্টের তথ্য দেখুন এবং পাসওয়ার্ড পরিবর্তন করুন
          </p>
        </div>

        <div className="space-y-8">
          {/* User Info Card */}
          <div className="bg-white shadow border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-6 py-5 border-b bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">
                ব্যক্তিগত তথ্য
              </h2>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    নাম
                  </label>
                  <p className="text-gray-900 font-medium">
                    {user.name || "—"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    ইমেইল
                  </label>
                  <p className="text-gray-900 font-medium break-all">
                    {user.email}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    যোগদানের তারিখ
                  </label>
                  <p className="text-gray-900">{joinDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Change Password Section */}
          <div className="bg-white shadow border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-6 py-5 border-b bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">
                পাসওয়ার্ড পরিবর্তন করুন
              </h2>
            </div>

            <div className="p-6">
              <ChangePasswordForm userId={user._id.toString()} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
