import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "./components/auth/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Blog from "./pages/Blog";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Logout from "./pages/Logout";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/blog" element={<Blog/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/logout" element={<Logout/>} />

            <Route path="/test" element={ <ProtectedRoute><Test/></ProtectedRoute> }  />
        </Routes>
    );
}