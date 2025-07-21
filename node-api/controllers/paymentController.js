const db = require("../config/db");

exports.initiatePayment = async (req, res) => {
  const { plan } = req.body;

  const PLANS = {
    basic: 1000,
    premium: 2000,
  };

  const amount = PLANS[plan];

  if (!amount) {
    return res.status(400).json({ message: "Invalid plan selected." });
  }

  try {
    // Save to DB before payment
    const [result] = await db.query(
      "INSERT INTO payments (plan, amount, status) VALUES (?, ?, ?)",
      [plan, amount, "success"]
    );

    const paymentId = result.insertId;

    // TODO: Integrate with Razorpay or Stripe here
    const payment_url = `http://localhost:4000/payment-success?status=success&payment_id=${paymentId}`;

    res.json({ payment_url });
  } catch (err) {
    console.error("Initiate Payment Error:", err);
    res.status(500).json({ message: "Server error while initiating payment" });
  }
};
