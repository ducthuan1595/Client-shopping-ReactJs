//////////////////////////////
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "./RegisterPage.module.css";
import { Link } from "react-router-dom";

import { request } from "../../services/service";

export default function RegisterPage() {
  const [isValid, setInvalid] = useState(true);
  const [messageError, setMessageError] = useState('');
  const [valueInput, setValueInput] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const navigate = useNavigate();

  // target form input
  const handleChangeInput = (e, name) => {
    let stateCopy = {...valueInput};
    stateCopy[name] = e.target.value;
    setInvalid(false);
    setValueInput(stateCopy);
  };

  const handleBlur = (name) => {
    if(valueInput[name].trim().length === 0) {
      setInvalid(true);
      setMessageError('Please, this field is require!')
    }
    if(name === 'password' && valueInput['password'].trim().length < 7) {
      setInvalid(true);
      setMessageError('Please, password must at least 8 charts!')
    }
    if(name === 'email' && !valueInput['email'].includes('@')) {
      setInvalid(true);
      setMessageError('Please, this field must to be email!')
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    // valid value input
    if(!isValid) {
      const data = await request.signup(valueInput);
      if(data.data.message === 'ok') {
        navigate('/login')
      }
    }
  }


  return (
    <div className={styled.form}>
      <form onSubmit={handleSubmit}>
        <div className={styled["form-group"]}>
          <h2>Sign Up</h2>
          <div className="form-group">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={valueInput.name}
              onChange={(e) => handleChangeInput(e, "name")}
              onBlur={handleBlur.bind(null, 'name')}
            />
            <input
              type="email"
              name="email"
              // className="form-control"
              placeholder="Email"
              value={valueInput.email}
              onChange={(e) => handleChangeInput(e, "email")}
              onBlur={handleBlur.bind(null, 'email')}
            />
            <input
              type="password"
              name="password"
              // className="form-control"
              placeholder="Password"
              value={valueInput.password}
              onChange={(e) => handleChangeInput(e, "password")}
              onBlur={handleBlur.bind(null, 'password')}
            />
            <input
              type="text"
              // className="form-control"
              name="phone"
              placeholder="Phone"
              value={valueInput.phone}
              onChange={(e) => handleChangeInput(e, "phone")}
              onBlur={handleBlur.bind(null, 'phone')}
            />
          </div>
          {isValid && <div style={{color: 'red'}}>{messageError}</div>}
          <button>SIGN UP</button>
          <div className={styled.link}>Login?<Link to='/login' >Click</Link></div>
        </div>
      </form>
      </div>
  );
}
