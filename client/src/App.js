
import  Todo from './pages/Todo'
import Register from './pages/Register';
import Login from './pages/Login';
import Secret from './pages/Secret';
import { BrowserRouter,Route, Routes } from 'react-router-dom';


function App() {


 ;
  return (
    <>
     
    <BrowserRouter>
      <Routes>
      <Route exact path='/' element={<Todo/>} />
        <Route exact path='/register' element={<Register/>} /> 
        <Route exact path='/login' element={<Login/>} /> 
       <Route exact path='/secret' element={<Secret/>} />  
           </Routes>
    </BrowserRouter>
     
   
     
    
    </>
       
  );
}

export default App;
