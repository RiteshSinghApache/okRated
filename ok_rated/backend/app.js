const express = require('express');
require('dotenv').config();
const app = express();
const authRoutes = require('./routes/auth.routes');

app.use(express.json());
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// const session = require('express-session');
// const passport = require('passport');

// app.use(session({ secret: 'sessionsecret', resave: false, saveUninitialized: false }));
// app.use(passport.initialize());
// app.use(passport.session());