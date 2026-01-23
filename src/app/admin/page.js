import { auth } from "@/auth";
import DonationChart from "@/components/DonationChart";
import { redirect } from "next/navigation";

export default async function NavigationPage() {
  const session = await auth();
  if (!session) return redirect("/login");

  return (
    <div className="min-h-screen bg-[#F7FCFA] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Grid */}

        <DonationChart />
      </div>
    </div>
  );
}
