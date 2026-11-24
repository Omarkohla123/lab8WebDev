const express = require("express");
const app = express();
app.use(express.json());
const posts = [];

//Create 
app.post("/posts", (req, res) => {
  // receive a JSON payload like {"title": "...", "content": "..."}
  const post = {
    title: req.body["title"],
    content: req.body["content"]
  };
  console.log(`Adding this new post ${JSON.stringify(post)}`);
  posts.push(post);
  console.log(`Posts: ${JSON.stringify(posts)}`);
  res.status(201);
  res.end();
});



//Get all posts
app.get("/posts", (req, res) => {
  res.status(200).json(posts);
  console.log(`Posts retrieved: ${JSON.stringify(posts)}`);
}); 
//Get a specific post by title
app.get("/posts/:title", (req, res) => {
  const title = req.params.title;
    const post = posts.find((p) => p.title === title);
    if (post) {
        res.status(200).json(post);
          console.log(`Post retrieved: ${JSON.stringify(post)}`);

    } else {
        res.status(404).json({ error: "Post not found" });
    }
});


    //Update a specific post by title
app.put("/posts/:title", (req, res) => {
  const title = req.params.title;
    const postIndex = posts.findIndex((p) => p.title === title);
    if (postIndex !== -1) {
        console.log(`Post before update: ${JSON.stringify(posts[postIndex])}`);
        posts[postIndex] = {
            title: req.body["title"],
            content: req.body["content"]
        };
        
        res.status(200).json(posts[postIndex]);
          console.log(`Post updated: ${JSON.stringify(posts[postIndex])}`);

    } else {
        res.status(404).json({ error: "Post not found" });
    }
});

//Delete a specific post by title   
app.delete("/posts/:title", (req, res) => {
  const title = req.params.title;
    const postIndex = posts.findIndex((p) => p.title === title);            

    if (postIndex !== -1) { 
        console.log(`Post deleted: ${JSON.stringify(posts[postIndex])}`);
        posts.splice(postIndex, 1);
        res.status(200).json({ message: "Post deleted successfully" });

    } else {
        res.status(404).json({ error: "Post not found" });
    }       
});







app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

