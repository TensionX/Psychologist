const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const cookieSession = require("cookie-session");
const db = require("./helpers/DB");
const auth = require("./routes/auth");
const clients = require("./routes/clients");
const tests = require("./routes/tests");
const logger = require('logger-line-number')

const port = process.env.PORT || 4000;

app.use(
  cookieSession({
    name: "session",
    keys: ["token"],
  })
);

app.use(express.json());

// for deploy
app.use(cors({ credentials: true, origin: "*" }));

// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use("/api/auth", auth)
app.use("/api/clients", clients)
app.use("/api/tests", tests)

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message });
});

// for deploy
app.use("/", express.static(path.join(__dirname, "client", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});


server.listen(port, () => {
  logger.log(`Listening on port ${port}`)
});