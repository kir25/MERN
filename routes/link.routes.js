import Router from "express";
import Link from "../models/Link";
import auth from "../middleware/auth.middleware";
import config from "config";
import shortid from "shortid";
const router = Router();

router.post("/generate", auth, async (req, res) => {
  try {
    const baseUrl = config.get("baseUrl");
    const { from } = req.body;

    const code = shortid.generate();

    const exist = await Link.findOne({ from });
    if (exist) {
      return res.json({ link: exist });
    }

    const to = baseUrl + "/t/" + code;

    const link = await Link.create({
      code,
      to,
      from,
      owner: req.user.userId,
    });

    await link.save();

    res.status(201).json({ link });
  } catch (e) {
    res.status(500).json({ message: "Something went wr" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json(links);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/:id ", auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    res.json(link);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
