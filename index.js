const message = "変更したよ〜〜〜";
const path = require("path");
const express = require("express");
const app = express();
const redditData = require("./data.json");

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// app.use((req, res) => {
//   console.log("リクエストを受け付けました！！");
//   res.send("リクエストを受けたので、レスポンスを返します！！");
//   res.send({color: 'red'});
//   res.send('<h1>はじめてのWebページ</h1>');
// });

app.get("/", (req, res) => {
  res.render("home.ejs");
});
app.get("/r/:subreddit", (req, res) => {
  const { subreddit } = req.params;
  const data = redditData[subreddit];
  if (data) {
    res.render("subreddit", { ...data });
  } else {
    res.render("notfound", { subreddit });
  }
});

app.get("/rand", (req, res) => {
  const num = Math.floor(Math.random() * 10) + 1;
  res.render("random.ejs", { num });
});

app.get("/cats", (req, res) => {
  const cats = ["たま", "クロ", "ハナ"];
  res.render("cats", { cats });
});

// app.get("/cats", (req, res) => {
//   // console.log("/catsにリクエストが来ました！");
//   res.send("にゃー");
// });

// app.get("/dogs", (req, res) => {
//   res.send("わんわん！！");
// });

// app.get("/", (req, res) => {
//   res.send("ここはホームページ");
// });

// app.get("/r/:subreddit", (req, res) => {
//   const { subreddit } = req.params;
//   res.send(`<h1>${subreddit} subredditのページ</h1>`);
// });

// app.get("/r/:subreddit/:postId", (req, res) => {
//   const { subreddit, postId } = req.params;
//   res.send(`<h1>${subreddit} subredditで、postIdが${postId}のページ</h1>`);
// });

// app.get("/search", (req, res) => {
//   const { q } = req.query;
//   if (!q) {
//     res.send("検索するものが指定されていません");
//   } else {
//     res.send(`<h1>${q}の検索結果</h1>`);
//   }
// });

// app.get("*", (req, res) => {
//   res.send("そんなパスは知らない！！");
// });

app.listen(3000, () => {
  console.log("リクエストをポート3000で待受中... ");
});
