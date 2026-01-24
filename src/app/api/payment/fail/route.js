import { redirect } from "next/navigation";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  // EPS usually sends the reason in 'ErrorMessage' or 'Status'
  const reason =
    searchParams.get("ErrorMessage") ||
    "পেমেন্ট ব্যর্থ হয়েছে। আবার চেষ্টা করুন।";
  const txnId = searchParams.get("MerchantTransactionId") || "N/A";

  // Redirect to your Error Page with the reason
  redirect(`/payment/error?msg=${encodeURIComponent(reason)}&txnId=${txnId}`);
}
