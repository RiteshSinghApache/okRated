import { useRouter } from "next/router";
import { useState } from "react";
import api from "@/utils/api"; // axios instance

export default function PaymentGatewayComponent() {
  const router = useRouter();
  const { plan } = router.query;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const PRICES = {
    basic: 1000,
    premium: 2000,
  };

  const handlePayment = async () => {
    const amount = PRICES[plan];
    if (!amount) return setError("Invalid plan selected.");

    setLoading(true);
    try {
      const res = await api.post("/payment/initiate", { plan });
      window.location.href = res.data.payment_url;
    } catch (err) {
      console.error(err);
      setError("Failed to initiate payment.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/payment-success?status=cancel");
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Confirm your {plan} plan payment</h2>
      <p className="text-center">Amount: ₹{PRICES[plan] || "N/A"}</p>

      {error && <p className="text-danger text-center">{error}</p>}

      <div className="text-center mt-4">
        <button className="btn btn-success me-3" onClick={handlePayment} disabled={loading}>
          {loading ? "Processing..." : "Make Payment"}
        </button>
        <button className="btn btn-outline-danger" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
