import { addDonorFromEPS } from "@/actions/donors";
import { getEPSToken, verifyEPSPayment } from "@/actions/payment";
import { redirect } from "next/navigation";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const merchantTxnId = searchParams.get("MerchantTransactionId");

  if (!merchantTxnId) {
    redirect("/payment/error?msg=Missing transaction ID");
  }

  let verification;
  try {
    const token = await getEPSToken();
    verification = await verifyEPSPayment(token, merchantTxnId);
    console.log("Verification Result:", verification);
  } catch (error) {
    console.error("Payment Success Handling Error:", error);
    redirect("/payment/error?msg=Verification System Error");
  }
  if (verification?.success) {
    const { details } = verification;
    await addDonorFromEPS({
      name: details.CustomerName === "Guest" ? "" : details.CustomerName,
      amount: details.TotalAmount,
      medium: "website",
      message: "",
      transactionId: details.MerchantTransactionId,
    });
    redirect(`/success?txnId=${merchantTxnId}`);
  } else {
    const errorMsg = verification?.details?.ErrorMessage || "Payment Failed";
    redirect(`/payment/error?msg=${encodeURIComponent(errorMsg)}`);
  }
}
