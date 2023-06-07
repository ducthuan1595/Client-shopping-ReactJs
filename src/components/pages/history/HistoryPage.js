import styled from './HistoryPage.module.css';
import { useSelector } from "react-redux";
import { request } from "../../../services/service";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const HistoryPage = () => {
  const [orders, setOrders] = useState({});

  const currUser = useSelector(state => state.auth.currUser);
  const navigate = useNavigate();

  const getAllOrder = async(page) => {
    const pages = page || 1;
    const res = await request.getOrderWithUser(currUser?.userId, pages);
    if(res.data.message === 'ok') {
      console.log(res.data);
      setOrders(res.data.result)
    }
  };
  
  const handlePrev = () => {
    if(orders.currPage > 1) {
      const page = +orders.currPage - 1;
      getAllOrder(page);
    }
  }

  const handleNext = () => {
    if(orders.totalPage > orders.currPage) {
      const page = +orders.currPage + 1;
      getAllOrder(page);
    }
  }

  useEffect(() => {
    getAllOrder();
  }, []);

  const handleShowDetail = async(id) => {
    const res = await request.getDetailOrderByUser(currUser?.userId, id);
    if(res.data.message === 'ok') {
      navigate(`/detail-order/${id}`, {state: {data: res.data.order}});
    }
  }
  return (
    <div className={styled.history}>
      <section className={styled.nav}>
        <div className={styled.title}>
        <h2>Your information</h2>
          <div>Name: {currUser?.name}</div>
          <div>Email: {currUser?.email}</div>
        </div>
        <div>
          <img style={{width: '200px'}} src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png' alt='user' />
        </div>
      </section>
      <section className={styled.table}>
        <h4>Orders history</h4>
        <div className={styled.page}><button onClick={handlePrev}>««</button><span>{orders.currPage}</span><button onClick={handleNext}>»»</button></div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">NAME</th>
            <th scope="col">DATE</th>
            <th scope="col">PHONE</th>
            <th scope="col">ADDRESS</th>
            <th scope="col">QUANTITY</th>
            <th scope="col">TOTAL</th>
            <th scope="col">STATUS</th>
            <th scope="col">DETAIL</th>
          </tr>
        </thead>
        <tbody>
          {orders ?
            orders.orders?.map((item, i) => {
              // const item = p?.productId;
              let amount = item?.amount
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                let d = new Date(item.createdAt);
                let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
                let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
                let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
              let date = `${da}-${mo}-${ye}`;
              return (
                <tr key={item._id} className={styled.inform}>
                  <td style={{fontWeight: 'bold'}}>{i+1}</td>
                  <td className={styled['first-letter']}>{item.user.name}</td>
                  <td>{date}</td>
                  <td>{item.user.phone}</td>
                  <td>{item.user.address}</td>
                  <td style={{textAlign: 'center'}}>{item.quantity}</td>
                  <td>{amount} VND</td>
                  <td className={styled['first-letter']}>{item.status}</td>
                  <td><button onClick={handleShowDetail.bind(null, item._id)} className={styled.btn}>View</button></td> 
                </tr>
              );
            })
          : <tr><td style={{textAlign: 'left', fontSize: '20px', color: '#dad746'}} colSpan={6}>Not found product!</td></tr>}
        </tbody>
      </table>
      </section>
    </div>
  )
};

export default HistoryPage;