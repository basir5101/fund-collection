import DonationWrapper from "@/components/DonationWrapper";
import GalleryWrapper from "@/components/GalleryWrapper";
import Hero from "@/components/Hero";
import LatestDonorsMarquee from "@/components/LatestDonorsMarquee";
import { Loader } from "@/components/Loader";
import WhyCampaign from "@/components/WhyCampaign";
import { MOCK_DONORS } from "@/lib/constant";
import { Suspense } from "react";

export default async function page() {
  return (
    <div className="space-y-16 pb-20">
      <Hero />
      <Suspense fallback={<Loader />}>
        <DonationWrapper />
      </Suspense>
      <LatestDonorsMarquee donors={MOCK_DONORS} />
      <WhyCampaign />
      <Suspense fallback={<Loader />}>
        <GalleryWrapper />
      </Suspense>
    </div>
  );
}
