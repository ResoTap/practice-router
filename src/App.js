import Header from './header';
import Nav from './nav';
import Footer from './footer';
import Home from './home';
import NewPost from './newPost';
import PostPage from './postPage';
import About from './about';
import Missing from './missing';
import { Route, Routes, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/post' element={<NewPost />} />
        <Route path='/post/:id' element={<PostPage />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
