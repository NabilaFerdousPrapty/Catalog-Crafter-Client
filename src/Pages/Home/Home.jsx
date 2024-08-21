import { useLoaderData } from "react-router-dom";
import useAuth from "../../hooks/UseAuth";
import Products from "./Products/Products";
import { Link } from "react-scroll";


const Home = () => {
    const {user}=useAuth();
    // console.log(user);
    const totalCount=useLoaderData();
    return (
        <div>
           <div className="container px-6 py-16 mx-auto">
        <div className="items-center lg:flex">
            <div className="w-full lg:w-1/2">
                <div className="lg:max-w-lg">
                    <h1 className="text-3xl font-semibold text-gray-800 lg:text-4xl">Best place to choose <br /> your <span className="text-blue-500 ">Electronics</span></h1>
                    
                    <p className="my-3 text-gray-600 dark:text-gray-400">
                        The best place to buy electronics online. We offer a wide range of products including laptops, mobile phones, tablets, cameras, and more. Shop now and get the best deals on electronics.
                    </p>
                    
                    <Link to="shop" className="w-full  px-5 py-2 mt-10 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">Shop Now</Link>
                </div>
            </div>

            <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
                <img className="w-full h-full lg:max-w-3xl" src="https://merakiui.com/images/components/Catalogue-pana.svg" alt="Catalogue-pana.svg"/>
            </div>
        </div>
        </div>
        <Products totalCount={totalCount}/>
        </div>
    );
};

export default Home;