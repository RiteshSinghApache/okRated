const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const path = require('path');

// Load environment variables
dotenv.config();
// Initialize Express app
const app = express();

// Base URL for CORS
const WEB_BASEURL = process.env.WEB_BASEURL || "http://localhost:4000";
// ✅ Middleware Setup
app.use(cors({
  origin: WEB_BASEURL,
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Serve Static Files (QR Code images, etc.)
app.use("/qr_code", express.static(path.join(__dirname, "qr_code")));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const commonRoutes = require("./routes/commonRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/common", commonRoutes);
app.use("/api/payment", paymentRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
