import { useState } from "react"
import { request } from "../../services/service";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Modal from "../Layout/Modal";

const FormCheckout = ({ total }) => {
  const navigate = useNavigate();
  const currUser = useSelector(state => state.auth.currUser);
  const amount = useSelector(state => state.cart.totalAmount);

  const [valueInput, setValueInput] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [errMessage, setErrMessage] = useState({
    field: '',
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [isValid, setInvalid] = useState(true);
  const [isLoading, setIsloading] = useState(false);

  const handleChangeInput = (e, name) => {
    setInvalid(false);
    setErrMessage('');
    const cpState = {...valueInput};
    cpState[name] = e.target.value;
    setValueInput(cpState);
  }

  const handleBlurInput = (field) => {
    if(valueInput[field].trim().length < 0) {
      setErrMessage({field: 'These fields is required!'});
      setInvalid(true);
    };
    if(field === 'name' && valueInput.name.trim().length < 2) {
      setErrMessage({name: 'Name must be at least 2 charts!'})
      setInvalid(true);
    };
    if(field === 'email' && !valueInput.email.includes('@')) {
      setErrMessage({email: 'This field must be email!'})
      setInvalid(true);
    };
    if(field === 'phone' && valueInput.phone.trim().length < 10) {
      setErrMessage({phone: 'Phone number invalid!'})
      setInvalid(true);
    };
    if(field === 'address' && valueInput.address.trim().length < 5) {
      setErrMessage({address: 'Address invalid!'})
      setInvalid(true);
    };
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!isValid) {
      setIsloading(true);
      const value = {
        address: valueInput.address,
        phone: valueInput.phone,
        name: valueInput.name,
        email: valueInput.email,
        userId: currUser?.userId,
        amount: amount,
      }
      navigate('/');
      window.scrollTo(0,0);
      const res = await request.postOrder(value);
      if(res.data.message === 'ok') {
        toast.success('🦄Successfully!', {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        setIsloading(false);
      }else {
        setErrMessage({field: 'Your information invalid!'});
        toast.error('🦄 Sorry! Your order is not success', {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
    }else {
      setErrMessage({field: 'These fields is required!'});
    }
  }
  return (
    <div>
      {/* {isLoading && <><Modal /><div className='isloading'>Ordering is in progress...</div></>} */}
      <form className='row' onSubmit={handleSubmit}>
            <div className="col-12">
              <label htmlFor='name' className="form-label">
                FULL NAME
              </label>
              <input
                type="text"
                style={{borderColor: `${errMessage.name ? 'red' : ''}`}}
                value={valueInput.name}
                className="form-control"
                id="name"
                placeholder="Enter Your Name Here!"
                onChange={(e) => handleChangeInput(e, 'name')}
                onBlur={(e) => handleBlurInput('name')}
              />
            <span style={{color: 'red', fontSize: '13px', marginTop: '12px'}}>{errMessage.name}</span>

            </div>
            <div className="col-12">
              <label htmlFor='email' className="form-label">
                EMAIL
              </label>
              <input
                type="email"
                style={{borderColor: `${errMessage.email ? 'red' : ''}`}}
                value={valueInput.email}
                className="form-control"
                id="name"
                placeholder="Enter Your Email Here!"
                onChange={(e) => handleChangeInput(e, 'email')}
                onBlur={(e) => handleBlurInput('email')}
              />
            <span style={{color: 'red', fontSize: '13px', marginTop: '12px'}}>{errMessage.email}</span>
            </div>
            <div className="col-12">
              <label htmlFor="phone-number" className="form-label">
                PHONE NUMBER
              </label>
              <input
                type="text"
                style={{borderColor: `${errMessage.phone ? 'red' : ''}`}}
                value={valueInput.phone}
                className="form-control"
                id="phone-number"
                placeholder="Enter Your Phone Number Here!"
                onChange={(e) => handleChangeInput(e, 'phone')}
                onBlur={(e) => handleBlurInput('phone')}
              />
            <span style={{color: 'red', fontSize: '13px', marginTop: '12px'}}>{errMessage.phone}</span>
            </div>
            <div className="col-12">
              <label htmlFor="address" className="form-label">
                ADDRESS
              </label>
              <input
                type="text"
                style={{borderColor: `${errMessage.address ? 'red' : ''}`}}
                value={valueInput.address}
                className="form-control"
                id="address"
                placeholder="Enter Your Address Here!"
                onChange={(e) => handleChangeInput(e, 'address')}
                onBlur={(e) => handleBlurInput('address')}
              />
            <span style={{color: 'red', fontSize: '13px', marginTop: '12px'}}>{errMessage.address}</span>
            </div>
            <span style={{color: 'red', fontSize: '15px', marginTop: '16px'}}>{errMessage.field}</span>
            <div>
              <button>Place order</button>
            </div>
          </form>
          <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
<ToastContainer />
    </div>
  )
}

export default FormCheckout;