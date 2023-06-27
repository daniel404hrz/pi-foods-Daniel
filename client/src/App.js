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
    axios.get('https://food-api-1vap.onrender.com/diets')
    
        .then(response=>{
          
          setDiets(response.data)
        }).catch(err=>alert('Error '+ err.message))
    

  },[])
  
  
  const {pathname} = useLocation()
  return (
    <div >
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
