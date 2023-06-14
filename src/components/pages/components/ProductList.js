import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Buffer } from "buffer";

import { detailProduct } from "../../../store/producterSlice";
import styled from "./ProductList.module.css";
import { url } from '../../../services/service';

const ProductList = ({ products }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDetailProduct = (product) => {
    dispatch(detailProduct(product));
    navigate(`/detail/${product._id}`);
    window.scrollTo(0, 0);
  };

  return (
    <section className={styled.products}>
      <div className={styled.top}>
        <input placeholder="Enter search here!" />
        <select name="cars" id="cars">
          <option defaultChecked value="volvo">
            Default sorting
          </option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
      </div>

      <div className={styled.product}>
        {products &&
          products.map((p) => {
            // format a price with dot
            // const base64 = Buffer.from(p.images[0]).toString('base64');
            let price = p.price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            return (
              <div
                className={styled.item}
                key={p._id}
                onClick={handleDetailProduct.bind(null, p)}
              >
                <img src={`${url}/image/${p.images[0]}`} alt={p.name} />
                <h5>{p.name}</h5>
                <p>{price} VND</p>
              </div>
            );
          })}
      </div>
      <div className='p-5' style={{textAlign: 'right'}}>
        <button className='btn btn-light'><i className="fas fa-chevron-double-left"></i></button>
        <button className='btn btn-dark'>1</button>
        <button className='btn btn-light'><i className="fas fa-chevron-double-right"></i></button>
      </div>
    </section>
  );
};

export default ProductList;
