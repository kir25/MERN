import express from "express";
import config from "config";
import mongoose from "mongoose";
import routerAuth from "./routes/auth.routes";
import routerLink from "./routes/link.routes";
import routerRedirect from "./routes/redirect.routes";
import path from "path";
import { resolve } from "dns";
const app = express();

app.use(express.json({ extended: true }));
app.use("/api/auth", routerAuth);
app.use("/api/link", routerLink);
app.use("/t", routerRedirect);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path, resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = config.get("port") || 5000;

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.listen(5000, () => console.log(`App has been started on port ${PORT}`));
  } catch (err) {
    console.log("Server error", err.message);
    process.exit(1);
  }
}

start();
