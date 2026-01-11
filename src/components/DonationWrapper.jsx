import { getDonationStatsByMedium } from "@/actions/donors";
import { getEvent } from "@/actions/event";
import DonationStatus from "./DonationStatus";

export default async function DonationWrapper() {
  const result = await getDonationStatsByMedium();
  const event = await getEvent();
  const stats = result.success ? result.data : [];
  return <DonationStatus stats={stats} event={event} />;
}
