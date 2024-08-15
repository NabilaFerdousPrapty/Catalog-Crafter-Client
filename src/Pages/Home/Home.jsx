import useAuth from "../../hooks/UseAuth";


const Home = () => {
    const {user}=useAuth();
    console.log(user);
    
    return (
        <div>
            <h1>
                Home Page
            </h1>
        </div>
    );
};

export default Home;