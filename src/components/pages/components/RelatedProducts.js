import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";

import { detailProduct } from "../../../store/producterSlice";
import styled from "./RelatedProducts.module.css";
import { url } from "../../../services/service";

const RelatedProducts = ({ category, productId }) => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  let categoryProducts = products?.products?.filter(
    (item) => item.category === category && item._id !== productId
  );
  console.log(categoryProducts);

  const handleDetail = (item) => {
    dispatch(detailProduct(item));
    navigate(`/detail/${item._id}`);
    window.scrollTo(0, 0);
  }

  return (
    <>
      {categoryProducts.length > 0 && <h4 className={styled.title}>RELATED PRODUCTS</h4>}
      <div className={styled.related}>
        {categoryProducts &&
          categoryProducts.map((p) => {
            // format a price with dot
            let price = p.price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            return (
              <div className={styled.item} key={p._id} onClick={handleDetail.bind(null, p)}>
                <img src={`${url}/image/${p.images[0]}`} alt={p.name} />
                <h5>{p.name}</h5>
                <p>{price} VND</p>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default RelatedProducts;
