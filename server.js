import express from "express";
import mongoose from "mongoose";
import ShortUrl from "./models/urlShort.js";

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/urlshort",
      {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      }
    );
    console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
};
connectDB();
const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.post("/shortUrls", async (req, res) => {
  // res.send("Hello ShortUrl");
  await ShortUrl.create({ full: req.body.fullUrl });
  res.redirect("/");
});
app.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.render("index", { shortUrls: shortUrls });
});

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks++;
  shortUrl.save();

  res.redirect(shortUrl.full);
});
app.listen(process.env.PORT || 5000);
// console.log(app);
