import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'universal-cookie';
// import Cookies from "js-cookie";

import { request } from "../../services/service";
import { login, getToken } from "../../store/userSlice";
import styled from "./LoginPage.module.css";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [isValid, setInvalid] = useState(true);
  const [messageError, setMessageError] = useState('');
  const [valueInput, setValueInput] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const onLogin = useSelector(state => state.auth.onLogin);
  const navigate = useNavigate();
  const cookies = new Cookies();

  // target form input
  const handleChangeInput = (e, name) => {
    let stateCopy = {...valueInput};
    stateCopy[name] = e.target.value;
    setInvalid(false);
    setValueInput(stateCopy);
  };

  // valid input form
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

  // handle login
  const handleSubmit = async(e) => {
    e.preventDefault();

    if(!isValid) {
      const data = await request.login(valueInput);
      if(data.data.message === 'ok') {
        dispatch(login(data.data.user));
        dispatch(getToken(data.data.token));
        cookies.set('currUser', data.data.user);
        cookies.set('access-token', data.data.token);
        navigate('/');
      }else {
        setInvalid(true);
        setMessageError('Information incorrect!')
      }
    }
  }


  return (
    <div className={styled.form}>
      <form onSubmit={handleSubmit}>
        <div className={styled["form-group"]}>
          <h2>Sign In</h2>
          <div className="form-group">

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
              placeholder="Password"
              value={valueInput.password}
              onChange={(e) => handleChangeInput(e, "password")}
              onBlur={handleBlur.bind(null, 'password')}
            />
            
          </div>
          {isValid && <div style={{color: 'red'}}>{messageError}</div>}
          <button disabled={onLogin}>SIGN IN</button>
          <div className={styled.link}>Create a account?<Link to='/register' >Sign up</Link></div>
        </div>
      </form>
      </div>
  );
}
