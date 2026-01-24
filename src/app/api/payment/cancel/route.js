import { redirect } from "next/navigation";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const txnId = searchParams.get("MerchantTransactionId") || "N/A";

  // Redirect with a specific 'Cancelled' message
  redirect(
    `/payment/error?msg=${encodeURIComponent("আপনি পেমেন্টটি বাতিল করেছেন।")}&txnId=${txnId}`,
  );
}
