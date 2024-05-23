import React, {useContext, useState} from "react";
import "../components/Auth/Auth.css";
import {LOGIN_ROUTE, MAINPAGE_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { registration, login } from "../http/userApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
  const navigate = useNavigate()
  const {user} = useContext(Context)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const click = async () => {
    try {
      let data
      if (isLogin) {
        data = await login(name, password)
        // console.log(localStorage.getItem('token'))

      } else {
        data = await registration(name, email, password)
        // console.log(localStorage.getItem('token'))
      }
      user.setUser(data)
      user.setIsAuth(true)
      navigate(MAINPAGE_ROUTE)

    } catch (e) {
      alert(e.response.data.message)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-method">
        <>
          <div className="choose-method">
            {isLogin ? (
              <>
                <h3>No account yet?</h3>
                <NavLink to={REGISTRATION_ROUTE}>Sign Up</NavLink>
              </>
            ) : (
              <>
                <h3>Already have account?</h3>
                <NavLink to={LOGIN_ROUTE}>Log In</NavLink>
              </>
            )}
          </div>
          <div className="auth-input-container">
            <form>
              <h2>{isLogin ? "Login" : "Registration"}</h2>
                  <div className="user-box">
                    <input
                        type="text"
                        className="auth-input"
                        value={name}
                        required="required"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label>Name</label>
                  </div>
                  {isLogin ? '' :
                    <div className="user-box">
                      <input
                        type="text"
                        className="auth-input"
                        value={email}
                        required="required"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label>Email</label>
                    </div>
                  }
              <div className="user-box">
                <input
                  type="password"
                  className="auth-input"
                  value={password}
                  required="required"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label>Password</label>
              </div>
              <a className='auth-confirm' onClick={click}>
                Confirm
              </a>
            </form>
          </div>
        </>
      </div>
    </div>
  );
});

export default Auth;
