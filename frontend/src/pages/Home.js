import Footer from "../features/common/Footer";
import NavBar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";
import Slider from "../pages/Slider";

function Home() {
    return ( 
        <div>
            <NavBar>
                <Slider></Slider>
                <ProductList></ProductList>
            </NavBar>
            <Footer></Footer>
        </div>
     );
}

export default Home;