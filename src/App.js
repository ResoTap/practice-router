import Header from './header';
import Nav from './nav';
import Footer from './footer';
import Home from './home';
import NewPost from './newPost';
import PostPage from './postPage';
import About from './about';
import Missing from './missing';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from './api/posts';

function App() {
  const [posts, setPosts] = useState([]);

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const history = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch(err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }

    fetchPosts();
  }, [])

  useEffect(() => {
    const filteredResults = posts.filter(post => 
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));

      setSearchResults(filteredResults.reverse());
  },[posts, search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      const response = await api.post('/post', newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      history('/');
    } catch(err) {
      console.log(`Error: ${err.message}`);
    }
  }

  const handleDelete = (id) => {
    const postsList = posts.filter(post => post.id !== id);
    setPosts(postsList);
    history('/')
  }

  return (
    <div className="App">
      <Header title="React JS Blog" />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path='/' element={<Home posts={searchResults} />} />
        <Route path='/post' element={<NewPost
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />}
        />
        <Route path='/post/:id' element={<PostPage posts={posts} handleDelete={handleDelete} />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
