import { Route, Routes } from "react-router-dom";

import Body from "./components/layout/Body";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Blog from "./pages/Blog";
import Home from "./pages/Home";
import Test from "./pages/Test";

export default function App() {
    return (
        <div className="flex-1 flex flex-col">
            <Header/>
            <Body>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/blog" element={<Blog/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/login" element={<Login/>} />

                    <Route path="/test" element={ <ProtectedRoute><Test/></ProtectedRoute> }  />
                </Routes>
            </Body>
            <Footer/>
        </div>
    );
}