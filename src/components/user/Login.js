import React, { useState, useEffect } from "react";
import "./UserForm.css";
import { toast } from "react-toastify";

import { doLogin } from "../../store/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((store) => store.auth);
  // console.log("🚀 ~ file: Login.js:15 ~ Login ~ auth:", auth);

  useEffect(() => {
    if (auth.isLoggedIn) {
      navigate("/login");
    }
  }, [auth]);

  const handleLoginClick = (e) => {
    try {
      setLoader(true);
      dispatch(
        doLogin({
          email,
          password,
        })
      );
      toast.success("Successfully Login!");
      navigate("/");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoader(false);
    }
  };
  return (
    <>
      <div className="container1">
        <div className="screen">
          <div className="screen__content">
            <form className="login">
              <h2 className="heading__text">LOG IN</h2>

              <div className="login__field">
                <i className="login__icon fa fa-envelope"></i>
                <input
                  type="email"
                  className="login__input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock"></i>
                <input
                  type="password"
                  className="login__input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {loader ? (
                <button>Loading...</button>
              ) : (
                <button
                  className="button login__submit"
                  onClick={handleLoginClick}
                >
                  <span className="button__text">Login Now</span>
                  <i className="button__icon fas fa-chevron-right"></i>
                </button>
              )}
            </form>
            <div className="social-login">
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "white" }}
              >
                <h3 style={{    margin: '12px auto'}}>Register</h3>
              </Link>
            </div>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
