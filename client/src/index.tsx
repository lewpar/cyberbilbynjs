import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Blog from './pages/Blog';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Body from './components/layout/Body';
import Register from './pages/Register';
import Login from './pages/Login';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Header/>
        <Body>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/blog" element={<Blog/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/login" element={<Login/>} />
            </Routes>
        </Body>
        <Footer/>
    </BrowserRouter>
  </React.StrictMode>
);
