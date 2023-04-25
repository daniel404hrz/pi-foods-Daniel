import { Routes,Route } from 'react-router-dom';
import Landing from './components/Paginas/LandingPage/Landing';
import Home from './components/Paginas/Home/Home';
import { useLocation } from 'react-router-dom';
import ScrollToTop from './components/Paginas/Tools/scroll_0';
import SearchBar from './components/Paginas/SearchBar/SearchBar';
import DetailPage  from './components/Paginas/Detail/DetailPage';
import { Form } from './components/Paginas/form/form';
function App() {
  
  const {pathname} = useLocation()
  return (
    <div className="App">
      {pathname !== '/' && <SearchBar/>}
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Landing />}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/detail/:id' element={<DetailPage/>}/>
        <Route path='/form' element={<Form/>}/>
      </Routes>
    
   
    </div>
  );
}

export default App;
