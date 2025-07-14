const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/jwt");
const { generateOTP } = require("../utils/otp");
const { v4: uuidv4 } = require('uuid');

const uniqueKey = uuidv4();
console.log(uniqueKey); // Example: 'f9b3279c-7a02-4cbb-9f5c-c8e849f6e4f0'


function isOtpExpired(createdAt) {
  const created = new Date(createdAt).getTime();
  const now = Date.now();
  return now - created > 5 * 60 * 1000;
}

exports.sentOtp = async (req, res) => {
  const { phone } = req.body || {};
  if (!phone) return res.status(400).json({ message: "Phone is required" });

  const otp = generateOTP();

  try {
    const [existing] = await db.query(
      "SELECT * FROM new_otps WHERE phone = ? ORDER BY created_at DESC LIMIT 1",
      [phone]
    );

    if (existing.length) {
      const lastSent = new Date(existing[0].created_at).getTime();
      const now = Date.now();
      const diff = (now - lastSent) / 1000;
      if (diff < 60) {
        return res
          .status(429)
          .json({ message: `Wait ${60 - Math.floor(diff)}s before requesting again.` });
      }
      await db.query("DELETE FROM new_otps WHERE phone = ?", [phone]);
    }

    await db.query(
      "INSERT INTO new_otps (phone, otp, retry_count) VALUES (?, ?, 0)",
      [phone, otp]
    );
    console.log(`OTP for ${phone} is ${otp}`);
    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

exports.verifyOtp = async (req, res) => {
  const { phone, otp } = req.body || {};
  if (!phone || !otp)
    return res.status(400).json({ message: "Phone and OTP required" });

  try {
    const [rows] = await db.query(
      "SELECT * FROM new_otps WHERE phone = ? ORDER BY created_at DESC LIMIT 1",
      [phone]
    );
    if (!rows.length)
      return res.status(400).json({ message: "No OTP found" });

    const record = rows[0];

    if (isOtpExpired(record.created_at)) {
      await db.query("DELETE FROM new_otps WHERE phone = ?", [phone]);
      return res.status(400).json({ message: "OTP expired" });
    }

    if (record.otp !== otp) {
      await db.query("UPDATE new_otps SET retry_count = retry_count + 1 WHERE id = ?", [record.id]);
      return res.status(400).json({ message: "Invalid OTP" });
    }

    //await db.query("DELETE FROM new_otps WHERE phone = ?", [phone]);

    let user;
    let isNewUser = false;

    const [users] = await db.query(
      "SELECT id, phone FROM new_users WHERE phone = ?",
      [phone]
    );

    if (users.length > 0) {
      user = users[0];
      await db.query("UPDATE new_users SET signup_method = 'otp', status = 1 WHERE id = ?", [user.id]);
    } else {
      const uniqueKey = uuidv4();
      const [result] = await db.query(
        "INSERT INTO new_users (phone, signup_method, status, unique_key) VALUES (?, ?, ?, ?)",
        [phone, "otp", 1, uniqueKey]
      );
      user = { id: result.insertId, phone };
      isNewUser = true;
    }

    const accessToken = generateAccessToken({ id: user.id });
    const refreshToken = generateRefreshToken({ id: user.id });
    
    // Set tokens as cookies
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.cookie("token", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,
      });

      // 👇 Send tokens explicitly in the response body
      res.json({ 
        message: "OTP verified successfully", 
        user: {
          id: user.id,
          phone: user.phone,
          name: user.name || null,
          email: user.email || null
        },
        token: accessToken,
        refreshToken,
        isNewUser 
      });

  } catch (err) {
    console.error("❌ OTP verification failed:", err.message);
    res.status(500).json({ message: "OTP verification failed", error: err.message });
  }
};

// exports.verifyOtp = async (req, res) => {
//   const { phone, otp } = req.body || {};
//   if (!phone || !otp)
//     return res.status(400).json({ message: "Phone and OTP required" });

//   try {
//     const [rows] = await db.query(
//       "SELECT * FROM new_otps WHERE phone = ? ORDER BY created_at DESC LIMIT 1",
//       [phone]
//     );
//     if (!rows.length)
//       return res.status(400).json({ message: "No OTP found" });

//     const record = rows[0];

//     if (isOtpExpired(record.created_at)) {
//       await db.query("DELETE FROM new_otps WHERE phone = ?", [phone]);
//       return res.status(400).json({ message: "OTP expired" });
//     }

//     if (record.otp !== otp) {
//       await db.query("UPDATE new_otps SET retry_count = retry_count + 1 WHERE id = ?", [
//         record.id,
//       ]);
//       return res.status(400).json({ message: "Invalid OTP" });
//     }

//     let user;
//     let isNewUser = false;
//     const [users] = await db.query(
//       "SELECT id, name, email, phone, rool, created_at FROM new_users WHERE phone = ? AND status = ?",
//       [phone, 1]
//     );

//     if (users.length > 0) {
//       user = users[0];
//       console.log(`✅ Existing user logged in: ${user.phone}`);
//     } else {
//       const [result] = await db.query(
//         "INSERT INTO new_users (phone, signup_method, status) VALUES (?, ?, ?)",
//         [phone, "otp", 1]
//       );
//       user = { id: result.insertId, phone };
//       isNewUser = true;
//       console.log(`✅ New user registered with ID ${user.id}`);
//     }

//     await db.query("DELETE FROM new_otps WHERE phone = ?", [phone]);

//     const accessToken = generateAccessToken({ id: user.id });
//     const refreshToken = generateRefreshToken({ id: user.id });

//     res
//       .cookie("refreshToken", refreshToken, {
//         httpOnly: true,
//         secure: false,
//         sameSite: "lax",
//         maxAge: 7 * 24 * 60 * 60 * 1000,
//       })
//       .cookie("token", accessToken, {
//         httpOnly: true,
//         secure: false,
//         sameSite: "lax",
//         maxAge: 15 * 60 * 1000,
//       })
//       .json({ message: "OTP verified successfully", user, isNewUser });
//   } catch (err) {
//     console.error("❌ OTP verification failed:", err.message);
//     res.status(500).json({ message: "OTP verification failed", error: err.message });
//   }
// };

exports.googleLogin = async (req, res) => {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name } = payload;

    db.query("SELECT * FROM new_users WHERE email = ?", [email], async (err, users) => {
      if (err) return res.status(500).json({ message: "DB error", error: err.message });

      let user = users[0];
      let isNewUser = false;

      if (user) {
        await db.query("UPDATE new_users SET name = ?, signup_method = 'google' WHERE id = ?", [name, user.id]);
      } else {
        const uniqueKey = uuidv4();
        const [result] = await db.query("INSERT INTO new_users (email, name, signup_method, status, unique_key) VALUES (?, ?, ?, ?, ?)", [email, name, "google", 1, uniqueKey]);
        user = { id: result.insertId, email, name };
        isNewUser = true;
      }

      const accessToken = generateAccessToken({ id: user.id });
      const refreshToken = generateRefreshToken({ id: user.id });

      res
        // .cookie("refreshToken", refreshToken, {
        //   httpOnly: true,
        //   secure: false,
        //   sameSite: "lax",
        //   maxAge: 7 * 24 * 60 * 60 * 1000,
        // })
        // .cookie("token", accessToken, {
        //   httpOnly: true,
        //   secure: false,
        //   sameSite: "lax",
        //   maxAge: 15 * 60 * 1000,
        // })
        .json({ message: "Google login successful", user, isNewUser });
    });

  } catch (err) {
    console.error("Google login error:", err);
    return res.status(401).json({ message: "Invalid Google token" });
  }
};


// exports.googleLogin = async (req, res) => {
//   const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
//   const { token } = req.body;

//   try {
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });
//     const payload = ticket.getPayload();
//     const { email, name } = payload;

//     db.query("SELECT * FROM new_users WHERE email = ?", [email], (err, users) => {
//       if (err) return res.status(500).json({ message: "DB error", error: err.message });

//       let user = users[0];
//       let isNewUser = false;

//       if (user) {
//         issueTokens(user, res, isNewUser);
//       } else {
//         db.query(
//           "INSERT INTO new_users (email, name) VALUES (?, ?)",
//           [email, name],
//           (err, result) => {
//             if (err) return res.status(500).json({ message: "Failed to create user", error: err.message });
//             user = { id: result.insertId, email, name };
//             isNewUser = true;
//             issueTokens(user, res, isNewUser);
//           }
//         );
//       }
//     });
//   } catch (err) {
//     console.error("Google login error:", err);
//     return res.status(401).json({ message: "Invalid Google token" });
//   }
// };

function issueTokens(user, res, isNewUser = false) {
  const accessToken = generateAccessToken({ id: user.id });
  const refreshToken = generateRefreshToken({ id: user.id });

  res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .cookie("token", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    })
    .json({ user, isNewUser });
}

exports.refreshToken = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "No refresh token" });

  jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });
    const accessToken = generateAccessToken({ id: user.id });
    // res.cookie("token", accessToken, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: "lax",
    //   maxAge: 15 * 60 * 1000,
    // });
    return res.json({ message: "Access token refreshed", accessToken });
  });
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully" });
};


exports.register = async (req, res) => {
  const { name, email, password } = req.body || {};
  const hash = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hash],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, email });
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body || {};
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ message: "Invalid credentials" });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    //res.cookie("token", token, { httpOnly: true, maxAge: 604800000 }); // 7 days
    res.json({ user: { id: user.id, email: user.email, name: user.name } });
  });
};

