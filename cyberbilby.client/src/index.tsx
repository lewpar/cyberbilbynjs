import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Blog from './pages/Blog';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Body from './components/layout/Body';

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
            </Routes>
        </Body>
        <Footer/>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
