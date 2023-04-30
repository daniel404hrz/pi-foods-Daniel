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
import { API_KEY } from './redux/actions';

const getDietsInfo =async()=> {
  
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=50`);
    const dietas = []
    const response = apiUrl.data.results.flatMap((receta) => receta.diets)
    apiUrl.data.results.forEach((receta) => {
      if (receta.vegetarian && !dietas.includes("vegetarian")) {
        dietas.push("vegetarian");
      }
    });
    response.forEach((element) => {
      if (element && !dietas.includes(element)) {
        dietas.push(element)
      }
    })
    return dietas
  
};

function App() {
  const [diets, setDiets]= useState([])

  
  useEffect(()=>{
    // !diets.length && axios.get('http://localhost:3001/diets')
    //     .then(response=>{
    //         setDiets(response.data)
    //     })
    async function fetchDiets() {
      const dietInfo = await getDietsInfo();
      setDiets(dietInfo);
    }
    fetchDiets();

  },[])
  
  
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
