const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('./db');
require('dotenv').config();
const passport = require('passport');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  const email = profile.emails[0].value;
  let user;

  const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [email]);
  if (rows.length === 0) {
    await db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [email, '', 'user']);
    const [newUser] = await db.query('SELECT * FROM users WHERE username = ?', [email]);
    user = newUser[0];
  } else {
    user = rows[0];
  }

  return done(null, user);
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  done(null, rows[0]);
});
