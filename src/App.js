import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllProduct } from "./store/producterSlice";
import NavBar from "./components/Layout/NavBar";
import Footer from "./components/Layout/Footer";
import Chatbot from "./components/support/Chatbot";

import HomePage from "./components/pages/Home";
import DetailPage from "./components/pages/DetailPage";
import CartPage from "./components/pages/CartPage";
import CheckoutPage from "./components/pages/CheckoutPage";
import LoginPage from './components/form/LoginPage';
import RegisterPage from "./components/form/RegisterPage";
import ShopPage from "./components/pages/ShopPage";
import HistoryPage from "./components/pages/history/HistoryPage";
import DetailOrder from "./components/pages/detailOrder/DetailOrder";

import "./App.css";
import { request } from "./services/service";
// https://app-website-sales.vercel.app/

function App() {
  const dispatch = useDispatch();

  // fetch Api products
  useEffect(() => {
    const fetchAllProduct = async () => {
      try{
        const res = await request.getProducts();
        if(res.data.message !== 'ok') {
          throw new Error('Something went wrong!')
        }
        console.log(res.data);
        dispatch(getAllProduct(res.data.products));
      }catch(err) {
        console.error(err);
      }
    };
    fetchAllProduct();
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />}>
          <Route path="/shop/:item" element={<ShopPage />}/>
        </Route>
        <Route path="/detail" element={<DetailPage />}>
          <Route path='/detail/:productId' element={<DetailPage />} />
        </Route>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/detail-order/:orderId" element={<DetailOrder />} />
      </Routes>

      {/* <ChatBot steps={steps} /> */}
      <Chatbot />
      <Footer />
    </div>
  );
}

export default App;
