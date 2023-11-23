const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers
const NoticeRouter = require("./routes/Notices");
app.use("/Notices", NoticeRouter);

const ListingsRouter = require("./routes/Listings");
app.use("/Listings", ListingsRouter);

const usersRouter = require("./routes/users");
app.use("/auth", usersRouter);

const buildingsRouter = require("./routes/Buildings");
app.use("/Buildings", buildingsRouter);

//const imageGalleryRoutes = require("./routes/imageGallery");
//app.use("/gallery", imageGalleryRoutes); // Use the router directly

const wishlistRouter = require("./routes/WishList");
app.use("/wishlist", wishlistRouter);

const NewsFeedRouter = require("./routes/Newsfeeds");
app.use("/NewsFeeds",NewsFeedRouter )

const applicationRouter = require("./routes/Applications");
app.use('/Applications', applicationRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
