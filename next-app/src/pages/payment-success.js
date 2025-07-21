// pages/payment-success.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PaymentSuccess from "@/components/PaymentSuccessComponent";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const { status } = router.query;
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (status === "success") {
      setMessage("🎉 Payment successful. Thank you for making payment.");
    } else if (status === "cancel") {
      setMessage("❌ Payment was canceled.");
    } else {
      setMessage("⚠️ Unknown payment status.");
    }
  }, [status]);
  
  return (
    <>
      <PaymentSuccess title="Payment Success" status={status} message={message} />
    </>
  );
}
