import { Routes, Route } from 'react-router-dom';
import Landing from './components/Paginas/LandingPage/Landing';
import Home from './components/Paginas/Home/Home';
import { useLocation } from 'react-router-dom';
import ScrollToTop from './components/Paginas/Tools/scroll_0';
import SearchBar from './components/Paginas/SearchBar/SearchBar';
import DetailPage  from './components/Paginas/Detail/DetailPage';
import { Form } from './components/Paginas/form/form';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
function App() {
  const [diets, setDiets]= useState([])
  
  useEffect(()=>{
    !diets.length && axios.get('http://localhost:3001/diets')
        .then(response=>{
            setDiets(response.data)
        })

  },[diets])
  
  
  const {pathname} = useLocation()
  return (
    <div className="App">
      {pathname !== '/' && <SearchBar/>}
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Landing />}/>
        <Route path='/home' element={<Home diets={diets}/>}/>
        <Route path='/detail/:id' element={<DetailPage/>}/>
        <Route path='/form' element={<Form diets={diets}/>}/>
      </Routes>
    
   
    </div>
  );
}

export default App;
