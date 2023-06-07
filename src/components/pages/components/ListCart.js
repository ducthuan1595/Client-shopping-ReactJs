import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getCarts } from "../../../store/cartSlice";
import styled from "./ListCart.module.css";
import { useEffect, useState } from "react";
import { Buffer } from "buffer";

import { request } from "../../../services/service";
import { getCookie } from "../../../store/userSlice";

const ListCart = () => {
  const currUser = useSelector((state) => state.auth.currUser);
  const accessToken = useSelector((state) => state.auth.accessToken);
  console.log(accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [listCart, setListCart] = useState([]);
  const [message, setMessage] = useState('Not product!');

  const fetchCarts = async() => {
    try{
      if(currUser && currUser !== 'undefined') {
        const config = {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${getCookie()}`
          },
        }
        const data = await request.getCarts(currUser?.userId, config);
        if(data.data.message === 'ok') {
          console.log(data.data);
          setListCart(data.data.cart);
          dispatch(getCarts(data.data.cart));
        }
      }
    }catch(er) {
      console.error(er);
    }
  }
  useEffect(() => {
    fetchCarts();
  }, [currUser]);

  const addCarts = async(productId, quantity) => {
    const res = await request.addCart(currUser?.userId, productId, quantity);
    if(res.data.message === 'ok') {
      fetchCarts();
    }
  }
  const handleNavigateShop = () => {
    navigate("/shop");
    window.scrollTo(0, 0);
  };

  const handleNavigateCheck = () => {
    if(listCart.length > 0) {
      navigate("/checkout");
      window.scrollTo(0, 0);
    }else {
      setMessage('Please, choose buy item before checkout')
    }
  };

  // update item cart
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      const amount = -1;
      addCarts(item.productId._id, amount);
    }
  };
  const handleIncrease = (item) => {
    const amount = 1;
    addCarts(item.productId._id, amount);
  };

  // handle remove product
  const handleRemove = async(item) => {
    const res = await request.deleteCart(currUser?.userId, item._id);
    if(res.data.message === 'ok') {
      fetchCarts();
    }
  };

  return (
    <section className={styled.lists}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">IMAGE</th>
            <th scope="col">PRODUCTS</th>
            <th scope="col">PRICE</th>
            <th scope="col">QUALITY</th>
            <th scope="col">TOTAL</th>
            <th scope="col">REMOVE</th>
          </tr>
        </thead>
        <tbody>
          {listCart.length > 0 ?
            listCart.map((p) => {
              const item = p?.productId;
              const base64 = Buffer.from(item.images[0]).toString('base64');
              let price = item?.price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
              let total = (item.price * p.quantity)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
              return (
                <tr key={item._id} className={styled.inform}>
                  <td>
                    <img src={'data:image/jpeg;base64,' + base64} alt={item.name} />
                  </td>
                  <td style={{ fontWeight: "bold" }}>{item.name}</td>
                  <td>{price} VND</td>
                  <td>
                    <div className={styled.group}>
                      <i
                        className="fas fa-caret-left"
                        onClick={handleDecrease.bind(null, p)}
                      ></i>
                      <span>{p.quantity}</span>
                      <i
                        className="fas fa-caret-right"
                        onClick={handleIncrease.bind(null, p)}
                      ></i>
                    </div>
                  </td>
                  <td>{total} VND</td>
                  <td>
                    <i
                      className="fas fa-trash-alt"
                      style={{ cursor: "pointer" }}
                      onClick={handleRemove.bind(null, item)}
                    ></i>
                  </td>
                </tr>
              );
            })
          : <tr><td style={{textAlign: 'left', fontSize: '20px', color: '#dad746'}} colSpan={6}>{message}</td></tr>}
        </tbody>
      </table>

      <div className={styled.navigate}>
        <div className={styled.left} onClick={handleNavigateShop}>
          <i className="fas fa-long-arrow-alt-left"></i>
          <span>Continue shopping</span>
        </div>
        <div className={styled.right} onClick={handleNavigateCheck}>
          <span>Proceed to checkout</span>
          <i className="fas fa-long-arrow-alt-right"></i>
        </div>
      </div>
    </section>
  );
};

export default ListCart;
