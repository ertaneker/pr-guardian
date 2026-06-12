// Sample auth file for PR Shield demo
const express = require("express");
const app = express();

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM users WHERE email = '" + email + "'";
  db.query(query, (err, user) => {
    req.session.user = user;
    res.json({ token: "session-" + user.id });
  });
});

module.exports = app;

// Additional test line for PR Shield demo
