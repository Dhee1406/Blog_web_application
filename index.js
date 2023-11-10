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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
