import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const port = 3000;

let posts = [];

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { posts });
});

app.get('/create', (req, res) => {
  res.render('createPost');
});
app.post('/submit', (req, res) => {
  const Id = posts.length +1;
  const Title = req.body["title"];
  const Content = req.body["content"];
  const newPost = {
    ID: Id,
    TITLE: Title,
    CONTENT: Content
  };
  posts.push(newPost);
  res.redirect('/');
});

app.get('/delete', (req, res) => {
  res.render('deletePost');
});
app.post('/delete', (req, res) => {
  const postId = Number(req.body.id); 
  const indexToDelete = posts.findIndex(post => post.ID === postId);

  if (indexToDelete !== -1) {
    posts.splice(indexToDelete, 1);
    for (let i = indexToDelete; i < posts.length; i++) {
      posts[i].ID--;
    }
    console.log(`Post with ID ${postId} deleted.`);
  } else {
    console.log(`Post with ID ${postId} not found.`);
  }
  res.redirect('/');
});

app.get('/edit', (req, res) => {
  res.render('editPost');
});
app.post('/edit', (req, res) => {
  const postId = Number(req.body.id);
  const updatedContent = req.body.content;

  const indexToEdit = posts.findIndex(post => post.ID === postId);

  if (indexToEdit !== -1) {
    posts[indexToEdit].CONTENT = updatedContent;
    console.log(`Post with ID ${postId} edited.`);
    console.log(posts);
  } else {
    console.log(`Post with ID ${postId} not found.`);
  }

  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
