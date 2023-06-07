//////////////////////////////
import ListCart from "./components/ListCart";
import TotalCart from "./components/TotalCart";
import styled from "./CartPage.module.css";
import { useSelector } from "react-redux";

export default function CartPage() {
  const currUser = useSelector(state => state.auth.currUser);
  return (
    <div className={styled.cart}>
      <section className={styled["cart-name"]}>
        <h2 style={{fontSize: '50px', textTransform: 'capitalize'}}>{currUser?.user?.name}</h2>
        <h4>cart</h4>
      </section>
      <h3>SHOPPING CART</h3>
      <div className={styled.layout}>
        <ListCart />
        <TotalCart />
      </div>
    </div>
  );
}
