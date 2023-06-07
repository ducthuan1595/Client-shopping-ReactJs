import { useSelector } from 'react-redux';

import styled from './TotalCart.module.css';

const TotalCart = () => {
  const totalAmount = useSelector(state => state.cart.totalAmount);
  let total = totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (
    <section className={styled.total}>
      <h4>CART TOTAL</h4>
      <div className={`${styled.show} ${styled.bottom}`}>
        <div>SUBTOTAL</div>
        <span>{total}</span>
      </div>
      <div className={styled.show}>
        <div>TOTAL</div>
        <span className={styled.active}>{total}</span>
      </div>
      <input type='text' placeholder='Enter your coupon' />
      <button>
      <i className="fas fa-gift"></i>
      <span>Apply coupon</span>
      </button>
    </section>
  )
}

export default TotalCart;