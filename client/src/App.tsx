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
import Layout from "./components/layout/Layout";
import { AuthProvider } from "./hooks/useAuth";
import BlogPost from "./pages/blog/BlogPost";

export default function App() {
    return (
        <AuthProvider>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home/>} />

                    <Route path="/blog" element={<Blog/>} />
                    <Route path="/blog/*" element={<BlogPost/>} />

                    <Route path="/register" element={<Register/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/logout" element={<Logout/>} />

                    <Route path="/forbidden" element={<Forbidden/>} />

                    <Route path="/author" element={ <ProtectedRoute><Author/></ProtectedRoute> } />
                    <Route path="/author/create" element={ <ProtectedRoute><CreatePost/></ProtectedRoute> } />
                </Routes>
            </Layout>
        </AuthProvider>
    );
}