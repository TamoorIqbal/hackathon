import { useState } from "react";
import "./UserForm.css";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { doSignup } from "../../store/authSlice";
import { useNavigate ,Link} from "react-router-dom";

import { auth, createUserWithEmailAndPassword } from "../../config/firebase";
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRegisterClick = (e) => {
    e.preventDefault();
    
    try {
      setLoader(true);
      dispatch(
        doSignup({
          name,
          email,
          password,
        })
      );
      toast.success("Successfully Register!");
      navigate("/login");
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
            <form className="login" style={{ paddingTop: "77px" }}>
              <h2 className="heading__text">REGISTER</h2>
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  type="text"
                  className="login__input"
                  placeholder="User name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
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
                  onClick={handleRegisterClick}
                >
                  <span className="button__text">Register Now</span>
                  <i className="button__icon fas fa-chevron-right"></i>
                </button>
              )}
            </form>
            <div className="social-login">
            <Link to="/login" style={{textDecoration:"none",color:"white"}}>
                <h3>Login</h3>
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

export default Register;
