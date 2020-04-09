import express from "express";
import config from "config";
import mongoose from "mongoose";
import routerAuth from "./routes/auth.routes";
import routerLink from "./routes/link.routes";

const app = express();

app.use(express.json({ extended: true }));
app.use("/api/auth", routerAuth);
app.use("/api/link", routerLink);

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
