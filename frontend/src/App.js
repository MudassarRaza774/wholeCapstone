// import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from './Components/Navbar';
import Home from './Components/Home'
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import ContactUs from "./Components/ContactUs";
import AboutUs from "./Components/AboutUs";
import Cart from "./Components/Cart";
import SingleProduct from "./Components/SingleProduct";
import { useState } from "react";
import UserProfile from "./Components/UserProfile";


function App() {

  const [productData, setProductData] = useState('')
  const [loggedInUser, setLoggedInUser] = useState('')
  const [cartCount, setCartCount] = useState(0)``
  console.log("logged in user from app is ", loggedInUser)
  if (loggedInUser) {
    sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser.userName)) //storing the name in session so i can reteive the name for cart usage
  }
  return (
    <>
      <BrowserRouter>
        <Navbar cartCount={cartCount} />
        <Routes>
          <Route path="/" element={<Home setProductData={setProductData} />} />
          <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/userprofile" element={<UserProfile loggedInUser={loggedInUser}/>} />
          <Route path="/singleproduct" element={<SingleProduct productData={productData} />} />
          <Route path='/cart' element={<Cart setCartCount={setCartCount} /> /*show items that belong to the current user*/} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
