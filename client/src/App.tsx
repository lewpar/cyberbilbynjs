import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "./components/auth/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Blog from "./pages/Blog";
import Home from "./pages/Home";
import Logout from "./pages/Logout";
import Forbidden from "./pages/error/Forbidden";
import CreatePost from "./pages/author/CreatePost";
import Author from "./pages/Author";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/blog" element={<Blog/>} />

            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/logout" element={<Logout/>} />

            <Route path="/forbidden" element={<Forbidden/>} />

            <Route path="/author" element={ <ProtectedRoute><Author/></ProtectedRoute> } />
            <Route path="/author/create" element={ <ProtectedRoute><CreatePost/></ProtectedRoute> } />
        </Routes>
    );
}