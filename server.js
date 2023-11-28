const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

const EMBED_ID = process.env.EMBED_ID;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

app.set("view engine", "html");
app.set("views", __dirname);
app.use(express.static(__dirname + "/public"));
app.engine("html", require("ejs").renderFile);

app.get("/", async (_req, res) => {
  const prefilledEmail = _req.query.userEmail;
  const email = prefilledEmail ? prefilledEmail : "unknown@flatfile.com";
  return res.render("index.html", {
    email: email,
    token: jwt.sign(
      {
        embed: EMBED_ID,
        user: {
          id: email,
          email: email,
          name: email,
        },
      },
      PRIVATE_KEY
    ),
  });
});

app.listen(process.env.PORT, "127.0.0.1");
