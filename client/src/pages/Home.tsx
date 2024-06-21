import Layout from "../components/Layout";
import useAuth from "../hooks/useAuth";

export default function Home() {
    let [user, setUser] = useAuth();
    console.log(user);
    
    return (
        <Layout>
            <div>Hello from the home page!</div>
        </Layout>
    );
}