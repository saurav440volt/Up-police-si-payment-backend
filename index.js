import express from "express";
import Razorpay from "razorpay";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// 🔑 Razorpay keys (Render → Environment Variables me dalna)
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// --------------------------------------------
// ✅ Create Razorpay order (AUTO-CAPTURE)
// --------------------------------------------
app.post("/create-order", async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const options = {
      amount: amount * 100,
      currency: currency || "INR",
      payment_capture: 1   // ← AUTO CAPTURE ENABLED
    };

    const order = await razorpay.orders.create(options);
    res.json(order);

  } catch (err) {
    console.log("Order error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// --------------------------------------------
// TEST route
// --------------------------------------------
app.get("/", (req, res) => {
  res.send("Razorpay Backend Working...");
});

// --------------------------------------------
// Server start
// --------------------------------------------
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
