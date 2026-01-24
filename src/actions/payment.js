"use server";
import { createHmac } from "crypto";

export async function generateEPSHash(data, hashKey) {
  // Step 1 & 2: Create HMACSHA512 with the UTF8 encoded key
  const hmac = createHmac("sha512", hashKey);

  // Step 3: Compute hash using the target data (UserID or TransactionID)
  hmac.update(data);

  // Step 4: Return Base64 string
  return hmac.digest("base64");
}

export async function getEPSToken() {
  const hash = await generateEPSHash(
    process.env.EPS_USERNAME,
    process.env.EPS_HASH_KEY,
  );

  const response = await fetch(
    "https://sandboxpgapi.eps.com.bd/v1/Auth/GetToken",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hash": hash,
      },
      body: JSON.stringify({
        userName: process.env.EPS_USERNAME,
        password: process.env.EPS_PASSWORD,
      }),
    },
  );

  const data = await response.json();
  return data.token; // Valid JWT for subsequent calls
}

export async function initiateEPSPayment(token, paymentData) {
  try {
    const { orderId, amount, customerData = {} } = paymentData;

    // merchantTransactionId: minimum 10 digits, must be unique, using timestamp for simplicity with "D4S" prefix and remove years to ensure length and 1 random digit at last
    const merchantTxnId = `D4S${Date.now().toString().slice(2)}${Math.floor(
      Math.random() * 10,
    )}`;

    const xHash = await generateEPSHash(
      merchantTxnId,
      process.env.EPS_HASH_KEY,
    );

    const body = {
      merchantId: process.env.EPS_MERCHANT_ID, //
      storeId: process.env.EPS_STORE_ID, //
      CustomerOrderId: orderId || "Order123", //
      merchantTransactionId: merchantTxnId, //
      transactionTypeId: 1, // 1 = Web [cite: 14, 59]
      totalAmount: amount || 1.0, //

      // Required internal fields [cite: 81-85]
      financialEntityId: 0,
      transitionStatusId: 0,
      ipAddress: "161.248.189.80",
      version: "1",

      successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/success`, // [cite: 59, 74]
      failUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/fail`, // [cite: 59, 74]
      cancelUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/cancel`, // [cite: 59, 74]

      customerName: customerData.name || "John Doe", //
      customerEmail: customerData.email || "user@example.com", // [cite: 60]
      customerAddress: customerData.address || "Dhaka, BD", // [cite: 60]
      customerCity: customerData.city || "Dhaka", // [cite: 60]
      customerState: customerData.state || "Dhaka", // [cite: 60]
      customerPostcode: customerData.postcode || "1200", // [cite: 60]
      customerCountry: "BD", // [cite: 60]
      customerPhone: customerData.phone || "01700000000", // [cite: 60]

      productName: "Order Payment", // [cite: 60]
      productProfile: "general", // [cite: 60]
      productCategory: "Service", // [cite: 60]
    };

    const response = await fetch(
      "https://sandboxpgapi.eps.com.bd/v1/EPSEngine/InitializeEPS", // Correct Endpoint
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-hash": xHash, // [cite: 67, 150]
          Authorization: `Bearer ${token}`, // [cite: 67]
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("EPS API Error Detail:", errorData);
      throw new Error(`EPS API returned ${response.status}`);
    }

    return await response.json(); // Returns { TransactionId, RedirectURL, ... } [cite: 130-132]
  } catch (error) {
    console.error("Payment Initiation Error:", error);
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function verifyEPSPayment(token, merchantTxnId) {
  try {
    // 1. Generate hash using the merchantTransactionId string [cite: 139-140]
    const xHash = await generateEPSHash(
      merchantTxnId,
      process.env.EPS_HASH_KEY,
    );

    // 2. Call the Verify Transaction API [cite: 141]
    // Try both casing if one fails, but usually, it's camelCase for the API
    const response = await fetch(
      `https://sandboxpgapi.eps.com.bd/v1/EPSEngine/CheckMerchantTransactionStatus?merchantTransactionId=${merchantTxnId}`,
      {
        method: "GET",
        headers: {
          "x-hash": xHash, // Generated using merchant TransactionId [cite: 150]
          Authorization: `Bearer ${token}`, // Bearer token from 1st API
        },
      },
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Verification API Raw Error:", errorBody);
      throw new Error(`Verification request failed: ${response.status}`);
    }

    const data = await response.json();

    // Status should be "Success"
    return {
      success: data.Status === "Success",
      details: data,
    };
  } catch (error) {
    console.error("Verification Error:", error);
    return { success: false, message: error.message };
  }
}
