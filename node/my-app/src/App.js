import React from 'react';

import Home from './pages/home.js';
import Aboutus from './pages/aboutus.js';
import Members from './pages/members.js';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />}></Route> 
                <Route path='/Aboutus' element={<Aboutus />}></Route>
                <Route path='/Members' element={<Members />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;