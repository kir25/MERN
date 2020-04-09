import Router from "express";
import Link from "../models/Link";
import auth from "../middleware/auth.middleware";
import config from "config";
const router = Router();

router.post("/generate", async (req, res) => {
  try {
    const baseUrl = config.get("baseUrl");
    const { from } = req.body;
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const links = awaitLink.find({ owner: req.user.userId });
    res.json(links);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/:id ", async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    res.json(link);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
