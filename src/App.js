import Header from './header';
import Nav from './nav';
import Footer from './footer';
import Home from './home';
import NewPost from './newPost';
import PostPage from './postPage';
import EditPost from './editPost';
import About from './about';
import Missing from './missing';
import { Route, Routes } from 'react-router-dom';
import { DataProvider } from './context/dataContext';

function App() {

  return (
    <div className="App">
      <DataProvider>
        <Header title="React JS Blog" />
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/post' element={<NewPost />} />
          <Route path='/edit/:id' element={<EditPost />} />
          <Route path='/post/:id' element={<PostPage />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<Missing />} />
        </Routes>
        <Footer />
      </DataProvider>
    </div>
  );
}

export default App;
