import { useSelector } from "react-redux";
import styled from "./Checkout.module.css";
import { Link } from "react-router-dom";

import FormCheckout from "../form/Checkout";

export default function CheckoutPage() {
  const items = useSelector(state => state.cart.listCart);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  let total = totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return (
    <div className={styled.checkout}>
      <section className={styled["checkout-name"]}>
        <h2>CHECKOUT</h2>
        <h4><Link to='/'>HOME</Link> / <Link to='/shop'>CART</Link> / <Link>CHECKOUT</Link></h4>
      </section>
      <h3>BILLING DETAILS</h3>
      <section className={styled['form-checkout']}>
        <div className={styled.layout}>
          <FormCheckout total={total} />
          <div className={styled.order}>
            <h4>YOUR ORDER</h4>
            {items && items.map(p => {
              const item = p.productId;
              let price = item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
              return (
                <div className={styled.group} key={p._id}>
                  <div>{item.name}</div>
                  <span>{price} VND x {p.quantity}</span>
                </div>
              )
            })}
            <div className={styled.group} style={{borderBottom: 'none', marginTop: '15px'}}>
              <div>TOTAL</div>
              <div className={styled.total}>{total} VND</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
