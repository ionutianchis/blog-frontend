import React, { useEffect, useState }from 'react'
import Navbar from './components/Navbar';
import Posts from './components/Posts'
import './styles/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Fullpost from './components/Fullpost';

const App = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
      async function fetchData() {
        try {
          const res = await fetch('http://localhost:4000/api/posts')
          const resJson = await res.json()
          setPosts(resJson.posts)
        } catch (error) {
          console.error(error)
        }
      }
      fetchData()
    }, [])
    console.log(posts)
  return (
    <div className="container">
      <BrowserRouter basename='/'>
        <Navbar />

        <Routes>

          <Route exact path='/blog-api/' element={<Posts posts={posts}/>} />
          <Route exact path='/blog-api/:id' element={<Fullpost posts={posts}/>}/>
        </Routes>
      </BrowserRouter>
      
      
    
    </div>
  )
}

export default App;
