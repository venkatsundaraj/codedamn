import logo from './logo.svg';
import './App.css';
import Register from './components/Register';
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './components/Login';
import Dashboard from './components/Quote';

function App() {
  return (
      
    <BrowserRouter>
          <Routes>
            <Route exact path='/register' element={<Register/>}/>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/quote' element={<Dashboard/>}/>
          </Routes>
    </BrowserRouter>
     
  );
}

export default App;
