import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Buffer } from "buffer";

import RelatedProducts from "./components/RelatedProducts";
import styled from "./DetailPage.module.css";
import { request } from "../../services/service";
import Modal from "../Layout/Modal";

export default function DetailPage() {
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [sliderNumber, setSliderNumber] = useState(0);

  const navigate = useNavigate();
  const detailProduct = useSelector((state) => state.products.detailProduct);
  let userCurr = useSelector((state) => state.auth.currUser);
  if (detailProduct === null) {
    return navigate("/shop");
  }
  const base64 = Buffer.from(detailProduct.images[0]).toString("base64");
  let price = detailProduct.price
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // description products
  let descText = detailProduct?.long_desc?.replace(/\n•\t/g, ",");
  let descText1 = descText?.replace(/\n\n•/g, ",");
  let descText2 = descText1?.replace(/\n•/g, ",");
  let descText3 = descText2?.replace(/\n-/g, ",");
  let filter = descText3?.split(",");
  const text = filter?.splice(0, 1);

  // handle add products to cart
  const handleAddCart = async () => {
    if (quantity > 0 && userCurr && userCurr !== 'undefined') {
      if(detailProduct.count > 0) {
        const res = await request.addCart(
          userCurr?.userId,
          detailProduct._id,
          quantity
        );
        if (res.data.message === "ok") {
          navigate("/cart");
          window.scrollTo(0, 0);
        }
      }
    } else {
      navigate("/login");
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleShowImage = (id) => {
    setOpen(true);
    setSliderNumber(+id);
  };

  const handleSlider = (position) => {
    if (position === "r") {
      console.log(detailProduct.images.length);
      setSliderNumber(
        sliderNumber === detailProduct.images.length - 1 ? 0 : sliderNumber + 1
      );
    } else {
      setSliderNumber(
        sliderNumber === 0 ? detailProduct.images.length - 1 : sliderNumber - 1
      );
    }
  };

  console.log(detailProduct.count);
  return (
    <div className={styled["detail-product"]}>
      {open && (
        <div>
          <Modal onOpen={setOpen} />
          <div className={styled.slider}>
            <button
              style={{ marginRight: "20px" }}
              onClick={handleSlider.bind(null, "l")}
            >
              <i
                style={{ fontSize: "100px", fontWeight: "300" }}
                className="fas fa-angle-left"
              ></i>
            </button>
            <img
              className={styled.show}
              src={
                "data:image/jpeg;base64," +
                Buffer.from(detailProduct.images[sliderNumber]).toString(
                  "base64"
                )
              }
              alt={detailProduct.name}
            />
            <button
              style={{ marginLeft: "20px" }}
              onClick={handleSlider.bind(null, "r")}
            >
              <i
                style={{ fontSize: "100px", fontWeight: "300" }}
                className="fas fa-angle-right"
              ></i>
            </button>
          </div>
        </div>
      )}
      <div className={styled.detail}>
        <div>
          <img
            className={styled.image}
            src={"data:image/jpeg;base64," + base64}
            alt={detailProduct?.name}
          />
          <div className={styled["list-images"]}>
            {detailProduct &&
              detailProduct.images.map((image, index) => {
                return (
                  <div key={index}>
                    <img
                      onClick={handleShowImage.bind(null, index)}
                      src={
                        "data:image/jpeg;base64," +
                        Buffer.from(image).toString(
                          "base64"
                        )
                      }
                      alt={detailProduct?.name}
                    />
                  </div>
                );
              })}
          </div>
        </div>
        <div className={styled.content}>
          <h3>{detailProduct.name}</h3>
          <span>{price} VND</span>
          <p>{detailProduct?.short_desc}</p>
          <div className={styled.category}>
            <span>CATEGORY: </span>
            <span>{detailProduct?.category}</span>
          </div>
          <div className={styled.actions}>
            <p>QUANTITY</p>
            <div className={styled.action}>
              <div className={styled.group}>
                <i className="fas fa-caret-left" onClick={handleDecrease}></i>
                <span>{detailProduct.count === 0 ? 0 : quantity}</span>
                <i className="fas fa-caret-right" onClick={handleIncrease}></i>
              </div>
              <button disabled={detailProduct?.count === 0 ? true : false} onClick={handleAddCart}>Add to cart</button>
            </div>
          </div>
              {detailProduct?.count === 0 && <div style={{color: '#e3530c', marginTop: '10px'}}>Sorry, Product's item out of stock</div>}
        </div>
      </div>

      {/* description products */}
      <div className={styled.desc}>
        <div>DESCRIPTION</div>
        <h4>PRODUCT DESCRIPTION</h4>
        <h5>{text}</h5>
        <ul>
          {filter.map((t, i) => {
            return <li key={i}>- {t}</li>;
          })}
        </ul>
      </div>

      {/* related products */}
      <RelatedProducts
        category={detailProduct?.category}
        productId={detailProduct?._id}
      />
    </div>
  );
}
