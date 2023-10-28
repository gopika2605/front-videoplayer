
import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import Allvideo from './pages/Allvideo';
import { Route, Routes } from 'react-router-dom';
import Nextpage from './pages/Nextpage'
import Watchhistory from './pages/Watchhistory';

function App() {
  return (
    <>
    <Header/>
   <div className="container m-5">
    <Routes>
      <Route path='/' element={<Allvideo/>}/>
      <Route path='/Nextpage' element={<Nextpage/>}/>
      <Route path='/watch-history' element={<Watchhistory/>}/>

    </Routes>
    </div>
    <Footer/>
    
    </>
  );
}

export default App;
